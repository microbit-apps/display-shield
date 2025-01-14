const SCREEN_FN_ID_RESET_SCREEN_IMAGE: number = 5;
const SCREEN_FN_ID_SET_IMAGE_SIZE: number = 6;
const SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: number = 7;
const SCREEN_FN_ID_DRAW_LINE: number = 9;
const SCREEN_FN_ID_DRAW_RECT: number = 12;
const SCREEN_FN_ID_FILL: number = 14;
const SCREEN_FN_ID_FILL_RECT: number = 15;
const SCREEN_FN_ID_SET_PIXEL: number = 21;
const SCREEN_FN_ID_PRINT: number = 23;


function radioControlRxLoop() {
    let latestString: string = "";

    // radio.sendString("ASSET_TX_START" + ", " + iconNames.length)
    // iconNames.forEach(name => {
    //     screen().sendBitmap(name, icons.get(name))
    // })

    // radio.sendString("ASSET_TX_END")
    // basic.showString("Done")


    //-------------------------
    // Wait for ASSET_TX_START:
    //-------------------------


    radio.setGroup(5)
    radio.setTransmitPower(7)
    radio.setFrequencyBand(14)

    // First message should be an ASSET_TX_START + "," + number of assets
    // Then asset_name + "," + bitmap.height (number of rows of this asset)

    let receivedStartAssetTransferRequest = false;
    let numberOfAssetsExpected: number = 0;

    radio.onReceivedString((receivedString: string) => {
        numberOfAssetsExpected = +receivedString.split(",")[1];
        // basic.showString("A: " + numberOfAssetsExpected)
        // basic.showNumber(numberOfAssetsExpected % 10)
        receivedStartAssetTransferRequest = true
        radio.sendString("ACK")
    });

    // basic.showString("S")
    while (!receivedStartAssetTransferRequest) { basic.pause(25) }
    // basic.showString("D: " + numberOfAssetsExpected % 10)
    // basic.showString("D")

    // Now get the [bitmapName, bitmapHeight], followed by each row of the bitmap
    let bitmapName: string;
    let bitmapHeight: number;
    let received = false;

    // Reconstruct each of these assets from the following:
    // Header of [bitmap name, bitmap height] -> row of bitmap data
    for (let i = 0; i < numberOfAssetsExpected; i++) {

        //--------------------------
        // Get bitmap name & height:
        //--------------------------
        radio.onReceivedString((receivedString: string) => {
            basic.showString("R")

            bitmapName = receivedString.split(",")[0]
            bitmapHeight = +receivedString.split(",")[1]

            // basic.showString("A: " + bitmapHeight);
            // basic.showNumber(bitmapHeight % 10)
            radio.sendString("ACK")
            received = true;
        })

        // basic.showString("W")
        while (!received) {
            basic.pause(25)
        }
        basic.showString("D")

        // Finally: unbind for safety - since we're done with this part - but a spurious string reception would mess up control flow/variables
        radio.onReceivedString(_ => { })

        //------------------
        // Proccessing rows:
        //------------------

        let rowsReceived: number = 0;
        let assetBuffer: Buffer = null;

        // Process each row of the bitmap into a single asset:
        radio.onReceivedBuffer((onReceivedBuffer: Buffer) => {
            basic.showString("B")

            if (assetBuffer == null)
                assetBuffer = onReceivedBuffer
            else
                assetBuffer = Buffer.concat([assetBuffer, onReceivedBuffer])
            rowsReceived++;
            // basic.showString("A")
            radio.sendString("ACK")
            basic.showNumber(rowsReceived % 10);
        })

        // basic.showString("C")
        // basic.showNumber(rowsReceived % 10);
        while (rowsReceived < bitmapHeight)
            basic.pause(25)
        // basic.showString("D")

        // Rebinding for safety - since we're going back to only responding to .onReceivedString() at the top of this loop:
        radio.onReceivedBuffer(_ => { })
    }

    basic.showString("ALL DONE")

    radio.onReceivedBuffer((buffer: Buffer) => {
        const fn_id: number = buffer[0];
        const params: Buffer = buffer.slice(1);

        const half_height = screen().height >> 1;
        const half_width = screen().width >> 1;

        // basic.showString("R")

        switch (fn_id) {
            // case SCREEN_FN_ID_ASSET_SETUP: { break;}
            // case SCREEN_FN_ID_RESET_SCREEN_IMAGE: { screen().resetscreenImage(); break; }
            // case SCREEN_FN_ID_SET_IMAGE_SIZE: { screen().setImageSize(params[0], params[1]); break; }

            // semi-cheat; the assets are pre-loaded.
            case SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: {
                // const from: Bitmap = microdata.icons.get(latestString);
                // screen().drawTransparentImage(from, params[1] - half_width, params[2] - half_height);
                break;
            }

            case SCREEN_FN_ID_DRAW_LINE: { screen().drawLine(params[0] - half_width, params[1] - half_height, params[2] - half_width, params[3] - half_height, params[4]); break; }
            case SCREEN_FN_ID_DRAW_RECT: { screen().drawRect(params[0] - half_width, params[1] - half_height, params[2], params[3], params[4]); break; }
            case SCREEN_FN_ID_FILL: { screen().fill(params[0]); break; }
            case SCREEN_FN_ID_FILL_RECT: { screen().fillRect(params[0] - half_width, params[1] - half_height, params[2], params[3], params[4]); break; }
            case SCREEN_FN_ID_SET_PIXEL: { screen().setPixel(params[0] - half_width, params[1] - half_height, params[2]); break; }

            case SCREEN_FN_ID_PRINT: { screen().print(latestString, params[0] - half_width, params[1] - half_height, params[2]); break; }

            default: { break; }
        }
        basic.clearScreen()
    })
}
