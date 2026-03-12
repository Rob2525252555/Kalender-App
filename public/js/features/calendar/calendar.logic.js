import elements from "../../core/elements.js";
import dates from "../../utils/dates.js";

    /**
     * @module calendar.logic
     * Enthält die Logik um den ausgewählten Monat zu rendern.
     * 
     * Aufgaben dieses Moduls:
     * - Kalender wird zurückgesetzt (alte Klassen und Tageszahlen werden entfernt)
     * - Header mit aktuellem Monat und Jahr aktualisieren
     * - Zellen von letztem und nächstem Monat grau eingefärben
     * - Die Tageszahlen werden in die Zellen des aktuellen Monats eingetragen
     * - Den aktuellen Tag markieren
     * - Die Zellen des letzten, nächsten und aktuellen Monats werden in elements.js gespeichert
     */

const calendarLogic = {
    
    /**
     * Rendert den ausgewählten Monat.
     * 
     * Ablauf:
     * - Kalender zurücksetzen
     * - Header aktualisieren
     * - Kalenderzellen für aktuellen Monat einrichten
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Ausgewählter Monat (0-11)
     */
    renderThisMonth(year, month){

        calendarLogic.resetCalendar();

        calendarLogic.updateHeader(year,month);

        calendarLogic.setupCalendarCells(year, month);  
    },

    /**
     * Setzt den Kalender zurück:
     * - entfernt graue Zellen ('greyCell')
     * - entfernt Markierung für aktuellen Tag ('currentDay')
     * - entfernt Tageszahlen aus allen Zellen
     */
    resetCalendar(){
        // Klassen aus allen Kalenderzellen entfernen
        for (let cell of elements.calendarCells) {
            cell.classList.remove('greyCell', 'currentDay');
        }

        // Tageszahlen aus allen Zellen entfernen
        for (let day of elements.dayNumberContainer) {
            day.innerText = '';
        }
    },

    /**
     * Aktualisiert Header mit Monat und Jahr
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Ausgewählter Monat (0-11)
     */
    updateHeader(year,month){
        elements.currentMonthAndYear.innerText = `${dates.months[month]} ${year}`;
    },

    /**
     * Alle Kalenderzellen des ausgewählten Monats einrichten
     * 
     * Aufgaben:
     * - Zellen des letzten und nächsten Monats grau einzufärben
     * - Tageszahlen in Zellen des aktuellen Monats einfügen
     * - aktueller Tag markieren
     * - Zellen des letzten, nächsten und aktuellen Monats in elements.js speichern
     * 
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Ausgewählter Monat (0-11)
     */
    setupCalendarCells(year,month){

        // Arrays zum Speichern der Zellen des letzten, aktuellen und nächsten Monats
        let greyCellsLastMonth = [];
        let greyCellsNextMonth = [];
        let cellsThisMonth = [];

        let numGreyCellsLastMonth = dates.getNumGreyCellsLastMonth(year, month); 
        let numDaysThisMonth = dates.getDaysThisMonth(year,month);
        let allCalendarCells = elements.calendarCells;
        let dayNumberCells = elements.dayNumberContainer;

        // Kalenderzellen des letzten Monats speichern und grau färben
        for (let i = 0; i < numGreyCellsLastMonth; i++) {
            greyCellsLastMonth.push(allCalendarCells[i]);
            allCalendarCells[i].classList.add('greyCell');  
        }

        // Kalenderzellen dieses Monats speichern und Tageszahlen eintragen
        for (let i = numGreyCellsLastMonth; i < (numGreyCellsLastMonth + numDaysThisMonth); i++) {   
            cellsThisMonth.push(allCalendarCells[i]);
            dayNumberCells[i].innerText = (i - numGreyCellsLastMonth + 1);
        }
        
        // Kalenderzellen von nächstem Monat speichern und grau färben
        for (let i = numGreyCellsLastMonth + numDaysThisMonth; i < allCalendarCells.length; i++) {
            greyCellsNextMonth.push(allCalendarCells[i]);
            allCalendarCells[i].classList.add('greyCell');
        }

        // Aktueller Tag markieren, nur wenn aktueller Monat angezeigt wird
        if (year === dates.currentYear && month === dates.currentMonth) {
            const todayIndex = dates.dayToday - 1;
            cellsThisMonth[todayIndex].classList.add('currentDay');
        }           

        // Zellen des aktuellen, letzten und nächsten Monats in elements.js speichern
        elements.cellsThisMonth = cellsThisMonth;
        elements.greyCellsLastMonth = greyCellsLastMonth;
        elements.greyCellsNextMonth = greyCellsNextMonth;
    }
};

export default calendarLogic;