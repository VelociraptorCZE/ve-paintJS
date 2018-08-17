/*
VE-paintJS v0.4.0
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

let active;

let Brush = class{
  constructor(size = 10, color = "#000", shape = 0, filter = 0) {
    this.size = size;
    this.color = color;
    this.shape = shape;
    this.filter = filter;
  }
}

var thisBrush = new Brush();

export class Draw{
  ReturnBrush(){
    return thisBrush;
  }
  Init(id, b = document.getElementById(id)){
    window.addEventListener("mousemove", this.Draw);
    b.onmousedown = () => {
      active = true;
    }
    window.onmouseup = () => {
      active = false;
    }
  }
  Draw(e){
    if (active){
      cn.beginPath();
      if (thisBrush.shape == 0){
        cn.arc(e.offsetX, e.offsetY, thisBrush.size, 0, Math.PI * 2);
      }
      else if (thisBrush.shape == 1){
        cn.fillRect(e.offsetX, e.offsetY, thisBrush.size * 2, thisBrush.size * 2);
      }
      cn.closePath();
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
