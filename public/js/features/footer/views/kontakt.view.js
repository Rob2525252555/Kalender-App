import dom from "../../../core/dom.js"
import elements from "../../../core/elements.js"

/**
 * @module kontakt.view
 * Rendert die Kontakt Ansicht im Modal
 * Erstellt Titel und Inhalt auf Basis der übergebenen Daten
 *  
 * @param {object} contentData
 * @param {title: string} - Titel des Kontakt-Textes
 * @param {content: string} - Inhalt des Kontakt-Textes
 */

export function renderKontakt(contentData) {

    const footerContent = dom.create({
        tagName: 'div',
        parent: elements.modalContent
    });

    dom.create({
        tagName: 'h2',
        classList: ['kontakt__headline'],
        innerText: contentData.title,
        parent: footerContent,
    });

    dom.create({
        tagName: 'p',
        innerText: contentData.content,
        parent: footerContent
    });
}