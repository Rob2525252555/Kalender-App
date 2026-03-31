import state from "./core/state.js"
import { fetchTasks } from "./api/tasks.api.js";
import { renderCalendar } from "./features/calendar/calendar.view.js";
import dates from "./utils/dates.js"
import calendarLogic from "./features/calendar/calendar.logic.js";
import calendarEvents from "./features/calendar/calendar.events.js";
import tasksLogic from "./features/tasks/tasks.logic.js";
import { createModal } from "./features/modal/modal.view.js";
import modalEvents from "./features/modal/modal.events.js";
import taskEvents from "./features/tasks/tasks.events.js";

const init = async () => {
    try {
        // tasks in den state laden
        state.tasks = await fetchTasks();
        renderCalendar();

        taskEvents.init();

        createModal();
        modalEvents.init();

        dates.setDate();

        calendarLogic.renderThisMonth(state.selectedYear, state.selectedMonth);
        calendarEvents.init();

        tasksLogic.renderTasks();

        
    } catch (err) {
        console.error("Init fehlgeschlagen:", err);
    }
};

init();
