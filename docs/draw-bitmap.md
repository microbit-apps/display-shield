# draw Bitmap

Draw a bitmap into another bitmap.

```sig
bitmaps.create(0,0).drawBitmap(null,0,0)
```

## Parameters

* **bitmap**: the bitmap to be drawn
* **x**: a [number](/types/number), the column (horizontal pixel location) to draw the bitmap at.
* **y**: a [number](/types/number), the row (vertical pixel location) to draw the bitmap at.

## Example #example

Fill a bitmap with all blue pixels. Draw a red outline around the bitmap and a circle. Make a second bitmap twice that size and draw the first one into it twice. Then draw the second bitmap to the screen.

```blocks
let blueRect = bitmaps.create(32, 32)
blueRect.fill(3)
blueRect.drawRect(0, 0, 32, 32, 10)
blueRect.drawCircle(16, 16, 8, 10)
let doubleRect = bitmaps.create(64, 64)
doubleRect.drawBitmap(blueRect, 0, 0)
doubleRect.drawBitmap(blueRect, 32, 32)
screen().drawBitmap(doubleRect,10,10)
```

```package
display-shield=github:microbit-apps/display-shield
```
