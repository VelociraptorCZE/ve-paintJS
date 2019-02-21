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
            { content: "New", id: "menu-file-new" },
            { content: "Save", id: "menu-file-save" }
        ]
    },
    {
        label: "Brush",
        group: "brush",
        dropdownItems: [
            { content: `Color ${generateInput("color", "color", { value: "#000000" })}` },
            { content: `Size ${generateInput("range", "size", { max: 50, value: 4 })}` },
            { content: `Opacity ${generateInput("range", "opacity", { max: 100, value: 100 })}` },
        ]
    },
    {
        label: "Canvas operations",
        group: "composition",
        dropdownItems: [
            { content: `Default ${generateInput("radio", "composition", { other: "checked", data_name: "source-over" })}` },
            { content: `Eraser ${generateInput("radio", "composition", { data_name: "destination-out" })}` },
            { content: `Overlay ${generateInput("radio", "composition", { data_name: "overlay" })}` },
        ]
    }
];

function generateInput(type, name, { min = 0, max = 1, data_name = "", value = "", other = "" } = {}) {
    return `<input type="${type}" name="${name}" data-name="${data_name}" value="${value}" min="${min}" max="${max}" ${other}>`;
}