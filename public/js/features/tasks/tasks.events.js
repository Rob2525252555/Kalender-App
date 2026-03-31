import { postTask } from "../../api/tasks.api.js";
import elements from "../../core/elements.js";
import { deleteTask } from "../../api/tasks.api.js";
import modalEvents from "../modal/modal.events.js";
import { createTaskForm } from "./tasks.form.js";

/**
 * @module tasks.events
 * Verwaltet alle Events im Zusammenhang mit Tasks.
 * 
 * Aufgaben:
 * - Initialisiert Event Delegation für Task-Buttons (Details, Bearbeiten, Löschen)
 * - Fügt dem '+ Aufgabe hinzufügen'- Button einen Eventlistener hinzu
 * - Callback Funktion für '+ Aufgabe hinzufügen'- Button wird definiert
 * - Erkennt Klicks auf Task-Buttons (Details, Bearbeiten, Löschen), 
 *   ruft dann die passende Funktion auf und übergibt die ID der Task
 */

const taskEvents = {
    /**
     * Initialisiert Event Delegation für Task-Buttons.
     * Hängt einen Click-Listener an den Kalender-Container,
     * um Klicks auf Task-Buttons zu erkennen.
     */
    init(){
        elements.calendarMainContainer.addEventListener('click', taskEvents.handleTaskButtonsClick);
        elements.addTaskButton.addEventListener('click', taskEvents.handleAddTaskButton);
    },
    /**
     * Öffnet das Modal.
     * Rendert Formular um Aufgaben hinzuzufügen.
     * Ruft beim Submit des Formulars die API Funktion postTask auf, um die Aufgabe zu speichern.
     * Submit Listener wird nur einmal ausgeführt {once: true}.
     */
    handleAddTaskButton(){
        modalEvents.openModal();
        createTaskForm();
        elements.taskForm.addEventListener('submit', postTask, {once: true});
    },
    /**
     * Überprüft ob und welcher Task-Button (Details, Bearbeiten, Löschen) geklickt wurde.
     * Wenn ja, ruft die passende Funktion auf.
     * Übergibt ID der Task an die jeweilige Funktion.
     * @param {Event} e - Click-Event des Kalender-Containers
     */
    handleTaskButtonsClick(e){
        // Bei Klick auf Elemente innerhalb des Buttons wird der Button geklickt.
        const button = e.target.closest('button');  
        if (!button) return;

        const action = button.dataset.action;
        const taskID = button.dataset.id;

        switch(action){
            case 'deleteButton':
                deleteTask(taskID);
                break;
            case 'editButton':
                //platzhalter für Edit Funktion
                console.log('edit button geklickt');
                break;
            case 'detailsButton':
                //platzhalter für Details Funktion
                console.log('detailsButton geklickt');
                break;
        }   
    }
}

export default taskEvents;