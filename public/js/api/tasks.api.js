import state from "../core/state.js";
import tasksLogic from "../features/tasks/tasks.logic.js";
import elements from "../core/elements.js";

const BASE_URL = '/api/tasks';

/**
 * Lädt alle Tasks aus dem Backend
 * Ablauf:
 * - gib Array mit Task-Objekten zurück 
 * - Bei Fehler leeres Array
 * @returns {Promise<Object[]>} - Promise, das Array von Task-Objekten auflöst
 */
export async function fetchTasks(){
    try{
        const res = await fetch(BASE_URL);
        
        if(!res.ok)throw new Error(`Fehler beim laden der Tasks ${res.status}`);
        const data = await res.json();
        
        return data;
    }catch(err){
        console.error('Fehler beim laden der Tasks', err);
        return [];
    }
}

/**
 * Speichert eine neue Task im Backend und aktualisiert den State und UI.
 * Ablauf:
 * - Daten aus dem Formular extrahieren und in Objekt umwandeln
 * - Daten in Json umwandeln und im Backend speichern
 * - Als Bestätigung das gespeicherte Objekt zurück geben lassen
 * - State aktualisieren 
 * - Tasks neu rendern
 * @param {SubmitEvent} e - Submit-Event des Formulars
 */
export async function postTask(e){
    e.preventDefault();
    
    const form = e.target;

    // Einträge aus Formular in Objekt umwandeln
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try{
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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
    }
    catch(err){
        console.error('Fehler beim Speichern der Aufgabe: ', err);
    }    
}
/**
 * Löscht eine Task aus dem Backend und aktualisiert State und UI.
 * Ablauf:
 * - Task wird im Backend gelöscht anhand der ID
 * - Task wird aus dem State gelöscht
 * - Task-Element Wird aus der UI gelöscht
 * - Referenz der Task wird aus elements.tasksElements entfernt
 * @param {string} taskID - ID der Task, die gelöscht wird 
 */
export async function deleteTask(taskID){
    try{
        const res = await fetch(`${BASE_URL}/${taskID}`, {method: 'DELETE'});
        if(!res.ok){
            const error = await res.json();
            throw new Error(error.error || 'Task konnte im Backend nicht gelöscht werden');
        }
        // aus State löschen    
        state.tasks = state.tasks.filter(task => task.id !== taskID);
        
        // aus UI und Referenz löschen
        const taskElementsToRemove = elements.tasksElements.filter(el => el.id === taskID);
        
        taskElementsToRemove.forEach(el => {
            el.container.remove(); 
        });

        elements.tasksElements = elements.tasksElements.filter(el => el.id !== taskID);
    }
    catch(err){
        console.error('Fehler beim Löschen der Aufgabe: ', err)
    }  
}