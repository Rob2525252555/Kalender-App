import express from 'express';
import path from 'path';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { ensureDataFileExist } from './utils/ensureDataFiles.js';
import router from './routes/tasks.routes.js';

// --- Pfad zur JSON-Datei ermitteln ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DATA_TASKS_PATH = path.join(DATA_DIR, 'tasks.json');


// --- Sicherstellen, dass Ordner data und JSON-Datei tasks.json existieren ---
await ensureDataFileExist(DATA_DIR, DATA_TASKS_PATH);

const app = express();
const PORT = process.env.PORT || 8080;

// --- Middleware ---
// JSON Body parsen
app.use(express.json());
// Formulardaten parsen (x-www-urlencoded)
app.use(express.urlencoded({ extended: true }));
// Statische Dateien ausliefern (HTML, CSS, JS aus dem Ordner 'public')
app.use(express.static(path.resolve('public')));

// --- REST-API für Tasks einbinden ---
app.use('/api/tasks', router);

// --- Server starten ---
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
