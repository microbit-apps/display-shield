# MakeCode extension: Arcade Shield for BBC micro:bit (V2)

This MakeCode extension allows you to use any of the  MakeCode Arcade shields with the MakeCode for BBC micro:bit editor. The extension provides access 
to the screen and buttons on the shield, and has
a Bitmap abstraction with numerous drawing primitives
(draw line, circle, square, etc).
Bitmaps also can be created using the built-in
image editor in MakeCode.

> **NOTE: This extension will only work in https://makecode.microbit.org/beta**. The extension is still under development and is subject to changes. Please file issues at https://github.com/microbit-apps/arcadeshield/issues 

## Arcade Shields for the micro:bit V2

Various Arcade shields for the micro:bit V2 are available on the market today, including:

* [Kittenbot's newbit Arcade shield](https://www.kittenbot.cc/products/newbit-arcade-shield): No assembly required Small screen and nice enclosure with LiPo battery inside. One [Jacdac](https://aka.ms/jacdac) port.
* [ELECFREAK's micro:bit Arcade shield](https://www.kittenbot.cc/products/newbit-arcade-shield): Assembly required. Small screen. AAA Battery pack on back. One [Jacdac](https://aka.ms/jacdac) port.
* [ICShopping's Game:bit Arcade shield](https://www.icshop.com.tw/products/368112100137?locale=en): No assembly required. Large screen and 3d-printed enclosure with LiPo battery inside. Two [Jacdac](https://aka.ms/jacdac) ports.
* [Kitronik's Arcade for BBC micro:bit](https://kitronik.co.uk/products/56116-kitronik-arcade-for-bbc-micro-bit-makecode-arcade): No assembly required. Small screen. Battery holder on back. No Jacdac port.

![MakeCode Arcade Shields](https://github.com/microbit-apps/arcadeshield/blob/master/assets/shields.png?raw=true)


## Simulator support

As shown below, the extension provides a simulator for the display,
with keyboard controls mapping to the inputs of
the display shield (A and B buttons, and the four directions of the
D-pad, see arrow buttons).  Blocks
for the shield are under the toolbox categories `Controller` and
`Drawing` and are described further below.

![MakeCode with Arcade Shield Simulator](https://github.com/microbit-apps/arcadeshield/blob/master/assets/shieldSim.png?raw=true)

## Using this extension

-  Open https://makecode.microbit.org/beta 
-  Create a new project
-  Add an extension via the "Extensions" item in the gear wheel (upper right)
-  Type "arcade" into the search box
-  Select the **arcadeshield** extension, as shown below

![MakeCode extension dialog](https://github.com/microbit-apps/arcadeshield/blob/master/assets/extensions.png?raw=true)

## Tutorials

-   [Getting started](https://makecode.microbit.org/beta#tutorial:github:microbit-apps/arcadeshield/tutorials/getting-started)

## Overview of API

The examples below are illustrative. All blocks have their own
detailed help pages, available from the MakeCode editor. 
[This page with block rendering](https://makecode.microbit.org/pkg/microbit-apps/arcadeshield). More APIs are available via TypeScript. 

### Controller

The controller API has event handlers for the A,B and four directions
on the D-pad, as well as the menu button. There also are functions
for polling the buttons. Some example code:

```block
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    screen().fill(Math.randomRange(1,14))
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    screen().fill(15)
})
```

### Drawing into the screen bitmap

#### Screen coordinates and lines

The screen bitmap is 160 pixels wide and 120 pixels high. 
The upper left of the screen is coordinate (0,0); The lower 
right of the screen is coordinate (159,119).  We draw two lines 
to the screen bitmap to show the four corners of the screen:

```block
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
```
The first two parameters to the function are the (x,y)
coordinate where the line should start, while the next
two parameters are the (x',y') coordinate where the line
should end. The final parameter is the color to draw. Here is
the code in JavaScript:
```typescript
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
```

### Drawing out of bounds

You don't need to worry (for any drawing command) about drawing off
the screen. So, for example,
```typescript
screen().drawLine(-10, -10, 10, 10, 2)
```
has the same effect as 
```typescript
screen().drawLine(0, 0, 10, 10, 2)
```
While the following code won't display anything on the screen at all:
```typescript
screen().drawLine(-1, -1, -10, -10, 2)
```

#### Screen center, setting a pixel, and floating point

Since the width and height of the screen are both even, the center of
the screen is bounded by these four pixels, as shown by the following
four commands that each draw a single pixel:

```block
screen().setPixel(79, 59, 1)
screen().setPixel(80, 59, 1)
screen().setPixel(79, 60, 1)
screen().setPixel(80, 60, 1)
```

You can pass floating point numbers to any drawing command that takes 
a coordinate. For efficiency, the underlying representation is fixed point 
in the MakeCode runtime. Fractional values are ignored when setting a pixel in a bitmap, so
```typescript
screen().setPixel(79.6, 59.6, 1)
```
has the same effect as 
```typescript
screen().setPixel(79.4, 59.4, 1)
```
which has the same effect as
```typescript
screen().setPixel(79, 59, 1)
```
#### Getting a pixel's (color index) value

The following code will show a 2 on the micro:bit screen, as this is the color index 
stored in the pixel:
```block
screen().setPixel(80, 60, 2)
basic.showNumber(screen().getPixel(80, 60))
```
So we can see that each pixel is like a variable that stores a value (in the range 0-15)
that can later be retrieved.

#### Drawing shapes

You can draw a recentangle by first specifying the upper left
corner with the first two parameters to the `drawRect` 
function, followed by the width and the height of the
rectangle, and ending with the draw color:

```block
screen().drawRect(0, 0, 10, 10, 1)
screen().drawRect(10, 10, 20, 20, 2)
screen().drawRect(0, 10, 10, 20, 3)
screen().drawRect(10, 0, 20, 10, 4)
```

You can have the rectangle filled with the specified color instead:
```typescript
screen().fillRect(0, 0, 10, 10, 1)
screen().fillRect(10, 10, 20, 20, 2)
screen().fillRect(0, 10, 10, 20, 3)
screen().fillRect(10, 0, 20, 10, 4)
```

To draw a circle, first specify the coordinate
of the center of the circle, followed by the radius
of the circle and the draw color. Again, you can choose
to fill the circle or just draw its outline:
```block
screen().fillCircle(10, 10, 8, 2)
screen().drawCircle(10, 10, 8, 5)
```
### Bitmap

Let's dig into bitmaps, which you can create yourself (the screen is represented by a bitmap, as we have seen already). A bitmap is some number of rows and columns of color pixels that make up rectangular picture. A _pixel_ is a single point of color inside the bitmap. 

Bitmaps are have a set height (number of rows) and width (number of columns). When a bitmap is declared, or created, the height and width are specified either by the _layout_ of the bitmap or as parameters to it's `create` method.

#### Bitmap layout

You _declare_ a bitmap by creating a layout. This is done in JavaScript with the ``bmp'...'`` string declaration. The pixels are single (non-white-space) characters inside the string.

To make a bitmap with some size, just set the pixel characters in the rows of the **bmp** string. A bitmap that is 1 pixel high by 1 pixel wide (1 x 1) is:

```typescript
let oneByOne = bmp`.`
```

A bitmap that is 2 x 2 is declared like this:

```typescript
let twoBytwo = bmp`
. .
. .
`
```

Here they are in blocks:

```block
let oneByOne = bmp`.`
let twoBytwo = bmp`
. .
. .
`
```

You'll notice that they look the same. That's because the pixel colors are not set so the bitmaps are empty.

Bitmaps don't have to be exactly square. The height and width can be different. Here's a 6 x 2 bitmap:

```typescript
let sixByTwo = bmp`
. . . . . .
. . . . . .
`
```

#### Setting pixels

##### Transparent pixels

A pixel value of `.` means an empty pixel. This pixel has no color and that pixel _location_ in the bitmap is _transparent_. Being transparent means that if this bitmap is on top of another bitmap (overlapping) that has some pixel color, then the color of the pixel in the bitmap underneath shows through to the bitmap above it.

##### Pixel colors

Besides the empty, or transparent pixel `.`, there are 16 color pixels you can use. These are matched to colors in a _palette_. A palette is a set of colors you can choose from. The colors are selected by using a single number or letter to match them. The default palette, for example, uses these colors:

* `.`: empty or transparent
* `0`: transparent
* `1`: white
* `2`: red
* `3`: pink
* `4`: orange
* `5`: yellow
* `6`: blue-green
* `7`: green
* `8`: dark blue
* `9`: light blue
* `a`: purple
* `b`: dark grey
* `c`: dark purple
* `d`: beige
* `e`: brown
* `f`: black

A 1 x 1 bitmap with a red pixel is declared as:

```typescript
let oneRed = bmp`2`
```

As a block it looks like this:

```block
let oneRed = bmp`2`
```

We can make 4 x 4 bitmap that uses all of the colors:

```typescript
let allColors = bmp`
0 1 2 3
4 5 6 7
8 9 a b
c d e f
`
```

This the same bitmap as a block:

```block
let allColors = bmp`
0 1 2 3
4 5 6 7
8 9 a b
c d e f
`
```

#### Transparency and overlap

Let's see how transparency works with bitmaps. A `.` means that a pixel is transparent. Only the pixels with a color will show in a bitmap and any pixels with color in a bitmap below it will show through. So, to demonstrate, let's make two bitmaps that are the same size and put one that has some transparent pixels on top of one that doesn't.

Our first bitmap is a green circle inside a 8 x 8 rectangle. All of the pixels around the circle are transparent.

```typescript
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
```

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
5 5 5 5 5 5 5 5
5 5 5 5 5 5 5 5
`
```

Putting the green circle bitmap exactly over the yellow square, you see that the yellow from the bitmap below isn't blocked out by the transparent pixels from the bitmap on top.

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
5 5 5 5 5 5 5 5
`

screen().drawBitmap(yellowSquare, 0, 0)
screen().drawTransparentBitmap(greenBall, 0, 0)
```

#### Setting pixels at locations

You can create your bitmaps while your program is running. To make a bitmap this way, you set the color of a pixel at its location with code. Pixels are addressed by their column (``x`` value) and row (``y`` value) inside the bitmap. You could create an empty bitmap and make some or all of the bitmap by setting pixel colors in your code. Let's make a 32 x 32 box by creating an empty bitmap and then draw an orange border in it.

```block
let orangeBox = bitmaps.create(32, 32)
for (let i = 0; i <= 31; i++) {
    orangeBox.setPixel(0, i, 4)
    orangeBox.setPixel(i, 0, 4)
    orangeBox.setPixel(i, 31, 4)
    orangeBox.setPixel(31, i, 4)
}
screen().drawTransparentBitmap(orangeBox, 0, 0)
screen().drawTransparentBitmap(orangeBox, 32, 32)
```

#### Drawing to a bitmap

All the functions we previously reviewed for drawing to the
screen can also be applied to a bitmap. For example, the orange border in a bitmap can be created as followsL

```block
let orangeBox = bitmaps.create(32, 32)
orangeBox.drawLine(0, 0, 31, 0, 4)
orangeBox.drawLine(0, 0, 0, 31, 4)
orangeBox.drawLine(0, 31, 31, 31, 4)
orangeBox.drawLine(31, 0, 31, 31, 4)
screen().drawTransparentBitmap(orangeBox, 0, 0)
screen().drawTransparentBitmap(orangeBox, 32, 32)
```

# Supported targets

- for PXT/microbit

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
