# Web Based Particle System

## Authors
Brennen Green, Austin Burnett, Jainam Dhruva, Jared Statter, Kevin Patel

For our senior design project we decided to tackle a web based particles system utilizing ThreeJS.

## What is a Particle System

A particle is a infinitesimal point in space which can have the most basic laws of newtonian mechanics simulated upon it.
Using a collection of thousands of these particles, we can create many cool effects using just a basic model for displace, velocity, and acceleration. By combining all of these together, we have a partitcle system which can be used for experimentation, sandbox fun, or aesthetically appealing VFX.

## Functionality

Along with an interactive display of our scene and particle system, we will provide some basic functionality to allow the user
to design their own various effects based upon our presets.

These settings include, but are not limited to
- Color gradient of particles
- Emitting radius
- Physical parametters
- Lifetime of particles
- Textures used to draw particles
- etc.

### Dependencies (all includes in the /js file)
- [ThreeJS](https://github.com/mrdoob/three.js/)
- [DatGUI](https://github.com/dataarts/dat.gui)

### Roadmap
- [x] Initial ThreeJS Setup
- [x] Initial DatGUI Setup
- [x] Static Particle Effect
- [x] Simple scene with camera based exploration
- [ ] Particle Effects using an Emitter
- [ ] Settings to change the parameters of emitter simulation (2 presets)
    - [ ] Fountain Emitter
    - [ ] Object Following Emitter
- [ ] Profiling Window
- [ ] Introductory Webpage
- [ ] **MVP**
- [ ] Further Abstraction of Particle Engine
- [ ] Creation of more presets
    - [ ] Starfield Effect
    - [ ] Smoke Effect
    - [ ] Rain Effect
    - [ ] Fireworks Effect
