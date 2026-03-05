/**
 * @module dom
 * Hilfsmodul zur Erstellung von dynamischen HTML-Elementen
 */

const dom = {
    /**
     * Erstelle ein HTML-Element und füge es optional in die DOM-Struktur ein
     * 
     * HTML-Eigenschaften für das neue Element
     * @param {string} [tagName = 'div'] - Tag-Name des HTML-Elements
     * @param {string} [innerText = ''] - Textinhalt des HTML-Elements
     * @param {string} [innerHTML = ''] - HTML-Inhalt des HTML-Elements. Hat Vorrang vor innerText.
     * @param {string} [id = ''] - Id des HTML Elements
     * @param {string} [name = ''] - Name-Attribut (z.B. für Formulare)
     * @param {string} [type = ''] - Type für Input-Elemente oder Buttons
     * @param {string} [value = ''] - Wert eines HTML-Elements (z.B. input)
     * @param {string} [className = ''] - CSS-Klasse/n einem HTML-Element zuweisen (überschreibt alle vorhandenen Klassen)
     * @param {string[]} [classList = []] - Hinzufügen, entfernen oder toggeln von Css Klassen
     * @param {HTMLElement} [parent = null] - Parent Element des neuen HTML-Elements
     * @param {'append'|'prepend'|'before'|'after'} [insert = 'append'] - Art wie das HTML-Element an das Parent-Element angehängt wird.
     * @param {object<string, Function>} [eventListeners = {}] - Key-Value-Paare für Eventlistener. Key = Eventname, Value = Funktion.
     * 
     * @returns {HTMLElement} - Das neu erstellte HTML-Element
     * 
     * @example
     * dom.create({
     * tagName: 'button',
     * innerText: 'click button',
     * classList: ['btn', 'big-button'],
     * parent: document.body,
     * eventListeners: { click: () => foo() }
     * });
     */
    create({
        tagName = 'div',
        
        innerText = '',
        innerHTML = '',
        id = '',

        name = '',
        type = '',
        value = '',

        className = '',
        classList = [],

        parent = null,
        insert = 'append',

        eventListeners = {},

    }={}){

        const newElement = document.createElement(tagName);
        if(id) newElement.id = id;
        if(name) newElement.name = name;
        if(type) newElement.type = type;
        if(value) newElement.value = value;
        if(className) newElement.className = className;
        if(classList.length) newElement.classList.add(...classList);

        if(innerText) newElement.innerText = innerText;
        else if(innerHTML) newElement.innerHTML = innerHTML;

        // Eventlistener hinzufügen
        Object.entries(eventListeners).forEach(el => newElement.addEventListener(...el));

        // Element einfügen
        if(parent){
            switch(insert){
                case 'append': parent.append(newElement);break;
                case 'prepend': parent.prepend(newElement);break;
                case 'before': parent.before(newElement);break;
                case 'after': parent.after(newElement);break;
            }
        }
    return newElement;
    }

};

export default dom;