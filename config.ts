// there's no UF2 bootloader for 52833 yet, so we specify 
// button configuration for Arcade Shield here
namespace config {

    // the following are the default values used in C++ 
    // add to your code, uncomment and change to get different value
    // export const DISPLAY_TYPE = 4242 // smart shield
    // export const DISPLAY_CFG0 = 0x02000080 // allow execution without shield plugged in
    // export const DISPLAY_CFG1 = 0x00000603
    // export const DISPLAY_CFG2 = 8    // maximum SPI frequency for smart shield
    
    // pybadge-like layout
    export const PIN_BTN_LEFT = 1050
    export const PIN_BTN_UP = 1051
    export const PIN_BTN_DOWN = 1052
    export const PIN_BTN_RIGHT = 1053
    export const PIN_BTN_A = 1054
    export const PIN_BTN_B = 1055
    export const PIN_BTN_MENU = 1056
}
