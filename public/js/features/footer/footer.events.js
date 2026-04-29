import elements from "../../core/elements.js";
import modalEvents from "../modal/modal.events.js";
import footerContent from "./footer.content.js";
import { renderImpressum } from "./views/impressum.view.js";
import { renderKontakt } from "./views/kontakt.view.js";
import { renderDatenschutz } from "./views/datenschutz.view.js";

/**
 * @module footer.events
 * Eventhandler für Klicks auf Footer-Buttons.
 * - Initialisiert Eventdelegation für die Footer-Buttons
 * - Ruft jeweilige Handlefunktion zum rendern der Anzeige im Modal auf
 */

const footerEvents = {
    /**
     * Initialisiert Eventdelegation für den Footer-Container
     */
    init() {
        elements.footerContent.addEventListener('click', footerEvents.handleFooterButtonClick);
    },
    /**
     * Öffnet Modal und rendert die Anzeige für das Impressum darin.
     */
    handleImpressum() {
        modalEvents.openModal();
        renderImpressum(footerContent.impressum);
    },
    /**
     * Öffnet das Modal und rendert die Anzeige für die Kontaktdaten darin.
     */
    handleKontakt() {
        modalEvents.openModal();
        renderKontakt(footerContent.kontakt);
    },
    /**
     * Öffnet das Modal und rendert die Anzeige für den Datenschutz darin.
     */
    handleDatenschutz() {
        modalEvents.openModal();
        renderDatenschutz(footerContent.datenschutz);
    },
    /**
     * Eventdelegation für die Footer-Buttons:
     * - Bei Klick auf einen Button wird die passende Handlerfunktion aufgerufen
     * @param {Event} e - Click-Event des Footer-Containers
     */
    handleFooterButtonClick(e) {

        const button = e.target.closest('button');
        if (!button) return;

        const action = button.dataset.action;

        switch (action) {
            case 'impressum':
                footerEvents.handleImpressum();

                break;
            case 'kontakt':
                footerEvents.handleKontakt();

                break;

            case 'datenschutz':
                footerEvents.handleDatenschutz();

                break;
        }
    }
}

export default footerEvents;