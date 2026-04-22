/**
 * Eigener Fehler-Typ für ungültige JSON-Daten
 * Wird verwendet, um den Fehler von JSON.parse mit ungültigen Json-Daten
 * von anderen Syntaxfehlern zu unterscheiden.
 */

export class JsonParseError extends Error {
    constructor(message) {
        super(message);
    }
}

/**
 * Versucht String in gültiges JSON umzuwandeln.
 * 
 * - Wenn der String gültiges JSON ist -> alles gut
 * - wenn der String kein gültiges JSON  ist -> wirf JsonParseError
 * 
 * @param {string} data - JSON-String aus tasks.json
 * @throws {JsonParseError} - wenn JSON ungültig ist
 */
export function checkValidJson(data){
   try {
    JSON.parse(data);
   } catch {
    throw new JsonParseError('Invalid JSON data');
   }
}