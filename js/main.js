/**
 * ThreeJS Particle System
 * 
 * This file contains all the interaction with ThreeJS
 */

// Particle Engine!
let engine;

// ThreeJS
let camera, scene, renderer, clock, controls, particleMesh;

// DatGUI
let gui;
// DatGUI Folders
let animation;
// DatGUI Settings
let anim = {
    rotationSpeed:0.01,
    count: 10000,
};

init();
animate();

// Initialize DatGUI Configurations
function init_gui() {
    gui = new dat.GUI({name: 'Particle Controls'});
    animation = gui.addFolder('Animation Settings');
    animation.add(anim, "rotationSpeed", 0, 0.5, 0.01);
    animation.add(anim, "count", 0, 100000, 10);

}

// Initialize THREE Configurations
function init_three() {
    //engine = new ParticleEngine(); // Doesn't do much yet
    
    clock = new THREE.Clock(true); // Will autostart

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
    controls = new THREE.ArcballControls(camera, renderer.domElement, scene);
    controls.setGizmosVisible(false);
    controls.addEventListener('change', function () {
            renderer.render(scene, camera);
        }
    );
    camera.position.set(0, 0, -10);
    controls.update();
    
    generate_particle_mesh();

    window.addEventListener( 'resize', onWindowResize );
}

function generate_particle_mesh() {
    // Load Hardcoded Texture (For Now)
    const starTexture = new THREE.TextureLoader().load("./textures/star.png");
    starTexture.wrapS = THREE.RepeatWrapping;
    starTexture.wrapT = THREE.RepeatWrapping;
    starTexture.repeat.set(1, 1);

    // Particle Setup
   const shaderMaterial = new THREE.ShaderMaterial( 
        {
            uniforms: 
            {
                texture1:   { type: "t", value: starTexture },
            },
            vertexShader:   particleVertexShader,
            fragmentShader: particleFragmentShader,
            transparent: true, // alphaTest: 0.5,  // if having transparency issues, try including: alphaTest: 0.5, 
            blending: THREE.NormalBlending, depthTest: true,
            alphaTest: 0.5,
            vertexColors: true,
        });


    const NR_PARTICLES = anim.count; // number of particles

    const visibles = new Float32Array(NR_PARTICLES);
    const sizes = new Float32Array(NR_PARTICLES);
    const opacitys = new Float32Array(NR_PARTICLES);
    const colors = new Float32Array(NR_PARTICLES * 3);
    
    const vertexColor = new THREE.Color();

    for (i = 0; i < NR_PARTICLES; i++) {
        visibles[i] = 1.0;
        opacitys[i] = 0.70;
        sizes[i] = 0.3;

        vertexColor.setHSL( Math.random(), 1, 0.5);
        vertexColor.toArray(colors, i*3);
    }

    // Fill Attribute Buffers
    const particleGeometry = new THREE.BufferGeometry;  // specify points
    particleGeometry.setAttribute('customVisible', new THREE.BufferAttribute(visibles, 1));
    particleGeometry.setAttribute('customSize', new THREE.BufferAttribute(sizes, 1));
    particleGeometry.setAttribute('customOpacity', new THREE.BufferAttribute(opacitys, 1));
    particleGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    
    let positions = new Float32Array( NR_PARTICLES * 3 );  // array of particle positions
    for(let i = 0; i < NR_PARTICLES * 3; i++)
    {
        positions[i] = 8 * ( Math.random() - 0.5 );   // randomize positions
    }

    // assign positions to particles
    particleGeometry.setAttribute( "position", new THREE.BufferAttribute( positions, 3 ) );
    particleMesh = new THREE.Points( particleGeometry, shaderMaterial ); // mesh
    scene.add(particleMesh);
}

function init() {
    init_gui();
    init_three();
}

/**
 *  animate() - Calls each individual animation frame and renders it.
 */
function animate() {
    requestAnimationFrame( animate );

    if (particleMesh.geometry.attributes.customSize.length !== anim.count) {
        // Dispose of the current mesh then regenerate it if we need to update particle count
        particleMesh.geometry.dispose()
        particleMesh.material.dispose()
        scene.remove(scene.getObjectByProperty('uuid', particleMesh.uuid))
        generate_particle_mesh();
    }

    render();

    renderer.render( scene, camera );
}

/**
 * render() - Manipulates the scene property for the current render frame
 */
function render() {
    const time = Date.now() * 0.005;
    
    particleMesh.rotation.z = anim.rotationSpeed * time;

    const geometry = particleMesh.geometry;
	const attributes = geometry.attributes;
    for ( let i = 0; i < attributes.customColor.array.length; i++ ) {

        attributes.customSize.array[i] = 0.5 * Math.sin(i + time);
 
    }

    attributes.customSize.needsUpdate = true;

}

/**
 * onWindowResize() - Called when the window is resized
 */
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}
