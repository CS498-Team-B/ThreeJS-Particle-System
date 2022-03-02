/**
 * @author Brennen Green brennengreen.dev
 * 
 * PARTICLES!
 * Implementation of all the systems required to make particles function
 */


// PARTICLE CLASS



/**
 * Particle Constructor Implementation
 * Contains the characteristics of simulation for
 * a single particle
 */
class Particle {
    constructor() {
        // Classical Mechanics Parameters
        this.position     = new THREE.Vector3();
        this.velocity     = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();

        // Aesthetic Parameters
        this.color = new THREE.Color();
        this.opacity = 1.0;

        // Lifetime Parameters
        this.lifetime = 255.0;
        this.remaining = this.lifetime;
        this.dead = 0.0;
    }

    /**
     * Update this current Particle instance
     * @param {float} dt a proportionality constant for current upate 
     */
    Update(dt) {
        // This syntax is very confusing but resultant of functional
        // style programming. Essentially instead of using operators
        // we use functions which return instances of an object.
        // Because of the way ThreeJS built these functions, using
        // the .operation() on them manipulates the value itself
        // so we need to clone it before multiplying it.
        // DM Me if you have any questions.
        this.position.add(this.velocity.clone().multiplyScalar(dt)); 
        this.velocity.add(this.acceleration.clone().multiplyScalar(dt)); 

        this.remaining -= dt;
        if (remining <= 0.0) {
            dead = 1.0; // Particles has died
        }

        // If the particle is not yet dead update the aesthetics
        if (dead < 1.0)
            this.opacity = remaining / lifetime;
    }
}

// PARTICLE SHADERS

// TO-DO

// PARTICLE ENGINE

/**
 * ParticleEngine Class
 * The bulwark of our project, helps create particles
 * and decides how to emit them properly.
 */
class ParticleEngine {
    constructor() {
        // TO-DO
    }
}
