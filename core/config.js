/*
VE-paintJS v0.6.3
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

var getId = (param) => {
  return document.getElementById(param);
}

var c2d = (param) => {
  return param.getContext("2d");
}

const c = getId("paintCanvas");
const c2 = getId("bgCanvas");
const c3 = getId("previewCanvas");
const cf = getId("finalCanvas");
const cn = c2d(c);
const cnbg = c2d(c2);
const cnp = c2d(c3);
const cnf = c2d(cf);
cnp.globalAlpha = 0.6;
const lnid = getId("lineMode");
const rectid = getId("rectMode");
const eraserid = getId("eraser");
const cont = getId("continuous");
const setbgimgid = getId("setBgImg");
const loadimgid = getId("loadImg");
const bgstretchid = getId("bgstretch");

const modes = [false, false];
const idList = [lnid, rectid];
const idName = ["line", "rect"];

var fillType = 0;
var eraser = false;
var backups = [];
var steps = 0;

// I just wanted to get rid of the jQuery dependency

const ovr = getId("ovr-win");
const ovr_o = getId("ovr-win-opn");
const ovr_e = getId("ovr-win-ext");

class DOMTools{
  opnOvr(){
    ovr.style = "opacity:1;margin-top:0;transition:1s";
    document.body.style = "overflow-y:hidden;height:100vh;";
  }

  extOvr(){
    ovr.style = "opacity:0;margin-top:-100vh;transition:1.2s";
    document.body.style = "height:100%;";
  }

  togDrp(){
    let uls = this.parentElement.querySelector(".drp ul");
    let open = true;
    if (uls.classList.value.includes("drp-vis-ul")){
      open = false;
    }
    let allLis = document.querySelectorAll(".drp ul li");
    for (let i = 0; i < allLis.length; i++) {
      allLis[i].classList.remove("drp-vis");
    }
    let allUls = document.querySelectorAll(".drp ul");
    for (let i = 0; i < allUls.length; i++) {
      allUls[i].classList.remove("drp-vis-ul");
    }
    if (open){
      uls.classList.toggle("drp-vis-ul");
      let lis = this.parentElement.querySelectorAll(".drp ul li");
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.toggle("drp-vis");
      }
    }
  }
  allDrp(drp){
    for (var i = 0; i < drp.length; i++) {
      drp[i].addEventListener("click", dom.togDrp);
    }
  }
  start(){
    c3.style = "z-index: -1";
  }
  stop(){
    c3.removeAttribute("style");
  }
}

var dom = new DOMTools();

ovr_o.addEventListener("mouseup", dom.opnOvr);
ovr_e.addEventListener("mouseup", dom.extOvr);
c3.addEventListener("mousedown", dom.start);
c.addEventListener("mouseup", dom.stop);

dom.allDrp(document.getElementsByClassName("drp-tog"));
