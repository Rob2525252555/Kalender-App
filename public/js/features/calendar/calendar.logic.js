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
    renderThisMonth(year, month) {

        calendarLogic.resetCalendar();

        calendarLogic.updateHeader(year, month);

        calendarLogic.setupCalendarCells(year, month);
    },

    /**
     * Setzt den Kalender zurück:
     * - entfernt graue Zellen ('calendar__grey-cell')
     * - entfernt Markierung für aktuellen Tag ('calendar__current-day')
     * - entfernt Tageszahlen aus allen Zellen
     */
    resetCalendar() {
        // Klassen aus allen Kalenderzellen entfernen
        for (let cell of elements.calendarCells) {
            cell.classList.remove('calendar__grey-cell', 'calendar__current-day');
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
    updateHeader(year, month) {
        elements.currentMonthAndYear.innerText = `${dates.months[month]} ${year}`;
    },

    /**
     * Alle Kalenderzellen des ausgewählten Monats einrichten
     * 
     * Aufgaben:
     * - Zellen des letzten und nächsten Monats grau einzufärben
     * - Tageszahlen in Zellen des aktuellen Monats einfügen
     * - aktueller Tag markieren
     * - Zellen des ausgewählten Monats das zugehörige Datum als Dataset-Attribut geben
     * 
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Ausgewählter Monat (0-11)
     */
    setupCalendarCells(year, month) {
        // aktuelle Datumsinformationen ermitteln
        const today = dates.getDate();

        let numGreyCellsLastMonth = dates.getNumGreyCellsLastMonth(year, month);
        let numDaysThisMonth = dates.getDaysThisMonth(year, month);
        let allCalendarCells = elements.calendarCells;
        let dayNumberCells = elements.dayNumberContainer;

        // Kalenderzellen des letzten Monats speichern und grau färben
        for (let i = 0; i < numGreyCellsLastMonth; i++) {
            allCalendarCells[i].classList.add('calendar__grey-cell');
        }

        // Kalenderzellen dieses Monats speichern und Tageszahlen eintragen
        // Zugehöriges Datum als Dataset-Attribut in Iso Format hinzufügen
        for (let i = numGreyCellsLastMonth; i < (numGreyCellsLastMonth + numDaysThisMonth); i++) {
            const day = i - numGreyCellsLastMonth + 1;
            const cell = allCalendarCells[i];

            dayNumberCells[i].innerText = day;

            // Zellen zugehöriges Datum als Dataset-Attribut geben
            const isoDate = `${year}-${String(month + 1).padStart(2, 0)}-${String(day).padStart(2, 0)}`;
            cell.dataset.date = isoDate; 
        }

        // Kalenderzellen von nächstem Monat speichern und grau färben
        for (let i = numGreyCellsLastMonth + numDaysThisMonth; i < allCalendarCells.length; i++) {
            allCalendarCells[i].classList.add('calendar__grey-cell');
        }

        // Aktueller Tag markieren, nur wenn aktueller Monat angezeigt wird
        if (year === today.year && month === today.month) {
            const isoDate = dates.toIsoDate(year, month, today.day);
            const cell = document.querySelector(`[data-date="${isoDate}"]`);
            cell.classList.add('calendar__current-day');
        }
    }
};

export default calendarLogic;