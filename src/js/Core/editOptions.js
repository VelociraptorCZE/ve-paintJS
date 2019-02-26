/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT Licence
 */

export default function editOptions() {
    const undo = document.getElementById("menu-edit-undo");

    undo.addEventListener("click", () => {
        try {
            const { img, layer } = window.__backup__;
            const { globalAlpha, filter } = layer;
            layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
            layer.globalAlpha = 1;
            layer.filter = "blur(0px)";
            layer.drawImage(img, 0, 0);
            layer.globalAlpha(globalAlpha);
            layer.filter = filter;
        }
        catch (_) {}
    });
}