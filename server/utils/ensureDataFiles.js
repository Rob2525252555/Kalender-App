import fs from 'fs';
import path from 'path';
import { checkValidJson, JsonParseError } from './checkValidJson.js';

/**
 * @module ensureDataFileExist
 * Stellt sicher, dass tasks.json existiert und die Daten gültig sind.
 *
 * - Erstellt data-Ordner, falls nicht vorhanden
 * - Erstellt tasks.json, falls nicht vorhanden
 * - Validiert, ob Inhalt von tasks.json gültiges JSON ist 
 *      - falls ungültig:
 *      - Erstellt Ordner backup und speichert Backup-Datei darin
 *      - Ersetzt tasks.json durch neue, leere tasks.json
 * 
 * @param {string} dataDir - Pfad zum data-Ordner
 * @param {string} dataFilePath - Pfad zur tasks.json Datei
 */

export async function ensureDataFileExist(dataDir, dataFilePath) {

    /**
     * Sicherstellen, dass 'data' Ordner und tasks.json existieren.
     */
    try {
        // Prüft ob 'data' Ordner existiert, wenn nicht -> erstellen.
        await fs.promises.mkdir(dataDir, { recursive: true });

        // Hier werden die Daten aus tasks.json gespeichert.
        let data;

        /**
         * Prüft ob Datei tasks.json existiert, wenn nicht -> erstellen.
         */
        try {
            data = await fs.promises.readFile(dataFilePath, 'utf-8');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.promises.writeFile(dataFilePath, '[]', 'utf-8');
                return;
            }
            throw err;
        }

        /**
         * Überprüfen ob Daten in tasks.json gültig sind und Error Handling
         */
        try {
            // Prüft ob Daten JSON-Daten sind.
            checkValidJson(data);
        } catch (err) {
         
            if (!(err instanceof JsonParseError)) {
                throw err;
            }

            // Backup Ordner erstellen.
            const backupDir = path.join(dataDir, 'backup');
            await fs.promises.mkdir(backupDir, { recursive: true });

            // Dynamischer Pfad zur Backup-Datei mit Hilfe von Datum.
            const backupPath = path.join(backupDir,`tasks.${Date.now()}.json`);

            await fs.promises.writeFile(backupPath, data, 'utf-8');

            console.warn('JSON beschädigt -> Backup erstellt:', backupPath);

            await fs.promises.writeFile(dataFilePath, '[]', 'utf-8');
        }

    } catch (err) {
        console.error('Fehler beim Erstellen des Ordners oder der Datei:', err);
        throw err;
    }
}