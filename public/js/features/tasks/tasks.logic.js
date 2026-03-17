import state from "../../core/state.js";
import elements from "../../core/elements.js";
import createTaskElement from "./tasks.view.js";

const tasksLogic = {

   resetTasks(){        
        elements.tasksElements.forEach(taskElement =>{
            taskElement.container.remove();
        })
        elements.tasksElements.length = 0;    
    },

    renderTasks(){

        tasksLogic.resetTasks();

        const {selectedMonth, selectedYear} = state;
       
        state.tasks.forEach(task =>{
            const startDate = new Date(task.startDate);
            // anpassen an cellsThisMonth, da Index bei 0 startet
            const dayIndex = startDate.getDate()-1;

            if (startDate.getFullYear() === selectedYear && startDate.getMonth() === selectedMonth) {
             createTaskElement.createTaskElement(task, elements.cellsThisMonth[dayIndex]);
            }            
        });       
    }
}

export default tasksLogic;