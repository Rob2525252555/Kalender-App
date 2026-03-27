import { postTask } from "../../api/tasks.api.js";
import elements from "../../core/elements.js";
import { deleteTask } from "../../api/tasks.api.js";

/**
 * @module tasks.events
 * Aufgaben:
 * - Ruft die Funktion postTask auf und übergibt Formular-Daten, um Aufgaben im Backend zu speichern.
 */

const taskEvents = {
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

    handleDeleteTask(e){
        if(e.target.dataset.action === 'deleteButton'){
           
            const taskID = e.target.dataset.id;
            deleteTask(taskID);
        }      
    }
}

export default taskEvents;