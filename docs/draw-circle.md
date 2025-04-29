# draw/fill Circle

Draw a circle with a pixel color (or fill a circle with a color).

```sig
bitmaps.create(0,0).drawCircle(0,0,0,0,0)
```
A circle is drawn in a bitmap. The line width of the outline is one pixel wide drawn with the color you choose.


```sig
bitmaps.create(0,0).fillRect(0,0,0,0,0)
```
A filled circle is drawn in the bitmap with the color you choose.

## Parameters

* **x**: a [number](/types/number), the horizontal center of the circle.
* **y**: a [number](/types/number), the vertical center of the circle.
* **r**: a [number](/types/number), the radius of the circle.
* **c**: the [number](/types/number) of the color to draw; Color numbers are value between `0` and `15` which select a color from the current palette of colors.

## Example (draw) #example

Fill an entire bitmap with all blue pixels. Draw a red circle outline.

```blocks
let blueRect = bitmaps.create(32, 32)
blueRect.fill(3)
blueRect.drawCircle(16,16, 8, 10)
screen().drawBitmap(blueRect, 0, 0)
```

## Example (fill) #example

Fill an entire bitmap with all blue pixels. Fill a circle with red.

```blocks
let blueRect = bitmaps.create(32, 32)
blueRect.fill(3)
blueRect.fillCircle(16,16, 8, 10)
screen().drawBitmap(blueRect, 0, 0)


```package
display-shield=github:microbit-apps/display-shield
```
