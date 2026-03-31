import dom from "../../core/dom.js";
import elements from "../../core/elements.js";

export function createTaskForm(){
        
        // Task Formular erstellen und in elements speichern
        const taskForm = dom.create({
            tagName: 'form',
            classList: ['task-form'],
            parent: elements.modalContent
        });

        // --- Titel ---
        const taskFormGroup1 = dom.create({
            tagName: 'div',
            classList: ['task-form-group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form-label'],
            innerText: 'Titel',
            htmlFor: 'taskTitle',
            parent: taskFormGroup1
        });

        dom.create({
            tagName: 'input',
            classList: ['task-form-input'],
            type: 'text',
            id: 'taskTitle',
            name: 'title',
            required: true,
            parent: taskFormGroup1
        });

        // --- Mitarbeiter ---
        const taskFormGroup2 = dom.create({
            tagName: 'div',
            classList: ['task-form-group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form-label'],
            innerText: 'Mitarbeiter',
            htmlFor: 'taskEmployee',
            parent: taskFormGroup2
        });

        dom.create({
            tagName: 'input',
            classList: ['task-form-input'],
            type: 'text',
            id: 'taskEmployee',
            name: 'employee',
            required: true,
            parent: taskFormGroup2
        });

        // --- Startdatum ---
        const taskFormGroup3 = dom.create({
            tagName: 'div',
            classList: ['task-form-group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form-label'],
            innerText: 'Startdatum',
            htmlFor: 'taskStart',
            parent: taskFormGroup3
        });

        dom.create({
            tagName: 'input',
            classList: ['task-form-input'],
            type: 'date',
            id: 'taskStart',
            name: 'startDate',
            required: true,
            parent: taskFormGroup3
        });

        // --- Enddatum ---
        const taskFormGroup4 = dom.create({
            tagName: 'div',
            classList: ['task-form-group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form-label'],
            innerText: 'Enddatum',
            htmlFor: 'taskEnd',
            parent: taskFormGroup4
        });

        dom.create({
            tagName: 'input',
            classList: ['task-form-input'],
            type: 'date',
            id: 'taskEnd',
            name: 'endDate',
            required: true,
            parent: taskFormGroup4
        });

        // --- Beschreibung ---
        const taskFormGroup5 = dom.create({
            tagName: 'div',
            classList: ['task-form-group'],
            parent: taskForm
        });

        dom.create({
            tagName: 'label',
            classList: ['task-form-label'],
            innerText: 'Beschreibung',
            htmlFor: 'taskDescription',
            parent: taskFormGroup5
        });

        dom.create({
            tagName: 'textarea',
            classList: ['task-form-textarea'],
            id: 'taskDescription',
            name: 'description',
            parent: taskFormGroup5
        });

        // --- Submit Button ---
        dom.create({
            tagName: 'button',
            classList: ['form-button'],
            type: 'submit',
            innerText: 'Aufgabe erstellen',
            parent: taskForm
        });
        
        elements.taskForm = taskForm;
    };

