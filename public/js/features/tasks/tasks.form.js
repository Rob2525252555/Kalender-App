import dom from "../../core/dom.js";
import elements from "../../core/elements.js";

/**
 * @module tasks.form
 * Rendert eine Formular um Aufgaben hinzuzufügen oder zu bearbeiten.
 * Aufgaben:
 * - Rendert das Formular mit den Inputs (Titel, Mitarbeiter, Startdatum, Enddatum und Beschreibung)
 * - Markiert Titel, Mitarbeiter, Startdatum und Enddatum als Pflichtfeld
 * - Rendert Submit-Button
 * - Speichert Referenzen von Überschrift-Container, Formular und Submit-Button in elements 
 * */

export function createTaskForm(){
    
        const taskForm = dom.create({
            tagName: 'form',
            classList: ['task-form'],
            parent: elements.modalContent
        });

        // ----- Überschrift und Hinweis für Pflichtfelder -----

        const taskFormHeaderContainer = dom.create({
            tagName: 'div',
            parent: taskForm
        });

        const taskFormHeadline = dom.create({
            tagName: 'h2',
            classList: ['task-form__headline'],
            parent: taskFormHeaderContainer
        });

        dom.create({
            tagName: 'p',
            innerText: 'Pflichtfelder sind mit * markiert.',
            parent: taskFormHeaderContainer
        });

        // --- Titel ---
        const taskFormGroup1 = dom.create({
            tagName: 'div',
            classList: ['task-form__group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form__label'],
            innerText: 'Titel *',
            htmlFor: 'taskTitle',
            parent: taskFormGroup1
        });

        dom.create({
            tagName: 'input',
            classList: ['task-form__input'],
            type: 'text',
            id: 'taskTitle',
            name: 'title',
            required: true,
            parent: taskFormGroup1
        });

        // --- Mitarbeiter ---
        const taskFormGroup2 = dom.create({
            tagName: 'div',
            classList: ['task-form__group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form__label'],
            innerText: 'Mitarbeiter *',
            htmlFor: 'taskEmployee',
            parent: taskFormGroup2
        });

        dom.create({
            tagName: 'input',
            classList: ['task-form__input'],
            type: 'text',
            id: 'taskEmployee',
            name: 'employee',
            required: true,
            parent: taskFormGroup2
        });

        // --- Startdatum ---
        const taskFormGroup3 = dom.create({
            tagName: 'div',
            classList: ['task-form__group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form__label'],
            innerText: 'Startdatum *',
            htmlFor: 'taskStart',
            parent: taskFormGroup3
        });

        dom.create({
            tagName: 'input',
            classList: ['task-form__input'],
            type: 'date',
            id: 'taskStart',
            name: 'startDate',
            required: true,
            parent: taskFormGroup3
        });

        // --- Enddatum ---
        const taskFormGroup4 = dom.create({
            tagName: 'div',
            classList: ['task-form__group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form__label'],
            innerText: 'Enddatum *',
            htmlFor: 'taskEnd',
            parent: taskFormGroup4
        });

        dom.create({
            tagName: 'input',
            classList: ['task-form__input'],
            type: 'date',
            id: 'taskEnd',
            name: 'endDate',
            required: true,
            parent: taskFormGroup4
        });

        // --- Beschreibung ---
        const taskFormGroup5 = dom.create({
            tagName: 'div',
            classList: ['task-form__group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form__label'],
            innerText: 'Beschreibung',
            htmlFor: 'taskDescription',
            parent: taskFormGroup5
        });

        dom.create({
            tagName: 'textarea',
            classList: ['task-form__textarea'],
            id: 'taskDescription',
            name: 'description',
            parent: taskFormGroup5
        });

        // --- Submit Button ---
        const formSubmitButton = dom.create({
            tagName: 'button',
            classList: ['task-form__submit-button'],
            type: 'submit',
            parent: taskForm
        });
        
        // Referenzen in elements speichern
        elements.taskFormHeadline = taskFormHeadline;
        elements.taskForm = taskForm;
        elements.formSubmitButton = formSubmitButton;
    };

