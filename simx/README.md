# Simulator for the display-shield extension

Simulates an Arcade Shield accessory attached to a BBC micro:bit. When the display-shield extension is added to a [MakeCode for BBC micro:bit](https://makecode.microbit.org) project, this simulator will instantiate below MakeCode's main simulator.

## Local testing and development

### First-time setup
```
cd simx
npm i
```

### Start the dev server
```
npm run dev
```

This starts the simx's local development server.

### Load into the MakeCode editor

1. Open the MakeCode editor for BBC micro:bit (https://makecode.microbit.org/beta)
2. Add the URL parameter `simxdev=1`
3. Create a project
4. Add the display-shield extension to your project

The `simxdev=1` parameter will cause sim messages to be routed to your locally running development server.

## More info

See https://github.com/microsoft/pxt-simx-sample/blob/master/simx/README.md


