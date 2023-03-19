export const tag_name:tn.tag_name = "tn-window";

export const initialize:tn.initializeFunc = async function():Promise<void>{
    console.log("init", tag_name);

    if (customElements.get(tag_name) === undefined) {
        const component = await import("../components/window.component") as tn.component;
        console.log("loaded component", tag_name);
        component.createElement(tag_name);
    }
}

export const isInitialized:tn.isInitializeFunc = function(){
    console.log("isInitialized", tag_name);
    return (customElements.get(tag_name) !== undefined);
}
