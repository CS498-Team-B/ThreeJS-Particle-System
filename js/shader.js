/*
Shader Header
*/


particleVertexShader = 
[
"attribute float customOpacity;",
"attribute float customSize;",
"attribute float customVisible;",  // float used as boolean (0 = false, 1 = true)
"attribute vec3 customColor;",
"varying vec4 vColor;",
"void main()",
"{",
    "if ( customVisible > 0.5 )", 				// true
        "vColor = vec4( customColor, customOpacity );", //     set color associated to vertex; use later in fragment shader.
    "else",							// false
        "vColor = vec4(0.0);", 		//     make particle invisible.
        

    "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
    "gl_PointSize = customSize * ( 300.0 / length( mvPosition.xyz ) );",     // scale particles as objects in 3D space
    "gl_Position = projectionMatrix * mvPosition;",
"}"
].join("\n");

particleFragmentShader =
[
"uniform sampler2D texture1;",
"varying vec4 vColor;",
"void main()", 
"{",
    "gl_FragColor = vColor;",
    "vec2 uv = vec2(gl_PointCoord.x, gl_PointCoord.y);",
    "vec4 tex1 = texture2D( texture1,  uv );",
    "gl_FragColor = gl_FragColor * tex1;",    // sets an otherwise white particle texture to desired color
"}"
].join("\n");