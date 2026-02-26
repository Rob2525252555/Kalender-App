import state from "./core/state.js"
import { fetchTasks } from "./api/tasks.api.js";

const init = async () => {
    try {
        // tasks in den state laden
        state.tasks = await fetchTasks();     
    } catch (err) {
        console.error("Init fehlgeschlagen:", err);
    }
};

init();
