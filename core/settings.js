/*
VE-paintJS v0.5.6
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

import {Draw} from "./draw.js";

export class Settings extends Draw{
  Color(param = "#000"){
    this.ReturnBrush().color = param;
  }
  Fill(param = "#000"){
    this.ReturnBrush().fill = param;
  }
  Size(param = 10){
    this.ReturnBrush().size = param;
  }
  Shape(param = 0){
    this.ReturnBrush().shape = param;
  }
  NewText(){
    this.ReturnText().enabled = true;
    this.ReturnText().text = prompt("Type a text", "Some text");
  }
  NewFont(){
    this.ReturnText().font = prompt("Set your font with two parameters, size and font family", "30px Segoe UI");
  }
  Continuous(){
    this.ReturnBrush().continuous = cont.checked;
  }
  Eraser(){
    if (eraser){
      eraser = false;
      eraserid.innerHTML = "Enable eraser";
    }
    else{
      eraser = true;
      eraserid.innerHTML = "Disable eraser";
    }
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
    cnbg.fillStyle = param;
    cnbg.fillRect(0, 0, c.width, c.height);
  }
  Mode(param){
    let toggle = (str, bool, p) =>{
      idList[p].innerHTML = str + " " + idName[p] + " mode";
      modes[p] = bool;
    }
    if (modes[param]){
      toggle("Enable", false, param);
    }
    else{
      toggle("Disable", true, param);
    }
    for (var i = 0; i < modes.length; i++) {
      if (i != param) {
        toggle("Enable", false, i);
      }
    }
  }
  Download(param = "download"){
    let e = getId(param);
    let file = prompt("Type a file name: ", "painting");
    if (file === null){
      return;
    }
    cnf.drawImage(c2, 0, 0);
    cnf.drawImage(c, 0, 0);
    e.href = cf.toDataURL();
    e.download = file;
  }
  Action(name, func, listener, val){
    let attr = document.querySelector(name);
    attr.addEventListener(listener, (e) => {
      if (val === undefined){
        val = e.target.value || attr.value;
      }
      if (val === ""){
        func();
      }
      else{
        func(val);
      }
    });
  }
  CanvasSize(){
    let cs = getId("canvasSize");
    let val = [];
    if (cs.value.toLowerCase() == "auto"){
      val.push(window.innerWidth);
      val.push(window.innerHeight - 45);
    }
    else{
      val = cs.value.split("*");
    }
    let c_list = [c, c2, c3, cf];
    for (var i = 0; i < c_list.length; i++) {
      c_list[i].setAttribute("width", val[0]);
      c_list[i].setAttribute("height", val[1]);
    }
  }
}

const set = new Settings();

const newColor = (param) =>{
  set.Color(param);
}

const newFill = (param) =>{
  set.Fill(param);
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

const continuous = () =>{
  set.Continuous();
}

const newDef = (param) =>{
  set.Deform(param);
}

const newAlpha = (param) =>{
  set.Alpha(param);
}

const newText = () =>{
  set.NewText();
}

const newFont = () =>{
  set.NewFont();
}

const clear = () =>{
  set.Clear();
}

const erase = () =>{
  set.Eraser();
}

const newMode = (param) =>{
  set.Mode(param);
}

const download = (param) =>{
  set.Download(param);
}

const canvasSize = () => {
  set.CanvasSize();
}

set.Action("#download", download, "click", "");
set.Action("#clear", clear, "click", "");
set.Action("#lineMode", newMode, "click", 0);
set.Action("#rectMode", newMode, "click", 1);
set.Action("#tra-fill", newFill, "click", "transparent");
set.Action("#eraser", erase, "click", "");
set.Action("#newText", newText, "click", "");
set.Action("#setFont", newFont, "click", "");
set.Action("#continuous", continuous, "change");

document.addEventListener("click", (e) => {
  set.Action("#color", newColor, "change");
  set.Action("#fill", newFill, "change");
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
