# get Pixel

Get the color number of a pixel at a location in a bitmap

```sig
bitmaps.create(0, 0).getPixel(0, 0)
```

# Parameters

* **x**: a [number](/types/number), the horziontal position of the pixel
* **y**: a [number](/types/number), the vertical position of the pixel

## Returns

* a [number](/types/number), the color of the pixel at location **x** and **y** in the bitmap. The color number is a value between `0` and `15`.

## Example #example

Randomly fill a bitmap with different colors. Change the color of a pixel in the middle if it's white.

```blocks
let randoColors = bitmaps.create(16, 16)
for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
        randoColors.setPixel(x, y, Math.randomRange(0, 15))
    }
}
if (randoColors.getPixel(8, 8) == 1) {
    randoColors.setPixel(8, 8, 2)
}
screen().drawBitmap(randoColors, 0, 0)    
```


```package
pxt-arcadeshield=github:microbit-apps/pxt-arcadeshield
```
