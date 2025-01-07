# draw Rect

Draw an outline around a rectangle with a pixel color.

```sig
bitmaps.create(0,0).drawRect(0,0,0,0,0)
```

A rectangular outline is drawn in a bitmap. The line width of the outline is one pixel wide drawn with the color you choose.

## Parameters

* **x**: a [number](/types/number), the horizontal location of the upper-left corner of the rectangle
* **y**: a [number](/types/number), the vertical location of the upper-left corner of the rectangle
* **w**: a [number](/types/number), the width in pixels of the rectangle.
* **h**: a [number](/types/number), the height in pixels of the rectangle.
* **c**: a [number](/types/number), the color to draw the rectangular outline with. Color numbers are value between `0` and `15` which select a color from the current palette of colors.

## Example #example

Fill an entire bitmap with all blue pixels. Draw a red outline around the bitmap.

```blocks
let blueRect = bitmaps.create(32, 32)
blueRect.fill(3)
blueRect.drawRect(0, 0, 32, 32, 10)
screen().drawBitmap(blueRect, 0, 0)
```


```package
arcadeshield=github:microbit-apps/arcadeshield
```
