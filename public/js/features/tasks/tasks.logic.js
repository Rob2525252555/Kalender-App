import state from "../../core/state.js";
import elements from "../../core/elements.js";
import createTaskElement from "./tasks.view.js";

/**
 * @module tasks.logic
 * Rendert die Tasks in ihrer zugehörigen Kalenderzelle.
 * 
 * Aufgaben:
 * - entfernt alle bereits gerenderten Tasks
 * - ermittelt die passende Kalenderzelle anhand des startDate
 * - rendert tasks im aktuell ausgewählten Monat
 */

const tasksLogic = {
    /**
     * Entfernt alle aktuell gerenderten Tasks.
     * Löscht alle Referenzen in elements.tasksElements.
     */
   resetTasks(){        
        elements.tasksElements.forEach(taskElement =>{
            taskElement.container.remove();
        })
        elements.tasksElements.length = 0;    
    },
    /**
     * Rendert Tasks des aktuell ausgewählten Monats in ihre zugehörige Kalenderzelle.
     */
    renderTasks(){

        tasksLogic.resetTasks();

        const {selectedMonth, selectedYear} = state;
       
        state.tasks.forEach(task =>{
            const startDate = new Date(task.startDate);
            // Index anpassen, da cellsThisMonth bei 0 startet
            const dayIndex = startDate.getDate()-1;

            if (startDate.getFullYear() === selectedYear && startDate.getMonth() === selectedMonth) {
             createTaskElement.createTaskElement(task, elements.cellsThisMonth[dayIndex]);
            }            
        });       
    }
} 

export default tasksLogic;