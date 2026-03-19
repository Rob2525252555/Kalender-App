import elements from "../../core/elements.js";

const modalEvents = {

    init(){  
        elements.addTaskButton.addEventListener('click', modalEvents.openModal);
        elements.overlayCloseButton.addEventListener('click', modalEvents.closeModal);
        elements.modalOverlay.addEventListener('click', modalEvents.handleOverlayClick);
        document.addEventListener('keydown', modalEvents.handleOverlayEsc);
    },
    openModal(){
        elements.modalOverlay.classList.add('modal--active');
    },

    closeModal(){
        elements.modalOverlay.classList.remove('modal--active');
    },
    handleOverlayClick(e){
        if(e.target === elements.modalOverlay){
            modalEvents.closeModal();
        }
    },
    handleOverlayEsc(e){
        if(e.key === 'Escape' && elements.modalOverlay.classList.contains('modal--active')){
            modalEvents.closeModal();
        }
    }
}

export default modalEvents;