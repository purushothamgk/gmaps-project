// -- Shim.ts:

/**
 * Loads variable from window according to
 * the name parameter.
 * 
 * @export
 * @param {string} name
 * @returns {*} window[name]
 */
export function shim(name: string): any {
    let global: any = window;
    console.log(name , window);
    console.log(global[name]);
    return global[name];
}