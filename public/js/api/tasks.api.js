import state from "../core/state.js";
import tasksLogic from "../features/tasks/tasks.logic.js";
import elements from "../core/elements.js";
import modalEvents from "../features/modal/modal.events.js";
import { showToast } from "../features/toast/toast.js";

const BASE_URL = '/api/tasks';

/**
 * Lädt alle Tasks aus dem Backend
 * Ablauf:
 * - gib Array mit Task-Objekten zurück 
 * - Bei Fehler leeres Array
 * @returns {Promise<Object[]>} - Promise, das Array von Task-Objekten auflöst
 */
export async function fetchTasks() {
    try {
        const res = await fetch(BASE_URL);

        if (!res.ok) throw new Error(`Fehler beim laden der Tasks ${res.status}`);
        const data = await res.json();

        return data;
    } catch (err) {
        console.error('Fehler beim laden der Tasks', err);
        return [];
    }
}
/**
 * Speichert eine neue Task im Backend und aktualisiert den State und UI.
 * Ablauf:
 * - Daten aus dem Formular extrahieren und in Objekt umwandeln
 * - Überprüfen ob Enddatum vor dem Startdatum liegt und zeige Fehlermeldung an
 * - Daten in Json umwandeln und im Backend speichern
 * - Als Bestätigung das gespeicherte Objekt zurück geben lassen
 * - State aktualisieren 
 * - Tasks neu rendern
 * - Modal schließen
 * - Toast für Erfolgs- oder Fehlermeldung anzeigen
 * @param {SubmitEvent} e - Submit-Event des Formulars
 */
export async function postTask(e) {
    e.preventDefault();

    const form = e.target;

    // Einträge aus Formular in Objekt umwandeln
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (new Date(data.startDate) > new Date(data.endDate)) {
        showToast('Das Enddatum darf nicht vor dem Startdatum liegen', 'error');
        return;
    }

    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error);
        }

        const result = await res.json();

        form.reset();

        state.tasks.push(result);

        tasksLogic.renderTasks();
        modalEvents.closeModal();

        showToast('Aufgabe erfolgreich erstellt', 'success');
    }
    catch (err) {
        console.error('Fehler beim Speichern der Aufgabe: ', err);
        showToast('Fehler beim Erstellen der Aufgabe', 'error');

    }
}
/**
 * Ändert eine vorhandene Task im Backend und aktualisiert die UI.
 * Ablauf:
 * - Einträge des Formulars auslesen und in Objekt umwandeln
 * - Überprüfen ob Enddatum vor dem Startdatum liegt und zeige Fehlermeldung an
 * - ID der zugehörigen Task aus dem Formular auslesen
 * - API-Call durchführen um Task im Backend zu ändern
 * - Aktualisierte Task vom Backend erhalten und den State damit aktualisieren
 * - Task (Startdatum und Enddatum) aus dem DOM entfernen
 * - Task neu rendern und Modal schließen
 * - Toast für Erfolgs- oder Fehlermeldung anzeigen
 * @param {SubmitEvent} e - Submit-Event des Formulars
 */
export async function updateTask(e) {
    try {
        e.preventDefault();

        const form = e.target;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (new Date(data.startDate) > new Date(data.endDate)) {
            showToast('Das Enddatum darf nicht vor dem Startdatum liegen', 'error');
            return;
        }

        const taskID = form.dataset.id;

        const res = await fetch(`${BASE_URL}/${taskID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error);
        }

        const updatedTask = await res.json();

        // finde Task anhand der ID und ersetze sie 
        state.tasks = state.tasks.map(task => task.id === taskID ? updatedTask : task);
        // Task aus DOM entfernen
        const taskElementsToRemove = document.querySelectorAll(`[data-task-id = "${taskID}"]`);
        taskElementsToRemove.forEach(el => el.remove());
        
        tasksLogic.renderSingleTask(updatedTask);

        modalEvents.closeModal();
        showToast('Aufgabe erfolgreich geändert', 'success');
    } catch (err) {
        console.error('Fehler beim Ändern der Aufgabe: ', err);
        showToast('Fehler beim Ändern der Aufgabe', 'error');
    }
}
/**
 * Löscht eine Task aus dem Backend und aktualisiert State und UI.
 * Ablauf:
 * - Task wird im Backend gelöscht anhand der ID
 * - Task wird aus dem State gelöscht
 * - Task-Element Wird aus dem DOM gelöscht
 * - Toast für Erfolgs- oder Fehlermeldung anzeigen
 * @param {string} taskID - ID der Task, die gelöscht wird 
 */
export async function deleteTask(taskID) {
    try {
        const res = await fetch(`${BASE_URL}/${taskID}`, { method: 'DELETE' });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Task konnte im Backend nicht gelöscht werden');
        }

        // aus State entfernen    
        state.tasks = state.tasks.filter(task => task.id !== taskID);

        // aus DOM entfernen
        const taskElementsToRemove = document.querySelectorAll(`[data-task-id = "${taskID}"]`);
        taskElementsToRemove.forEach(el => el.remove());
        
        showToast('Aufgabe erfolgreich gelöscht', 'success');
    }
    catch (err) {
        console.error('Fehler beim Löschen der Aufgabe: ', err)
        showToast('Fehler beim Löschen der Aufgabe', 'error');
    }
}