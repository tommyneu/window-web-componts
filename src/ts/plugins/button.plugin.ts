export const tag_name:dcf.tag_name = "dcf-button";

export const initialize:dcf.initializeFunc = async function():Promise<void>{
    console.log("init", tag_name);

    if (customElements.get(tag_name) === undefined) {
        const component = await import("../components/button.component") as dcf.component;
        console.log("loaded component", tag_name);
        component.createElement(tag_name);
    }
}

export const isInitialized:dcf.isInitializeFunc = function(){
    console.log("isInitialized", tag_name);
    return (customElements.get(tag_name) !== undefined);
}
