import elements from "../../core/elements.js";
/**
 * @module modal.events
 * Modul zum Anzeigen oder Verbergen des Overlays mit Modal.
 * Aufgaben:
 * - Overlay mit Modal anzeigen, nach Klick auf "+ Aufgabe hinzufügen"- Button
 * - Modal verbergen bei Klick auf Close-Button, Klick auf das Overlay oder Drücken der Esc-Taste
 */

const modalEvents = {

    /**
     * Initialisiere alle Eventlistener für das Modal
     */
    init(){  
        elements.addTaskButton.addEventListener('click', modalEvents.openModal);
        elements.overlayCloseButton.addEventListener('click', modalEvents.closeModal);
        elements.modalOverlay.addEventListener('click', modalEvents.handleOverlayClick);
        document.addEventListener('keydown', modalEvents.handleOverlayEsc);
    },
    /**
     * Modal anzeigen
     */
    openModal(){
        elements.modalOverlay.classList.add('modal--active');
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