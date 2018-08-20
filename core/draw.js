/*
VE-paintJS v0.5.6
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

let active, isMobile;

let Brush = class{
  constructor(size = 10, color = "#000", fill = "#000", shape = 0, filter = 0, def = 2, alpha = 1, continuous = true) {
    this.size = size;
    this.color = color;
    this.fill = fill;
    this.shape = shape;
    this.filter = filter;
    this.def = def;
    this.alpha = alpha;
    this.continuous = continuous;
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

let NewText = class{
  constructor(x, y, text, enabled = false, font = "30px Segoe UI"){
    this.x = x;
    this.y = y;
    this.text = text;
    this.enabled = enabled;
    this.font = font;
  }
}

var thisBrush = new Brush();
var line = new Line();
var text = new NewText();

export class Draw{
  ReturnBrush(){
    return thisBrush;
  }
  ReturnText(){
    return text;
  }
  Init(id){
    window.addEventListener("mousemove", this.Draw);
    window.addEventListener("touchstart", () => {isMobile = true;});
    window.addEventListener("touchmove", this.Draw);
    c.addEventListener("mouseup", this.DrawShape);
    c.addEventListener("mouseup", this.DrawText);
    c3.onmousedown = () => {
      active = true;
    }
    window.onmouseup = () => {
      active = false;
      if (!modes[0] && !modes[1]){
        line.x1 = undefined;
        line.x2 = undefined;
      }
    }
  }
  DrawText(e){
    if (text.enabled){
      text.x = e.clientX;
      text.y = e.clientY;
      draw.DrawNewText();
      text.enabled = false;
      text.text = undefined;
    }
  }
  DrawShape(e, statement = false){
    if (statement || (modes[0] || modes[1])){
      if (line.x1 === undefined){
        line.x1 = e.offsetX;
        line.y1 = e.offsetY;
      }
      else if (line.x2 === undefined && line.x1 !== undefined){
        line.x2 = e.offsetX;
        line.y2 = e.offsetY;
        if (statement){
          draw.DrawNewLine();
        }
        else{
          if (modes[0]){
            draw.DrawNewLine();
          }
          else{
            draw.DrawNewRect(cn, e.clientX, e.clientY);
          }
        }
        line.x1 = undefined;
        line.x2 = undefined;
      }
    }
  }
  Draw(e){
    cn.globalCompositeOperation = "source-over";
    cnp.clearRect(0, 0, c.width, c.height);
    if (line.x2 === undefined && line.x1 !== undefined && modes[0]){
      draw.DrawNewLine(cnp, e.offsetX, e.offsetY);
    }
    else if (line.x2 === undefined && line.x1 !== undefined && modes[1]){
      draw.DrawNewRect(cnp, e.clientX, e.clientY);
    }
    else if (text.enabled){
      draw.DrawNewText(cnp, e.clientX, e.clientY);

    }
    draw.DrawController(cnp, e);
    if ((active || isMobile) && !modes[0] && !modes[1]){
      line.x1 = undefined;
      if (eraser){
        draw.Erase(cn, e);
      }
      else{
        draw.DrawController(cn, e);
      }
    }
  }
  Render(){
    window.requestAnimationFrame(this.Draw);
  }
  Clear(){
    cn.clearRect(0, 0, c.width, c.height);
  }
}

export class DrawSupport extends Draw{
  DrawController(param, e){
    param.lineJoin = "round";
    let x = e.offsetX;
    let y = e.offsetY;
    param.beginPath();
    if (active && !eraser && !modes[0] && !modes[1] && thisBrush.continuous){
      this.DrawShape(e, true);
    }
    if (thisBrush.shape == 0){
      param.arc(x, y, thisBrush.size, 0, Math.PI * thisBrush.def);
    }
    if (thisBrush.shape == 1 && (!active || eraser)){
        param.fillRect(x, y, thisBrush.size * 2, thisBrush.size * 2);
    }
    param.closePath();
    param.fillStyle = thisBrush.color;
    param.fill();
  }
  DrawNewLine(can = cn, x2 = line.x2, y2 = line.y2){
    can.beginPath();
    can.lineWidth = thisBrush.size * 2;
    can.strokeStyle = thisBrush.color;
    can.moveTo(line.x1, line.y1);
    can.lineTo(x2, y2);
    can.stroke();
    can.closePath();
  }
  DrawNewRect(can = cn, x2 = line.x2, y2 = line.y2){
    can.beginPath();
    let sz = thisBrush.size;
    can.rect(line.x1-sz, line.y1-sz, x2+sz*2, y2+sz*2);
    can.fillStyle = thisBrush.color;
    can.fill();
    can.closePath();
    can.beginPath();
    can.rect(line.x1, line.y1, x2, y2);
    can.fillStyle = thisBrush.fill;
    can.fill();
    can.closePath();
  }
  DrawNewText(can = cn, x = text.x, y = text.y){
    can.font = text.font;
    can.fillStyle = thisBrush.color;
    can.fillText(text.text, x, y);
  }
  Erase(param, e){
    cn.globalCompositeOperation = "destination-out";
    this.DrawController(param, e);
  }
}

var draw = new DrawSupport();
