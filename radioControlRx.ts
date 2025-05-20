const SCREEN_FN_ID_HANDSHAKE: number = 0;
const SCREEN_FN_ID_RESET_SCREEN_IMAGE: number = 5;
const SCREEN_FN_ID_SET_IMAGE_SIZE: number = 6;
const SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: number = 7;
const SCREEN_FN_ID_DRAW_LINE: number = 9;
const SCREEN_FN_ID_DRAW_RECT: number = 12;
const SCREEN_FN_ID_FILL: number = 14;
const SCREEN_FN_ID_FILL_RECT: number = 15;
const SCREEN_FN_ID_SET_PIXEL: number = 21;
const SCREEN_FN_ID_PRINT: number = 23;


namespace controller {
    export function bindButtonsForWDS(): void {
        // Presume _userEventsEnabled

        const controllerButtonEvents = [ControllerButtonEvent.Pressed, ControllerButtonEvent.Released, ControllerButtonEvent.Repeated];
        const controllerKeys: number[] = [2048, 2049, 2054];
        const btns = [controller.up, controller.down, controller.left, controller.right];

        for (let i = 0; i < controllerButtonEvents.length; i++) {
            btns.forEach((btn: controller.Button) => {
                control.onEvent(
                    controllerButtonEvents[i],
                    btn.id,
                    () => {
                        // screen().fill(btn.id)
                        radio.sendBuffer(Buffer.fromArray([BUTTON_PRESS_RADIO_ID, controllerKeys[i], btn.id]))
                    }
                )
            })
        }
    }
}

function recvBitmaps(): Bitmap[] {
    let bitmaps: Bitmap[] = []

    //--------------------------------------------------
    // Get the number of bitmaps the Tx will be sending:
    //--------------------------------------------------

    let numberOfBitmaps = 0;
    radio.onReceivedString((header: String) => {
        if (header.split(",")[0] == "BITMAPS") {
            numberOfBitmaps = +header.split(",")[1];
        }
    })

    while (numberOfBitmaps == 0) {
        basic.pause(3);
    }

    radio.sendString("ACK");
    // screen().fill(6);


    //----------------------------
    // Get the bitmaps one by one:
    //----------------------------

    for (let i = 0; i < numberOfBitmaps; i++) {
        // Send the number of lines:
        let maxPacketBufferSize = 0;
        let bitmapWidth = 0;
        let bitmapHeight = 0;

        //---------------------------
        // Get the bitmap dimensions:
        //---------------------------

        radio.onReceivedString((str: String) => {
            maxPacketBufferSize = +str.split(",")[0]
            bitmapWidth = +str.split(",")[1]
            bitmapHeight = +str.split(",")[2]

            // basic.showNumber(maxPacketBufferSize);
            // basic.showNumber(bitmapWidth);
            // basic.showNumber(bitmapHeight);

            radio.sendString("ACK");
        })

        while (maxPacketBufferSize == 0) {
            basic.pause(3);
        }
        // screen().fill(3);

        //-----------------------------------------
        // Calculate the number of incoming chunks:
        //-----------------------------------------

        const numberOfChunks: number =
            (bitmapWidth * bitmapHeight) / maxPacketBufferSize;

        //----------------------------------
        // Concatenate the incoming buffers:
        //----------------------------------

        // let bitmapBuf: Buffer = null;
        let bitmapBufs: Buffer[] = []
        // let bitmapBufIsSet = false;
        let bufferReceived = false;
        radio.onReceivedBuffer((buf: Buffer) => {
            // if (!bitmapBufIsSet) {
            //     bitmapBuf = buf;
            //     bitmapBufIsSet = true;
            // } else {
            //     bitmapBuf = bitmapBuf.concat(buf);
            // }

            bitmapBufs.push(buf)

            radio.sendString("ACK");
            bufferReceived = true;
        });

        // Wait to receive all these chunks:
        for (let j = 0; j < numberOfChunks; j++) {
            while (!bufferReceived) {
                basic.pause(3)
            }
            bufferReceived = false;
        }


        //---------------------------------
        // Rebuild the bitmap from buffers:
        //---------------------------------
        
        bitmaps.push(rebuildBitmap(Buffer.concat(bitmapBufs), bitmapWidth, bitmapHeight));
    }

    radio.onReceivedString((_: string) => { })
    radio.onReceivedBuffer((_: Buffer) => { })
    // screen().fill(3);
    return bitmaps;
}


function rebuildBitmap(buf: Buffer, bitmapWidth: number, bitmapHeight: number): Bitmap {
    let img: Bitmap = bitmaps.create(bitmapWidth, bitmapHeight);

    for (let row = 0; row < bitmapWidth; row++) {
      for (let col = 0; col < bitmapHeight; col++) {
        img.setPixel(row, col, 3)
      }
    }

    // if (img.width > 32)
    //     screen().fill(6)
    //
    // basic.pause(3000)

    // const img = bitmaps.ofBuffer(buf);

    // basic.showString("B")
    // basic.showNumber(bitmapWidth)
    // basic.showNumber(img.width)

    // basic.showNumber(bitmapHeight)
    // basic.showNumber(img.height)

    // basic.showNumber(buf.length)

    // let count = 0;
    //
    // for (let i = 0; i < bitmapWidth; i++) {
    //     if (buf[i] == 0) {
    //       count++; 
    //     }
    // }
    //
    // if (count > 70) {
    //   screen().fill(6)
    // }
    // else {screen().fill(4)}
    // basic.pause(2500)
    
    for (let row = 0; row < bitmapWidth; row++) {
      for (let col = 0; col < bitmapHeight; col++) {
        img.setPixel(row, col, buf[(row * bitmapWidth) + col])
      }
    }

    // for (let j = 0; j < bitmapHeight; j++) {
    //     img.setRows(j, buf.slice(j * bitmapWidth, bitmapWidth));
    // }

    return img;
}


function handshake(): number {
    let device_id: number = null;
    let i = 3;

    radio.onReceivedBuffer((buf: Buffer) => {
        // screen().fill(i)
        // i++;
       if (buf[0] == SCREEN_FN_ID_HANDSHAKE) {
          device_id = buf[1];
          radio.sendString("ACK")
       }
    });

    while (device_id == null) { basic.pause(10) }
    radio.onReceivedBuffer((_: Buffer) => { })
    return device_id;
}

function radioControlRxLoop() {
    radio.setGroup(5)

    const device_id = handshake();
    const bitmaps: Bitmap[] = recvBitmaps();
    controller.bindButtonsForWDS();

    let latestString = ""
    radio.onReceivedString((str: string) => {
        latestString = str
        radio.sendString("ACK");
    })

    radio.onReceivedBuffer((buf: Buffer) => {
        const request: number = buf[0];
        const params: Buffer = buf.slice(1);

        // control.inBackground(() => {
        switch (request) {
            // case SCREEN_FN_ID_ASSET_SETUP: { break;}
            // case SCREEN_FN_ID_RESET_SCREEN_IMAGE: { screen().resetscreenImage(); break; }
            // case SCREEN_FN_ID_SET_IMAGE_SIZE: { screen().setImageSize(params[0], params[1]); break; }

            case SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: {
                const img = bitmaps[params[0]];
                screen().drawBitmap(
                    img,
                    params[1],
                    params[2]
                );
                break;
            }

            case SCREEN_FN_ID_DRAW_LINE: {
                screen().drawLine(params[0], params[1], params[2], params[3], params[4]);
                break;
            }

            case SCREEN_FN_ID_DRAW_RECT: {
                screen().drawRect(params[0], params[1], params[2], params[3], params[4]);
                break;
            }

            case SCREEN_FN_ID_FILL: {
                // let startTime = input.runningTime();

                // basic.showNumber(fn_id)
                screen().fill(params[0]);

                // screen().fill(3);

                // let endTime = input.runningTime();
                // basic.showNumber(endTime - startTime)
                break;
            }

            case SCREEN_FN_ID_FILL_RECT: {
                screen().fillRect(params[0], params[1], params[2], params[3], params[4]);
                break;
            }
            case SCREEN_FN_ID_SET_PIXEL: {
                screen().setPixel(params[0], params[1], params[2]);
                break;
            }

            case SCREEN_FN_ID_PRINT: {
                screen().print(latestString, params[0], params[1], params[2]);
                break;
            }

            default: {
                break;
            }
        }
    }) // end of radio.onReceivedBuffer()

    while (true) {
        basic.pause(3)
    }
}

