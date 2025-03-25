namespace __screen_internal {
    export function btnListeningLoop() {
        radio.onReceivedBuffer(function(buf: Buffer) {
            const params: Buffer = buf.slice(1);

            basic.showString("Y")
            control.raiseEvent(params[0], params[1]);
        })
    }
}
