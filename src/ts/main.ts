import * as window_plugin from "./plugins/window.plugin";
import * as button_plugin from "./plugins/button.plugin";

let plugins: Array<tn.plugin> = [];

plugins.push(window_plugin);
plugins.push(button_plugin);

console.log("Plugins loaded");

plugins.forEach((plugin) => {
    console.log("Testing for", plugin.tag_name);
    if (document.querySelector(plugin.tag_name) !== null) {
        plugin.initialize()
    } else {
        console.log("None Found for", plugin.tag_name);
    }
})

const mutationCallback:MutationCallback = function(mutationList){
    mutationList.forEach((mutationRecord) => {
        mutationRecord.addedNodes.forEach((nodeAdded) => {
            if (nodeAdded instanceof Element) {
                plugins.forEach((plugin) => {
                    if (!plugin.isInitialized() && nodeAdded.matches(plugin.tag_name) ) {
                        plugin.initialize()
                    }
                })
            }
        })
    });
}

const observer = new MutationObserver(mutationCallback)
const observerConfig = {
    subtree: true,
    childList: true,
}
observer.observe(document.body, observerConfig)

// TODO: if the dom is changed and I find the selector in the new stuff then check if plugin is initialized and if not initialize it
