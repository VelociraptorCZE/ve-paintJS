/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT Licence
 */


/** @inheritDoc
 *  This function accesses to the property of the given
 *  instance and as the name of the property takes a input's name attribute
 *  and assigns to this property input's value.
 *
 *  instance[property] = value
 */

export default function menuInteraction(instance, group) {
    const inputs = [...document.querySelectorAll(`[data-group=${group || instance.name}]`)]
        .map(item => item.querySelector("input"));

    inputs.forEach(input => {
        if (input) {
            input.addEventListener("change", ({ target }) => {
                instance[input.name] = !/radio|checkbox/.test(input.type) ? target.value : target.getAttribute("data-name");
            });
        }
    });
}