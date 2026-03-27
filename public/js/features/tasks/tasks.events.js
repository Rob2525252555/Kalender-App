import { postTask } from "../../api/tasks.api.js";
import elements from "../../core/elements.js";
import { deleteTask } from "../../api/tasks.api.js";

/**
 * @module tasks.events
 * Verwaltet alle Events im Zusammenhang mit Tasks.
 * 
 * Aufgaben:
 * - Initialisiert Event Delegation für Task-Buttons (Details, Bearbeiten, Löschen)
 * - Ruft die Funktion postTask auf und übergibt Formular-Daten, um Aufgaben im Backend zu speichern
 * - Erkennt Klicks auf den Löschen-Button und ruft deleteTask auf, wobei die ID der Task übergeben wird
 */

const taskEvents = {
    /**
     * Initialisiert Event Delegation für Task-Buttons
     * Hängt einen Click-Listener an den Hauptcontainer des Kalenders,
     * um Klicks auf Task-Buttons zu erkennen.
     */
    init(){
        elements.calendarMainContainer.addEventListener('click', taskEvents.handleDeleteTask);
    },
    /**
     * Übergibt das Event an die API Funktion postTask
     * @param {SubmitEvent} e - Submit-Event des Formulars
     */
    handleSubmitTaskForm(e){
        postTask(e);    
    },
    /**
     * Überprüft ob der Löschen-Button geklickt wurde.
     * Übergibt ID der Task an API Funktion deleteTask.
     * @param {Event} e - Click-Event des Kalender-Containers
     */
    handleDeleteTask(e){
        if(e.target.dataset.action === 'deleteButton'){
           
            const taskID = e.target.dataset.id;
            deleteTask(taskID);
        }      
    }
}

export default taskEvents;