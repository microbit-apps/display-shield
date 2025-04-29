# draw Line

Draw a line from one point in a bitmap to another point.

```sig
bitmaps.create(0,0).drawLine(0,0,0,0,0)
```

The pixels are located at points in the bitmap. The point is a _coordinate_ which is two values that are a horizontal position and a vertical position. A line is drawn by setting the color of the pixels directly between two coordinates. The line has a width of one pixel.

## Parameters

* **x0**: a [number](/types/number), the horizontal location of the first coordinate.
* **y0**: a [number](/types/number), the vertical location of the first coordinate.
* **x1**: a [number](/types/number), the horizontal location of the second coordinate.
* **y1**: a [number](/types/number), the vertical location of the second coordinate.
* **c**: a [number](/types/number), the color of the pixels in the line. Color numbers are value between `0` and `15` which select a color from the current palette of colors.

## Example #example

Draw a big `X` in a bitmap by making two diagonal lines.

```blocks
let drawBigX = bitmaps.create(32, 32)
drawBigX.fill(5)
drawBigX.drawLine(0, 0, 31, 31, 10)
drawBigX.drawLine(0, 31, 31, 0, 10)
screen().drawBitmap(drawBigX,64,44)
```

```package
display-shield=github:microbit-apps/display-shield
```
