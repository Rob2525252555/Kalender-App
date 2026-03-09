const dates ={

    months: ["Januar" ,"Februar", "März", "April", "Mai",
         "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],

    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],  
        
    setDate(){
        // heutiges Datum
        const today = new Date();
        dates.today = today;

        // heutiger Tag
        dates.dayToday = today.getDate();
        
        // heutiger Wochentag
        dates.currentWeekday = today.getDay();
        
        // Monate gehen von (0-11)
        // aktueller Monat
        dates.currentMonth = today.getMonth();
        
        //aktuelles jahr ermitteln
        dates.currentYear = today.getFullYear();     
    },
    // erster Wochentag ermitteln
    getFirstWeekdayThisMonth(year, month){  
        const firstDayMonth = new Date(year, month, 1);  
        return firstDayMonth.getDay();
    },
    // Anzahl der Tage diesen Monat ermitteln
    getDaysThisMonth(year, month){
        return new Date(year, month+1,0).getDate();
    },
    // erste kalenderzelle ermitteln
    getFirstCalendarCell(year,month){
        if(dates.getFirstWeekdayThisMonth(year,month)===0) return 7;
        return (dates.getFirstWeekdayThisMonth(year,month));
    },
    //letzte Kalenderzelle ermitteln
    getLastCalendarCell(year, month){
        let firstCell = dates.getFirstCalendarCell(year,month);
        return (firstCell + dates.getDaysThisMonth(year,month) -1 );
    },
    // Anzahl grauer Zellen des Vormonats ermitteln
    getNumGreyCellsLastMonth(year,month){
        return(dates.getFirstCalendarCell(year, month)-1);

    },
    // Anzahl der grauen Zellen des Nachfolgemonats ermitteln
    getNumGreyCellsNextMonth(year, month){
        return (42-dates.getLastCalendarCell(year, month));
    }
}

export default dates;