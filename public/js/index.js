import state from "./core/state.js"
import { fetchTasks } from "./api/tasks.api.js";
import renderCalendar from "./features/calendar/calendar.view.js";
import dates from "./utils/dates.js"

const init = async () => {
    try {
        // tasks in den state laden
        state.tasks = await fetchTasks();
        renderCalendar.renderCalendar();
        dates.setDate();
 
    } catch (err) {
        console.error("Init fehlgeschlagen:", err);
    }
};

init();
