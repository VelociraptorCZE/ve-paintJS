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
            layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
            layer.drawImage(img, 0, 0);
        }
        catch (e) {}
    });
}