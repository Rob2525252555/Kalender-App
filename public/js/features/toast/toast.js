import dom from "../../core/dom.js";
import elements from "../../core/elements.js";

/**
 * @module toast
 * 
 * Zeigt einen Toast oben rechts an.
 * Ablauf:
 * - Prüft, ob ein Toast-Container bereits existiert
 * - Rendert den Toast-Container oben rechts im DOM und speichert die Referenz
 * - Innerhalb des Toast-Containers wird der Toast gerendert
 * - Startet Einblend- und Ausblendanimation
 * - Nach Ablauf der Zeit wird der Toast ausgeblendet
 * - Nach Ende der Animation wird der Toast aus dem DOM entfernt
 * @param {string} message - Die Nachricht die im Toast angezeigt wird
 * @param {string} type - 'success'|'error'|'info' (bestimmt Hintergrundfarbe)
 * @param {number} duration - Zeit in ms, wie lange der Toast sichtbar bleibt
 */
export function showToast(message, type = 'info', duration=3000){
    if(!elements.toastContainer){
    const toastContainer = dom.create({
        tagName: 'div',
        classList: ['toast-container'],
        parent: document.body
        });

    elements.toastContainer = toastContainer;
    }

    const toast = dom.create({
        tagName: 'div',
        classList: ['toast', `toast--${type}`],
        innerText: message,
        parent: elements.toastContainer
    });

    // Notwendig, damit Einblendanimation funktioniert.
    // Sorgt dafür, dass der Browser den initialen Zustand zuerst rendert
    // (opacity: 0 und transform: translateY(-20px) scale(0.95)).
    // Sonst wird die Einblendanimation nicht ausgeführt, weil sofort der Endzustand gerendert wird.
    toast.offsetHeight; 
    
    // Einblendanimation
    toast.classList.add('toast--show');

    setTimeout(() => {
        // Ausblendanimation
        toast.classList.remove('show');

        // Nach Ende der Ausblendanimation wird Toast aus dem DOM entfernt
        toast.addEventListener('transitionend', () => {
            toast.remove();
        }, { once: true });
    }, duration);
}