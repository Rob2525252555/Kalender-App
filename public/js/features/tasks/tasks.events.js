import { postTask } from "../../api/tasks.api.js";

/**
 * @module tasks.events
 * Aufgaben:
 * - Ruft die Funktion postTask auf und übergibt Formular-Daten, um Aufgaben im Backend zu speichern.
 */

const taskEvents = {

    /**
     * Übergibt das Event an die API Funktion postTask
     * @param {SubmitEvent} e - Submit-Event des Formulars
     */
    handleSubmitTaskForm(e){
        postTask(e);    
    }
}

export default taskEvents;