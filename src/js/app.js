/**
 *  VE-paintJS
 *  Copyright (c) Simon Raichl 2018 - 2019
 *  MIT License
 */

import initDropdown from "./UI/dropdown.js";
import initMenu from "./UI/menu.js";
import fileOptions from "./Core/fileOptions.js";
import { setLayerResolution } from "./UI/canvas.js";
import menuInteraction from "./UI/menuInteraction.js";
import editOptions from "./Core/editOptions.js";
import Draw from "./Core/Draw.js";

initMenu(); // Creates a menu from the specified object with the skeleton
initDropdown(); // Inits dropdown events
setLayerResolution();

const draw = new Draw();
draw.defaultFallback();

// Interaction with the menu

fileOptions(draw); // Inits "File" section in the menu
editOptions(); // Inits "Edit" section in the menu
menuInteraction(draw.brush); // Enables interaction with inputs in "Brush" section
menuInteraction(draw, "composition"); // Enables interaction with radio buttons in the section "Canvas operations"
menuInteraction(draw, "modes"); // Enables interaction with radio buttons in the section "Modes"