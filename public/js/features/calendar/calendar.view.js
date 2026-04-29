import dom from "../../core/dom.js";
import elements from "../../core/elements.js"
import dates from "../../utils/dates.js";
import { FOOTER_BUTTONS } from "../footer/footer.config.js";

/**
 * @module calendar.view
 * 
 * Diese Datei rendert das Kalender-Layout
 * (Header, Wochentage, Kalenderzellen, Footer).
 * 
 * Alle wichtigen DOM-Referenzen werden im Modul `elements.js`
 * gespeichert, damit andere Module darauf zugreifen können.
 * 
 * Für das Erstellen der DOM-Elemente wird die Hilfsfunktion
 * `dom.create()` verwendet.
 */

export function renderCalendar() {
    /**
     * Aufbau: 
     * Hauptcontainer
     * Header (Monatsnavigation)
     * Wochentage
     * Kalenderzellen (6 Reihen mit jeweils 7 Tagen)
     * Footer
     */

    // Arrays für Kalenderzellen resetten
    elements.calendarCells = [];
    elements.dayNumberContainer = [];

    const NUMBER_OF_WEEKDAYS = 7;

    // Text für die Wochentage aus dates.js 
    // Array wird umstrukturiert, damit es mit Monatg beginnt, statt Sonntag
    const WEEKDAYSTEXT = [...dates.days.slice(1), dates.days[0]];

    const NUMBER_OF_ROWS = 6;

    // ----------------------------------------
    // Hauptcontainer
    // ----------------------------------------

    /**Hauptcontainer in den alles Elemente eingehängt werden*/
    const mainContainer = dom.create({
        tagName: 'div',
        classList: ['mainContainer'],
        parent: document.body
    });

    // ----------------------------------------
    // Header mit Monatsnavigation
    // ----------------------------------------

    const header = dom.create({
        tagName: 'header',
        classList: ['header'],
        parent: mainContainer
    });

    /** Container für Navigationsbuttons und Monat/Jahr Anzeige */
    const headerContainer = dom.create({
        tagName: 'div',
        classList: ['header__content'],
        parent: header
    });

    const btnArrowLeft = dom.create({
        tagName: 'button',
        innerText: '◀',
        classList: ['header__nav-button'],
        parent: headerContainer
    });

    const monthAndTaskContainer = dom.create({
        tagName: 'div',
        classList: ['header__info'],
        parent: headerContainer
    });

    const btnArrowRight = dom.create({
        tagName: 'button',
        innerText: '▶',
        classList: ['header__nav-button'],
        parent: headerContainer
    });

    const currentMonthAndYear = dom.create({
        tagName: 'div',
        classList: ['header__date'],
        innerText: 'Monat Jahr',
        parent: monthAndTaskContainer
    });

    const addTaskContainer = dom.create({
        tagName: 'div',
        classList: ['header__new-task-container'],
        parent: monthAndTaskContainer
    });

    const addTaskButton = dom.create({
        tagName: 'button',
        classList: ['header__new-task-button'],
        innerText: '+ Neue Aufgabe hinzufügen',
        parent: addTaskContainer
    });

    // ----------------------------------------
    // Hauptcontainer für den Kalenderbereich
    // ----------------------------------------

    const calendarMainContainer = dom.create({
        tagName: 'div',
        classList: ['calendar__main'],
        parent: mainContainer
    });

    // ----------------------------------------
    // Kalender Wochentage (Montag - Sonntag)
    // ----------------------------------------

    /**Container für die Reihe der Wochentage (Montag-Sonntag) */
    const weekdayRowContainer = dom.create({
        tagName: 'div',
        classList: ['calendar__weekday-row'],
        parent: calendarMainContainer
    });

    // Zellen für die Wochentage und Textinhalt 
    for (let i = 0; i < NUMBER_OF_WEEKDAYS; i++) {

        const weekdayCellsContainer = dom.create({
            tagName: 'div',
            classList: ['calendar__weekday-cell'],
            parent: weekdayRowContainer
        });

        dom.create({
            tagName: 'div',
            classList: ['calendar__weekday-text'],
            innerText: WEEKDAYSTEXT[i],
            parent: weekdayCellsContainer
        });
    }

    // ----------------------------------------
    //Kalender Zellen
    // ----------------------------------------

    // 6 Reihen
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {

        /**Container für die Kalenderzellen pro Reihe */
        const calendarRowContainer = dom.create({
            tagName: 'div',
            classList: ['calendar__row'],
            parent: calendarMainContainer
        });

        // 7 Zellen pro Reihe
        for (let j = 0; j < NUMBER_OF_WEEKDAYS; j++) {

            /** Einzelne Kalenderzelle */
            const calendarCells = dom.create({
                tagName: 'div',
                classList: ['calendar__cell'],
                parent: calendarRowContainer
            });

            /** Container für Tageszahl */
            const dayNumberContainer = dom.create({
                tagName: 'div',
                classList: ['calendar__day-number'],
                parent: calendarCells
            });

            // Referenzen der Kalenderzellen und der Container für die Tagezahlen in elements.js speichern 
            elements.calendarCells.push(calendarCells);
            elements.dayNumberContainer.push(dayNumberContainer);
        }
    }
    // ----------------------------------------
    // Footer
    // ----------------------------------------

    const footer = dom.create({
        tagName: 'footer',
        classList: ['footer'],
        parent: mainContainer
    });

    /**Container für die Footerlinks */
    const footerContent = dom.create({
        tagName: 'div',
        classList: ['footer__container'],
        parent: footer
    });

    /**Erzeugen der Footerlinks */
    for (const btn of FOOTER_BUTTONS) {

        dom.create({
            tagName: 'button',
            innerText: btn.label,
            classList: ['footer__item'],
            dataset: {
                action: btn.action
            },
            parent: footerContent
        });
    }

    // ----------------------------------------
    // Wichtige DOM-Referenzen speichern 
    // ----------------------------------------
    elements.btnArrowLeft = btnArrowLeft;
    elements.btnArrowRight = btnArrowRight;
    elements.currentMonthAndYear = currentMonthAndYear;
    elements.addTaskButton = addTaskButton;
    elements.calendarMainContainer = calendarMainContainer;   
};


