/*
VE-paintJS v0.7.3
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

let active, layerStack = 0;

import {Draw} from "./draw.js";
import {Settings} from "./settings.js";

var draw = new Draw();

export class Layers extends Settings{
  SetActive(param){
    activeLayer = param;
  }
  GetCanvasState(firstCheck = false){
    if (!layerid.classList.contains("invisible") || firstCheck) {
      for (let i = 2; i < c_list.length; i++) {
        getId(img_list[i]).setAttribute("src", c_list[i].toDataURL());
        if (i > 2 && firstCheck){
          let id = getId(c_list[i].id);
          this.Action("#" + img_list[i], this.SetActive, "click", [id, c2d(id)]);
        }
      }
    }
  }
  ToggleLayer(param){
    param[0].classList.toggle("invisible");
    param[1].classList.toggle("striked");
  }
  AddLayer(){
    let layer = document.createElement("canvas");
    let name = "customCanvas" + document.querySelectorAll("canvas[id*=custom]").length;
    layer.setAttribute("id", name);
    layer.setAttribute("width", c.width);
    layer.setAttribute("height", c.height);
    getId("main").insertBefore(layer, c3);
    this.Action("#" + name, this.GetCanvasState, "mouseup");
    c_list.push(layer);
    let img = document.createElement("img"); let id = "img_" + name;
    img.setAttribute("id", id); let imgLength = img_list.length;
    layerid.insertBefore(img, document.getElementsByClassName("layerCaption")[imgLength-4-layerStack]);
    img_list.push(id);
    let l = {c: getId(name), cn: c2d(getId(name))};
    activeLayer = [l.c, l.cn];
    this.InitNewCanvas(l.c, draw);
    this.Action("#" + id, this.SetActive, "click", activeLayer);
    let div = document.createElement("div");
    div.setAttribute("class", "layerCaption"); div.setAttribute("contenteditable", "true");
    div.innerHTML = name; layerid.insertBefore(div, img);
    let toggleButton = document.createElement("button"); let togName = "tog_" + name;
    toggleButton.innerHTML = "<span class = 'icon-eye'></span>";
    toggleButton.setAttribute("id", togName); toggleButton.setAttribute("class", "blu-but");
    layerid.insertBefore(toggleButton, document.getElementsByClassName("layerCaption")[imgLength-3-layerStack]);
    this.Action("#" + togName, toggle, "click", [l.c, getId(togName)]);
    let clearButton = document.createElement("button"); let clearName = "clr_" + name;
    clearButton.innerHTML = "<span class = 'icon-trash'></span>";
    clearButton.setAttribute("id", clearName); clearButton.setAttribute("class", "blu-but"); clearButton.style.marginLeft = "4px";
    layerid.insertBefore(clearButton, document.getElementsByClassName("layerCaption")[imgLength-3-layerStack]);
    let clr = () =>{
      l.cn.clearRect(0, 0, c.width, c.height);
    }
    this.Action("#" + clearName, clr, "click");
    layerStack++;
    this.GetCanvasState();
  }
  Drag(e){
    layerbarid.style.cursor = "grabbing";
    layerid.style.left = e.clientX - layerid.getBoundingClientRect().width/2 + "px";
    layerid.style.top = e.clientY - 30 + "px";
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

getId("addLayer").onclick = () =>{
  layers.AddLayer();
}

getId("addLayer2").onclick = () =>{
  layers.AddLayer();
}

document.onclick = () =>{
  for (var i = 0; i < document.querySelectorAll("img[id *= img_]").length; i++) {
    document.querySelectorAll("img[id *= img_]")[i].removeAttribute("style");
  }
  getId("img_" + activeLayer[0].id).style.outline = "2px solid #1a1a1a";
}

document.onmouseup = () =>{
  active = false;
  layerbarid.style.cursor = "grab";
}

layerbarid.onmousemove = (e) =>{
  if (active) {
    layers.Drag(e);
  }
}

layers.Action("#paintCanvas", refresh, "mouseup");
layers.Action("#lay1", toggle, "click", [c, getId("lay1")]);
layers.Action("#lay2", toggle, "click", [c2, getId("lay2")]);
