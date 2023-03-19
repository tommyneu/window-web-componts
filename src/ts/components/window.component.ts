import html from '../../templates/window.component.html?inline';
import css from '../../scss/components/window.component.scss?inline';

let templateHTML = html;
let templateCSS = css;

export const setTemplate:tn.loadFunc = function(newTemplate:string):void {
    console.log("Set template TNWindowComponent");

    templateHTML = newTemplate;
}

export const setStyles:tn.loadFunc = function(newStyles:string):void {
    console.log("Set styles TNWindowComponent");
    templateCSS = newStyles;
}

export const createElement:tn.loadFunc = async function(tag_name:string):Promise<void> {
    console.log("Create element TNWindowComponent");
    if (customElements.get(tag_name) === undefined) {
        customElements.define(tag_name, TNWindowComponent);
    }
}

class TNWindowComponent extends HTMLElement {
    min_width: number = 200;
    min_height: number = 200;

    width: number = 400;
    height: number = 400;
    x: number = 100;
    y: number = 100;

    close_button: HTMLButtonElement
    minimize_button: HTMLButtonElement
    expand_button: HTMLButtonElement

    main_content: HTMLDivElement

    constructor() {
        console.log("constructor TNWindowComponent");
        super();
        this.attachShadow({ mode: 'open' });

        this.setUpDom()
        this.createEventListeners()
    }

    static get observedAttributes(){
        return ['width', 'height', 'x', 'y'];
    }

    attributeChangedCallback(name:string, oldValue:any, newValue:any) {
        switch(name){
            case "width":
                if(newValue >= this.min_width){
                    this.width = newValue
                }
                break
            case "height":
                if(newValue >= this.min_height){
                    this.height = newValue
                }
                break
            case "x":
                this.x = newValue
                break
            case "y":
                this.y = newValue
                break
        }

        if(this.isConnected){
            this.setSizeAndPos()
        }
    }

    setSizeAndPos(){
        console.log("setSizeAndPos", this.width, this.height, this.x, this.y)
        this.main_content.style.width = `${this.width}px`;
        this.main_content.style.height = `${this.height}px`;
        this.style.top = `${this.y}px`;
        this.style.left = `${this.x}px`;
    }

    setUpDom(){
        if (this.shadowRoot == null) {
            throw new Error('Error making shadow root');
        }

        const template = document.createElement('template');
        template.innerHTML = `<style>${templateCSS}</style>${templateHTML}`;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const main_content = this.shadowRoot.getElementById('main') as HTMLDivElement
        if (main_content == null || main_content.tagName != "DIV") {
            throw new Error('Error main content does not exist or is not a div')
        }
        this.main_content = main_content

        const close_button = this.shadowRoot.getElementById('close_button') as HTMLButtonElement
        if (close_button == null || close_button.tagName != "BUTTON") {
            throw new Error('Error close button does not exist or is not a button')
        }
        this.close_button = close_button

        this.setSizeAndPos()
    }

    createEventListeners(){
        this.close_button.addEventListener("click", () => {
            this.remove()
        })
    }
}
