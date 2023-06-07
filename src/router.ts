import { initWelcome } from "../src/pages/welcome/index";
import { initChat } from "../src/pages/chat/index";


const BASE_PATH = "chat-online-project";

function isGithubPages() {
    return location.host.includes("github.io");
}

export function initRouter (container: Element | null){
    function goTo(path){
        const completePath = isGithubPages() ? BASE_PATH + path : path;
        history.pushState({}, "", completePath);
        handleRoute(completePath);
    }

    function handleRoute(route){
        const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;
        const routes = [
            {
                path: /\/welcome/,
                component: initWelcome
            },
            {
                path: /\/chat/,
                component: initChat 
            }
        ];
        for(const r of routes){
            if(r.path.test(route)){
                
                const el = r.component({ goTo: goTo });
                if(container?.firstChild){
                    container.firstChild.remove();
                }
                container?.appendChild(el);
            }
        }
    }
    if(location.pathname === "/" || location.host.includes("github.io")){
        goTo("/welcome")
    } else {
        handleRoute(location.pathname);
    }
    window.onpopstate = function (){
        handleRoute(location.pathname);
    }
}