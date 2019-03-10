/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

import WolfuixElemFactory from "../../../node_modules/wolfuix/js/dom/WolfuixElemFactory.js";
import DragDropComponent from "../../../node_modules/wolfuix/js/components/DragDropComponent.js";
import getAllLayers from "../UI/canvas.js";
import { setLayerResolution } from "../UI/canvas.js";

export default class LayerManager {
    constructor() {
        this.elems = WolfuixElemFactory.getElems({
            area: "canvas-area",
            create: "menu-layer-create",
            menuLayerManager: "menu-layer-manager",
            layerManager: "layer-manager",
            exit: "layer-manager__exit",
            layerSize: "menu-layer-size"
        });

        this.defaultPreview = "canvas-main-preview";
        this.previewClass = "layer-manager-preview";
        new DragDropComponent("layer-manager", "layer-manager__upper-bar");
        this._initListeners();
    }

    _initListeners({ elems } = this) {
        [elems.exit, elems.menuLayerManager].forEach(elem => {
            elem.addEventListener("click", () => elems.layerManager.classList.toggle("d-none"));
        });

        window.addEventListener("click", ({ target }) => {
            this.switchLayer(target);
            if (target.classList.contains("remove-layer")) {
                this.removeLayer(target.parentElement);
            }
        });

        elems.create.addEventListener("click", () => this.addLayer());
        elems.layerSize.addEventListener("click", () => this._setLayerResolution());
    }

    _setLayerResolution() {
        try {
            const { width, height } = this.activeLayer.canvas;
            const res = prompt("New layer resolution in px: (w, h)", `${width}, ${height}`)
                .replace(/\s+/, "")
                .split(",")
                .map(res => Number(res));

            setLayerResolution(...res);
            this.drawInstance.defaultFallback();
            this.resetAllPreviews();
        }
        catch (_) {}
    }

    switchLayer(target = this.defaultPreview, { previewClass } = this) {
        target = target instanceof Element ? target : document.getElementById(target);
        if (target.classList.contains(previewClass)) {
            this.previewImages.forEach(preview => preview.classList.remove("active"));
            target.classList.add("active");
            this.activeLayer = target.id;
        }
    }

    addLayer({ activeLayer, allLayers, area } = Object.assign(this, this.elems)) {
        const { width, height } = activeLayer.canvas;
        const canvas = document.createElement("canvas");
        canvas.id = `custom-canvas-${allLayers.length}`;
        canvas.width = width;
        canvas.height = height;
        area.append(canvas);
        allLayers.push(canvas);
        this._checkLayers();
        this.addPreview();
    }

    addPreview() {
        const layers = getAllLayers();
        layers.forEach(layer => {
            const id = layer.id + "-preview";
            if (!document.getElementById(id)) {
                const source = `
                <div class="layer-manager__item">
                    <div contenteditable="true">${LayerManager.canvasId(id)}</div>
                    <img src="" alt="" id="${id}" class="${this.previewClass}">
                    <br>
                    <button class="button remove-layer">🗑️</button>
                </div>`;
                LayerManager.layerManagerContent.innerHTML += source;
                this.switchLayer(id);
                this.renderPreviewImage();
            }
        });
    }

    removeLayer(el) {
        const img = el.querySelector("img");
        if (img.id === this.defaultPreview) {
            alert("It's not possible to remove main layer.");
        }
        else {
            if (confirm("Do you really want to remove this layer?")) {
                document.getElementById(LayerManager.canvasId(img.id)).remove();
                el.remove();
                this._activeLayer = 0;
                this.switchLayer();
            }
        }
    }

    resetAllPreviews() {
        try {
            this.previewImages.forEach(preview => {
                preview.src = window.__defaultImage__;
            });
        }
        catch (_) {}
    }

    renderPreviewImage({ activeLayer, activePreviewImg } = this) {
        activePreviewImg.src = activeLayer.canvas.toDataURL();
    }

    get activePreviewImg() {
        return document.getElementById(this.activeLayer.canvas.id + "-preview");
    }

    get previewImages() {
        return [...document.getElementsByClassName(this.previewClass)];
    }

    static canvasId(previewId) {
        return previewId.replace(/-preview$/, "");
    }

    static get layerManagerContent() {
        return document.getElementById("layer-manager__content");
    }
}