/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT Licence
 */

export default class Exceptions {
    static notImplemented(func, _class) {
        return `NotImplementedException: ${func}() function is not implemented in class ${_class}.`;
    }
}