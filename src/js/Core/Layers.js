/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

import LayerManager from "./LayerManager.js";

export default class Layers extends LayerManager {
    constructor(drawInstance) {
        super();
        this.drawInstance = drawInstance;
        this.isActive = false;
        this.previewLayer = document.getElementById("canvas-preview").getContext("2d");
        this.allLayers = [document.getElementById("canvas-main")];
        this._activeLayer = 0;
        this._checkLayers();
        this._initLayerListeners();
        this.addPreview();
    }

    _initLayerListeners({ previewLayer, drawInstance } = this) {
        const drawEvents = [
            {
                target: previewLayer.canvas,
                listener: "mousedown",
                active: true,
                callback: (e, { activeLayer } = this) => {
                    const img = new Image();
                    img.src = activeLayer.canvas.toDataURL();
                    window.__backup__ = { img: img, layer: activeLayer };
                }
            },
            {
                target: window,
                listener: "mouseup",
                active: false,
                callback: () => {
                    if (drawInstance._mode === "_freeMode") {
                        drawInstance.coords = {};
                    }
                    this.renderPreviewImage();
                }
            },
            {
                target: previewLayer.canvas,
                listener: "mouseup",
                active: false,
                callback: e => {
                    drawInstance.draw(e);
                }
            }
        ];

        drawEvents.forEach(({ target, listener, active, callback }) =>
            target.addEventListener(listener, e => {
            this.isActive = active;
            callback && callback(e);
        }));

        ["mousemove", "touchmove"].forEach(ev => {
            previewLayer.canvas.addEventListener(ev, e => {
                if (this.isActive || ev === "touchmove") {
                    drawInstance.draw(e);
                }
                drawInstance.draw(e, true);
            }, { passive: true, capture: true });
        });
    }

    _checkLayers() {
        this.allLayers = this.allLayers.map(layer => layer instanceof Element ? layer.getContext("2d") : layer);
    }

    get activeLayer() {
        return this.allLayers[this._activeLayer];
    }

    set activeLayer(id) {
        const match = id.match(/\d+/);
        this._activeLayer = match ? match.toString() : 0;
    }
}