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
    speed: 1.0,
};

init();
animate();

function init_gui() {
    gui = new dat.GUI({name: 'Particle Controls'});
    animation = gui.addFolder('Animation Settings');
    animation.add(anim, "speed", 0.0, 10.0, 0.05);
}

function init_three() {
    engine = new ParticleEngine(); // Doesn't do much yet
    
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

    const visibles = new Float32Array(10000);
    const sizes = new Float32Array(10000);
    const opacitys = new Float32Array(10000);
    const colors = new Float32Array(10000 * 3);
    
    const vertexColor = new THREE.Color();

    for (i = 0; i < 10000; i++) {
        visibles[i] = 1.0;
        opacitys[i] = 0.20;
        sizes[i] = 0.3;

        vertexColor.setHSL( Math.random(), 1, 0.5);
        vertexColor.toArray(colors, i*3);
    }
    const particleGeometry = new THREE.BufferGeometry;  // specify points
    particleGeometry.setAttribute('customVisible', new THREE.BufferAttribute(visibles, 1));
    particleGeometry.setAttribute('customSize', new THREE.BufferAttribute(sizes, 1));
    particleGeometry.setAttribute('customOpacity', new THREE.BufferAttribute(opacitys, 1));
    particleGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial(
        {
            map: starTexture,
            transparent: true,
            opacity: 0.5,
            size: 0.25,
            color: "white",
        }
    );  
    
    const NR_PARTICLES = 10000; // number of particles
    let positions = new Float32Array( NR_PARTICLES * 3 );  // array of particle positions
    for(let i = 0; i < NR_PARTICLES * 3; i++)
    {
        positions[i] = 8 * ( Math.random() - 0.5 );   // randomize positions
    }

    // assign positions to particles
    particleGeometry.setAttribute( "position", new THREE.BufferAttribute( positions, 3 ) );
    particleMesh = new THREE.Points( particleGeometry, shaderMaterial ); // mesh
    scene.add(particleMesh);
        
    window.addEventListener( 'resize', onWindowResize );
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

    render();

    renderer.render( scene, camera );
}

/**
 * render() - Manipulates the scene property for the current render frame
 */
function render() {
    const time = Date.now() * 0.005;
    
    particleMesh.rotation.z = 0.01 * time;

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