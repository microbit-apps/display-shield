# draw Transparent Bitmap

Draw a bitmap into another bitmap, with transparency for color index 0.

```sig
bitmaps.create(0,0).drawTransparentBitmap(null,0,0)
```

## Parameters

* **bitmap**: a Bitmap to be drawn
* **x**: a [number](/types/number), the column (horizontal pixel location) to draw the bitmap at.
* **y**: a [number](/types/number), the row (vertical pixel location) to draw the bitmap at.

A `.` means that a pixel is transparent, so that any pixels with color in the bitmap that is being drawn into it will show through. 

## Example #example

Let's make two bitmaps that are the same size and put one that has some transparent pixels on top of one that doesn't.
The first bitmap is a green circle inside a 8 x 8 rectangle. All of the pixels around the circle are transparent.
The other bitmap is the same size but with all yellow pixels.


```block
let greenBall = bmp`
. . . . . . . .
. . . 6 6 . . .
. . 6 6 6 6 . .
. 6 6 6 6 6 6 .
. 6 6 6 6 6 6 .
. . 6 6 6 6 . .
. . . 6 6 . . .
. . . . . . . .
`

let yellowSquare = bmp`
5 5 5 5 5 5 5 5
5 5 5 5 5 5 5 5
5 5 5 5 5 5 5 5
5 5 5 5 5 5 5 5
5 5 5 5 5 5 5 5
5 5 5 5 5 5 5 5
5 5 5 5 5 5 5 5
`

screen().drawBitmap(yellowSquare, 0, 0)
screen().drawTransparentBitmap(greenBall, 0, 0)
```

To see the difference, change the second call from `drawTransparentBitmap` to `drawBitmap`.

```package
pxt-arcadeshield=github:microbit-apps/pxt-arcadeshield
```
