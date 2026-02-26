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