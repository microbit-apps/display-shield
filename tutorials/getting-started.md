# Micro:bit Arcade Shield Getting Started

## Getting started @showdialog

In this tutorial, you will learn to draw on the screen of a micro:bit Arcade shield with 
a variety of drawing blocks. Let's go!

## Fill the screen with a color @showhint

Drag the `||drawing:fill||` block to the start of `||basic:on start||`. You should see the arcade shield simulator and the display should turn blue:

```blocks
// @highlight
screen().fill(8)
```

## Set a pixel to white @showhint

Drag the `||drawing:set pixel||` block to plot a single point:

```block
screen().fill(8)
// @highlight
screen().setPixel(80, 60, 1)
```

## Draw a diagonal line @showhint

Drag the `||drawing: draw line||` to draw a line from the upper-left of the display to the lower-right:

```block
screen().fill(8)
screen().setPixel(80, 60, 1)
// @highlight
screen().drawLine(0, 0, 159, 119, 1)
```

## Fill a rectangle @showhint

Drag the `||drawing: fill rectangle||` to fill the rectangle in the upper-left quadrant of the display:

```block
screen().fill(8)
screen().setPixel(80, 60, 1)
screen().drawLine(0, 0, 159, 119, 1)
// @highlight
screen().fillRect(0, 0, 79, 59, 6)
```
## Draw a rectangle @showhint

Drag the `||drawing: draw rectangle||` to draw a rectangle outline in the upper-left quadrant of the display:

```block
screen().fill(8)
screen().setPixel(80, 60, 1)
screen().drawLine(0, 0, 159, 119, 1)
screen().fillRect(0, 0, 79, 59, 6)
// @highlight
screen().drawRect(0, 0, 79, 59, 5)
```

## Fill a circle @showhint

Drag the `||drawing: fill dircle||` to fill a circle in the center of the display:
```block
screen().fill(8)
screen().setPixel(80, 60, 1)
screen().drawLine(0, 0, 159, 119, 1)
screen().fillRect(0, 0, 79, 59, 6)
screen().drawRect(0, 0, 79, 59, 5)
// @highlight
screen().fillCircle(80, 60, 10, 10)
```

## Draw a circle @showhint

Drag the `||drawing: draw dircle||` to draw a circular outline at the center of the display:

```block
screen().fill(8)
screen().setPixel(80, 60, 1)
screen().drawLine(0, 0, 159, 119, 1)
screen().fillRect(0, 0, 79, 59, 6)
screen().drawRect(0, 0, 79, 59, 5)
screen().fillCircle(80, 60, 10, 10)
// @highlight
screen().drawCircle(80, 60, 10, 9)
```

# Create a bitmap with the bitmap editor @showhint

Drag the `||drawing: set bitmap||` block to create a new variable holding a bitmap. Click on the bitmp block to open the bitmap editor and paint an image:

```block
screen().fill(8)
screen().setPixel(80, 60, 1)
screen().drawLine(0, 0, 159, 119, 1)
screen().fillRect(0, 0, 79, 59, 6)
screen().drawRect(0, 0, 79, 59, 5)
screen().fillCircle(80, 60, 10, 10)
screen().drawCircle(80, 60, 10, 9)
// @highlight
let bitmap = bmp`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 7 7 7 7 . . . . . . . 
    . . . 7 7 7 2 2 7 7 7 . . . . . 
    . . . 7 2 2 2 2 2 2 7 . . . . . 
    . . 7 7 2 2 2 2 2 2 7 7 . . . . 
    . . 7 7 2 2 2 2 2 2 2 7 . . . . 
    . . 7 7 2 2 2 2 2 2 2 7 7 . . . 
    . . 7 7 2 2 2 2 2 2 2 2 7 . . . 
    . . . 7 2 2 2 2 2 2 2 2 7 . . . 
    . . . 7 2 2 2 2 2 2 2 2 7 . . . 
    . . . 7 7 2 2 2 2 2 2 7 7 . . . 
    . . . . . 7 7 2 2 7 7 7 . . . . 
    . . . . . . 7 7 7 7 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
```

# Draw the bitmap (no transparency)

Drag the `||drawing: draw bitmap||` to draw the bitmap you created without transparency (transparent pixels appear black):

```block
screen().fill(8)
screen().setPixel(80, 60, 1)
screen().drawLine(0, 0, 159, 119, 1)
screen().fillRect(0, 0, 79, 59, 6)
screen().drawRect(0, 0, 79, 59, 5)
screen().fillCircle(80, 60, 10, 10)
screen().drawCircle(80, 60, 10, 9)
let bitmap = bmp`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 7 7 7 7 . . . . . . . 
    . . . 7 7 7 2 2 7 7 7 . . . . . 
    . . . 7 2 2 2 2 2 2 7 . . . . . 
    . . 7 7 2 2 2 2 2 2 7 7 . . . . 
    . . 7 7 2 2 2 2 2 2 2 7 . . . . 
    . . 7 7 2 2 2 2 2 2 2 7 7 . . . 
    . . 7 7 2 2 2 2 2 2 2 2 7 . . . 
    . . . 7 2 2 2 2 2 2 2 2 7 . . . 
    . . . 7 2 2 2 2 2 2 2 2 7 . . . 
    . . . 7 7 2 2 2 2 2 2 7 7 . . . 
    . . . . . 7 7 2 2 7 7 7 . . . . 
    . . . . . . 7 7 7 7 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
// @highlight
screen().drawBitmap(bitmap, 72, 52)
```

# Draw the bitmap (with transparency)

Drag the `||drawing: draw bitmap transparent||` to draw the bitmap you created with transparency (background color shows through transparent pixels):

```block
screen().fill(8)
screen().setPixel(80, 60, 1)
screen().drawLine(0, 0, 159, 119, 1)
screen().fillRect(0, 0, 79, 59, 6)
screen().drawRect(0, 0, 79, 59, 5)
screen().fillCircle(80, 60, 10, 10)
screen().drawCircle(80, 60, 10, 9)
let bitmap = bmp`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 7 7 7 7 . . . . . . . 
    . . . 7 7 7 2 2 7 7 7 . . . . . 
    . . . 7 2 2 2 2 2 2 7 . . . . . 
    . . 7 7 2 2 2 2 2 2 7 7 . . . . 
    . . 7 7 2 2 2 2 2 2 2 7 . . . . 
    . . 7 7 2 2 2 2 2 2 2 7 7 . . . 
    . . 7 7 2 2 2 2 2 2 2 2 7 . . . 
    . . . 7 2 2 2 2 2 2 2 2 7 . . . 
    . . . 7 2 2 2 2 2 2 2 2 7 . . . 
    . . . 7 7 2 2 2 2 2 2 7 7 . . . 
    . . . . . 7 7 2 2 7 7 7 . . . . 
    . . . . . . 7 7 7 7 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
screen().drawBitmap(bitmap, 72, 52)
// @highlight
screen().drawTransparentBitmap(bitmap, 32, 22)
```