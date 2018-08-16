/*
VE-paintJS v0.3.5
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

let c, cn, active;

let Brush = class{
  constructor(size = 10, color = "#000", shape = "circle") {
    this.size = size;
    this.color = color;
    this.shape = shape;
  }
}

var thisBrush = new Brush();

export class Draw{
  ReturnBrush(){
    return thisBrush;
  }
  Init(id, b = document.getElementById(id)){
    c = document.getElementById(id);
    cn = c.getContext("2d");
    window.addEventListener("mousemove", this.Draw);
    b.onmousedown = () => {
      active = true;
    }
    b.onmouseup = () => {
      active = false;
    }
  }
  Draw(e){
    if (active){
      if (thisBrush.shape == "circle"){
        cn.beginPath();
        cn.arc(e.offsetX, e.offsetY, thisBrush.size, 0, Math.PI * 2);
        cn.closePath();
      }
      else if (thisBrush.shape == "rectangle"){
        cn.fillRect(e.offsetX, e.offsetY, thisBrush.size * 2, thisBrush.size * 2);
      }
      cn.fillStyle = thisBrush.color;
      cn.fill();
    }
  }
  Render(){
    window.requestAnimationFrame(this.Draw);
  }
  Clear(){
    cn.clearRect(0, 0, c.width, c.height);
  }
}
