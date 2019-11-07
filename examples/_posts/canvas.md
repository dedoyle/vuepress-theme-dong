# Canvas 基础 API 和代码示例

Canvas API 提供了一个通过 JavaScript 和 HTML 的 `<canvas>` 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

Canvas API 主要聚焦于 2D 图形。而同样使用 `<canvas>` 元素的 WebGL API 则用于绘制硬件加速的2D和3D图形。

`<canvas>` 元素默认宽 300px ，高 150px 且无边框，可通过 css 修改 canvas 的宽高和边框样式。

## Canvas 坐标系

canvas 是二维的矩形区域，左上角的坐标为 (0, 0)，右下角的坐标为 (canvas width, canvas height)

## 基础知识

下面的代码综合了直线、弧线、圆、矩形的的示例，同时也包含笔画颜色，笔画大小，填充色，渐变色等知识。

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="utf-8">
  <title>Drawing on Canvas</title>
  <style>
    canvas {
      border: 1px solid lightgrey;
    }
  </style>
</head>

<body>
  <canvas id="myCanvas" width="500" height="300"></canvas>
  <script>
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    // 设置线宽
    context.lineWidth = 5

    // 设置描线颜色
    context.strokeStyle = "#004CB3"

    // 让线圆润
    context.lineCap = "round"

    // 画了一条线
    context.moveTo(50, 20)
    context.lineTo(250, 20)
    context.stroke()

    // 清空之前的路径，后面的 fill 才不会影响之前的图形
    context.beginPath()

    // 画一个弧形
    // context.arc(centerX, centerY, radius, startingAngle, endingAngle, counterclockwise)
    context.arc(100, 100, 80, 0.5 * Math.PI, 1 * Math.PI, false)
    context.stroke()

    // 清空之前的路径，后面的 fill 才不会影响之前的图形
    context.beginPath()

    // 画一个矩形
    // context.rect(x, y, width, height)
    context.rect(50, 50, 200, 100)

    // 线性渐变
    // context.createLinearGradient(startX, startY, endX, endY)
    var grd = context.createLinearGradient(50, 50, 200, 100)
    grd.addColorStop(0, '#8ED6FF')   
    grd.addColorStop(1, '#004CB3')
    context.fillStyle = grd
    context.fill()
    context.stroke()

    // 清空之前的路径，后面的 fill 才不会影响之前的图形
    context.beginPath()

    // 画一个圆
    // context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    context.arc(350, 100, 70, 0, 2 * Math.PI, false)
    grd = context.createRadialGradient(350, 100, 10, 360, 110, 100)
    grd.addColorStop(0, '#8ED6FF')   
    grd.addColorStop(1, '#004CB3')
    context.fillStyle = grd
    context.fill()
    context.stroke()

    // 添加文字
    context.font = 'bold 32px Arial'
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText('Hello World!', 350, 250)
    context.lineWidth = 1
    context.strokeText('Hello World!', 150, 250)
  </script>
</body>

</html>
```

## 随机分布的直线

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    html,
    body {
      height: 100%;
    }

    body {
      margin: 0;
      display: flex;
    }

    canvas {
      margin: auto;
      /* border: 1px solid lightgrey; */
      background: #fff;
    }
  </style>
</head>

<body>
  <canvas id="cvs" width="500" height="500"></canvas>
  <script>
    var cvs = document.getElementById('cvs')
    var ctx = cvs.getContext('2d', {alpha: false})
    var x, y, x2, y2, r, g, b
    var w = cvs.offsetWidth
    var h = cvs.offsetHeight
    var count = 0
    var maxCount = 30

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, w, h)

    function drawLine () {
      count++
      // 这里加两次是为了线基本出现在 canvas 中间
      x = Math.floor(Math.random() * 240) + Math.floor(Math.random() * 240)
      y = Math.floor(Math.random() * 240) + Math.floor(Math.random() * 240)
      x2 = Math.floor(Math.random() * 240) + Math.floor(Math.random() * 240)
      y2 = Math.floor(Math.random() * 240) + Math.floor(Math.random() * 240)
      r = Math.floor(Math.random() * 250)
      g = Math.floor(Math.random() * 250)
      b = Math.floor(Math.random() * 250)
      // 加 beginPath 可以让每根线保持原来的大小和颜色
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
      ctx.lineWidth = Math.floor(Math.random() * 6)
      ctx.stroke()
      ctx.restore()
      if (count < maxCount) {
        window.requestAnimationFrame(drawLine)
      }
    }
    window.requestAnimationFrame(drawLine)
  </script>
</body>

</html>
```

## 画画

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="utf-8">
  <title>Drawing on Canvas</title>
  <style>
    canvas {
      border: 1px solid lightgrey;
    }

    .txt-btn {
      margin-left: 10px;
      text-decoration: none;
    }

    .mb16 {
      margin-bottom: 16px;
    }
  </style>
</head>

<body>
  <div class="mb16">
    clear the canvas:
    <a class="txt-btn" href="javascript:void(0);" onclick="clearCanvas()">Clear</a>
  </div>
  <div class="mb16">
    choose a color:
    <a class="txt-btn" href="javascript:void(0);" onclick="chooseColor('#cb3594')" style="color: #cb3594;">Purple</a>
    <a class="txt-btn" href="javascript:void(0);" onclick="chooseColor('#659b41')" style="color: #659b41;">Green</a>
    <a class="txt-btn" href="javascript:void(0);" onclick="chooseColor('#ffcf33')" style="color: #ffcf33;">Yellow</a>
    <a class="txt-btn" href="javascript:void(0);" onclick="chooseColor('#986928')" style="color: #986928;">Brown</a>
  </div>
  <div class="mb16">
    Choose a size:
    <a class="txt-btn" href="javascript:void(0);" onclick="chooseSize('small')">Small</a>
    <a class="txt-btn" href="javascript:void(0);" onclick="chooseSize('normal')">Normal</a>
    <a class="txt-btn" href="javascript:void(0);" onclick="chooseSize('large')">Large</a>
    <a class="txt-btn" href="javascript:void(0);" onclick="chooseSize('huge')">Huge</a>
  </div>
  <canvas id="canvas" width="490" height="220"></canvas>
  <img src="https://github.com/williammalone/Simple-HTML5-Drawing-App/blob/master/images/watermelon-duck-outline.png?raw=true">

  <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
  <script>
    var canvas = document.getElementById("canvas")
    var context = canvas.getContext("2d")

    // 笔画
    var clickX = []
    var clickY = []
    var clickDrag = []
    var paint;

    // 颜色
    var colorPurple = "#cb3594";
    var colorGreen = "#659b41";
    var colorYellow = "#ffcf33";
    var colorBrown = "#986928";
    var curColor = colorPurple;
    var clickColor = []

    // 大小
    var clickSize = []
    var curSize = 'normal'

    // 工具
    var clickTool = []
    var curTool = 'crayon'

    var canvasWidth = 490,
		  canvasHeight = 220
      drawingAreaX = 111,
      drawingAreaY = 11,
      drawingAreaWidth = 267,
      drawingAreaHeight = 200;

    var crayonTextureImage = new Image()
    crayonTextureImage.src = "https://github.com/williammalone/Simple-HTML5-Drawing-App/blob/master/images/crayon-texture.png?raw=true"
    var outlineImage = new Image();
    outlineImage.src = "https://github.com/williammalone/Simple-HTML5-Drawing-App/blob/master/images/watermelon-duck-outline.png?raw=true"

    function addClick(x, y, dragging) {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      if(curTool === "eraser"){
        clickColor.push("white");
      }else{
        clickColor.push(curColor);
      }
      clickSize.push(curSize);
    }

    function mapSize(size) {
      var radius
      switch (size) {
        case "small":
          radius = 2;
          break;
        case "normal":
          radius = 5;
          break;
        case "large":
          radius = 10;
          break;
        case "huge":
          radius = 20;
          break;
        default:
          radius = 1
          break;
      }
      return radius
    }

    function redraw() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

      context.lineJoin = "round";

      for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
          context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
          context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        // Set the drawing radius
        context.closePath();
        context.strokeStyle = clickColor[i];
        context.lineWidth = mapSize(clickSize[i])
        context.stroke();
      }
      if(curTool == "crayon") {
        context.globalAlpha = 0.4;
        context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
      }
      context.globalAlpha = 1;
      context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
    }

    function clearCanvas() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      clickX = []
      clickY = []
      clickDrag = []
      clickColor = []
    }

    function chooseColor(color) {
      curColor = color
    }

    function chooseSize(size) {
      curSize = size
    }

    $('#canvas').mousedown(function (e) {
      paint = true;
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      redraw();
    });
    $('#canvas').mousemove(function (e) {
      if (paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
      }
    });
    $('#canvas').mouseup(function (e) {
      paint = false;
    });
    $('#canvas').mouseleave(function (e) {
      paint = false;
    });
  </script>
</body>

</html>
```