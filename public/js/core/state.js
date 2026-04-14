/**
 * @module state
 * Zentraler Zustand der App.
 * Speichert alle Tasks, sowie aktuell ausgewähltes Jahr und Monat.
 */

const today = new Date();

const state ={
    // Alle Tasks 
    tasks: [],
    selectedYear: today.getFullYear(),
    selectedMonth: today.getMonth()
};

export default state;