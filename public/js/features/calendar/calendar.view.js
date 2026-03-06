import dom from "../../core/dom.js";
import elements from "../../core/elements.js"

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

const renderCalendar = {
    renderCalendar(){
        /**
         * Aufbau: 
         * Hauptcontainer
         * Header (Monatsnavigation)
         * Wochentage
         * Kalenderzellen (6 Reihen mit jeweils 7 Tagen)
         * Footer
         */

        const NUMBER_OF_WEEKDAYS = 7;
        const NUMBER_OF_ROWS = 6;

         // Text der Footerlinks
        const footerTexts = ['Impressum', 'Kontakt', 'Datenschutz'];

        // Zähler für Kalender-Zellen
        let counter = 0;

        // ----------------------------------------
        // Hauptcontainer
        // ----------------------------------------

        /**Hauptcontainer in den alles Elemente eingehängt werden*/
        const mainContainer = dom.create({
            tagName: 'div',
            id: 'mainContainer',
            classList: ['mainContainer'],
            parent: document.body
        })

        // ----------------------------------------
        // Header mit Monatsnavigation
        // ----------------------------------------

        const header = dom.create({
            tagName: 'header',
            id: 'header',
            parent: mainContainer
        })

        /** Container für Navigationsbuttons und Monat/Jahr Anzeige */
        const headerContainer = dom.create({
            tagName: 'div',
            id: 'headerContainer',
            classList: ['headerContainer'],
            parent: header
        })

        const btnArrowLeft = dom.create({
            tagName: 'button',
            id: 'btnArrowLeft',
            innerText: '◀',
            classList: ['innerHeaderContainer', 'prevMonth'],
            parent: headerContainer
        })

        const currentMonthAndYear = dom.create({
            tagName: 'div',
            id: 'innerHeaderContainer',
            classList: ['innerHeaderContainer', 'currentMonthAndYear'],
            innerText: 'März 2026',
            parent: headerContainer
        })

        const btnArrowRight = dom.create({
            tagName: 'button',
            id: 'btnArrowRight',
            innerText: '▶',
            classList: ['innerHeaderContainer', 'nextMonth'],
            parent: headerContainer
        })

        // ----------------------------------------
        // Hauptcontainer für den Kalenderbereich
        // ----------------------------------------

        const calendarMainContainer = dom.create({
            tagName: 'div',
            id: 'calendarMainContainer',
            classList: ['calendarMainContainer'],
            parent: mainContainer
        })

        // ----------------------------------------
        // Kalender Wochentage (Montag - Sonntag)
        // ----------------------------------------

        /**Container für die Reihe der Wochentage (Montag-Sonntag) */
        const weekdayRowContainer = dom.create({
            tagName: 'div',
            id: 'weekdayRowContainer',
            classList: ['weekdaysRowContainer'],
            parent: calendarMainContainer
        })

        /**Zellen für die Wochentage und Textinhalt */
        for (let i = 0; i < NUMBER_OF_WEEKDAYS; i++) {

            const weekdayCellsContainer = dom.create({
                tagName: 'div',
                id: `weekdayCellsContainer${i}`,
                classList: ['weekdaysCellsContainer'],
                parent: weekdayRowContainer
            })

            const weekdayText = dom.create({
                tagName:'div',
                id:`weekdayText${i}`,
                classList: ['weekdayText'],
                innerText: 'Wochentag',
                parent: weekdayCellsContainer
            })
        }

        // ----------------------------------------
        //Kalender Zellen
        // ----------------------------------------

        // 6 Reihen
        for (let i = 0; i < NUMBER_OF_ROWS; i++) {
            
            /**Container für die Kalenderzellen pro Reihe */
            const calendarRowContainer = dom.create({
                tagName: 'div',
                id: `calendarRowContainer${i}`,
                classList: ['calendarRowContainer'],
                parent: calendarMainContainer
            })

            // 7 Zellen pro Reihe
            for (let j = 0; j < NUMBER_OF_WEEKDAYS; j++) {
                
                // Zähler für Kalenderzellen
                counter++;
                
                /** Einzelne Kalenderzelle */
                const calendarCells = dom.create({
                    tagName: 'div',
                    id: `calendarCells${counter}`,
                    classList: ['calendarCellsContainer'],
                    parent: calendarRowContainer
                })
                
                /** Container für Tageszahl */
                const dayNumberContainer = dom.create({
                    tagName: 'div',
                    id: `dayNumbers${counter}`,
                    innerText: counter,
                    classList: ['dayNumbers'],
                    parent: calendarCells
                })

                /** Referenzen der Kalenderzellen und der Tagezahl in elements.js speichern */
                elements.calendarCells.push(calendarCells);
                elements.dayNumberContainer.push(dayNumberContainer);


            }
            
        }
        // ----------------------------------------
        // Footer
        // ----------------------------------------

        const footer = dom.create({
            tagName: 'footer',
            id: 'footer',
            parent: mainContainer
        })

        /**Container für die Footerlinks */
        const footerContainer = dom.create({
            tagName: 'div',
            id: 'footerContainer',
            classList: ['footerContainer'],
            parent: footer
        })

       

        /**Erzeugen der Footerlinks */
        for (let i = 0; i < footerTexts.length; i++) {

            const innerFooterContainer = dom.create({
            tagName: 'div',
            id: `innerFooterContainer${i}`,
            innerText: footerTexts[i],
            classList: ['innerFooterContainer'],
            parent: footerContainer
        })   
        }

        // ----------------------------------------
        // Wichtige DOM-Referenzen speichern 
        // ----------------------------------------
        elements.mainContainer = mainContainer;
        elements.header = header;
        elements.btnArrowLeft = btnArrowLeft;
        elements.btnArrowRight = btnArrowRight;
        elements.currentMonthAndYear = currentMonthAndYear;
        elements.calendarMainContainer = calendarMainContainer;

    }
};

export default renderCalendar;