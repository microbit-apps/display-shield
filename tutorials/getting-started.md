# Micro:bit Arcade Shield Getting Started

## Getting started @showdialog

In this tutorial, you will learn to draw on the screen of a micro:bit Arcade shield.
Let's go!

## Fill the screen with a color @showhint

Drag the `||drawing:fill||` at the start of `||basic:on start||`. After restarting, you should also see the arcade shield simulator.

```blocks
// @highlight
screen().fill(4)
```

## Draw some lines @showhint

Drag the `||drawing:draw line||` twice to create two diagonal lines.

```block
screen().fill(4)
// @highlight
screen().drawLine(0, 0, 159, 119, 2)
// @highlight
screen().drawLine(159, 0, 0, 119, 5)
```

## Draw a filled circle @showhint

Drag the `||drawing:fill circle||` to create a filled yellow circle at the center of the screeb.

```block
screen().fill(4)
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
// @highlight
screen().fillCircle(80, 60, 20, 5)
```

## Draw a rectangle @showhint

```block
screen().fill(4)
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
screen().fillCircle(80, 60, 20, 5)
screen().drawRect(70, 50, 20, 20, 10)
```

## Create a bitmap

```block
screen().fill(4)
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
screen().fillCircle(80, 60, 20, 5)
screen().drawRect(70, 50, 20, 20, 10)
// @highlight
let bitmap = bitmaps.create(32, 32)
```

## Draw into the bitmap

```block
screen().fill(4)
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
screen().fillCircle(80, 60, 20, 5)
screen().drawRect(70, 50, 20, 20, 10)
let bitmap = bitmaps.create(32, 32)
// @highlight
bitmap.fillCircle(16, 16, 15, 5)
// @highlight
bitmap.drawRect(6, 6, 21, 21, 10)
screen().drawBitmap(bitmap, 0, 0)
```

# Draw the bitmap to the screen

```block
screen().fill(4)
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
screen().fillCircle(80, 60, 20, 5)
screen().drawRect(70, 50, 20, 20, 10)
let bitmap = bitmaps.create(32, 32)
bitmap.fillCircle(16, 16, 15, 5)
bitmap.drawRect(6, 6, 21, 21, 10)
// @highlight
screen().drawBitmap(bitmap, 0, 0)
```

