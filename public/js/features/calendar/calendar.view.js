import dom from "../../core/dom.js";
import elements from "../../core/elements.js"
import dates from "../../utils/dates.js";

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

export function renderCalendar(){
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

         // Text der Footerlinks
        const footerTexts = ['Impressum', 'Kontakt', 'Datenschutz'];

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
            parent: mainContainer
        });

        /** Container für Navigationsbuttons und Monat/Jahr Anzeige */
        const headerContainer = dom.create({
            tagName: 'div',
            classList: ['headerContainer'],
            parent: header
        });

        const btnArrowLeft = dom.create({
            tagName: 'button',
            innerText: '◀',
            classList: ['prevMonth'],
            parent: headerContainer
        });

        const monthAndTaskContainer = dom.create({
            tagName: 'div',
            classList: ['monthAndTaskContainer'],
            parent: headerContainer
        });

        const btnArrowRight = dom.create({
            tagName: 'button',
            innerText: '▶',
            classList: ['nextMonth'],
            parent: headerContainer
        });

        const currentMonthAndYear = dom.create({
            tagName: 'div',
            classList: ['currentMonthAndYear'],
            innerText: 'Monat Jahr',
            parent: monthAndTaskContainer
        });

        const addTaskContainer = dom.create({
            tagName: 'div',
            classList: ['addTaskContainer'],
            parent:monthAndTaskContainer
        });

        const addTaskButton =dom.create({
            tagName: 'button',
            classList: ['addTaskButton'],
            innerText: '+ Neue Aufgabe hinzufügen',
            parent: addTaskContainer
        });

        // ----------------------------------------
        // Hauptcontainer für den Kalenderbereich
        // ----------------------------------------

        const calendarMainContainer = dom.create({
            tagName: 'div',
            classList: ['calendarMainContainer'],
            parent: mainContainer
        });

        // ----------------------------------------
        // Kalender Wochentage (Montag - Sonntag)
        // ----------------------------------------

        /**Container für die Reihe der Wochentage (Montag-Sonntag) */
        const weekdayRowContainer = dom.create({
            tagName: 'div',
            classList: ['weekdaysRowContainer'],
            parent: calendarMainContainer
        });

        // Zellen für die Wochentage und Textinhalt 
        for (let i = 0; i < NUMBER_OF_WEEKDAYS; i++) {

            const weekdayCellsContainer = dom.create({
                tagName: 'div',
                classList: ['weekdaysCellsContainer'],
                parent: weekdayRowContainer
            });

            dom.create({
                tagName:'div',
                classList: ['weekdayText'],
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
                classList: ['calendarRowContainer'],
                parent: calendarMainContainer
            });

            // 7 Zellen pro Reihe
            for (let j = 0; j < NUMBER_OF_WEEKDAYS; j++) {
                
                /** Einzelne Kalenderzelle */
                const calendarCells = dom.create({
                    tagName: 'div',
                    classList: ['calendarCellsContainer'],
                    parent: calendarRowContainer
                });
                
                /** Container für Tageszahl */
                const dayNumberContainer = dom.create({
                    tagName: 'div',
                    classList: ['dayNumbers'],
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
            parent: mainContainer
        });

        /**Container für die Footerlinks */
        const footerContainer = dom.create({
            tagName: 'div',
            classList: ['footerContainer'],
            parent: footer
        });

        /**Erzeugen der Footerlinks */
        for (let i = 0; i < footerTexts.length; i++) {

            dom.create({
            tagName: 'div',
            innerText: footerTexts[i],
            classList: ['innerFooterContainer'],
            parent: footerContainer
            });  
        }

        // ----------------------------------------
        // Wichtige DOM-Referenzen speichern 
        // ----------------------------------------
        elements.btnArrowLeft = btnArrowLeft;
        elements.btnArrowRight = btnArrowRight;
        elements.currentMonthAndYear = currentMonthAndYear;
        elements.calendarMainContainer = calendarMainContainer;
        elements.addTaskButton = addTaskButton;
    };


