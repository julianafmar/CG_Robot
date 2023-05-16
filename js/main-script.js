//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;
var geometry, material, mesh;
var cameras = [];
var activeCamera = 0;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
    scene.background = new THREE.Color(0xf0ead6);

    createRobot();
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
    cameras.push(cameraFrontal);

    // Câmera lateral (projeção ortogonal)
    const cameraLateral = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 1, 1000);
    cameraLateral.position.set(-500, 0, 0);
    cameraLateral.lookAt(scene.position);
    cameras.push(cameraLateral);

    // Câmera de topo (projeção ortogonal)
    const cameraTopo = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 1, 1000);
    cameraTopo.position.set(0, 500, 0);
    cameraTopo.lookAt(scene.position);
    cameras.push(cameraTopo);

    // Câmera isométrica (projeção ortogonal)
    const cameraIsometrica = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 1, 1000);
    cameraIsometrica.position.set(500, 500, 500);
    cameraIsometrica.lookAt(scene.position);
    cameras.push(cameraIsometrica);

    // Câmera isométrica (projeção perspectiva)
    const cameraPerspectiva = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    cameraPerspectiva.position.set(500, 500, 500);
    cameraPerspectiva.lookAt(scene.position);
    cameras.push(cameraPerspectiva);

}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createRobot(){
    'use strict';

    var robot = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    createHead(robot, 0, 0, 0);

    scene.add(robot);

}

function createHead(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(2, 6, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);

}

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

    renderer.render(scene, cameras[activeCamera]);

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);

}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    activeCamera = e.keyCode - 49;
    render();

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}