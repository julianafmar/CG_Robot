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
    scene.background = new THREE.Color(0xf0ead6);

    createRobot();
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    // Câmera frontal (projeção ortogonal)
    const cameraFrontal = new THREE.OrthographicCamera(-12*(window.innerWidth/window.innerHeight), 12*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraFrontal.position.set(0, 0, 500);
    cameraFrontal.lookAt(scene.position);
    cameras.push(cameraFrontal);

    // Câmera lateral (projeção ortogonal)
    const cameraLateral = new THREE.OrthographicCamera(-12*(window.innerWidth/window.innerHeight), 12*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraLateral.position.set(-500, 0, 0);
    cameraLateral.lookAt(scene.position);
    cameras.push(cameraLateral);

    // Câmera de topo (projeção ortogonal)
    const cameraTopo = new THREE.OrthographicCamera(-12*(window.innerWidth/window.innerHeight), 12*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraTopo.position.set(0, 500, 0);
    cameraTopo.lookAt(scene.position);
    cameras.push(cameraTopo);

    // Câmera isométrica (projeção ortogonal)
    const cameraIsometrica = new THREE.OrthographicCamera(-12*(window.innerWidth/window.innerHeight), 12*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraIsometrica.position.set(500, 500, 500);
    cameraIsometrica.lookAt(scene.position);
    cameras.push(cameraIsometrica);

    // Câmera isométrica (projeção perspectiva)
    const cameraPerspectiva = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    cameraPerspectiva.position.set(20, 20, 20);
    cameraPerspectiva.lookAt(scene.position);
    cameras.push(cameraPerspectiva);

}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createRobot(){
    'use strict';

    var robot = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    createHead(robot, 0, 0, 0);
    createBody(robot, 0, -1.5, 0);
    createArmR(robot, -3, -1.5, 0);

    scene.add(robot);

}

function createHead(obj, x, y, z){
    'use strict';
    var head = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    head.add(mesh);

    createAntenaR(head, 0.1, 0.7, 0);
    createAntenaL(head, 0.1, 0.7, 0);
    createEyeL(head, 0.2);
    createEyeR(head, 0.2);
    head.position.y += 1.5/2;

    obj.add(head);
}

function createAntenaR(obj, r, h, z){
    'use strict';
    geometry = new THREE.ConeGeometry(r, h, 32);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-1.5/2.2, h/2 + 1.5/2, z);
    obj.add(mesh);
}

function createAntenaL(obj, r, h, z){
    'use strict';
    geometry = new THREE.ConeGeometry(r, h, 32);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1.5/2.2, h/2 + 1.5/2, z);
    obj.add(mesh);
}

function createEyeR(obj, r) {
    'use strict';
    geometry = new THREE.SphereGeometry(r, 32, 16);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-1.5/4, 1.5/4, 1.5/2);
    obj.add(mesh);
}

function createEyeL(obj, r) {
    'use strict';
    geometry = new THREE.SphereGeometry(r, 32, 16);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1.5/4, 1.5/4, 1.5/2);
    obj.add(mesh);
}

function createBody(obj, x, y, z){
    'use strict';
    geometry = new THREE.BoxGeometry(6, 3, 5.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createArmR(obj, y, z){
    'use strict';

    var arm = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(1.5, 3, 1.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-1.5/2 - 3, y + 1.5, z - 5.5/2 + 1.5*1.5); //z é do tronco
    arm.add(mesh);
    
    createForearmR(arm, y, z);

    obj.add(arm);
}

function createForearmR(obj, y, z){
    'use strict';

    geometry = new THREE.BoxGeometry(1, 1, 5.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-1.5/2 - 3, y - 0.5, z + 1.5/2);
    obj.add(mesh);
}

function createArmL(obj, x, y, z){
    'use strict';

    var arm = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(1.5, 3, 1.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1.5/2 + 3, y, z - 5.5/2 + 1.5/2); //z é do tronco
    arm.add(mesh);

    
    createForearmR(arm, 0, -3/2, 0);

    obj.add(arm);

}

function createLegR(obj, x, y, z){
    'use strict';

}

function createLegL(obj, x, y, z){
    'use strict';

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