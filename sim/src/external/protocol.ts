// CONTENT BELOW COPIED FROM <root>/screen/sim/state.ts.
// Keep this in sync with that file.

export interface ArcadeShieldMessage {
    type: "show-image" | "set-brightness" | "set-palette" | "update-stats"
    runId: string
}
export interface ShowImageMessage extends ArcadeShieldMessage {
    type: "show-image"
    data: string
}     
export interface SetBrightnessMessage extends ArcadeShieldMessage {
    type: "set-brightness"
    value: number
}
export interface SetPaletteMessage extends ArcadeShieldMessage {
    type: "set-palette"
    data: string
}
export interface UpdateStatsMessage extends ArcadeShieldMessage {
    type: "update-stats"
    data: string
}