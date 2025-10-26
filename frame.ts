namespace control.__screen {
    let __update: () => void
    let __updated = false;
    let __ok = true;

    export function stop() {
        __ok = false
    }
    
    export function update() {
        if (__update)
            __update()
        __updated = true
    }

    export function setupUpdate(update: () => void) {
        __updated = true;
        __update = update;
        update()
    }

    // low frequency fallback screen refresh
    control.runInParallel(() => {
        while (__ok) {
            __updated = false
            pause(40)
            if (!__updated) {
                __screen.update();
                __updated = true
            }
        }
    })
}
