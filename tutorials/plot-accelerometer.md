# Show accelerometer x, y, z as a scrolling graph

# Here's the template to get you started

```template
let x = 0, old_x = 0
let t = 0
basic.forever(function () {
    x = Math.map(input.acceleration(Dimension.X), -1024, 1024, 120, 0)
    screen().drawLine(t, x, t-1, old_x, 3)
    t = t + 1
    if (t == 160) {
        screen().scroll(-1,0)
        t = 159
    }
    old_x = x
})
```

# Now add the blocks to  show the y dimension


# Now add the blocks to  show the z dimension