/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT Licence
 */

export default function getAllLayers() {
    return [...document.getElementById("canvas-area")
        .querySelectorAll("canvas")]
        .filter(canvas => !/canvas-preview|canvas-final/.test(canvas.id));
}