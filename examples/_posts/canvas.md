# Canvas

Canvas API 提供了一个通过 JavaScript 和 HTML 的 ```<canvas>``` 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

Canvas API 主要聚焦于 2D 图形。而同样使用 ```<canvas>``` 元素的 WebGL API 则用于绘制硬件加速的2D和3D图形。

```<canvas>``` 元素默认宽 300px ，高 150px 且无边框，可通过 css 修改 canvas 的宽高和边框样式。

## Canvas 坐标系

canvas 是二维的矩形区域，左上角的坐标为 (0, 0)，右下角的坐标为 (canvas width, canvas height)

## Path 和 Shapes

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Drawing on Canvas</title>
<script>
    window.onload = function() {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        // draw stuff here
        // 画了一条线
        context.moveTo(50, 150);
        context.lineTo(250, 50);
        context.stroke();
    };
</script>
</head>
<body>
    <canvas id="myCanvas" width="300" height="200"></canvas>
</body>
</html>
```