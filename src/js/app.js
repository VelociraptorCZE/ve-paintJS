/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT Licence
 */

import initDropdown from "./UI/dropdown.js";
import initMenu from "./UI/menu.js";
import fileOptions from "./Core/fileOptions.js";
import Draw from "./Core/Draw.js";

initMenu(); // Creates a menu from the specified object with the skeleton
initDropdown(); // Inits dropdown events
fileOptions(); // Inits "File" section in the menu

new Draw();