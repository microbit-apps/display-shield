# draw Transparent Bitmap

Draw a bitmap into another bitmap, with transparency for color index 0.

```sig
bitmaps.create(0,0).drawTransparentBitmap(null,0,0)
```

## Parameters

* **bitmap**: a Bitmap to be drawn
* **x**: a [number](/types/number) that's the horizontal pixel location to draw the bitmap at.
* **y**: a [number](/types/number) that's the vertical pixel location to draw the bitmap at.

## Example #example

Fill an entire bitmap with all blue pixels. Draw a red outline around the bitmap.
Draw the bitmap at several locations.

```blocks
let blueRect = bitmaps.create(32, 32)
blueRect.fill(3)
blueRect.drawRect(0, 0, 32, 32, 10)
screen().drawBitmap(blueRect, 0, 0)
screen().drawBitmap(blueRect, 32, 32)
```

```package
pxt-arcadeshield=github:microbit-apps/pxt-arcadeshield
```
