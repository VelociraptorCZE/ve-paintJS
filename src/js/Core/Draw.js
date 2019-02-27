/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

import Brush from "./Brush.js";
import Layers from "./Layers.js";
import Exceptions from "../Service/Exceptions.js";
import { getMenu } from "../UI/menu.js";
import TextMode from "./TextMode.js";

export default class Draw {
    constructor() {
        this.brush = new Brush();
        this.text = new TextMode(this);
        this.layers = new Layers(this);
        this.font = "300 20px sans-serif";
        this._mode = "_freeMode";
        this.composition = "source-over";
        this.coords = {};
    }

    set mode(name) {
        this._mode = name;
        document.querySelector(`[data-name=${name}]`).checked = true;
    }

    draw({ offsetX, offsetY, touches = [{}] }, preview) {
        let layer, { clientX, clientY } = touches[0];
        if (preview) {
            layer = this.layers.previewLayer;
            layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
        }
        else {
            layer = this.activeLayer;
        }
        this._prepareLayer(layer);

        if (this[this._mode]) {
            this[this._mode](offsetX || clientX, offsetY || (clientY - getMenu().clientHeight), preview, layer);
        }
        else {
            if (!this._thrown) {
                this._thrown = true;
                throw Exceptions.notImplemented(this._mode, "Draw");
            }
        }
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

    _textMode(x, y, preview, activeLayer) {
        activeLayer.font = this.font;
        activeLayer.fillText(this.text.currentText, x, y);
    }

    _prepareLayer(activeLayer, { color, opacity, blur } = this.brush) {
        activeLayer.fillStyle = color;
        activeLayer.strokeStyle = color;
        activeLayer.globalAlpha = opacity / 100;
        activeLayer.globalCompositeOperation = this.composition;
        activeLayer.filter = `blur(${blur}px)`;
    }

    _setCoords(x, y) {
        this.coords.x1 = x;
        this.coords.y1 = y;
    }

    defaultFallback() {
        window.__defaultImage__ = this.activeLayer.canvas.toDataURL();
    }

    get activeLayer() {
        return this.layers.activeLayer;
    }
}