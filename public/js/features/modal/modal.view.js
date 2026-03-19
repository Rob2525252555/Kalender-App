import dom from "../../core/dom.js";
import elements from "../../core/elements.js";

 const createModal = {

    createModal(){
   
    const modalOverlay = dom.create({
        classList: ["modal-overlay"],
        parent: document.body
    });

    const modal = dom.create({
        classList: ["modal-container"],
        parent: modalOverlay
    });

    const overlayCloseButton = dom.create({
        tagName: "button",
        innerText: "×",
        classList: ["modal-close"],
        parent: modal
    });

    // Elemente in elements speichern
    elements.modalOverlay = modalOverlay;
    elements.overlayCloseButton = overlayCloseButton;
    }
}

export default createModal;