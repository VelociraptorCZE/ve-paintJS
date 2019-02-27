/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

export default function TextMode(drawInstance) {
    this.currentText = "";
    const menuText = document.getElementById("menu-new-text"),
        setFont = document.getElementById("menu-set-font");

    menuText.addEventListener("click", () => {
        this.currentText = prompt("Type a text: ", "Sample text") || "";
        drawInstance.mode = "_textMode";
    });

    setFont.addEventListener("click", () => {
        drawInstance.font = prompt("Please specify the font (font_weight font_size font_family)", drawInstance.font);
    });
}