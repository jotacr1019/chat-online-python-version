export class Typografy extends HTMLElement {
    constructor(){
        super();
        this.render();
    }
    render(){
        const shadowDom = this.attachShadow({mode: "open"});
        const variant = this.getAttribute("variant") || "normal-high";
        const label = this.getAttribute('label')
        const span = document.createElement("span");
        const style = document.createElement("style");

        style.innerHTML = `
            .title{
                font-family: 'Roboto';
                font-size: 3.2rem;
                font-weight: 700;
            }
            .normal-high{
                font-family: 'Roboto';
                font-size: 1.4rem;
                font-weight: 500;
            }
            .normal-short{
                font-family: 'Roboto';
                font-size: 1.1rem;
                font-weight: 400;
            }
        `

        span.className = variant;
        span.textContent = label;
        shadowDom.appendChild(style);
        shadowDom.appendChild(span);
    };
}
customElements.define("custom-text", Typografy)