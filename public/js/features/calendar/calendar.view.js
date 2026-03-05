import dom from "../../core/dom.js";

const renderCalendar = {
    renderCalendar(){

        const NUMBER_OF_WEEKDAYS = 7;
        const NUMBER_OF_ROWS = 6;
        //Anzahl Kalender Zellen
        let counter = 0;

        const mainContainer = dom.create({
            tagName: 'div',
            id: 'mainContainer',
            classList: ['mainContainer'],
            parent: document.body
        })

        //Header------------------------------------------

        const header = dom.create({
            tagName: 'header',
            id: 'header',
            parent: mainContainer
        })

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

        //Kalender Main container---------------

        const calendarMainContainer = dom.create({
            tagName: 'div',
            id: 'calendarMainContainer',
            classList: ['calendarMainContainer'],
            parent: mainContainer
        })

        // kalender Wochentage--------------------------------
        const weekdayRowContainer = dom.create({
            tagName: 'div',
            id: 'weekdayRowContainer',
            classList: ['weekdaysRowContainer'],
            parent: calendarMainContainer
        })

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

       //Kalender Zellen-----------------------------------------------------
        for (let i = 0; i < NUMBER_OF_ROWS; i++) {
            
            const calendarRowContainer = dom.create({
                tagName: 'div',
                id: `calendarRowContainer${i}`,
                classList: ['calendarRowContainer'],
                parent: calendarMainContainer
            })

            for (let j = 0; j < NUMBER_OF_WEEKDAYS; j++) {
                
                counter++;
                
                const calendarCells = dom.create({
                    tagName: 'div',
                    id: `calendarCells${counter}`,
                    classList: ['calendarCellsContainer'],
                    parent: calendarRowContainer
                })
                
                const dayNumberContainer = dom.create({
                    tagName: 'div',
                    id: `dayNumbers${counter}`,
                    innerText: counter,
                    classList: ['dayNumbers'],
                    parent: calendarCells
                })
            }
            
        }

        // Footer-----------------------------------------------------------

        const footer = dom.create({
            tagName: 'footer',
            id: 'footer',
            parent: mainContainer
        })

        const footerContainer = dom.create({
            tagName: 'div',
            id: 'footerContainer',
            classList: ['footerContainer'],
            parent: footer
        })

        const footerTexts = ['Impressum', 'Kontakt', 'Datenschutz'];

        for (let i = 0; i < 3; i++) {

            const innerFooterContainer = dom.create({
            tagName: 'div',
            id: `innerFooterContainer${i}`,
            innerText: footerTexts[i],
            classList: ['innerFooterContainer'],
            parent: footerContainer
        })   
        }
    } 
};

export default renderCalendar;