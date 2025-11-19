controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    screen().fill(8)
    screen().drawLine(0, 0, 160, 120, 1)
    screen().drawLine(160, 0, 0, 120, 1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    screen().fill(0)
    screen().fillCircle(0, 0, 20, 3)
    screen().fillCircle(160, 0, 20, 9)
    screen().fillCircle(160, 120, 20, 7)
    screen().fillCircle(0, 120, 20, 5)
})

let presses = 0;
controller.A.onEvent(
  ControllerButtonEvent.Pressed,
  () => {
      presses += 1
})

controller.B.onEvent(
      ControllerButtonEvent.Pressed,
  () => {
      presses = 0
    })

input.onButtonPressed(Button.A, () => {
    basic.showNumber(presses)
})

