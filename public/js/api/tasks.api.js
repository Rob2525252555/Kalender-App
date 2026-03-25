import state from "../core/state.js";
import tasksLogic from "../features/tasks/tasks.logic.js";

const BASE_URL = '/api/tasks';

// laden der Tasks aus dem Backend 
export async function fetchTasks(){
    try{
        const res = await fetch(BASE_URL);
        if(!res.ok)throw new Error(`Fehler beim laden der Tasks ${res.status}`);
        const data = await res.json();
        return data;
    }catch(err){
        console.error('Fehler beim laden der Tasks', err);
        return [];
    }
}

// speichern der Task im Backend als Json und state aktualisieren
export async function postTask(e){
    e.preventDefault();
    
    const form = e.target;

    // Einträge aus Formular in Objekt umwandeln
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try{// Neue Aufgabe in data/tasks.json als Json speichern
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)     
        });

        // Error aus Server.js anzeigen
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error);  
        }

        const result = await res.json();
        console.log('Aufgabe erfolgreich gespeichert',result);
        
        form.reset();

        // state aktualisieren
        state.tasks.push(result);
        // mit neuer Task Aufgaben neu rendern
        tasksLogic.renderTasks();
    }
    catch(err){
        console.error('Fehler beim Speichern der Aufgabe: ', err);
    }    
}