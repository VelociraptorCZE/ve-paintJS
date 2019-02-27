/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

import getAllLayers from "../UI/canvas.js";
import { setLayerResolution } from "../UI/canvas.js";
import WolfuixElemFactory from "wolfuix/js/dom/WolfuixElemFactory.js";

export default function fileOptions(drawInstance) {
    let fitImage = false;
    const elems = WolfuixElemFactory.getElems({
        newFile: "menu-file-new",
        saveFile: "menu-file-save",
        loadFile: "menu-file-load",
        loadFileFit: "menu-file-load-fit",
        saveFileLink: "img-save-link",
        loadFileInput: "img-load-input"
    });

    elems.newFile.addEventListener("click", () => {
        getAllLayers().forEach(canvas => {
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        });
        drawInstance.layers.resetAllPreviews();
    });

    elems.saveFile.addEventListener("click", () => saveImage(elems.saveFileLink));

    window.addEventListener("keydown", e => {
        if (e.ctrlKey) {
            if (e.key === "s") {
                e.preventDefault();
                saveImage(elems.saveFileLink);
            }
            if (e.key === "l") {
                fitImage = false;
                loadImage(elems.loadFileInput);
            }
        }
    });

    const loadImgEvents = [
        { fit: false, el: elems.loadFile },
        { fit: true, el: elems.loadFileFit }
    ];

    loadImgEvents.forEach(({ fit, el }) => {
        el.addEventListener("click", () => {
            fitImage = fit;
            loadImage(elems.loadFileInput);
        });
    });

    elems.loadFileInput.addEventListener("change", ({ target }) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const img = new Image();
            img.onload = () => {
                if (!fitImage) {
                    setLayerResolution(img.naturalWidth, img.naturalHeight);
                }
                drawInstance.activeLayer.drawImage(img, 0, 0);
                target.value = "";
            };
            img.src = fileReader.result.toString();
        };

        try {
            fileReader.readAsDataURL(target.files[0]);
        }
        catch (_) {}
    });
}

function saveImage(saveFileLink) {
    saveFileLink.href = getImage();
    saveFileLink.download = "painting.png";
    saveFileLink.click();
}

function loadImage(loadFileInput) {
    loadFileInput.click();
}

function getImage() {
    const layers = getAllLayers();
    const finalCanvas = document.getElementById("canvas-final").getContext("2d");
    finalCanvas.clearRect(0, 0, finalCanvas.canvas.width, finalCanvas.canvas.height);
    layers.forEach(layer => {
        finalCanvas.drawImage(layer, 0, 0);
    });
    return finalCanvas.canvas.toDataURL();
}