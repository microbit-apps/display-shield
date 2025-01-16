# MakeCode extension: Display shield for BBC micro:bit

This MakeCode extension allows you to use any of the  MakeCode Arcade shields with the MakeCode for BBC micro:bit editor. 
The extension provides access to the screen and buttons on the shield, and has
a Bitmap abstraction with numerous drawing primitives
(draw line, circle, square, etc).
Bitmaps also can be created using the built-in
image editor in MakeCode.

> **NOTE: This extension will only work in https://makecode.microbit.org/beta**. The extension is still under development and is subject to changes. Please file issues at https://github.com/microbit-apps/display-shield/issues 

## Arcade Shields for the micro:bit V2

Various Arcade shields for the micro:bit V2 are available on the market today, including:

* [Kittenbot's newbit Arcade shield](https://www.kittenbot.cc/products/newbit-arcade-shield): No assembly required Small screen and nice enclosure with LiPo battery inside. One [Jacdac](https://aka.ms/jacdac) port.
* [ELECFREAK's micro:bit Arcade shield](https://www.kittenbot.cc/products/newbit-arcade-shield): Assembly required. Small screen. AAA Battery pack on back. One [Jacdac](https://aka.ms/jacdac) port.
* [ICShopping's Game:bit Arcade shield](https://www.icshop.com.tw/products/368112100137?locale=en): No assembly required. Large screen and 3d-printed enclosure with LiPo battery inside. Two [Jacdac](https://aka.ms/jacdac) ports.
* [Kitronik's Arcade for BBC micro:bit](https://kitronik.co.uk/products/56116-kitronik-arcade-for-bbc-micro-bit-makecode-arcade): No assembly required. Small screen. Battery holder on back. No Jacdac port.

![MakeCode Arcade Shields](https://github.com/microbit-apps/display-shield/blob/master/assets/shields.png?raw=true)


## Simulator support

As shown below, the extension provides a simulator for the display,
with keyboard controls mapping to the inputs of
the display shield (A and B buttons, and the four directions of the
D-pad, see arrow buttons).  Blocks
for the shield are under the toolbox categories `Controller` and
`Drawing` and are described further below.

![MakeCode with Display Shield Simulator](https://github.com/microbit-apps/display-shield/blob/master/assets/shieldSim.png?raw=true)


> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S07267-08481-73083-11887)


## Using this extension

-  Open https://makecode.microbit.org/beta 
-  Create a new project
-  Add an extension via the "Extensions" item in the gear wheel (upper right)
-  Type "display shield" into the search box
-  Select the **display-shield** extension, as shown below

![MakeCode extension dialog](https://github.com/microbit-apps/display-shield/blob/master/assets/extensions.png?raw=true)

## Mashup!!!

With this extension, you have access to **all** the MakeCode APIs for the micro:bit, and the new ability to plot data or create your own user interface. For example, one very cool thing about the micro:bit is it's (X,Y,Z) accelerometer, which senses motion in three dimensions.  Below is a program that maps the three accelerometer values to a scrolling line graph:
```block
let x = 0, old_x = 0
let y = 0, old_y = 0
let z = 0, old_z = 0
let t = 0
basic.forever(function () {
    x = Math.map(input.acceleration(Dimension.X), -1024, 1024, 120, 0)
    y = Math.map(input.acceleration(Dimension.Y), -1024, 1024, 120, 0)
    z = Math.map(input.acceleration(Dimension.Z), -1024, 1024, 120, 0)
    screen().drawLine(t, x, t - 1, old_x, 3)
    screen().drawLine(t, y, t - 1, old_y, 4)
    screen().drawLine(t, z, t - 1, old_z, 5)
    t = t + 1
    if (t == 160) {
        screen().scroll(-1, 0)
        t = 159
    }
    old_x = x
    old_y = y
    old_z = z
})
```

> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S82867-73191-89330-76938)

## Tutorials

-   [Getting started](https://makecode.microbit.org/beta#tutorial:github:microbit-apps/display-shield/tutorials/getting-started)

## Overview of API

The examples below are illustrative. All blocks have their own
detailed help pages, available from the MakeCode editor. 
[This page with block rendering](https://makecode.microbit.org/pkg/microbit-apps/display-shield). More APIs are available via TypeScript. 

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

> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S24163-00898-21210-28197)

### Drawing into the screen bitmap

#### Screen coordinates and lines

The screen bitmap is 160 pixels wide and 120 pixels high. 
The upper left of the screen is coordinate (0,0); The lower 
right of the screen is coordinate (159,119).  We draw two lines 
to the screen bitmap to show the four corners of the screen:

```block
screen().fill(8)
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
```
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S31225-91260-81293-38509)

The first two parameters to the function are the (x,y)
coordinate where the line should start, while the next
two parameters are the (x',y') coordinate where the line
should end. The final parameter is the color to draw. Here is
the code in JavaScript:
```
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
```

#### Drawing out of bounds

You don't need to worry (for any drawing command) about drawing off
the screen. So, for example,
```block
screen().drawLine(-10, -10, 10, 10, 2)
```
has the same effect as 
```block
screen().drawLine(0, 0, 10, 10, 2)
```
While the following code won't display anything on the screen at all:
```block
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
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S39837-99945-78225-07627)


You can pass floating point numbers to any drawing command that takes 
a coordinate. For efficiency, the underlying representation is fixed point 
in the MakeCode runtime. Fractional values are ignored when setting a pixel in a bitmap, so
```block
screen().setPixel(79.6, 59.6, 1)
```
has the same effect as 
```block
screen().setPixel(79.4, 59.4, 1)
```
which has the same effect as
```block
screen().setPixel(79, 59, 1)
```
#### Getting a pixel's (color index) value

The following code will show a 2 on the micro:bit screen, as this is the color index 
stored in the pixel:
```block
screen().setPixel(80, 60, 2)
basic.showNumber(screen().getPixel(80, 60))
```
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S94864-19590-01546-54083)

So we can see that each pixel is like a variable that stores a value (in the range 0-15)
that can later be retrieved.

#### Drawing shapes

You can draw a rectangle by first specifying the upper left
corner with the first two parameters to the `drawRect` 
function, followed by the width and the height of the
rectangle, and ending with the draw color:

```block
screen().drawRect(0, 0, 10, 10, 1)
screen().drawRect(10, 10, 20, 20, 2)
screen().drawRect(0, 10, 10, 20, 3)
screen().drawRect(10, 0, 20, 10, 4)
```
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S56084-26336-76246-44233)

You can have the rectangle filled with the specified color instead:
```block
screen().fillRect(0, 0, 10, 10, 1)
screen().fillRect(10, 10, 20, 20, 2)
screen().fillRect(0, 10, 10, 20, 3)
screen().fillRect(10, 0, 20, 10, 4)
```
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S26194-20440-49967-42648)

To draw a circle, first specify the coordinate
of the center of the circle, followed by the radius
of the circle and the draw color. Again, you can choose
to fill the circle or just draw its outline:
```block
screen().fillCircle(10, 10, 8, 2)
screen().drawCircle(10, 10, 8, 5)
```
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S07238-98044-95681-08339)

### Bitmap

Let's dig into bitmaps, which you can create yourself (the screen is represented by a bitmap, as we have seen already). A bitmap is some number of rows and columns of color pixels that make up rectangular picture. A _pixel_ is a single point of color inside the bitmap. 

Bitmaps are have a set height (number of rows) and width (number of columns). When a bitmap is declared, or created, the height and width are specified either by the _layout_ of the bitmap or as parameters to it's `create` method.

#### Bitmap editor

The easiest way to create a bitmap is with the bitmap editor, which is accessible both from blocks and text view.  Here is the block view of an 
16x16 bitmap of an apple:

```block
screen().fill(6)
let apple = bmp`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `
screen().drawTransparentBitmap(apple, 70, 50)
```
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S09276-36456-18209-30086)

Here is the bitmap editor, which appears when you click on the icon in bitmap block

![MakeCode Arcade Shields](https://github.com/microbit-apps/display-shield/blob/master/assets/appleBitmapEditor.png?raw=true)


The bitmap also is represented as a text literal, as shown below

```
screen().fill(6)
let apple = bmp`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `
screen().drawTransparentBitmap(apple, 70, 50)
```

Click on the painter's palette icon next to the bitmap literal in the text view to bring up the bitmap editor

![MakeCode Arcade Shields](https://github.com/microbit-apps/display-shield/blob/master/assets/bitmapEditorFromText.png?raw=true)


#### Bitmap layout

You _declare_ a bitmap by creating a layout. This is done in JavaScript with the ``bmp'...'`` string declaration. The pixels are single (non-white-space) characters inside the string.

To make a bitmap with some size, just set the pixel characters in the rows of the **bmp** string. A bitmap that is 1 pixel high by 1 pixel wide (1 x 1) is:

```
let oneByOne = bmp`.`
```

A bitmap that is 2 x 2 is declared like this:

```
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

```
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

```
let oneRed = bmp`2`
```

As a block it looks like this:

```
let oneRed = bmp`2`
```

We can make 4 x 4 bitmap that uses all of the colors:

```
let allColors = bmp`
0 1 2 3
4 5 6 7
8 9 a b
c d e f
`
let larger4x = allColors.doubled().doubled()
screen().drawBitmap(larger4x, 0, 0)
```

This the same bitmap as a block:
```block
let allColors = bmp`
0 1 2 3
4 5 6 7
8 9 a b
c d e f
`
let larger4x = allColors.doubled().doubled()
screen().drawBitmap(larger4x, 0, 0)
```
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S45330-31711-15419-66725)

#### Transparency and overlap

Let's see how transparency works with bitmaps. A `.` means that a pixel is transparent. Only the pixels with a color will show in a bitmap and any pixels with color in a bitmap below it will show through. So, to demonstrate, let's make two bitmaps that are the same size and put one that has some transparent pixels on top of one that doesn't.

Our first bitmap is a green circle inside a 8 x 8 rectangle. All of the pixels around the circle are transparent.

```
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

```
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
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S29479-80151-27505-97683)

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
screen().fill(8)
screen().drawTransparentBitmap(orangeBox, 0, 0)
screen().drawTransparentBitmap(orangeBox, 32, 32)
```
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S25149-03569-03166-64971)

#### Drawing to a bitmap

All the functions we previously reviewed for drawing to the
screen can also be applied to a bitmap. For example, the orange border in a bitmap can be created as followsL

```block
let orangeBox = bitmaps.create(32, 32)
orangeBox.drawLine(0, 0, 31, 0, 4)
orangeBox.drawLine(0, 0, 0, 31, 4)
orangeBox.drawLine(0, 31, 31, 31, 4)
orangeBox.drawLine(31, 0, 31, 31, 4)
screen().fill(8)
screen().drawTransparentBitmap(orangeBox, 0, 0)
screen().drawTransparentBitmap(orangeBox, 32, 32)
```
> [Open in MakeCode](https://makecode.microbit.org/beta/#pub:S29084-47427-55388-74348)


# Supported targets

- for PXT/microbit

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
