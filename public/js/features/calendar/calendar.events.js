import elements from "../../core/elements.js";
import state from "../../core/state.js";
import calendarLogic from "./calendar.logic.js";
import tasksLogic from "../tasks/tasks.logic.js";

/**
 * @module calendar.events
 * Modul für die Monatsnavigation.
 * 
 * - Navigationsbuttons bekommen Eventlistener angehängt 
 * - Funktionen für Vorwärts- und Rückwärtsnavigation werden implementiert
 */

const calendarEvents = {
    /**
     * Initialisiert die Eventlistener für Navigationsbuttons.
     */
    init(){
        elements.btnArrowLeft.addEventListener('click', () => calendarEvents.lastMonth());
        elements.btnArrowRight.addEventListener('click', () => calendarEvents.nextMonth());
    },
    /**
     * Navigation zum nächsten Monat. Falls Dezember, Jahr wird um 1 erhöht und Monat auf Januar gesetzt.
     * Anschließend wird Renderfunktion mit neuen Werten für Jahr und Monat aufgerufen.
     */   
    nextMonth(){
        if (state.selectedMonth === 11) {
            state.selectedYear = state.selectedYear +1;
            state.selectedMonth = 0;
            calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);
            tasksLogic.renderTasks();
        } else{
            state.selectedMonth = state.selectedMonth +1;
            calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);
            tasksLogic.renderTasks();
        }      
    },
    /**
     * Navigation zum letzten Monat. Falls Januar, Jahr wird um 1 verringert und Monat auf Dezember gesetzt.
     * Anschließend wird Renderfunktion mit neuen Werten für Jahr und Monat aufgerufen.
     */
    lastMonth(){
        if(state.selectedMonth === 0){
            state.selectedYear = state.selectedYear - 1;
            state.selectedMonth = 11;
            calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);
            tasksLogic.renderTasks();
        } else{
            state.selectedMonth = state.selectedMonth - 1;
            calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);
            tasksLogic.renderTasks();
        }
    }
}

export default calendarEvents;