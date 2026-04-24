import dom from "../../core/dom.js";
import elements from "../../core/elements.js"

/**
 * @module tasks.view
 * Modul zum Rendern von Tasks innerhalb von Kalenderzellen.
 * 
 * Jede task besteht aus:
 * - Titel
 * - Mitarbeiter
 * - Buttons (Details, Bearbeiten, Löschen)
 * 
 * Beim Rendern am Enddatum wird die Klasse 'task__endDate' hinzugefügt,
 * für einen roten Hintergrund.
 * Nach dem Rendern wird die Referenz des Task-Containers und die zugehörige ID in elements.tasksElements gespeichert.
 * 
 * @param {Object} task - Task-Objekt aus dem State    
 * @param {HTMLElement} parentCell - Kalenderzelle, in die die Task gerendert werden soll
 * @param {boolean} [isEndDate=false] - Gibt an, ob eine Task am Enddatum oder Startdatum gerendert wird
 */

export function createTaskElement(task, parentCell, type) {

    const taskContainer = dom.create({
        tagName: 'div',
        dataset: {
            taskId: task.id
        },
        parent: parentCell
    });

    if (type === 'taskStart') {
        taskContainer.classList.add('task');
    }

    if (type === 'taskEnd') {
        taskContainer.classList.add('task', 'task__endDate');
    }

    const taskHeader = dom.create({
        tagName: 'div',
        classList: ['task__header'],
        parent: taskContainer
    });

    dom.create({
        tagName: 'div',
        classList: ['task__employee'],
        innerText: task.employee,
        parent: taskContainer
    });

    dom.create({
        tagName: 'span',
        classList: ['task__title'],
        innerText: task.title,
        title: task.title,
        parent: taskHeader
    });

    const taskButtonsContainer = dom.create({
        tagName: 'div',
        classList: ['task__buttons'],
        parent: taskHeader
    });

    dom.create({
        tagName: 'button',
        title: 'Details',
        innerText: '🔍',
        dataset: {
            id: task.id,
            action: 'detailsButton'
        },
        parent: taskButtonsContainer
    });

    dom.create({
        tagName: 'button',
        title: 'Bearbeiten',
        innerText: '✏️',
        dataset: {
            id: task.id,
            action: 'editButton'
        },
        parent: taskButtonsContainer
    });

    dom.create({
        tagName: 'button',
        title: 'Löschen',
        innerText: '✕',
        dataset: {
            id: task.id,
            action: 'deleteButton'
        },
        parent: taskButtonsContainer
    });

    // taskContainer mit zugehöriger ID und Buttons in elements speichern
    elements.tasksElements.push({
        id: task.id,
        container: taskContainer,
    });
};
