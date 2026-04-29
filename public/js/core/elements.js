/**
 * @module elements
 * 
 * Sammlung von DOM-Elementen.
 * Hier werden die Referenzen aller wichtigen DOM-Elemente gespeichert.
 */

const elements = {
    // Headerelemente
    btnArrowLeft: null,
    btnArrowRight: null,
    addTaskButton: null,
    currentMonthAndYear: null,

    // Container, in dem der Kalender gerendert wird
    calendarMainContainer: null,
    
    // Alle Kalenderzellen
    calendarCells: [],
    // Container für die Tageszahlen in den Kalenderzellen
    dayNumberContainer: [],
    // Map für die Kalenderzellen des aktuellen Monats mit Datum als ISO-8601-String als Schlüssel
    calendarCellMap: new Map(),

    // Overlay und Modal
    modalOverlay: null,
    overlayCloseButton: null,
    modalContent: null,   
    
    // Formular um Aufgaben hinzuzufügen oder zu bearbeiten
    taskFormHeadline: null,
    taskForm: null,
    formSubmitButton: null,

    // Buttons in der Detailansicht
    taskDetailsViewEditButton: null,
    taskDetailsViewDeleteButton: null,
    taskDetailsViewBackButton: null,

    // Container für den Toast
    toastContainer: null,

    // Container für die Footer-Buttons
    footerContent: null
};

export default elements;
