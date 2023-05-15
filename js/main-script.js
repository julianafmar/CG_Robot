//////////////////////
/* GLOBAL VARIABLES */
//////////////////////


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0ead6);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    // Câmera frontal (projeção ortogonal)
    const cameraFrontal = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 1, 1000);
    cameraFrontal.position.set(0, 0, 500);
    cameraFrontal.lookAt(scene.position);

    // Câmera lateral (projeção ortogonal)
    const cameraLateral = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 1, 1000);
    cameraLateral.position.set(-500, 0, 0);
    cameraLateral.lookAt(scene.position);

    // Câmera de topo (projeção ortogonal)
    const cameraTopo = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 1, 1000);
    cameraTopo.position.set(0, 500, 0);
    cameraTopo.lookAt(scene.position);

    // Câmera isométrica (projeção ortogonal)
    const cameraIsometrica = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 1, 1000);
    cameraIsometrica.position.set(500, 500, 500);
    cameraIsometrica.lookAt(scene.position);

    // Câmera isométrica (projeção perspectiva)
    const cameraPerspectiva = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    cameraPerspectiva.position.set(500, 500, 500);
    cameraPerspectiva.lookAt(scene.position);

}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}