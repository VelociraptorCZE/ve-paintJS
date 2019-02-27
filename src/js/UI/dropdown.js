/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

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

function dropdownToggle(dropdown, mode, target) {
    const parent = target.parentElement.parentElement;
    if (parent.classList.contains("main-menu__item--dropdown") && mode === "remove") {
        parent.parentElement.focus();
        return;
    }
    setTimeout(() => dropdown.classList[mode]("show"), 10);
}