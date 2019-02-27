/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

import immutableProperty from "../Service/immutableProperty.js";

export default function Brush() {
    this.color = "#000";
    this.size = 4;
    this.opacity = 100;
    this.blur = 0;
    immutableProperty(this, "name", "brush");
}