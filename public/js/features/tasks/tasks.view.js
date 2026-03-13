import dom from "../../core/dom.js";
import elements from "../../core/elements.js"

const renderTask = {


    renderTask(task, parentCell){

        const taskContainer = dom.create({
            tagName: 'div',
            classList: ['task'],
            dataset:{
                id: task.id,
                startDate: task.startDate,
                endDate: task.endDate
            },
            parent: parentCell,
        })

        const taskHeader = dom.create({
            tagName: 'div',
            classList: ['taskHeader'],
            parent: taskContainer
        })

        const taskEmployee = dom.create({
            tagName: 'div',
            classList: ['taskEmployee'],
            innerText: task.employee,
            parent: taskContainer
        })

        const taskTitle = dom.create({
            tagName: 'span',
            classList: ['taskTitle'],
            innerText: task.title,
            parent: taskHeader
        })

        const taskButtonsContainer = dom.create({
            tagName: 'div',
            classList: ['taskButtons'],
            parent: taskHeader
        })

        const detailsButton = dom.create({
            tagName: 'button',
            title: 'Details',
            innerText: '🔍',
            parent:taskButtonsContainer 
        })

        const editButton = dom.create({
            tagName: 'button',
            title: 'Bearbeiten',
            innerText: '✏️',
            parent:taskButtonsContainer 
        })

        const deleteButton = dom.create({
            tagName: 'button',
            title: 'Löschen',
            innerText: '✕',
            parent:taskButtonsContainer 
        })

        // taskContainer mit zugehöriger ID und buttons in elements speichern
        elements.tasksElements.push({
            id: task.id,
            container: taskContainer,
            startDate: task.startDate,
            endDate: task.endDate,
            buttons: {
                details: detailsButton,
                edit: editButton,
                delete: deleteButton
            }
        })
        
        
    }
}

export default renderTask;