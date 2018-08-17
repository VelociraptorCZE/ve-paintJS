/*
VE-paintJS v0.4.5
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
  Shape(param = 0){
    this.ReturnBrush().shape = param;
  }
  Blur(param = 0){
    this.ReturnBrush().blur = param;
    cn.filter = "blur(" + param + "px)";
  }
  Deform(param = 20){
    this.ReturnBrush().def = param/10;
  }
  Alpha(param = 100){
    this.ReturnBrush().alpha = param/100;
    cn.globalAlpha = param/100;
  }
  Background(param = "#fff"){
    cn.fillStyle = param;
    cn.fillRect(0, 0, c.width, c.height);
  }
  LineMode(){
    if (ln.getAttribute("data-enabled") == "true"){
      ln.innerHTML = "Enable line mode";
      ln.setAttribute("data-enabled", "false");
    }
    else{
      ln.innerHTML = "Disable line mode";
      ln.setAttribute("data-enabled", "true");
    }
  }
  Download(param = "download"){
    let file = prompt("Type a file name: ", "painting");
    if (file !== null || file !== undefined || file != ""){
      let e = document.getElementById(param);
      e.href = c.toDataURL();
      e.download = file;
    }
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

const newBlur = (param) =>{
  set.Blur(param);
}

const newShape = (param) =>{
  set.Shape(param);
}

const newDef = (param) =>{
  set.Deform(param);
}

const newAlpha = (param) =>{
  set.Alpha(param);
}

const clear = () =>{
  set.Clear();
}

const lineMode = () =>{
  set.LineMode();
}

const download = (param) =>{
  set.Download(param);
}

const canvasSize = () => {
  let cs = document.getElementById("canvasSize");
  let val = cs.value.split("*");
  c.setAttribute("width", val[0]);
  c.setAttribute("height", val[1]);
}

set.Action("#download", download, "click", "");
set.Action("#clear", clear, "click", "");
set.Action("#lineMode", lineMode, "click", "");

document.addEventListener("click", (e) => {
  set.Action("#color", newColor, "change");
  set.Action("#bg", newBg, "change");
  set.Action("#size", newSize, "change");
  set.Action("#shape", newShape, "change")
  set.Action("#blur", newBlur, "change");
  set.Action("#deform", newDef, "change");
  set.Action("#alpha", newAlpha, "change");
  if (e.target.id == "confirmSize" || e.target.className == "icon-pencil"){
    canvasSize();
  }
});
