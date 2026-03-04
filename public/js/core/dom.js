const dom = {
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