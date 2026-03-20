import dom from "../../core/dom.js";
import elements from "../../core/elements.js";

/**
 * @module modal.view
 * Modul zum erstellen und Anzeigen eines Modals mit Overlay und Close-Button.
 * 
 * Aufgaben:
 * - Rendert ein Overlay
 * - Rendert auf dem Overlay ein Modal
 * - Rendert ein Close-Button im Modal
 * - Speichert die Referenzen von Overlay und Close-Button
 */

 const createModal = {

    /**
     * Erstellt das Modal mit Overlay und Close-Button und
     *  speichert die Referenzen in elements
     */
    createModal(){
   
    const modalOverlay = dom.create({
        classList: ["modal-overlay"],
        parent: document.body
    });

    const formModal = dom.create({
        classList: ["modal-container"],
        parent: modalOverlay
    });

    const overlayCloseButton = dom.create({
        tagName: "button",
        innerText: "×",
        classList: ["modal-close"],
        parent: formModal
    });

    // Overlay, Modal und Close-Button in elements speichern
    elements.modalOverlay = modalOverlay;
    elements.overlayCloseButton = overlayCloseButton;
    elements.formModal = formModal;
    }
}

export default createModal;