    /**
     * @module dates
     * Hilfsmodul für alle wichtigen Datumsinformationen
     * 
     * Stellt Arrays für Monate und Wochentage bereit, sowie Funktionen,
     * um aktuelle Datumsinformationen sowie Kalenderzellen im Grid zu berechnen.
     */

const dates ={

    /**
     * Arrays mit den Monaten, um diese dynamisch anhand eines Index zu verwenden.
     * @type {string[]}
     */
    months: ["Januar" ,"Februar", "März", "April", "Mai",
         "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],

    /**
     * Array mit den Wochentagen, um diese dynamisch anhand eines Index zu verwenden.
     * @type {string[]}
     */
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],  

    /**
     * Setzen aller grundlegenden Datumsinformationen und speichere diese im Objekt:
     * Heutiges Datum @type {Date}
    * Heutiger Tag @type {number}
     * Heutiger Wochentag als Index (0-6, 0 = Sonntag, 1 = Montag usw.) @type {number}
    * Aktueller Monat als Index (0-11, 0 = Januar, 1 = Februar usw.) @type {number}
    * Aktuelle Jahreszahl @type {number}
    */
        
    setDate(){
        // heutiges Datum
        const today = new Date();
        dates.today = today;

        // heutiger Tag
        dates.dayToday = today.getDate();
        
        // heutiger Wochentag (0-6, 0 = Sonntag, 1 = Montag usw.)
        dates.currentWeekday = today.getDay();
        
        // aktueller Monat als Index (0-11)
        dates.currentMonth = today.getMonth();
        
        // aktuelles Jahr ermitteln
        dates.currentYear = today.getFullYear();     
    },

    /**
     * Index des Wochentags am 1. Tag des Monats ermitteln
     * 
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Monat als Index (0-11)
     * @returns {number} - Index (0-6) des Wochentags
     */
    getFirstWeekdayThisMonth(year, month){  
        const firstDayMonth = new Date(year, month, 1);  
        return firstDayMonth.getDay();
    },

    /**
     * Anzahl der Tage des Monats ermitteln
     * 
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Monat als Index (0-11)
     * @returns {number} - Anzahl der Tage des ausgewählten Monats
     */
    getDaysThisMonth(year, month){
        return new Date(year, month+1,0).getDate();
    },

    /**
     * Position der ersten Kalenderzelle des ausgewählten Monats ermitteln
     * 
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Monat als Index (0-11)
     * @returns {number} - Index der ersten Kalenderzelle im Kalender Grid 
     */
    getFirstCalendarCell(year,month){
        if(dates.getFirstWeekdayThisMonth(year,month)===0) return 7;
        return (dates.getFirstWeekdayThisMonth(year,month));
    },

    /**
     * Position der letzten Kalenderzelle des ausgewählten Monats ermitteln
     * 
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Monat als Index (0-11)
     * @returns {number} - Index der letzten kalenderzelle im Kalender Grid
     */
    getLastCalendarCell(year, month){
        let firstCell = dates.getFirstCalendarCell(year,month);
        return (firstCell + dates.getDaysThisMonth(year,month) -1 );
    },

    /**
     * Anzahl der grauen Zellen im Grid ermitteln, die vor dem ausgewählten Monat liegen.
     * 
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Monat als Index (0-11)
     * @returns {number} - Anzahl Kalenderzellen des vorherigen Monats
     */
    getNumGreyCellsLastMonth(year,month){
        return(dates.getFirstCalendarCell(year, month)-1);

    },
    /**
     * Anzahl der grauen Zellen im Grid ermitteln, die nach dem ausgewählten Monat liegen
     * 
     * @param {number} year - Ausgewähltes Jahr
     * @param {number} month - Monat als Index (0-11)
     * @returns {number} - Anzahl Kalenderzellen des Folgemonats
     */
    getNumGreyCellsNextMonth(year, month){
        return (42-dates.getLastCalendarCell(year, month));
    }
}

export default dates;