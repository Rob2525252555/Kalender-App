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
     * @param {string} [type = ''] - type für Input-Elemente oder Buttons
     * @param {string} [value = ''] - Wert eines HTML-Elements (z.B. input)
     * @param {string} [title = ''] - Tooltip-Text, der beim Hover angezeigt wird
     * @param {string} [htmlFor = ''] - Verknüpft Label mit Inputfeld über die ID (for-Attribut).
     * @param {boolean} [required = false] - Setzt input, textarea oder select als Pflichtfeld.
     * @param {string[]} [classList = []] - Hinzufügen, entfernen oder toggeln von Css Klassen
     * @param {HTMLElement} [parent = null] - Parent Element des neuen HTML-Elements
     * @param {'append'|'prepend'|'before'|'after'} [insert = 'append'] - Art wie das HTML-Element an das Parent-Element angehängt wird.
     * @param {object<string, string>} [dataset = {}] - Key-Value-Paare für dataset Attribute z.B. data-id.
     * 
     * @returns {HTMLElement} - Das neu erstellte HTML-Element
     * 
     * @example
     * dom.create({
        tagName: 'button',
        innerText: 'click button',
        classList: ['btn', 'big-button'],
        dataset: {
            id: id,
            start: startDate,
            end: endDate
        },
        parent: document.body
      });
     */
    create({
        tagName = 'div',
        
        innerText = '',
        innerHTML = '',
        id = '',

        name = '',
        type = '',
        value = '',
        title = '',
        htmlFor = '',

        required = false,

        classList = [],

        parent = null,
        insert = 'append',

        dataset = {},

    }={}){

        const newElement = document.createElement(tagName);
        if(id) newElement.id = id;
        if(name) newElement.name = name;
        if(type) newElement.type = type;
        if(value) newElement.value = value;
        if(classList.length) newElement.classList.add(...classList);
        if(title) newElement.title = title;

        // htmlFor nur bei Label-Elementen setzen.
        if(htmlFor && tagName === 'label') newElement.htmlFor = htmlFor;

        // required Attribut nur bei Elementen hinzufügen zu denen es passt
        if(required && (tagName === 'input' || tagName === 'textarea' || tagName === 'select')) {
        newElement.required = true;
        }

        // innerHTML hat Vorrang vor innertext
        if(innerHTML) newElement.innerHTML = innerHTML;
        else if(innerText) newElement.innerText = innerText;

        // dataset Attribute hinzufügen  
        Object.entries(dataset).forEach(([key,value])=>{
        newElement.dataset[key] = value;
        });

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