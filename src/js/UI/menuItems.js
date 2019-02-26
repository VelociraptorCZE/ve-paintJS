/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT Licence
 */

export default [
    {
        label: "File",
        group: "file",
        dropdownItems: [
            { content: "📜 New", id: "menu-file-new" },
            { content: "📂 Load", id: "menu-file-load" },
            { content: "📂 Load (fit)", id: "menu-file-load-fit" },
            { content: "💾 Save", id: "menu-file-save" },
        ]
    },
    {
        label: "Edit",
        group: "edit",
        dropdownItems: [
            { content: "Undo", id: "menu-edit-undo" },
        ]
    },
    {
        label: "Brush",
        group: "brush",
        dropdownItems: [
            { content: `Color ${generateInput("color", "color", { value: "#000000" })}` },
            { content: `Size ${generateInput("range", "size", { min: .5, max: 50, value: 4 })}` },
            { content: `Opacity ${generateInput("range", "opacity", { min: 0, max: 100, value: 100 })}` },
            { content: `Blur ${generateInput("range", "blur", { min: 0, max: 30, value: 0 })}` },
        ]
    },
    {
        label: "Composite operations",
        group: "composition",
        dropdownItems: [
            { content: `Default ${generateInput("radio", "composition", { other: "checked", data_name: "source-over" })}` },
            { content: `Eraser ${generateInput("radio", "composition", { data_name: "destination-out" })}` },
            { content: `Overlay ${generateInput("radio", "composition", { data_name: "overlay" })}` },
            { content: `Soft light ${generateInput("radio", "composition", { data_name: "soft-light" })}` },
            { content: `Lighten ${generateInput("radio", "composition", { data_name: "lighten" })}` },
            { content: `Darken ${generateInput("radio", "composition", { data_name: "darken" })}` },
            { content: `Destination over ${generateInput("radio", "composition", { data_name: "destination-over" })}` },
        ]
    },
    {
        label: "Layers",
        group: "layers",
        dropdownItems: [
            { content: `➕ Create new layer`, id: "menu-layer-create" },
            { content: `Show/hide layer manager`, id: "menu-layer-manager" },
        ]
    }
];

function generateInput(type, name, { min = "", max = "", data_name = "", value = "", other = "" } = {}) {
    return `<input type="${type}" name="${name}" data-name="${data_name}" value="${value}" min="${min}" max="${max}" ${other}>`;
}