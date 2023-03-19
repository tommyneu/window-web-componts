declare namespace tn {

    export type tag_name = `tn-${string}`;

    export type selectorFunc = () => string
    export type initializeFunc = () => void
    export type isInitializeFunc = () => boolean

    export type loadFunc = (new_value:string) => void

    export interface plugin {
        tag_name: tag_name,
        initialize: initializeFunc,
        isInitialized: isInitializeFunc,
    }

    export interface component {
        setTemplate: loadFunc,
        setStyles: loadFunc,
        createElement: loadFunc
    }
}