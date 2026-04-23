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

    // Array um die Referenzen der gerenderten Aufgaben zu speichern
    tasksElements: [],

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
    toastContainer: null
};

export default elements;
