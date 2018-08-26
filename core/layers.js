/*
VE-paintJS v0.6.5
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

let active;

import {Settings} from "./settings.js";

export class Layers extends Settings{
  GetCanvasState(firstCheck = false){
    if (!layerid.classList.contains("invisible") || firstCheck) {
      getId("img_c").setAttribute("src", c.toDataURL());
      getId("img_b").setAttribute("src", c2.toDataURL());
    }
  }
  ToggleLayer(param){
    param[0].classList.toggle("invisible");
    param[1].classList.toggle("striked");
  }
  Drag(e){
    layerid.style.cursor = "grabbing";
    layerid.style.left = e.clientX - layerid.getBoundingClientRect().width/2 + "px";
    layerid.style.top = e.clientY - layerid.getBoundingClientRect().height/2 + "px";
  }
}

const layers = new Layers();

layers.GetCanvasState(true);

let refresh = () => {
  layers.GetCanvasState();
}

let toggle = (param) => {
  layers.ToggleLayer(param);
}

layerid.onmousedown = () =>{
  active = true;
}

document.onmouseup = () =>{
  active = false;
  layerid.style.cursor = "grab";
}

layerid.onmousemove = (e) =>{
  if (active) {
    layers.Drag(e);
  }
}

layers.Action("#paintCanvas", refresh, "mouseup");
layers.Action("#lay1", toggle, "click", [c, getId("lay1")]);
layers.Action("#lay2", toggle, "click", [c2, getId("lay2")]);
