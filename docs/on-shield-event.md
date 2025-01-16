# On shield event

Run some code when display is present or absent.

```sig
controller.onShieldEvent(ControllerShieldEvent.Absent, function () {
	
})
```

## Example

```block
controller.onShieldEvent(ControllerShieldEvent.Absent, function () {
    basic.showNumber(0)
})
controller.onShieldEvent(ControllerShieldEvent.Present, function () {
    basic.showNumber(1)
    screen().fill(Math.random()*15)
})
```

```package
display-shield=github:microbit-apps/display-shield
```
