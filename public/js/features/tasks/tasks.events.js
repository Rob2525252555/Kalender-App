import { postTask, deleteTask, updateTask } from "../../api/tasks.api.js";
import elements from "../../core/elements.js";
import modalEvents from "../modal/modal.events.js";
import { createTaskForm } from "./tasks.form.js";
import state from "../../core/state.js";
import { createTaskDetailsView } from "./tasks.details.view.js";

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
        elements.addTaskButton.addEventListener('click', taskEvents.handleAddTask);
    },
    /**
     * Öffnet das Modal.
     * Rendert Formular um Aufgaben hinzuzufügen.
     * Ruft beim Submit des Formulars die API Funktion postTask auf, um die Aufgabe zu speichern.
     * Submit Listener wird nur einmal ausgeführt {once: true}.
     */
    handleAddTask(){
        modalEvents.openModal();
        createTaskForm();
        elements.formSubmitButton.innerText = 'Aufgabe erstellen';
        elements.taskForm.addEventListener('submit', postTask, {once: true});
    },
    /**
     * Bereitet alles zum Ändern einer Task vor.
     * Ablauf:
     * - Modal öffnen und Formular darin rendern
     * - Text auf Submit-Button anpassen
     * - Die zugehörige Task anhand der ID im State finden
     * - Die aktuellen Werte der Task ins Formular eintragen
     * - Die ID der Task im Formular speichern als Dataset-Attribut
     * - Dem Formular Submit-Eventlistener anhängen, um die Funktion zum Ändern 
     *   der Task aufzurufen
     * @param {string} taskID - ID der betroffenen Task
     */
    handleEditTask(taskID){
        modalEvents.openModal();
        createTaskForm();

        elements.formSubmitButton.innerText = 'Aufgabe ändern';
                
        const task = state.tasks.find(task => task.id === taskID);
        elements.taskForm.title.value = task.title;
        elements.taskForm.employee.value = task.employee;
        elements.taskForm.startDate.value = task.startDate;
        elements.taskForm.endDate.value = task.endDate;
        elements.taskForm.description.value = task.description;

        elements.taskForm.dataset.id = taskID;
        elements.taskForm.addEventListener('submit', updateTask, {once: true});
    },
    /**
     * Ruft die Detailansicht einer Task auf und initialisert die zugehörigen Buttons.
     * Ablauf:
     * - Task anhand der ID im State finden
     * - Modal öffnen
     * - Die Detailansicht der Task rendern
     * - Event-Listener für Bearbeiten-Button hinzufügen
     * - Event-Listener für Löschen-Button hinzufügen
     * - Event-Listener für zurück-Button anhängen
     * @param {string} taskID - ID der Task, deren Details angezeigt werden
     */
    handleDetailsTask(taskID){
        const task = state.tasks.find(task => task.id === taskID);
        
        modalEvents.openModal();
        createTaskDetailsView(task);
        elements.taskDetailsViewEditButton.addEventListener('click', () => taskEvents.handleEditTask(taskID));
        elements.taskDetailsViewDeleteButton.addEventListener('click', async () => {
            await deleteTask(taskID);
            modalEvents.closeModal();
        });
        elements.taskDetailsViewBackButton.addEventListener('click', modalEvents.closeModal);      
    },
    /**
     * Überprüft ob und welcher Task-Button (Details, Bearbeiten, Löschen) geklickt wurde.
     * Liest dann die Task-ID aus dem Button aus und ruft die zugehörige Funktion auf.
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
                taskEvents.handleEditTask(taskID);
                break;
            case 'detailsButton':
                taskEvents.handleDetailsTask(taskID);
                break;
        }   
    }
};

export default taskEvents;