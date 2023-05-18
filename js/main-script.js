//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;
var geometry, material, mesh;
var cameras = [];
var activeCamera = 0;
var materials = [];
var wf = false;
var robot;
var components = [];

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFEEAC2);
    
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
/* CREATE MATERIALS */
////////////////////////
function createMaterials(){
    // dark blue - 0
    materials.push(new THREE.MeshBasicMaterial({ color: 0x3300CC, wireframe: wf }));

    // light blue - 1
    materials.push(new THREE.MeshBasicMaterial({ color: 0x4F80FA, wireframe: wf }));

    // white - 2
    materials.push(new THREE.MeshBasicMaterial({ color: 0xFCFCFC, wireframe: wf }));

    // grey - 3
    materials.push(new THREE.MeshBasicMaterial({ color: 0xCCCCCC, wireframe: wf }));

    // dark grey - 4
    materials.push(new THREE.MeshBasicMaterial({ color: 0x9E9C9C, wireframe: wf }));

    // black - 5
    materials.push(new THREE.MeshBasicMaterial({ color: 0x2F2F2F, wireframe: wf }));

    // red - 6
    materials.push(new THREE.MeshBasicMaterial({ color: 0xCC0000, wireframe: wf }));

    // light red - 7
    materials.push(new THREE.MeshBasicMaterial({ color: 0xF96342, wireframe: wf }));
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createRobot(){
    'use strict';

    robot = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: wf });

    createBody(robot, 0, 0, 0);
    createHead(robot, 0, 1.5, 0);
    createArmR(robot, -3, 0, 0);
    createArmL(robot, 3, 0, 0);
    createWaist(robot, 0, -1.5, 0);

    scene.add(robot);

}

function createHead(obj, x, y, z){
    'use strict';
    var edgeLength = 1.5

    var head = new THREE.Object3D();
    geometry = new THREE.BoxGeometry(edgeLength, edgeLength, edgeLength);
    mesh = new THREE.Mesh(geometry, materials[0]);
    console.log(materials[0]);
    mesh.position.set(x, y, z);
    head.add(mesh);

    createAntenaR(head, 0.1, 0.7, 0, y, edgeLength);
    createAntenaL(head, 0.1, 0.7, 0, y, edgeLength);
    createEyeL(head, 0.2, y, edgeLength);
    createEyeR(head, 0.2, y, edgeLength);
    head.position.y += edgeLength/2;
    
    obj.add(head);
    components.push(head);
}

function createAntenaR(obj, r, h, z, y, edgeLength){
    'use strict';
    geometry = new THREE.ConeGeometry(r, h, 32);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(-edgeLength/3.5, y + h/2 + edgeLength/2, z);
    obj.add(mesh);
}

function createAntenaL(obj, r, h, z, y, edgeLength){
    'use strict';
    geometry = new THREE.ConeGeometry(r, h, 32);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(edgeLength/3.5, y + h/2 + edgeLength/2, z);
    obj.add(mesh);
}

function createEyeR(obj, r, y, edgeLength) {
    'use strict';
    geometry = new THREE.SphereGeometry(r, 32, 16);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(-edgeLength/4, y + edgeLength/4, edgeLength/2);
    obj.add(mesh);
}

function createEyeL(obj, r, y, edgeLength) {
    'use strict';
    geometry = new THREE.SphereGeometry(r, 32, 16);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(edgeLength/4, y + edgeLength/4, edgeLength/2);
    obj.add(mesh);
}

function createBody(obj, x, y, z){
    'use strict';
    var bodyLength = 6;
    var bodyWidth = 4;
    var bodyHeight = 3;

    var backLength = 3;
    var backWidth = 1.5;
    var backHeight = 3;

    var back = new THREE.BoxGeometry(backLength, backHeight, backWidth);
    mesh = new THREE.Mesh(back, materials[6]);
    mesh.position.set(x, y, z - (bodyWidth-(bodyWidth + backWidth)/2) - backWidth/2);
    obj.add(mesh);

    var body = new THREE.BoxGeometry(bodyLength, bodyHeight, bodyWidth);
    mesh = new THREE.Mesh(body, materials[6]);
    mesh.position.set(x, y, z + backWidth/2);
    obj.add(mesh);
}

function createArmR(obj, x, y, z){
    'use strict';
    var armLength = 1.5;
    var armWidth = 1.5;
    var armHeight = 3;

    geometry = new THREE.BoxGeometry(armLength, armHeight, armWidth);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - armLength/2, y, z - (4-5.5/2) - armWidth/2);

    var arm = new THREE.Object3D();
    arm.add(mesh);
    
    createForearmR(arm, x, y - armHeight/2, z, armLength);

    obj.add(arm);
}

function createForearmR(obj, x, y, z, armLength){
    'use strict';
    var foreArmLength = 1;
    var foreArmWidth = 5.5;
    var foreArmHeight = 1;

    geometry = new THREE.BoxGeometry(foreArmLength, foreArmHeight, foreArmWidth);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - armLength/2, y - foreArmHeight/2, z);
    obj.add(mesh);
}

function createArmL(obj, x, y, z){
    var armLength = 1.5;
    var armWidth = 1.5;
    var armHeight = 3;

    geometry = new THREE.BoxGeometry(armLength, armHeight, armWidth);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + armLength/2, y, z - (4-5.5/2) - armWidth/2);

    var arm = new THREE.Object3D();
    arm.add(mesh);
    
    createForearmL(arm, x, y - armHeight/2, z, armLength);

    obj.add(arm);
}

function createForearmL(obj, x, y, z, armLength){
    'use strict';
    var foreArmLength = 1;
    var foreArmWidth = 5.5;
    var foreArmHeight = 1;

    geometry = new THREE.BoxGeometry(foreArmLength, foreArmHeight, foreArmWidth);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + armLength/2, y - foreArmHeight/2, z);
    obj.add(mesh);
}

function createWaist(obj, x, y, z){
    'use strict';
    var waistLength = 4;
    var waistWidth = 5.5;
    var waistHeight = 1;

    geometry = new THREE.BoxGeometry(waistLength, waistHeight, waistWidth);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - waistHeight/2, z);
    obj.add(mesh);
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

    createMaterials();
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
    
    if (e.keyCode >= 49 || e.keyCode <= 52) {
        activeCamera = e.keyCode - 49;
    }
    else if (e.keyCode == 54) {
        wf = wf == true ? false : true;
    }
    
    render();
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}