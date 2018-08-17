/*
VE-paintJS v0.4.5
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

let active, isMobile;

let Brush = class{
  constructor(size = 10, color = "#000", shape = 0, filter = 0, def = 2, alpha = 1) {
    this.size = size;
    this.color = color;
    this.shape = shape;
    this.filter = filter;
    this.def = def;
    this.alpha = alpha;
  }
}

let Line = class{
  constructor(x1, x2, y1, y2){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }
}

var thisBrush = new Brush();
var line = new Line();

export class Draw{
  ReturnBrush(){
    return thisBrush;
  }
  Init(id, b = document.getElementById(id)){
    window.addEventListener("mousemove", this.Draw);
    window.addEventListener("touchstart", () => {isMobile = true;});
    window.addEventListener("touchmove", this.Draw);
    b.addEventListener("mouseup", this.DrawLine);
    b.onmousedown = () => {
      active = true;
    }
    window.onmouseup = () => {
      active = false;
    }
  }
  DrawLine(e){
    if (ln.getAttribute("data-enabled") == "true"){
      if (line.x1 === undefined){
        line.x1 = e.offsetX;
        line.y1 = e.offsetY;
      }
      else if (line.x2 === undefined && line.x1 !== undefined){
        line.x2 = e.offsetX;
        line.y2 = e.offsetY;
        cn.beginPath();
        cn.lineWidth = thisBrush.size * 2;
        cn.strokeStyle = thisBrush.color;
        cn.moveTo(line.x1, line.y1);
        cn.lineTo(line.x2, line.y2)
        cn.stroke();
        cn.closePath();
        line.x1 = undefined;
        line.x2 = undefined;
      }
    }
  }
  Draw(e){
    if ((active || isMobile) && ln.getAttribute("data-enabled") == "false"){
      line.x1 = undefined;
      cn.beginPath();
      if (thisBrush.shape == 0){
        cn.arc(e.offsetX, e.offsetY, thisBrush.size, 0, Math.PI * thisBrush.def);
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
