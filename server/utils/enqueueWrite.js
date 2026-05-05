/**
 * @module enqueueWrite
 * 
 * Reiht jede (read->modify->write)-Operation in eine Warteschlange ein, um Race-Conditions zu verhindern.
 * Es wird eine Kette von Promises erstellt, die nacheinander bearbeitet werden (FIFO).
 * Sollte eine Operation fehlschlagen, werden nachfolgende Operationen trotzdem ausgeführt.
 * @param {Function} operation - Asynchrone Funktion, die in die Warteschlange eingereiht wird.
 */

// Promise-Kette startet mit bereits erfülltem Promise
let writeQueue = Promise.resolve();

export function enqueueTaskOperation(operation) {
    const resultPromise = writeQueue.then(async () =>{
        try {
            return await operation();
        }catch(err){
            console.error("Queue Error", err);
            throw err;
        }
    });
    writeQueue = resultPromise.catch(() => {});

    return resultPromise;
}