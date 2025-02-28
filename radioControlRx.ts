const SCREEN_FN_ID_RESET_SCREEN_IMAGE: number = 5;
const SCREEN_FN_ID_SET_IMAGE_SIZE: number = 6;
const SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: number = 7;
const SCREEN_FN_ID_DRAW_LINE: number = 9;
const SCREEN_FN_ID_DRAW_RECT: number = 12;
const SCREEN_FN_ID_FILL: number = 14;
const SCREEN_FN_ID_FILL_RECT: number = 15;
const SCREEN_FN_ID_SET_PIXEL: number = 21;
const SCREEN_FN_ID_PRINT: number = 23;


function setup(): Bitmap[] {
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

            // basic.showNumber(maxPacketBufferSize)
            // basic.showNumber(bitmapWidth)
            // basic.showNumber(bitmapHeight)

            radio.sendString("ACK");
        })

        while (maxPacketBufferSize == 0) {
            basic.pause(3);
        }

        //-----------------------------------------
        // Calculate the number of incoming chunks:
        //-----------------------------------------

        const numberOfChunks: number =
            (bitmapWidth * bitmapHeight) / maxPacketBufferSize;

        //----------------------------------
        // Concatenate the incoming buffers:
        //----------------------------------

        let bitmapBuf: Buffer = null;
        let bitmapBufIsSet = false;
        let bufferReceived = false;
        radio.onReceivedBuffer((buf: Buffer) => {
            if (!bitmapBufIsSet) {
                bitmapBuf = buf;
                bitmapBufIsSet = true;
            } else {
                bitmapBuf = bitmapBuf.concat(buf);
            }

            radio.sendString("ACK");
            bufferReceived = true;
        })


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

        bitmaps.push(rebuildBitmap(bitmapBuf, bitmapWidth, bitmapHeight));

        // // Now rebuild the original bitmap from these buffers:
        // const img = rebuildBitmap(bitmapBuf, bitmapWidth, bitmapHeight);
        // const x = -(screen().width >> 1) + ((screen().width - img.width) >> 1);

        // screen().drawBitmap(
        //     img,
        //     10,
        //     (screen().height >> 1) - 10
        // )

        // basic.showString("D")

        // bitmaps.push(img);

        // Rebinding for safety - since we're going back to only responding to .onReceivedString() at the top of this loop:
        // radio.onReceivedBuffer(_ => { })
    }

    radio.onReceivedString((_: string) => { })
    radio.onReceivedBuffer((_: Buffer) => { })
    basic.showString("F")
    return bitmaps;
}


function rebuildBitmap(buf: Buffer, bitmapWidth: number, bitmapHeight: number): Bitmap {
    let img: Bitmap = bitmaps.create(bitmapWidth, bitmapHeight);

    // basic.showString("B")
    // basic.showNumber(bitmapWidth)
    // basic.showNumber(img.width)

    // basic.showNumber(bitmapHeight)
    // basic.showNumber(img.height)

    // basic.showNumber(buf.length)

    for (let j = 0; j < bitmapHeight; j++) {
        img.setRows(j, buf.slice(j * bitmapWidth, bitmapWidth));
    }

    return img;
}


function handshake() {
    let receivedHandshake = false;
    radio.onReceivedString((receivedString: string) => {
        if (receivedString == "HANDSHAKE") {
            receivedHandshake = true;
            radio.sendString("ACK")
        }
    })

    while (!receivedHandshake) { basic.pause(3) }
    radio.onReceivedString((_: string) => { })
}

function radioControlRxLoop() {
    radio.setGroup(5)
    handshake();
    const bitmaps: Bitmap[] = setup();

    // const x = -(screen().width >> 1) + ((screen().width - img.width) >> 1);

    // basic.showNumber(img.width)
    // basic.showNumber(img.height)

    // basic.showString("R")

    // basic.showNumber(img.width)
    // basic.showNumber(img.height)

    // for (let i = 0; i < img.height; i++) {
    //     for (let j = 0; j < img.width; j++) {
    //         basic.showString("L")
    //         basic.showNumber(img.getPixel(j, i))
    //         basic.showString(",")
    //         basic.showNumber(green_tick.getPixel(j, i))
    //     }
    // }

    let latestString = ""
    radio.onReceivedString((str: string) => {
        latestString = str
    })

    // Main loop; listen for draw commands:
    radio.onReceivedBuffer((buf: Buffer) => {
        const fn_id: number = buf[0];
        const params: Buffer = buf.slice(1);

        switch (fn_id) {
            // case SCREEN_FN_ID_ASSET_SETUP: { break;}
            // case SCREEN_FN_ID_RESET_SCREEN_IMAGE: { screen().resetscreenImage(); break; }
            // case SCREEN_FN_ID_SET_IMAGE_SIZE: { screen().setImageSize(params[0], params[1]); break; }

            case SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: {
                const img = bitmaps[params[0]];
                screen().drawBitmap(
                    img,
                    params[1],
                    params[2]
                )
                radio.sendString("ACK");
                break;
            }

            case SCREEN_FN_ID_DRAW_LINE: { screen().drawLine(params[0], params[1], params[2], params[3], params[4]); break; }
            case SCREEN_FN_ID_DRAW_RECT: { screen().drawRect(params[0], params[1], params[2], params[3], params[4]); break; }

            case SCREEN_FN_ID_FILL: {
                // let startTime = input.runningTime();

                // basic.showNumber(fn_id)
                screen().fill(params[0]);
                radio.sendString("ACK");

                // screen().drawBitmap(
                //     bitmaps[0],
                //     params[1],
                //     params[2]
                // )

                // let endTime = input.runningTime();
                // basic.showNumber(endTime - startTime)
                break;
            }

            case SCREEN_FN_ID_FILL_RECT: { screen().fillRect(params[0], params[1], params[2], params[3], params[4]); break; }
            case SCREEN_FN_ID_SET_PIXEL: { screen().setPixel(params[0], params[1], params[2]); break; }

            case SCREEN_FN_ID_PRINT: {
                basic.showString("P")
                screen().print(latestString, params[0], params[1] - (screen().height >> 1), params[2]); break;
            }

            default: { break; }
        }
    })
}

