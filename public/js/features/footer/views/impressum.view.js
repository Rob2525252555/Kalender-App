import dom from "../../../core/dom.js"
import elements from "../../../core/elements.js"

/**
 * @module impressum.view
 * Rendert die Impressum Ansicht im Modal
 * Erstellt Titel und Inhalt auf Basis der übergebenen Daten
 * 
 * @param {object} contentData 
 * @param {title: string} - Titel des Impressum-Textes
 * @param {content: string} - Inhalt des Impressum-Textes
 */

export function renderImpressum(contentData) {

    const footerContent = dom.create({
        tagName: 'div',
        parent: elements.modalContent
    });

    dom.create({
        tagName: 'h2',
        classList: ['impressum__headline'],
        innerText: contentData.title,
        parent: footerContent,
    });

    dom.create({
        tagName: 'p',
        innerText: contentData.content,
        parent: footerContent
    });
}