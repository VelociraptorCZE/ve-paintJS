/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT Licence
 */

import Brush from "./Brush.js";
import Layers from "./Layers.js";
import menuInteraction from "../UI/menuInteraction.js";

export default class Draw {
    constructor() {
        this.brush = new Brush();
        this.layers = new Layers(this);
        this.mode = "_freeMode";
        this.composition = "source-over";
        this.coords = {};
        menuInteraction(this.brush);
        menuInteraction(this, "composition", true);
    }

    draw({ offsetX, offsetY }, preview) {
        let layer;
        if (preview) {
            layer = this.layers.previewLayer;
            layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
        }
        else {
            layer = this.activeLayer;
        }
        this._setLayer(layer);
        this[this.mode](offsetX, offsetY, preview, layer);
    }

    _freeMode(x, y, preview, activeLayer, { brush, coords } = this) {
        activeLayer.beginPath();
        activeLayer.arc(x, y, brush.size, 0, Math.PI * 2);
        activeLayer.fill();
        activeLayer.closePath();
        if (!preview) {
            if (!coords.x1) {
                this._setCoords(x, y);
            }
            activeLayer.beginPath();
            activeLayer.moveTo(coords.x1, coords.y1);
            activeLayer.lineTo(x, y);
            activeLayer.lineWidth = brush.size * 2;
            activeLayer.stroke();
            this._setCoords(x, y);
            activeLayer.closePath();
        }
    }

    _setLayer(activeLayer, { color, opacity } = this.brush) {
        activeLayer.fillStyle = color;
        activeLayer.strokeStyle = color;
        activeLayer.globalAlpha = opacity / 100;
        activeLayer.globalCompositeOperation = this.composition;
    }

    _setCoords(x, y) {
        this.coords.x1 = x;
        this.coords.y1 = y;
    };

    get activeLayer() {
        return this.layers.activeLayer;
    }
}