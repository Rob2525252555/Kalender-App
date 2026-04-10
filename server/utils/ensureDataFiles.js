import fs from 'fs';

/**
 * @module ensureDataFileExist
 * Überprüft, ob data-Ordner und tasks.json Datei existieren.
 * Erstellt Ordner oder Datei wenn nicht vorhanden.
 * Beende Node-Prozess wenn Erstellen fehlschlägt.
 * @param {string} dataDir - Pfad zum data-Ordner
 * @param {string} dataFilePath - Pfad zur tasks.json Datei
 */

export async function ensureDataFileExist(dataDir, dataFilePath) {
    try {
        // Prüfen ob Ordner existiert, wenn nicht -> erstellen
        await fs.promises.mkdir(dataDir, { recursive: true });

        // Prüfen ob Datei existiert, wenn nicht -> erstellen
        try{
            await fs.promises.access(dataFilePath)
        }catch{
            await fs.promises.writeFile(dataFilePath, '[]', 'utf-8');
        }

    } catch (err) {
        console.error('Fehler beim Erstellen des Ordners oder der Datei:', err);
        process.exit(1);
    }
}