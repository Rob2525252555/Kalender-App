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

    /**
     * Erstellt das Modal mit Overlay und Close-Button und
     *  speichert die Referenzen in elements
     */
   export function createModal(){
   
    const modalOverlay = dom.create({
        classList: ["modal-overlay"],
        parent: document.body
    });

    const modalContent = dom.create({
        classList: ["modal-container"],
        parent: modalOverlay
    });

    const overlayCloseButton = dom.create({
        tagName: "button",
        innerText: "×",
        classList: ["modal-close"],
        parent: modalContent
    });

    // Overlay, Modal und Close-Button in elements speichern
    elements.modalOverlay = modalOverlay;
    elements.overlayCloseButton = overlayCloseButton;
    elements.modalContent = modalContent;
    }


