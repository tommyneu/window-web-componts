import html from '../../templates/button.component.html?inline';
import css from '../../scss/components/button.component.scss?inline';

let templateHTML = html;
let templateCSS = css;

export const setTemplate:dcf.loadFunc = function(newTemplate:string):void {
    console.log("constructor DCFButtonComponent");

    templateHTML = newTemplate;
}

export const setStyles:dcf.loadFunc = function(newStyles:string):void {
    console.log("constructor DCFButtonComponent");
    templateCSS = newStyles;
}

export const createElement:dcf.loadFunc = async function(tag_name: string):Promise<void> {
    console.log("constructor DCFButtonComponent");
    if (customElements.get(tag_name) === undefined) {
        customElements.define(tag_name, DCFButtonComponent);
    }
}

class DCFButtonComponent extends HTMLElement {
    constructor() {
        console.log("constructor DCFButtonComponent");
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `<style>${templateCSS}</style>${templateHTML}`;

        this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }
}
