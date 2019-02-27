/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

import menuItems from "./menuItems.js";

export default function initMenu() {
    let menu = "";
    menuItems.forEach(({ label, group, dropdownItems }) => {
        menu += `
        <div class="main-menu__item" tabindex="0">
        <span>${label}</span>
            <div class="main-menu__item--dropdown">
              ${dropdownItems.map(({ content, id = "" }) =>
                `<div class="main-menu__item--dropdown--item" id="${id}" data-group="${group}">${content}</div>`
                ).join("")}
            </div>
        </div>
        `;
    });

    getMenu().innerHTML = menu;
}

export function getMenu() {
    return document.getElementById("main-menu");
}