/**
 * 获取WebGL上下文
 * @param { CanvasElement } element 
 * @param { boolean }  debug 
 */
function getWebGLContext(element, debug) {
    try {
        return element.getContext('webgl') || element.getContext('expeimental-webgl')
    } catch (error) {
        debug && console.dir(error)
    }

}