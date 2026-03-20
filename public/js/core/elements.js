const elements = {
    mainContainer: null,
    header: null,
    btnArrowLeft: null,
    btnArrowRight: null,
    addTaskButton: null,
    currentMonthAndYear: null,
    calendarMainContainer: null,
    
    // Alle Kalenderzellen
    calendarCells: [],
    dayNumberContainer: [],

    // Kalenderzellen
    cellsThisMonth: [],
    greyCellsLastMonth: [],
    greyCellsNextMonth: [],

    // Array um die Aufgaben zu speichern
    tasksElements: [],

    // Overlay und Modal
    modalOverlay: null,
    overlayCloseButton: null,
    formModal: null,    
};

export default elements;
