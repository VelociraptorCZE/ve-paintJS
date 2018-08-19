/*
VE-paintJS v0.5.2
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

import {Draw} from "./draw.js";
import {Settings} from "./settings.js";

const draw = new Draw();

export class Core{
  run() {
    window.onload = () =>{
      draw.Init("paintCanvas");
      draw.Render();
    }
  }
}

const core = new Core();

core.run();
