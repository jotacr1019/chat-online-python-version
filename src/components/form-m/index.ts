import { state } from "../../state";
import "../text/index";


export class Form extends HTMLElement {
    shadowDom = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    render(){
        const texto = this.getAttribute('label') || "";
        const placeholder = this.getAttribute('placeHolder');
        const btnText = this.getAttribute('textBtn');
        this.shadowDom.innerHTML = `
            <Form class="form" style="
                                display: flex;
                                flex-direction: column;
                                gap: 4px;
                                padding: 4px;
                                // border: solid 1px #000;
                                border-radius: 4px;
            ">
                    <custom-text label="${texto}"></custom-text>
                    <div style="
                            display:grid;
                            grid-template-columns: 70% 1fr;
                            gap: 5px;
                    ">
                    <input type="text" name="text" placeholder="${placeholder}" style="
                                                                                    box-sizing: border-box;
                                                                                    font-size: 1.2rem;
                                                                                    font-weight: 500;
                                                                                    height: 50px;
                                                                                    width: 100%;
                                                                                    padding: 0 8px;
                                                                                    color: var(--color-principal);
                                                                                    // background-color: #e1f3f0;
                                                                                    border: 1px solid #000;
                                                                                    border-radius: 4px;
                    "></input>
                    <button style="
                                font-family: 'Roboto';
                                font-size: 1.3rem;
                                font-weight: 500;
                                height: 50px;
                                width: 100%;
                                // margin-top: 14px;
                                color: #000;
                                background-color: #9CBBE9;
                                border: none;
                                border-radius: 4px;
                    ">${btnText}</button>
                    </div>
            </Form>
        `

        const formEl = this.shadowDom.querySelector(".form");
        formEl?.addEventListener("submit", (e)=>{
            e.preventDefault();
            const f = e.target as any;
            const value = f.text.value;
            state.setMessage(value);
            f.text.value = ""
        })
    };
}
customElements.define("custom-form-m", Form)