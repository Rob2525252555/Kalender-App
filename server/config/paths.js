import path from 'path';
import { fileURLToPath } from 'url';

    // --- Pfad zur JSON-Datei ermitteln ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "../../");

export const DATA_DIR = path.join(ROOT_DIR, 'data');
export const DATA_TASKS_PATH = path.join(DATA_DIR, 'tasks.json');



