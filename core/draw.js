/*
VE-paintJS v0.5.2
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

let active, isMobile;

let Brush = class{
  constructor(size = 10, color = "#000", border = "#000", shape = 0, filter = 0, def = 2, alpha = 1) {
    this.size = size;
    this.color = color;
    this.border = border;
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

export class DrawSupport{
  DrawController(param, e){
    let x = e.offsetX;
    let y = e.offsetY;
    param.beginPath();
    if (thisBrush.shape == 0){
      param.arc(x, y, thisBrush.size, 0, Math.PI * thisBrush.def);
    }
    else if (thisBrush.shape == 1){
      param.fillRect(x, y, thisBrush.size * 2, thisBrush.size * 2);
    }
    param.closePath();
    param.fillStyle = thisBrush.color;
    param.fill();
  }
  DrawNewLine(can = cn, x2 = line.x2, y2 = line.y2){
    can.beginPath();
    can.lineWidth = thisBrush.size * 2;
    can.strokeStyle = thisBrush.border;
    can.moveTo(line.x1, line.y1);
    can.lineTo(x2, y2);
    can.stroke();
    can.closePath();
  }
  DrawNewRect(can = cn, x2 = line.x2, y2 = line.y2){
    can.beginPath();
    can.lineWidth = thisBrush.size * 2;
    can.strokeStyle = thisBrush.border;
    can.fillStyle = thisBrush.color;
    can.rect(line.x1, line.y1, x2, y2);
    can.fill();
    can.stroke();
    can.closePath();
  }
}

var thisBrush = new Brush();
var line = new Line();
var draw = new DrawSupport();

export class Draw{
  ReturnBrush(){
    return thisBrush;
  }
  Init(id){
    window.addEventListener("mousemove", this.Draw);
    window.addEventListener("touchstart", () => {isMobile = true;});
    window.addEventListener("touchmove", this.Draw);
    c.addEventListener("mouseup", this.DrawShape);
    c.onmousedown = () => {
      active = true;
    }
    window.onmouseup = () => {
      active = false;
    }
  }
  DrawShape(e){
    if (modes[0] || modes[1]){
      if (line.x1 === undefined){
        line.x1 = e.offsetX;
        line.y1 = e.offsetY;
      }
      else if (line.x2 === undefined && line.x1 !== undefined){
        line.x2 = e.offsetX;
        line.y2 = e.offsetY;
        if (modes[0]){
          draw.DrawNewLine();
        }
        else{
          draw.DrawNewRect(cn, e.clientX, e.clientY);
        }
        line.x1 = undefined;
        line.x2 = undefined;
      }
    }
  }
  Draw(e){
    cnp.clearRect(0, 0, c.width, c.height);
    if (line.x2 === undefined && line.x1 !== undefined && modes[0]){
      draw.DrawNewLine(cnp, e.offsetX, e.offsetY);
    }
    else if (line.x2 === undefined && line.x1 !== undefined && modes[1]){
      draw.DrawNewRect(cnp, e.clientX, e.clientY);
    }
    draw.DrawController(cnp, e);
    if ((active || isMobile) && !modes[0] && !modes[1]){
      line.x1 = undefined;
      draw.DrawController(cn, e);
    }
  }
  Render(){
    window.requestAnimationFrame(this.Draw);
  }
  Clear(){
    cn.clearRect(0, 0, c.width, c.height);
  }
}
