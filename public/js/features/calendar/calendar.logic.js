import elements from "../../core/elements.js";
import dates from "../../utils/dates.js";

const calendarLogic = {
    
    renderThisMonth(year, month){

        calendarLogic.resetCalendar();

        calendarLogic.updateHeader(year,month);

        calendarLogic.setupCalendarCells(year, month);  
    },
    resetCalendar(){
        // Klassen resetten
        for (let cell of elements.calendarCells) {
            cell.classList.remove('greyCell', 'currentDay');
        }

        for (let day of elements.dayNumberContainer) {
            day.innerText = '';
        }

    },
    updateHeader(year,month){
        elements.currentMonthAndYear.innerText = `${dates.months[month]} ${year}`;
    },
    setupCalendarCells(year,month){

        

        // Arrays um verschiedene Kalenderzellen zu speichern
        let greyCellsLastMonth = [];
        let greyCellsNextMonth = [];
        let cellsThisMonth = [];

        // Anzahl Zellen letzten Monat
        let numGreyCellsLastMonth = dates.getNumGreyCellsLastMonth(year, month); 

        // Anzahl Tage diesen Monat
        let numDaysThisMonth = dates.getDaysThisMonth(year,month);

        // Alle Klenderzellen aus elements holen
        let allCalendarCells = elements.calendarCells;

        // Alle dayNumber Zellen aus elements holen
        let dayNumberCells = elements.dayNumberContainer;

        // Kalenderzellen des letzten Monats speichern und Hintergrund grau färben
        for (let i = 0; i < numGreyCellsLastMonth; i++) {
            greyCellsLastMonth.push(allCalendarCells[i]);
            allCalendarCells[i].classList.add('greyCell');  
        }

        // Kalenderzellen und Tageszahlen von diesem Monat speichern
        // Die Tageszahlen werden direkt eingefügt
        for (let i = numGreyCellsLastMonth; i < (numGreyCellsLastMonth + numDaysThisMonth); i++) {
            
            // Array füllen mit den kalenderzellen des aktuellen Monats
            cellsThisMonth.push(allCalendarCells[i]);
            
            // Die jeweilige tageszahl wird direkt in den jeweiligen Container geschrieben
            dayNumberCells[i].innerText = (i - numGreyCellsLastMonth + 1);
        }
        
        // Kalenderzellen von nächstem Monat speichern und grau färben
        for (let i = numGreyCellsLastMonth + numDaysThisMonth; i < allCalendarCells.length; i++) {
            greyCellsNextMonth.push(allCalendarCells[i]);
            allCalendarCells[i].classList.add('greyCell');
        }

        //aktueller tag markieren
        if (year === dates.currentYear && month === dates.currentMonth) {
            const todayIndex = dates.dayToday - 1;
            cellsThisMonth[todayIndex].classList.add('currentDay');
        }           

        // Zellen des aktuellen Monats in elements.js speichern
        elements.cellsThisMonth = cellsThisMonth;
        elements.greyCellsLastMonth = greyCellsLastMonth;
        elements.greyCellsNextMonth = greyCellsNextMonth;
    }
};

export default calendarLogic;