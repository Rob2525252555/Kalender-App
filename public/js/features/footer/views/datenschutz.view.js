import dom from "../../../core/dom.js"
import elements from "../../../core/elements.js"

/**
 * @module datenschutz.view
 * Rendert die Datenschutz Ansicht im Modal
 * Erstellt Titel und Inhalt auf Basis der übergebenen Daten
 *  
 * @param {object} contentData
 * @param {title: string} - Titel des Datenschutz-Textes
 * @param {content: string} - Inhalt des Datenschutz-Textes
 */

export function renderDatenschutz(contentData) {

    const container = dom.create({
        tagName: 'div',
        parent: elements.modalContent
    });

    dom.create({
        tagName: 'h2',
        classList: ['datenschutz__headline'],
        innerText: contentData.title,
        parent: container,
    });

    dom.create({
        tagName: 'p',
        innerText: contentData.content,
        parent: container
    });
}