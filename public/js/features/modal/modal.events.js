import elements from "../../core/elements.js";
import createTaskForm from "../tasks/tasks.form.js";
import taskEvents from "../tasks/tasks.events.js";
/**
 * @module modal.events
 * Modul zum Anzeigen oder Verbergen des Overlays mit Modal.
 * Aufgaben:
 * - Overlay mit Modal anzeigen nach Klick auf "+ Aufgabe hinzufügen" -Button
 * - Modal verbergen bei Klick auf Close-Button, Klick auf das Overlay oder Drücken der Esc-Taste
 * - Rendern des Aufgabenformulars
 * - Dem Aufgabenformular einen Submit-Eventlistener anhängen zum Speichern von Aufgaben
 */

const modalEvents = {

    /**
     * Initialisiert alle Eventlistener für das Modal
     */
    init(){  
        elements.addTaskButton.addEventListener('click', modalEvents.openModal);
        elements.overlayCloseButton.addEventListener('click', modalEvents.closeModal);
        elements.modalOverlay.addEventListener('click', modalEvents.handleOverlayClick);
        document.addEventListener('keydown', modalEvents.handleOverlayEsc);
    },
    /**
     * Modal anzeigen und Aufgabenformular rendern
     * Ablauf:
     * - Overlay und Modal sichtbar machen
     * - Vorhandenes Formular entfernen
     * - Neues Formular rendern
     * - Hängt dem neuem Formular einen Submit-Eventlistener für das Speichern von Aufgaben an
     */
    openModal(){
        elements.modalOverlay.classList.add('modal--active');
        elements.formModal.innerHTML = '';
        createTaskForm.createTaskForm();
        elements.taskForm.addEventListener('submit', taskEvents.handleSubmitTaskForm);   
    },
    /**
     * Modal verbergen
     */
    closeModal(){
        elements.modalOverlay.classList.remove('modal--active');
    },
    /**
     * Modal verbergen bei Klick auf das Overlay 
     * @param {Event} e - Klick-Event
     */
    handleOverlayClick(e){
        if(e.target === elements.modalOverlay){
            modalEvents.closeModal();
        }
    },
    /**
     * Modal verbergen bei drücken der Taste Esc
     * @param {Event} e - Tastatur-Event 
     */
    handleOverlayEsc(e){
        if(e.key === 'Escape' && elements.modalOverlay.classList.contains('modal--active')){
            modalEvents.closeModal();
        }
    }
}

export default modalEvents;