/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

export default function immutableProperty(o, propertyName, value) {
    Object.defineProperty(o, propertyName, {
        value: value,
        configurable: false,
        writable: false,
        enumerable: false
    });
}