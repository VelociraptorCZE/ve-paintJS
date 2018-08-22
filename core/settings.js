/*
VE-paintJS v0.6.0
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

import {Draw} from "./draw.js";

export class Settings extends Draw{
  Color(param = "#000"){
    this._Brush().color = param;
  }
  Fill(param = "#000"){
    this._Brush().fill = param;
  }
  Size(param = 10){
    this._Brush().size = param;
  }
  Shape(param = 0){
    this._Brush().shape = param;
  }
  NewText(){
    this.Text().enabled = true;
    this.Text().text = prompt("Type a text", "Some text");
  }
  NewFont(){
    let font = prompt("Set your font with two parameters, size and font family", "30px Segoe UI");
    if (font !== null){
      this.Text().font = font;
    }
  }
  Continuous(){
    this._Brush().continuous = cont.checked;
  }
  Backup(param){
    this.Clear(true);
    try {
      return cn.drawImage(backups[param], 0, 0);
    }
    catch{}
  }
  ReturnTo(){
    let param = prompt("Current step ID: " + backups.length + "\n\nReturn the canvas state to following step ID: ", backups.length);
    if (param !== null){
      this.Backup(param);
    }
  }
  Undo(){
    if (steps > 0){
      this.Backup(steps--);
    }
  }
  Redo(){
    if (steps < backups.length){
      this.Backup(steps++);
    }
  }
  Eraser(){
    eraser = eraserid.checked;
  }
  NoBorder(){
    nobor = noborid.checked;
  }
  Blur(param = 0){
    this._Brush().blur = param;
    cn.filter = "blur(" + param + "px)";
  }
  Deform(param = 20){
    this._Brush().def = param/10;
  }
  Alpha(param = 100){
    this._Brush().alpha = param/100;
    cn.globalAlpha = param/100;
  }
  BgAlpha(param = 100){
    cnbg.globalAlpha = param/100;
    this._Brush().bg = param/100;
  }
  Background(param){
    param = getId("bg").value;
    cnbg.globalAlpha = this._Brush().bg;
    cnbg.fillStyle = param;
    cnbg.fillRect(0, 0, c.width, c.height);
  }
  BackgroundImage(if_load = false){
    let path;
    let temp = new Image();
    temp.src = localStorage.theImage;
    if (if_load){
      path = loadimgid.files[0];
    }
    else{
      path = setbgimgid.files[0];
    }
    loadimgid.value = "";
    setbgimgid.value = "";
    let file = new FileReader();
    file.onload = () => {
      let img = new Image();
      img.src = file.result;
      localStorage.theImage = file.result;
      img.onload = () => {
        if (if_load){
          let val = img.width + "," + img.height;
          this.CanvasSize(val);
        }
        cnbg.drawImage(img, 0, 0);
      }
    }
    try {
      file.readAsDataURL(path);
    }
    catch{}
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
    }, true);
  }
  CanvasSize(vals){
    let cs = getId("canvasSize");
    let val = [];
    if (vals === undefined){
      if (cs.value.toLowerCase() == "auto"){
        val.push(window.innerWidth);
        val.push(window.innerHeight - 43);
      }
      else{
        val = cs.value.split("*");
      }
    }
    else{
      val = vals.split(",");
    }
    let c_list = [c, c2, c3, cf];
    for (var i = 0; i < c_list.length; i++) {
      c_list[i].setAttribute("width", val[0]);
      c_list[i].setAttribute("height", val[1]);
    }
  }
}

const set = new Settings();

const download = (param) =>{
  set.Download(param);
}

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

const newBgAlpha = (param) =>{
  set.BgAlpha(param);
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

const setNoBor = () =>{
  set.NoBorder();
}

const undo = () =>{
  set.Undo();
}

const redo = () =>{
  set.Redo();
}

const returnTo = () =>{
  set.ReturnTo();
}

const setBgImg = () =>{
  set.BackgroundImage();
}

const loadImg = () =>{
  set.BackgroundImage(true);
}

const newMode = (param) =>{
  set.Mode(param);
}

const canvasSize = () => {
  set.CanvasSize();
}

set.Action("#download", download, "click", "");
set.Action("#clear", clear, "click", "");
set.Action("#lineMode", newMode, "click", 0);
set.Action("#rectMode", newMode, "click", 1);
set.Action("#tra-fill", newFill, "click", "transparent");
set.Action("#newText", newText, "click", "");
set.Action("#setFont", newFont, "click", "");
set.Action("#undo", undo, "click", "");
set.Action("#redo", redo, "click", "");
set.Action("#returnTo", returnTo, "click", "");
set.Action("#continuous", continuous, "change");
set.Action("#eraser", erase, "change");
set.Action("#no-bor", setNoBor, "change");
set.Action("#bg", newBg, "change");
set.Action("#setBgImg", setBgImg, "change");
set.Action("#loadImg", loadImg, "change");

document.addEventListener("click", (e) => {
  set.Action("#color", newColor, "change");
  set.Action("#fill", newFill, "change");
  set.Action("#size", newSize, "change");
  set.Action("#shape", newShape, "change")
  set.Action("#blur", newBlur, "change");
  set.Action("#deform", newDef, "change");
  set.Action("#alpha", newAlpha, "change");
  set.Action("#bgAlpha", newBgAlpha, "change");
  if (e.target.id == "confirmSize" || e.target.className == "icon-pencil"){
    canvasSize();
  }
});
