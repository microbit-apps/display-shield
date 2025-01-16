interface Bitmap {
    /**
     * Fill entire bitmap with a given color
     */
    //% shim=BitmapMethods::fill blockNamespace="drawing" group="Drawing"
    //% blockId=bitmapFill
    //% block="fill $this with $c=colorindexpicker"
    //% help=github:display-shield/docs/fill
    //% this.shadow="theScreen"
    //% weight=100
    //% c.defl=8
    fill(c: int32): void;

    /**
     * Set pixel color
     */
    //% shim=BitmapMethods::setPixel blockNamespace="drawing" group="Drawing"
    //% block="set $this color at x $x y $y to $c=colorindexpicker"
    //% blockId=bitmapSetPixel
    //% help=github:display-shield/docs/set-pixel
    //% this.shadow="theScreen"
    //% weight=96
    //% x.defl=80
    //% y.defl=60
    //% c.defl=1
    setPixel(x: int32, y: int32, c: int32): void;

    /**
     * Get a pixel color
     */
    //% shim=BitmapMethods::getPixel blockNamespace="drawing" group="Drawing"
    //% block="$this color at x $x y $y"
    //% blockId=bitmapGetPixel
    //% help=github:display-shield/docs/get-pixel
    //% this.shadow="theScreen"
    //% weight=92
    //% x.defl=80
    //% y.defl=60
    getPixel(x: int32, y: int32): int32;

    /**
     * Draw a line
     */
    //% helper=imageDrawLine blockNamespace="drawing" inlineInputMode="inline" group="Drawing"
    //% block="draw line in $this from x $x0 y $y0 to x $x1 y $y1 $c=colorindexpicker"
    //% blockId=bitmapDrawLine
    //% help=github:display-shield/docs/draw-line
    //% this.shadow="theScreen"
    //% weight=88
    //% x0.defl=0
    //% y0.defl=0
    //% x1.defl=159
    //% y1.defl=119
    //% c.defl=1
    drawLine(x0: number, y0: number, x1: number, y1: number, c: color): void;

    /**
     * Draw an empty rectangle
     */
    //% helper=imageDrawRect blockNamespace="drawing" inlineInputMode="inline" group="Drawing"
    //% block="draw rectangle in $this at x $x y $y width $w height $h $c=colorindexpicker"
    //% blockId=bitmapDrawRect
    //% help=github:display-shield/docs/draw-rect
    //% this.shadow="theScreen"
    //% weight=84
    //% x.defl=0
    //% y.defl=0
    //% w.defl=79
    //% h.defl=59
    //% c.defl=1
    drawRect(x: number, y: number, w: number, h: number, c: color): void;

    /**
     * Fill a rectangle
     */
    //% helper=imageFillRect blockNamespace="drawing" inlineInputMode="inline" group="Drawing"
    //% block="fill rectangle in $this at x $x y $y width $w height $h $c=colorindexpicker"
    //% blockId=bitmapFillRect
    //% help=github:display-shield/docs/fill-rect
    //% this.shadow="theScreen"
    //% weight=80
    //% x.defl=0
    //% y.defl=0
    //% w.defl=79
    //% h.defl=59
    //% c.defl=1
    fillRect(x: number, y: number, w: number, h: number, c: color): void;

    /**
     * Draw an empty circle.
     *
     * @param cx The center x coordinate of the circle
     * @param cy The center y coordinate of the circle
     * @param r The radius of the circle
     * @param c The color to draw the circle
     */
    //% helper=imageDrawCircle
    //% block="draw circle in $this at cx $cx cy $cy radius $r $c"
    //% blockId=bitmapDrawCircle
    //% this.shadow=theScreen
    //% this.defl=bitmap
    //% c.shadow=colorindexpicker
    //% inlineInputMode="inline"
    //% weight=78
    //% blockNamespace="drawing"
    //% group="Drawing"
    //% cx.defl=80
    //% cy.defl=60
    //% r.defl=10
    //% c.defl=1
    drawCircle(cx: number, cy: number, r: number, c: color): void;

    /**
     * Fills a circle
     *
     * @param cx The center x coordinate of the circle
     * @param cy The center y coordinate of the circle
     * @param r The radius of the circle
     * @param c The color to draw the circle
     */
    //% helper=imageFillCircle
    //% blockId=bitmapFillCircle
    //% block="fill circle in $this at cx $cx cy $cy radius $r $c"
    //% this.shadow=theScreen
    //% this.defl=bitmap
    //% c.shadow=colorindexpicker
    //% inlineInputMode="inline"
    //% weight=77
    //% blockNamespace="drawing"
    //% group="Drawing"
    //% cx.defl=80
    //% cy.defl=60
    //% r.defl=10
    //% c.defl=1
    fillCircle(cx: number, cy: number, r: number, c: color): void;

    /**
     * Draw given bitmap on the current bitmap
     */
    //% shim=BitmapMethods::drawBitmap 
    //% blockNamespace="drawing" 
    //% group="Drawing"
    //% block="draw $from in $this at x $x y $y"
    //% blockId=bitmapDrawBitmap
    //% help=github:display-shield/docs/draw-bitmap
    //% this.shadow="theScreen"
    //% this.defl=bitmap
    //% from.shadow=variables_get
    //% from.defl="bitmap"
    //% weight=76
    drawBitmap(from: Bitmap, x: int32, y: int32): void;

    /**
     * Draw given bitmap with transparent background on the current bitmap
     */
    //% shim=ImageMethods::drawTransparentBitmap
    //% blockNamespace="drawing"
    //% blockId=bitmapDrawTransparentBitmap
    //% group="Drawing"
    //% block="draw $from transparent in $this at x $x y $y"
    //% help=github:display-shield/docs/draw-transparent-bitmap
    //% this.shadow="theScreen"
    //% this.defl=bitmap
    //% from.shadow=variables_get
    //% from.defl="bitmap"
    //% weight=74
    drawTransparentBitmap(from: Bitmap, x: int32, y: int32): void;

    /**
     * Flips (mirrors) pixels horizontally in the current bitmap
     */
    //% shim=BitmapMethods::flipX blockNamespace="drawing" group="Transformations"
    //% block="flip $this horizontally"
    //% blockId=bitmapFlipX
    //% help=github:display-shield/docs/flip-x
    //% this.shadow="theScreen"
    //% weight=72
    flipX(): void;

    /**
     * Flips (mirrors) pixels vertically in the current bitmap
     */
    //% shim=BitmapMethods::flipY blockNamespace="drawing" group="Transformations"
    //% block="flip $this vertically"
    //% blockId=bitmapFlipY
    //% help=github:display-shield/docs/flip-y
    //% this.shadow="theScreen"
    //% weight=68
    flipY(): void;

    /**
     * Every pixel in bitmap is moved by (dx,dy)
     */
    //% shim=BitmapMethods::scroll blockNamespace="drawing" group="Transformations"
    //% help=github:display-shield/docs/scroll
    //% this.shadow="theScreen"
    //% block="scroll $this by x $dx y $dy"
    //% blockId=bitmapScroll
    //% weight=64
    //% dy.defl=1
    scroll(dx: int32, dy: int32): void;

    /**
     * Replaces one color in an bitmap with another
     */
    //% shim=BitmapMethods::replace blockNamespace="drawing" group="Transformations"
    //% block="change color in $this from $from=colorindexpicker to $to=colorindexpicker"
    //% blockId=bitmapReplace
    //% help=bitmaps/bitmap/replace
    //% help=github:display-shield/docs/replace
    //% this.shadow="theScreen"
    //% weight=60 
    replace(from: int32, to: int32): void;

    /**
     * Returns true if the provided bitmap is the same as this bitmap,
     * otherwise returns false.
     */
    //% shim=BitmapMethods::equals
    //% blockNamespace="drawing" group="Compare"
    //% block="$this is equal to bitmap $other"
    //% blockId=bitmapEquals
    //% this.shadow=variables_get
    //% other.shadow=variables_get
    //% this.defl="bitmap"
    //% other.defl="bitmap2"
    //% help=github:display-shield/docs/equals
    equals(other: Bitmap): boolean;

    //% shim=BitmapMethods::isStatic
    isStatic(): boolean;

    //% shim=BitmapMethods::revision
    revision(): number;

    /**
     * Replace colors in a rectangle
     */
    //% helper=imageMapRect
    mapRect(x: number, y: number, w: number, h: number, colorMap: Buffer): void;

    /**
     * Return a copy of the current bitmap
     */
    //% shim=BitmapMethods::clone blockNamespace="drawing" group="Create"
    //% weight=40
    //% block="clone $this"
    //% blockId=bitmapClone
    //% help=github:display-shield/docs/clone
    //% this.shadow=variables_get
    //% this.defl="bitmap"
    clone(): Bitmap;
}

declare namespace bitmaps {
    //% blockNamespace="drawing"
    //% blockId=bitmapCreateAssign
    //% block="create bitmap width $width height $height" group="Create"
    //% weight=80
    //% blockSetVariable=bitmap
    //% help=github:display-shield/docs/create
    //% width.defl=16
    //% height.defl=16
    function create(width: number, height: number): Bitmap;
}