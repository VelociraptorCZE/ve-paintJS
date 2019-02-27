/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

import Thread from "../../../node_modules/wolfuix/js/lib/Thread.js";

export default function initDropdown() {
    const items = [...document.getElementsByClassName("main-menu__item")];
    items.forEach(item => {
        const dropdown = item.querySelector(".main-menu__item--dropdown");
        setDropdownListeners(dropdown, item);
    });

    const inputs = [...document.querySelectorAll(".main-menu input")].filter(input => input.type !== "color");
    inputs.forEach(input => {
        input.addEventListener("mouseup", e => e.target.parentElement.parentElement.parentElement.focus());
    });
};

function setDropdownListeners(dropdown, item) {
    const dropdownActions = [
        {
            listener: "focusin",
            mode: "add",
        },
        {
            listener: "focusout",
            mode: "remove",
        }
    ];

    dropdownActions.forEach(({ listener, mode }) => {
        item.addEventListener(listener, ({ target }) => {
            dropdownToggle(dropdown, mode, target);
        });
    });
}

async function dropdownToggle(dropdown, mode, target) {
    const parent = target.parentElement.parentElement;
    if (parent.classList.contains("main-menu__item--dropdown") && mode === "remove") {
        parent.parentElement.focus();
        return;
    }
    await Thread.sleep(10);
    dropdown.classList[mode]("show");
}