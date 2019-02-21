/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT Licence
 */

import getAllLayers from "../UI/canvas.js";
import WolfuixElemFactory from "../../../node_modules/wolfuix/js/dom/WolfuixElemFactory.js";

export default function fileOptions() {
    const elems = WolfuixElemFactory.getElems({
        newFile: "menu-file-new",
        saveFile: "menu-file-save",
        saveFileLink: "img-save-link"
    });

    elems.newFile.addEventListener("click", () => {
        getAllLayers().forEach(canvas => {
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        });
    });

    elems.saveFile.addEventListener("click", () => {
        const { saveFileLink } = elems;
        saveFileLink.href = getImage();
        saveFileLink.download = "painting.png";
        saveFileLink.click();
    });
}

function getImage() {
    const layers = getAllLayers();
    const finalCanvas = document.getElementById("canvas-final").getContext("2d");
    layers.forEach(layer => {
        finalCanvas.clearRect(0, 0, finalCanvas.canvas.width, finalCanvas.canvas.height);
        finalCanvas.drawImage(layer, 0, 0);
    });
    return finalCanvas.canvas.toDataURL();
}