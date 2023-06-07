const imgUser = require('../../../assets/user.png');
const imgMail = require('../../../assets/mail.png');
import "../../components/header/index" 
import "../../components/text/index"
import { state } from "../../state";


export function initWelcome (params){
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="spinner"></div>
        <custom-header class="header-welcome"></custom-header>
        <div class="container-welcome">
            <custom-text class="text-welcome" variant="title" label="Bienvenido(a) al chat"></custom-text>
            <Form class="form-welcome">
                <div class="div-email">
                    <custom-text label="Email"></custom-text>
                    <input class="imput-email" type="text" name="email" placeholder="Ingresa un email"></input>
                </div>
                <div class="div-name">
                    <custom-text label="Tu nombre"></custom-text>
                    <input class="imput-name" type="text" name="name" placeholder="Ingresa un nombre"></input>
                </div>
                <div class="div-room">
                    <custom-text label="Room" for="room-select"></custom-text>    
                    <select class="select-id" name="rooms" id="room-select">
                        <option value="">--Elige una opción--</option>
                        <option value="nuevo">Nuevo room</option>
                        <option value="existente">Room existente</option>
                    </select>
                </div>
                <div class="div-id">
                    <custom-text label="Room id:"></custom-text>
                    <input class="imput-id" type="text" name="id" placeholder="Ingresa un id"></input>
                </div>
                <button class="btn-start">Iniciar chat</button>
            </Form>
        </div>
        `
    div.className = "root-welcome";    

    const spinner: any = div.querySelector(".spinner");
    spinner.style.display = "none";

    const formEl = div.querySelector(".form-welcome");
    const idDiv:any = div.querySelector(".select-id")
    const idEl:any = div.querySelector(".div-id")
    
    idDiv.addEventListener('change', (e)=>{
        const f = e.target as any;
        if(f.value === 'existente'){
            idEl.style.visibility = 'visible'
        }
    })
    
    formEl?.addEventListener("submit", (e)=>{
        e.preventDefault();
        const data = new FormData(e.target as any);
        const value = Object.fromEntries(data.entries()) as any;

        if(value.rooms === 'existente'){
            displaySpinner()

            state.setRoomId(value.id, ()=>{
                const capitalizedName = capitalizeFirstTwoWords(value.name)
                state.setUser(capitalizedName, value.email, ()=>{
                    state.authUser(()=>{
                        state.getRoom(()=>{
                            params.goTo("/chat")
                        })
                    })
                })
            })

        } else {
            displaySpinner()

            const capitalizedName = capitalizeFirstTwoWords(value.name)
            state.setUser(capitalizedName, value.email, ()=>{
                state.createUserInDB(()=>{
                    state.createRoom().then(()=>{
                        params.goTo("/chat")
                    })
                })
            })
        }
    })

    function displaySpinner(){
        const containerEl: any = document.querySelector(".container-welcome");
        const btnStart: any = div.querySelector(".btn-start");
        btnStart.style.pointerEvents =  "none";
        spinner.style.display = "block";
        spinner.style.position = "absolute";
        spinner.style.zIndex = "1";
        spinner.style.top = "48%";
        spinner.style.left = "41.5%";
        containerEl.style.filter = "blur(1px)";
        
        if (window.matchMedia("(min-width: 500px)").matches) {
            spinner.style.width = "80px";
            spinner.style.top = "40%";
            spinner.style.left = "42%";
        }
        
        if (window.matchMedia("(min-width: 630px)").matches) {
            spinner.style.width = "90px";
            spinner.style.top = "40%";
            spinner.style.left = "44%";
        }
        if (window.matchMedia("(min-width: 750px)").matches) {
            spinner.style.width = "90px";
            spinner.style.top = "40%";
            spinner.style.left = "45%";
        }
        if (window.matchMedia("(min-width: 900px)").matches) {
            spinner.style.width = "90px";
            spinner.style.top = "40%";
            spinner.style.left = "46%";
        }
        if (window.matchMedia("(min-width: 1040px)").matches) {
            spinner.style.width = "90px";
            spinner.style.top = "40%";
            spinner.style.left = "47%";
        }
    }

    return div;
}

function capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function capitalizeFirstTwoWords(name: string) {
    let words = name.split(" ");
    if (words.length >= 2) {
        return words.slice(0, 2).map(word => capitalizeFirstLetter(word)).join(" ") +
            " " + words.slice(2).map(word => capitalizeFirstLetter(word)).join(" ");
    } else {
        return capitalizeFirstLetter(name);
    }
}