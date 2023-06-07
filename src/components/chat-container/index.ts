import { state } from "../../state"


type Message = {
    user: string,
    message: string
}

class Chat extends HTMLElement {
    connectedCallback(){
        state.subscribe(()=>{
            const currentState = state.getState();
            this.messages = currentState;
            this.render();
        })
        this.render()
    }

    messages: Message[] = []

    render() {
        const currentState = state.getState();
        this.messages = currentState;
        
        const chatWindow = document.createElement('div'); 
        chatWindow.id = 'chat-window';
        chatWindow.className = 'container2 chat-window';
        chatWindow.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 4px;
            height: 100%;
            padding: 10px 12px;
            border-top: 1px solid;
            overflow-y: scroll;
        `;

        const messagesContainer = document.createElement('div');
        messagesContainer.style.cssText = `
            display: flex;
            flex-direction: column-reverse;
            gap: 4px;
        `;

        this.messages['messages'].reverse().forEach((msj) => {
            const messageDiv = document.createElement('div');
            const userSpan = document.createElement('span');
            const contentDiv = document.createElement('div');
            const contentHour = document.createElement('span');
            
            if (currentState.user === msj.user) {
                messageDiv.className = 'div-uni-1';
                userSpan.className = 'span-1';
                userSpan.textContent = msj.user || 'Usuario';
                contentDiv.className = 'msjs-1';
                contentDiv.textContent = msj.message.message;
                contentHour.className = 'span-hour-1';
                contentHour.textContent = msj.message.date.split(",")[1].slice(0, 9);
            } else {
                messageDiv.className = 'div-uni-2';
                userSpan.className = 'span-2';
                userSpan.textContent = msj.user || 'Usuario';
                contentDiv.className = 'msjs-2';
                contentDiv.textContent = msj.message.message;
                contentHour.className = 'span-hour-2';
                contentHour.textContent = msj.message.date.split(",")[1].slice(0, 9);
            }

            messageDiv.appendChild(userSpan);
            messageDiv.appendChild(contentDiv);
            contentDiv.appendChild(contentHour);
            messagesContainer.appendChild(messageDiv);
        });

        chatWindow.appendChild(messagesContainer);
        this.innerHTML = '';
        this.appendChild(chatWindow);

        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

customElements.define("custom-chat", Chat)
