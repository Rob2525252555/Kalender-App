import state from "../../core/state.js";
import elements from "../../core/elements.js";
import { createTaskElement } from "./tasks.view.js";

/**
 * @module tasks.logic
 * Rendert die Tasks in ihrer zugehörigen Kalenderzelle.
 * 
 * Aufgaben:
 * - entfernt alle bereits gerenderten Tasks
 * - ermittelt die passende Kalenderzelle anhand von startDate und endDate
 * - rendert Tasks im aktuell ausgewählten Monat
 */

const tasksLogic = {
    /**
     * Entfernt alle aktuell gerenderten Tasks.
     */
    resetTasks() {
        const allTasks = document.querySelectorAll('[data-task-id]');
        allTasks.forEach(el => el.remove());
    },
    /**
     * Rendert einzelne Task des aktuell ausgewählten Monats in ihre zugehörige Kalenderzelle.
     */
    renderSingleTask(task) {

        const { selectedMonth, selectedYear } = state;

        const startDate = new Date(task.startDate);
        const endDate = new Date(task.endDate);

        if (startDate.getFullYear() === selectedYear && startDate.getMonth() === selectedMonth) {

            const cell = elements.calendarCellMap.get(task.startDate);
            if (cell) {
                createTaskElement(task, cell, 'taskStart');
            }
        }

        if (endDate.getFullYear() === selectedYear && endDate.getMonth() === selectedMonth) {

            const cell = elements.calendarCellMap.get(task.endDate);
            if (cell) {
                createTaskElement(task, cell, 'taskEnd');
            }
        }
    },
    /**
     * Rendert Tasks des aktuell ausgewählten Monats in ihre zugehörige Kalenderzelle.
     */
    renderTasks() {

        tasksLogic.resetTasks();

        state.tasks.forEach(task => {
            tasksLogic.renderSingleTask(task);
        });
    }
}

export default tasksLogic;