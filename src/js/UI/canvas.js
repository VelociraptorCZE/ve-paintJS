/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

import { getMenu } from "./menu.js";

export default function getAllLayers(onlyCustom = true) {
    return [...document.getElementById("canvas-area")
        .querySelectorAll("canvas")]
        .filter(canvas => onlyCustom ? !/canvas-preview|canvas-final/.test(canvas.id) : true);
}

export function setLayerResolution(width = innerWidth - 32, height = innerHeight - getMenu().clientHeight) {
    getAllLayers(false).forEach(layer => {
        layer.width = width;
        layer.height = height;
    });
}