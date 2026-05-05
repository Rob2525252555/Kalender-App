import express from 'express';
import fs from 'fs';
import crypto from 'crypto';
import { DATA_TASKS_PATH } from '../config/paths.js';
import { enqueueTaskOperation } from '../utils/enqueueWrite.js';

/**
 * @module tasks.router
 * Enthält alle CRUD-Endpunkte für Tasks (REST API):
 * - GET /api/tasks (alle Tasks)
 * - GET /api/tasks/:id (ein Task)
 * - POST /api/tasks (neue Task)
 * - PUT /api/tasks/:id (Task aktualisieren)
 * - DELETE /api/tasks/:id (Task löschen)
 * - Bei (read->modify->write)-Operation (POST, PUT und DELETE) wird eine Queue verwendet,
 *   um Race-Conditions zu verhindern
 */

const router = express.Router();

const ERR_TASK_NOT_FOUND = 'TASK_NOT_FOUND';

/**
 * GET /api/tasks
 * Liefert alles Tasks zurück
 * Antwort: Liefert Array von JavaScript Objekten
 */
router.get('/', async (req, res) => {
  try {

    const jsonData = await fs.promises.readFile(DATA_TASKS_PATH, 'utf-8');
    let tasks = JSON.parse(jsonData);

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Datei konnte nicht gelesen werden' });
  }
});

/**
 * GET /api/tasks/:id
 * Liefert einzelne Task anhand der ID
 * Antwort: Liefert das gesuchte Objekt
 */
router.get('/:id', async (req, res) => {
  try {

    const jsonData = await fs.promises.readFile(DATA_TASKS_PATH, 'utf8');
    const tasks = JSON.parse(jsonData);

    // Einzelne Task andhand ID finden
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Aufgabe nicht gefunden' });
    }

    res.json(task);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Aufgabe konnte nicht geladen werden' });
  }
});

/**
 * POST /api/tasks
 * Fügt eine neue Task hinzu
 * Body: {title, employee, startDate, endDate, description}
 * Bei (read->modify->write)-Operation wird Queue verwendet
 * Antwort: Liefert das neue Task Objekt
 */
router.post('/', async (req, res) => {
  try {

    const { title, employee, startDate, endDate, description } = req.body;

    // Pflichtfelder prüfen
    if (!title || !employee || !startDate || !endDate) {
      return res.status(400).json({ error: 'Es wurden nicht alles Pflichtfelder ausgefüllt' });
    }

    // Startdatum darf nicht nach Enddatum sein
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: 'Startdatum darf nicht nach Enddatum liegen.' });
    }

    const newTask = await enqueueTaskOperation(async () => {
      const jsonData = await fs.promises.readFile(DATA_TASKS_PATH, 'utf-8');
      const tasks = JSON.parse(jsonData);

      const taskToAdd = {
        id: crypto.randomUUID(),
        title,
        employee,
        startDate,
        endDate,
        description
      };

      tasks.push(taskToAdd);

      await fs.promises.writeFile(DATA_TASKS_PATH, JSON.stringify(tasks, null, 2));

      return taskToAdd;
    });

    res.status(201).json(newTask);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Aufgabe konnte nicht gespeichert werden.' });
  }
});

/**
 * PUT /api/tasks/:id
 * Aktualisiert eine bestehende Task
 * Body {title, employee, startDate, endDate, description}
 * Bei (read->modify->write)-Operation wird Queue verwendet
 * Antwort: Liefert das veränderte Objekt
 */
router.put('/:id', async (req, res) => {
  try {
    const { title, employee, startDate, endDate, description } = req.body;

    // Pflichtfelder prüfen
    if (!title || !employee || !startDate || !endDate) {
      return res.status(400).json({ error: 'Nicht alle Felder ausgefüllt' });
    }

    // Startdatum darf nicht nach Enddatum sein
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: 'Startdatum darf nicht nach Enddatum liegen.' });
    }

    const updatedTask = await enqueueTaskOperation(async () => {
      const jsonData = await fs.promises.readFile(DATA_TASKS_PATH, 'utf8');
      const tasks = JSON.parse(jsonData);

      // Task anhand der ID finden
      const index = tasks.findIndex(t => t.id === req.params.id);

      if (index === -1) {
        throw new Error(ERR_TASK_NOT_FOUND);
      }

      // Task aktualisieren
      tasks[index] = {
        ...tasks[index],
        title,
        employee,
        startDate,
        endDate,
        description
      };

      await fs.promises.writeFile(DATA_TASKS_PATH, JSON.stringify(tasks, null, 2));

      return tasks[index];
    });

    res.json(updatedTask);

  } catch (err) {
    if (err.message === ERR_TASK_NOT_FOUND) {
      return res.status(404).json({ error: 'Aufgabe nicht gefunden' });
    }

    console.error(err);
    res.status(500).json({ error: 'Aufgabe konnte nicht aktualisiert werden' });
  }
});

/**
 * DELETE /api/tasks/:id
 * Löscht eine Task anhand der ID
 * Bei (read->modify->write)-Operation wird Queue verwendet
 * Antwort: Liefert das gelöschte Objekt
 */
router.delete('/:id', async (req, res) => {
  try {

    const deletedTask = await enqueueTaskOperation(async () => {
      const jsonData = await fs.promises.readFile(DATA_TASKS_PATH, 'utf8');
      const tasks = JSON.parse(jsonData);

      const idToDelete = req.params.id;

      // Task, die gelöscht werden soll finden
      const taskToDelete = tasks.find(task => task.id === idToDelete);

      if (!taskToDelete) {
        throw new Error(ERR_TASK_NOT_FOUND);
      }

      // Neues Array ohne die gelöschte Task
      const updatedTasks = tasks.filter(t => t.id !== idToDelete);

      await fs.promises.writeFile(DATA_TASKS_PATH, JSON.stringify(updatedTasks, null, 2));
      return taskToDelete;
    });


    res.json({ status: 'ok', deletedTask });

  } catch (err) {
    if (err.message === ERR_TASK_NOT_FOUND) {
      return res.status(404).json({ error: 'Aufgabe nicht gefunden' });
    }

    console.error(err);
    res.status(500).json({ error: 'Aufgabe konnte nicht gelöscht werden' });
  }
});

export default router;



