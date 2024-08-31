namespace screenhelpers {
    interface ArcadeShieldMessage {
        type: "show-image" | "set-brightness" | "set-palette"
        runId: any
    }
    interface ShowImageMessage extends ArcadeShieldMessage {
        type: "show-image"
        data: string
    }     
    interface SetBrightnessMessage extends ArcadeShieldMessage {
        type: "set-brightness"
        value: number
    }
    interface SetPaletteMessage extends ArcadeShieldMessage {
        type: "set-palette"
        data: string
    }

    //% fixedInstance
    class ScreenState {
        runId: string;
        brightness: number;

        constructor() {
            this.runId = Math.random() + "";
        }

        displayHeight(): number {
            return 128;
        }

        displayWidth(): number {
            return 160;
        }

        displayPresent(): boolean {
            return true;
        }

        private sendMessage(msg: string) {
            control.simmessages.send("arcadeshield", Buffer.fromUTF8(msg) , false)
        }

        setScreenBrightness(b: number) {
            // NOTE: May need to cache locally for querying
            const msg: SetBrightnessMessage = {
                type: "set-brightness",
                runId: this.runId,
                value: b
            }
            this.sendMessage(JSON.stringify(msg))
        }

        setPalette(buf: Buffer) {
            // NOTE: May need to cache locally for querying
            const msg: SetPaletteMessage = {
                type: "set-palette",
                runId: this.runId,
                data: buf.toBase64()
            }
            this.sendMessage(JSON.stringify(msg))
        }

        showImage(img: Bitmap) {
            // NOTE: May need to cache locally for querying
            const msg: ShowImageMessage = {
                type: "show-image",
                runId: this.runId,
                data: img.__buffer.toBase64()
            }
            this.sendMessage(JSON.stringify(msg))
        }
    }

    const _screenState: ScreenState = new ScreenState();

    function getScreenState(): ScreenState {
        return _screenState;
    }

    //% shim=TD_NOOP
    function simUpdateScreen(img: Bitmap) {
        const state = getScreenState();
        if (state)
            state.showImage(img);        
    }

    export function updateScreen(img: Bitmap) {
        __screenhelpers.updateScreen(img)
        simUpdateScreen(img)
    }

    //% shim=TD_NOOP    
    function simSetPalette(b: Buffer) {
        const state = getScreenState();
        if (state)
            state.setPalette(b);
    }

    export function setPalette(b: Buffer) {
        __screenhelpers.setPalette(b)
        simSetPalette(b)
    }

    //% shim=TD_NOOP   
    function simSetScreenBrightness(n: number) {
        const state = getScreenState();
        if (state)
            state.setScreenBrightness(n);
    }

    export function setScreenBrightness(n: number) {
        __screenhelpers.setScreenBrightness(n)
        simSetScreenBrightness(n)
    }

    // getters

    let __height = 0
    
    //% shim=TD_NOOP
    function simSisplayHeight() {
        __height = 128
        const state = getScreenState();
        if (state)
            __height = state.displayHeight();
    }
    
    export function displayHeight(): number {
        __height = __screenhelpers.displayHeight()
        simDisplayHeight()
        return __height
    }

    let __width = 0
    
    //% shim=TD_NOOP
    function simDisplayWidth() {
        __width = 160
        const state = getScreenState();
        if (state)
            __width = state.displayWidth();
    }

    export function displayWidth(): number {
        __width = __screenhelpers.displayWidth()
        simDisplayWidth()
        return __width
    }

    let __present = true
    
    //% shim=TD_NOOP
    function simDisplayPresent() {
        __present = true
        const state = getScreenState();
        if (state)
            __present = state.displayPresent();
        return __present
    }

    export function displayPresent(): boolean {
        __present = __screenhelpers.displayPresent()
        simDisplayPresent()
        return __present
    }
}
