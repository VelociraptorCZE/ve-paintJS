/*
VE-paintJS v0.3.5
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

import {Draw} from "./draw.js";

export class Settings extends Draw{
  Color(param = "#000"){
    this.ReturnBrush().color = param;
  }
  Size(param = 10){
    this.ReturnBrush().size = param;
  }
  Shape(param = "circle"){
    this.ReturnBrush().shape = param;
  }
  Background(param = "blue"){
    document.querySelector("canvas").style = "background: " + param;
  }
  Action(name, func, listener, val){
    let attr = document.querySelector(name);
    attr.addEventListener(listener, (e) => {
      if (val === undefined){
        val = e.target.value || attr.value;
      }
      if (val == ""){
        func();
      }
      else{
        func(val);
      }
    });
  }
}

const set = new Settings();

const newColor = (param) =>{
  set.Color(param);
}

const newBg = (param) =>{
  set.Background(param);
}

const newSize = (param) =>{
  set.Size(param);
}

const newShape = (param) =>{
  set.Shape(param);
}

const clear = () =>{
  set.Clear();
}

const canvasSize = () => {
  let c = document.getElementById("paintCanvas");
  let cs = document.getElementById("canvasSize");
  let val = cs.value.split("*");
  c.setAttribute("width", val[0]);
  c.setAttribute("height", val[1]);
}

document.addEventListener("click", (e) => {
  set.Action("#color", newColor, "change");
  set.Action("#bg", newBg, "change");
  set.Action("#size", newSize, "change");
  set.Action("#shape", newShape, "change")
  set.Action("#clear", clear, "click", "");
  if (e.target.id == "confirmSize" || e.target.className == "icon-confirm"){
    canvasSize();
  }
});
