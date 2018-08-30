/*
VE-paintJS v0.7.5
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

import {Draw} from "./draw.js";

export class Settings extends Draw{
  ResFill(param){
    if (param == 0) {
      this._Brush().fill = "transparent";
    }
    else{
      this._Brush().fill1 = "transparent";
    }
  }
  Composition(){
    let allComps = document.querySelectorAll("input[data-comp]");
    for (var i = 0; i < allComps.length; i++) {
      if (allComps[i].checked){
        this._Brush().composition = allComps[i].getAttribute("data-comp");
      }
    }
  }
  Fill(param){
    if (param == 0) {
      this._Brush().fill = getId("fill").value;
    }
    else{
      this._Brush().fill1 = getId("fill1").value;
    }
  }
  Color(){
    this._Brush().color = getId("color").value;
  }
  Size(){
    this._Brush().size = getId("size").value;
  }
  Rotation(){
    this._Brush().rotation = getId("rotate").value;
  }
  Shape(){
    this._Brush().shape = getId("shape").value;
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
    let _Clear = this.Clear();
    new _Clear().Backup();
    try {
      backups[param].layer.save();
      backups[param].layer.globalAlpha = 1;
      return backups[param].layer.drawImage(backups[param], 0, 0);
      backups[param].layer.restore();
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
  BgStretch(){
    this.Bg().stretch = bgstretchid.checked;
  }
  Blur(){
    let param = getId("blur").value;
    this._Brush().blur = param;
    activeLayer[1].filter = "blur(" + param + "px)";
  }
  Deform(){
    this._Brush().def = getId("deform").value/10;
  }
  Alpha(param){
    param = getId("alpha").value/100;
    this._Brush().alpha = param;
    activeLayer[1].globalAlpha = param;
  }
  BgAlpha(){
    let param = getId("bgAlpha").value/100;
    cnbg.globalAlpha = param;
    this.Bg().alpha = param;
  }
  Background(param){
    param = getId("bg").value;
    cnbg.globalAlpha = this.Bg().alpha;
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
        if (this.Bg().stretch){
          cnbg.drawImage(img, 0, 0, c.width, c.height);
        }
        else{
          cnbg.drawImage(img, 0, 0);
        }
      }
    }
    try {
      file.readAsDataURL(path);
    }
    catch{}
  }
  Mode(param, destroyAll = false){
    let toggle = (str, bool, p) =>{
      idList[p].innerHTML = str + " " + idName[p] + " mode";
      modes[p] = bool;
    }
    if (!destroyAll && !eraser) {
      if (modes[param]){
        toggle("Enable", false, param);
      }
      else{
        toggle("Disable", true, param);
      }
    }
    for (var i = 0; i < modes.length; i++) {
      if (i != param || destroyAll) {
        toggle("Enable", false, i);
      }
    }
  }
  Eraser(){
    eraser = eraserid.checked;
    if (eraser) {
      this.Mode("", true);
    }
  }
  Download(param = "download"){
    let e = getId(param);
    let file = prompt("Type a file name: ", "painting");
    if (file === null){
      return;
    }
    for (let i = 2; i < c_list.length; i++) {
      cnf.drawImage(c_list[i], 0, 0);
    }
    e.href = cf.toDataURL();
    e.download = file;
    cnf.clearRect(0, 0, c.width, c.height);
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
        val.push(window.innerHeight - getId("menu").offsetHeight - 2);
      }
      else{
        val = cs.value.split("*");
      }
    }
    else{
      val = vals.split(",");
    }
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

const newFill = (param) =>{
  set.Fill(param);
}

const newBg = () =>{
  set.Background();
}

const newBlur = () =>{
  set.Blur();
}

const continuous = () =>{
  set.Continuous();
}

const comp = () =>{
  set.Composition();
}

const newDef = () =>{
  set.Deform();
}

const newAlpha = () =>{
  set.Alpha();
}

const newBgAlpha = () =>{
  set.BgAlpha();
}

const newText = () =>{
  set.NewText();
}

const newFont = () =>{
  set.NewFont();
}

const clear = () =>{
  let _Clear = set.Clear();
  new _Clear().WipeAll();
}

const erase = () =>{
  set.Eraser();
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

const bgStretch = () =>{
  set.BgStretch();
}

const loadImg = () =>{
  set.BackgroundImage(true);
}

const newMode = (param) =>{
  set.Mode(param);
}

const resFill = (param) =>{
  set.ResFill(param);
}

const newShape = () =>{
  set.Shape();
}

const newColor = () =>{
  set.Color();
}

const newSize = () =>{
  set.Size();
}

const newRotate = () =>{
  set.Rotation();
}

set.Action("#size", newSize, "change");
set.Action("#color", newColor, "change");
set.Action("#shape", newShape, "change");
set.Action("#rotate", newRotate, "change");
set.Action("#download", download, "click", "");
set.Action("#clear", clear, "click", "");
set.Action("#lineMode", newMode, "click", 0);
set.Action("#rectMode", newMode, "click", 1);
set.Action("#quadraticMode", newMode, "click", 2);
set.Action("#tra-fill", resFill, "click", 0);
set.Action("#tra-fill1", resFill, "click", 1);
set.Action("#newText", newText, "click", "");
set.Action("#setFont", newFont, "click", "");
set.Action("#undo", undo, "click", "");
set.Action("#redo", redo, "click", "");
set.Action("#returnTo", returnTo, "click", "");
set.Action("#continuous", continuous, "change");
set.Action("#eraser", erase, "change");
set.Action("#bgstretch", bgStretch, "change");
set.Action("#bg", newBg, "change");
set.Action("#setBgImg", setBgImg, "change");
set.Action("#loadImg", loadImg, "change");
set.Action("#fill", newFill, "change", 0);
set.Action("#fill1", newFill, "change", 1);
set.Action("#blur", newBlur, "change");
set.Action("#deform", newDef, "change");
set.Action("#alpha", newAlpha, "change");
set.Action("#bgAlpha", newBgAlpha, "change");
set.Action("#comp", comp, "click");

document.addEventListener("click", (e) => {
  if (e.target.id == "confirmSize" || e.target.className == "icon-pencil"){
    set.CanvasSize();
  }
});

document.onkeyup = (e) => {
  if (e.ctrlKey && e.keyCode == 90) {
    set.Undo();
  }
  if (e.ctrlKey && e.keyCode == 89) {
    set.Redo();
  }
}
