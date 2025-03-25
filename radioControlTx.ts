namespace __screen_internal {
    export function btnListeningLoop() {
        radio.onReceivedBuffer(function(buf: Buffer) {
            const params: Buffer = buf.slice(1);

            control.raiseEvent(params[0], params[1]);
        })
    }
}
