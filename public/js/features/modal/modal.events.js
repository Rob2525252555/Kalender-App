import elements from "../../core/elements.js";
/**
 * @module modal.events
 * Modul zum Anzeigen oder Verbergen des Overlays mit Modal.
 * Aufgaben:
 * - Modal anzeigen
 * - Modal verbergen bei Klick auf Close-Button, Klick auf das Overlay oder Drücken der Esc-Taste
 */

const modalEvents = {

    /**
     * Initialisiert alle Eventlistener für das Modal
     */
    init(){  
        elements.overlayCloseButton.addEventListener('click', modalEvents.closeModal);
        elements.modalOverlay.addEventListener('click', modalEvents.handleOverlayClick);
        document.addEventListener('keydown', modalEvents.handleOverlayEsc);
    },
    /**
     * Modal anzeigen 
     * Ablauf:
     * - Overlay und Modal sichtbar machen (CSS- Klasse setzen)
     * - Vorhandener Inhalt des Modals entfernen
     */
    openModal(){
        elements.modalOverlay.classList.add('modal--active');
        elements.modalContent.innerHTML = '';
        elements.modalContent.append(elements.overlayCloseButton);
    },
    /**
     * Modal verbergen
     * Ablauf: 
     * - Modal verbergen
     * - Vorhandener Inhalt des Modals entfernen
     * - Referenz des Formulars entfernen
     */
    closeModal(){
        elements.modalOverlay.classList.remove('modal--active');
        elements.modalContent.innerHTML = '';
        elements.taskForm = null;
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
     * Modal verbergen beim Drücken der Taste Esc
     * @param {Event} e - Tastatur-Event 
     */
    handleOverlayEsc(e){
        if(e.key === 'Escape' && elements.modalOverlay.classList.contains('modal--active')){
            modalEvents.closeModal();
        }
    }
}

export default modalEvents;