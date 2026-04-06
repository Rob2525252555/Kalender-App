import dom from "../../core/dom.js";
import elements from "../../core/elements.js";

/**
 * @module task.details.view
 * Rendert die Detailansicht einer Task im Modal
 * 
 * Aufgaben:
 * - Anzeigen aller Informationen einer Task (Titel, Mitarbeiter, Startdatum, Enddatum und Beschreibung)
 * - Rendern der Buttons (Bearbeiten, löschen und zurück)
 * - Speichern der Referenzen der Buttons in elements
 * 
 * @param {Object} task - Task-Objekt, dessen Details angezeigt werden
 */

export function createTaskDetailsView(task){

    const taskDetailsViewContainer = dom.create({
        tagName: 'div',
        classList: ['task-details__container'],
        parent: elements.modalContent
    });

    // ----- Titel -----
    const taskDetailsTitleContainer = dom.create({
        tagName: 'div',
        classList: ['task-details__title'],
        parent: taskDetailsViewContainer
    });

    const taskDetailsHeadline = dom.create({
        tagName: 'h3',
        parent: taskDetailsTitleContainer
    });

    // Label und Wert für Titel
    dom.create({
        tagName: 'span',
        innerText: 'Titel: ',
        parent: taskDetailsHeadline
    });

    dom.create({
        tagName: 'span',
        classList: ['task-details__title-value'],
        innerText: task.title,
        parent: taskDetailsHeadline
    });

    // ----- Mitarbeiter -----
    const taskDetailsEmployeeContainer = dom.create({
        tagName: 'div',
        classList: ['task-details__employee'],
        parent: taskDetailsViewContainer
    });

    dom.create({
        tagName: 'span',
        classList: ['task-details__employee-label'],
        innerText: 'Mitarbeiter: ',
        parent: taskDetailsEmployeeContainer
    });

    dom.create({
        tagName: 'span',
        classList: ['task-details__employee-value'],
        innerText: task.employee,
        parent: taskDetailsEmployeeContainer
    });

    // ----- Startdatum -----

    const taskDetailsStartDateContainer = dom.create({
        tagName: 'div',
        parent: taskDetailsViewContainer
    });

    dom.create({
        tagName: 'span',
        classList: ['task-details__startDate-label'],
        innerText: 'Startdatum: ',
        parent: taskDetailsStartDateContainer
    });

    dom.create({
        tagName: 'span',
        classList:['task-details__startDate-value'],
        innerText: task.startDate,
        parent: taskDetailsStartDateContainer
    });

    // ----- Enddatum -----

    const taskDetailsEndDateContainer = dom.create({
        tagName: 'div',
        parent: taskDetailsViewContainer
    });

    dom.create({
        tagName: 'span',
        classList: ['task-details__endDate-label'],
        innerText: 'Enddatum: ',
        parent: taskDetailsEndDateContainer
    });

    dom.create({
        tagName: 'span',
        classList: ['task-details__endDate-value'],
        innerText: task.endDate,
        parent: taskDetailsEndDateContainer
    });

    // ----- Beschreibung -----

    const taskDetailsDescriptionContainer = dom.create({
        tagName: 'div',
        parent: taskDetailsViewContainer
    });

    dom.create({
        tagName: 'span',
        classList: ['task-details__description'],
        innerText: 'Beschreibung: ',
        parent: taskDetailsDescriptionContainer
    });

    dom.create({
        tagName: 'p',
        classList: ['task-details__description-text'],
        innerText: task.description,
        parent: taskDetailsDescriptionContainer
    });

    // ----- Buttons -----

    const taskDetailsButtonContainer = dom.create({
        tagName: 'div',
        classList: ['task-details__button-container'],
        parent: taskDetailsViewContainer
    });

    const taskDetailsViewEditButton = dom.create({
        tagName: 'button',
        classList: ['task-details__button','task-details__button--edit'],
        innerText: 'Bearbeiten',
        parent: taskDetailsButtonContainer
    });

    const taskDetailsViewDeleteButton = dom.create({
        tagName: 'button',
        classList: ['task-details__button','task-details__button--delete'],
        innerText: 'Löschen',
        parent: taskDetailsButtonContainer
    });

    const taskDetailsViewBackButton = dom.create({
        tagName: 'button',
        classList: ['task-details__button','task-details__button--back'],
        innerText: 'Zurück',
        parent: taskDetailsButtonContainer
    });

    // Referenzen der Buttons in elements speichern
    elements.taskDetailsViewEditButton = taskDetailsViewEditButton;
    elements.taskDetailsViewDeleteButton = taskDetailsViewDeleteButton;
    elements.taskDetailsViewBackButton = taskDetailsViewBackButton; 
}