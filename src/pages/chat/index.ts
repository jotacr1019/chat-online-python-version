import "../../components/header/index" 
import "../../components/text/index"
import "../../components/form-m/index"
import "../../components/chat-container/index"
import { state } from "../../state"


export function initChat (params){
    const div = document.createElement("div");
    const currentState = state.getState()

    div.innerHTML = `
        <custom-header class="header-welcome"></custom-header>
        <div class="container-chat">
            <custom-text class="chat-title" label="Chat" variant="title"></custom-text>
            <label>Room id: ${currentState.roomId}</label>
            <custom-chat class="messages-container"></custom-chat>
            <custom-form-m placeHolder="Ingresa un mensaje" textBtn="Enviar"></custom-form-m>
        </div>
    `
    div.className = "root-chat"; 

    return div;
}