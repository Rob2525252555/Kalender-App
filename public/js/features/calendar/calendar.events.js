import elements from "../../core/elements.js";
import state from "../../core/state.js";
import calendarLogic from "./calendar.logic.js";

const calendarEvents = {

    init(){
        elements.btnArrowLeft.addEventListener('click', () => calendarEvents.lastMonth());
        elements.btnArrowRight.addEventListener('click', () => calendarEvents.nextMonth());
    },   
    nextMonth(){
        if (state.selectedMonth === 11) {
            state.selectedYear = state.selectedYear +1;
            state.selectedMonth = 0;
            calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);

        } else{
            state.selectedMonth = state.selectedMonth +1;
            calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);
        }
        
    },
    lastMonth(){
        if(state.selectedMonth === 0){
            state.selectedYear = state.selectedYear - 1;
            state.selectedMonth = 11;
            calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);
        } else{
            state.selectedMonth = state.selectedMonth - 1;
            calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);
        }
    }
}

export default calendarEvents;