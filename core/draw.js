/*
VE-paintJS v0.6.3
Copyright (C) Simon Raichl 2018
MIT Licence
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

let active, isMobile;

let Brush = class{
  constructor(size = 10, color = "#000", fill = "#000", fill1 = "transparent", shape = 0, filter = 0, def = 2, alpha = 1, continuous = true) {
    this.size = size;
    this.color = color;
    this.fill = fill;
    this.fill1 = fill1;
    this.shape = shape;
    this.filter = filter;
    this.def = def;
    this.alpha = alpha;
    this.continuous = continuous;
  }
}

let Background = class{
  constructor(alpha = 1, stretch = false){
    this.alpha = alpha;
    this.stretch = stretch;
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

var _brush = new Brush();
var line = new Line();
var text = new NewText();
var background = new Background();

export class Draw{
  _Brush(){
    return _brush;
  }
  Text(){
    return text;
  }
  Bg(){
    return background;
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
    c.onmouseup = () => {
      steps++;
      backups[steps] = new Image();
      backups[steps].src = c.toDataURL("image/png");
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
      text.x = e.offsetX;
      text.y = e.offsetY;
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
    if (_brush.size == 0){
      c.style = "cursor: default !important";
      c3.style = "cursor: default !important";
    }
    cn.globalCompositeOperation = "source-over";
    cnp.clearRect(0, 0, c.width, c.height);
    if (line.x2 === undefined && line.x1 !== undefined && modes[0]){
      draw.DrawNewLine(cnp, e.offsetX, e.offsetY);
    }
    else if (line.x2 === undefined && line.x1 !== undefined && modes[1]){
      draw.DrawNewRect(cnp, e.clientX, e.clientY);
    }
    else if (text.enabled){
      draw.DrawNewText(cnp, e.offsetX, e.offsetY);
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
  Clear(backup = false){
    cn.clearRect(0, 0, c.width, c.height);
    if (!backup){
      cnbg.clearRect(0, 0, c.width, c.height);
      backups = [];
      steps = 0;
    }
  }
}

export class DrawSupport extends Draw{
  CreateGradient(param, x2 = line.x2, y2 = line.y2){
    let localGradient = param.createLinearGradient(line.x1, line.y1, x2, y2);
    localGradient.addColorStop(0, _brush.fill);
    localGradient.addColorStop(1, _brush.fill1);
    return localGradient;
  }
  DrawController(param, e){
    param.lineJoin = "round";
    let x = e.offsetX;
    let y = e.offsetY;
    param.beginPath();
    if (active && !eraser && !modes[0] && !modes[1] && _brush.continuous){
      this.DrawShape(e, true);
    }
    if (_brush.shape == 0){
      param.arc(x, y, _brush.size, 0, Math.PI * _brush.def);
    }
    if (_brush.shape == 1 && (!active || eraser || !_brush.continuous)){
        param.fillRect(x, y, _brush.size * 2, _brush.size * 2);
    }
    param.closePath();
    param.fillStyle = _brush.color;
    param.fill();
  }
  DrawNewLine(can = cn, x2 = line.x2, y2 = line.y2){
    can.beginPath();
    can.lineWidth = _brush.size * 2;
    can.strokeStyle = _brush.color;
    can.moveTo(line.x1, line.y1);
    can.lineTo(x2, y2);
    can.stroke();
    can.closePath();
  }
  DrawNewRect(can = cn, x2 = line.x2, y2 = line.y2){
    can.beginPath();
    can.lineWidth = _brush.size;
    can.strokeStyle = _brush.color;
    can.rect(line.x1, line.y1, x2, y2);
    if (fillType == 0) {
      can.fillStyle = _brush.fill;
    }
    else{
      can.fillStyle = this.CreateGradient(can, x2, y2);
    }
    can.fill();
    if (_brush.size > 0){
      can.stroke();
    }
    can.closePath();
  }
  DrawNewText(can = cn, x = text.x, y = text.y){
    can.font = text.font;
    can.lineWidth = _brush.size/10;
    can.strokeStyle = _brush.color;
    can.fillStyle = _brush.fill;
    if (text.text !== null) {
      can.fillText(text.text, x, y);
      can.strokeText(text.text, x, y);
    }
    else{
      cnp.fillText("You didn't define your text, after the click it won't be printed on the canvas.", x, y);
    }
  }
  Erase(param, e){
    cn.globalCompositeOperation = "destination-out";
    this.DrawController(param, e);
  }
}

var draw = new DrawSupport();
