import dom from "../../core/dom.js";
import elements from "../../core/elements.js"

/**
 * @module tasks.view
 * Modul zum Rendern von Tasks innerhalb von Kalenderzellen.
 * 
 * Aufgaben:
 * - Rendern von Titel, Mitarbeiter und Buttons (Details, Bearbeiten, Löschen)
 * - Wird die Task am Enddatum gerendert, wird zusätzlich die Klasse 'endDateTask' hinzugefügt
 * - Referenz des taskContainers, ID, Startdatum und Enddatum der Task wird in elements.tasksElements gespeichert
 */

const createTaskElement = {

    /**
     * Rendert eine Task innerhalb einer ausgewählten Kalenderzelle 
     * und speichert die Referenz.
     * Wird die Task am Enddatum gerendert, wird zusätzlich die Klasse 'endDateTask' hinzugefügt.
     * 
     * Aufbau:
     * taskContainer
     *      TaskHeader -> TaskTitle, TaskButtonsContainer -> Details-Button, Edit-Button, Delete-Button
     *      TaskEmployee
     * 
     * @param {Object} task - Task-Objekt aus dem State    
     * @param {HTMLElement} parentCell - Kalenderzelle, in die die Task gerendert werden soll
     * @param {boolean} [isEndDate=false] - Gibt an, ob eine Task am Enddatum oder Startdatum gerendert wird
     */

    createTaskElement(task, parentCell, isEndDate = false){

            const taskContainer = dom.create({
            tagName: 'div',
            classList: isEndDate? ['task', 'endDateTask'] : ['task'],
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
            dataset: {
                id: task.id,
                action: 'detailsButton'
            },
            parent:taskButtonsContainer 
        })

        const editButton = dom.create({
            tagName: 'button',
            title: 'Bearbeiten',
            innerText: '✏️',
            dataset: {
                id: task.id,
                action: 'editButton'
            },
            parent:taskButtonsContainer 
        })

        const deleteButton = dom.create({
            tagName: 'button',
            title: 'Löschen',
            innerText: '✕',
            dataset: {
                id: task.id,
                action: 'deleteButton'
            },
            parent:taskButtonsContainer 
        })

        // taskContainer mit zugehöriger ID und Buttons in elements speichern
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

export default createTaskElement;