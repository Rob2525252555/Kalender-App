import express from 'express';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @module tasks.router
 * Enthält alle CRUD-Endpunkte für Tasks (REST API):
 * - GET /api/tasks (alle Tasks)
 * - GET /api/tasks/:id (ein Task)
 * - POST /api/tasks (neue Task)
 * - PUT /api/tasks/:id (Task aktualisieren)
 * - DELETE /api/tasks/:id (Task löschen)
 */

const router = express.Router();

// --- Pfad zur JSON-Datei ermitteln ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_TASKS_PATH = path.join(__dirname, '../../data/tasks.json');

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

    const jsonData = await fs.promises.readFile(DATA_TASKS_PATH, 'utf-8');
    const tasks = JSON.parse(jsonData);

    const newTask = {
      id: crypto.randomUUID(),
      title,
      employee,
      startDate,
      endDate,
      description
    };

    tasks.push(newTask);

    await fs.promises.writeFile(DATA_TASKS_PATH, JSON.stringify(tasks, null, 2));

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

    const jsonData = await fs.promises.readFile(DATA_TASKS_PATH, 'utf8');
    const tasks = JSON.parse(jsonData);

    // Task anhand der ID finden
    const index = tasks.findIndex(t => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Aufgabe nicht gefunden' });
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

    res.json(tasks[index]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Aufgabe konnte nicht aktualisiert werden' });
  }
});

/**
 * DELETE /api/tasks/:id
 * Löscht eine Task anhand der ID
 * Antwort: Liefert das gelöschte Objekt
 */
router.delete('/:id', async (req, res) => {
  try {
    
    const jsonData = await fs.promises.readFile(DATA_TASKS_PATH, 'utf8');
    const tasks = JSON.parse(jsonData);

    const idToDelete = req.params.id;

    // Task, die gelöscht werden soll finden
    const deletedTask = tasks.find(t => t.id === idToDelete);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Aufgabe nicht gefunden' });
    }

    // Neues Array ohne die gelöschte Task
    const updatedTasks = tasks.filter(t => t.id !== idToDelete);

    await fs.promises.writeFile(DATA_TASKS_PATH, JSON.stringify(updatedTasks, null, 2));

    res.json({ status: 'ok', deletedTask });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Aufgabe konnte nicht gelöscht werden' });
  }
});

export default router;
    


