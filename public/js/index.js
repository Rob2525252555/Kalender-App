import state from "./core/state.js"
import { fetchTasks } from "./api/tasks.api.js";
import { renderCalendar } from "./features/calendar/calendar.view.js";
import calendarLogic from "./features/calendar/calendar.logic.js";
import calendarEvents from "./features/calendar/calendar.events.js";
import tasksLogic from "./features/tasks/tasks.logic.js";
import { createModal } from "./features/modal/modal.view.js";
import modalEvents from "./features/modal/modal.events.js";
import taskEvents from "./features/tasks/tasks.events.js";
import footerEvents from "./features/footer/footer.events.js";

/** 
 * Entry Point für die App 
 * Initialisiert State, Layout mit Modal, Logik und Events
*/

const init = async () => {
    try {
        // Daten laden
        state.tasks = await fetchTasks();

        // Layout und Modal erstellen
        renderCalendar();
        createModal();

        // Logik initialisieren
        calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);
        tasksLogic.renderTasks();

        // Events registrieren
        calendarEvents.init();
        modalEvents.init();
        taskEvents.init();
        footerEvents.init();
         
    } catch (err) {
        console.error("Init fehlgeschlagen:", err);
    }
};

init();
