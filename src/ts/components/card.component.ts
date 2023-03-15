import html from '../../templates/card.component.html?inline';
import css from '../../scss/components/card.component.scss?inline';

let templateHTML = html;
let templateCSS = css;

export const setTemplate:dcf.loadFunc = function(newTemplate:string):void {
    console.log("Set template DCFCardComponent");

    templateHTML = newTemplate;
}

export const setStyles:dcf.loadFunc = function(newStyles:string):void {
    console.log("Set styles DCFCardComponent");
    templateCSS = newStyles;
}

export const createElement:dcf.loadFunc = async function(tag_name:string):Promise<void> {
    console.log("Create element DCFCardComponent");
    if (customElements.get(tag_name) === undefined) {
        customElements.define(tag_name, DCFCardComponent);
    }
}

class DCFCardComponent extends HTMLElement {
    constructor() {
        console.log("constructor DCFCardComponent");
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `<style>${templateCSS}</style>${templateHTML}`;

        this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }
}
