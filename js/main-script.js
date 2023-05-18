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

    // Camera frontal (projecao ortogonal)
    const cameraFrontal = new THREE.OrthographicCamera(-15*(window.innerWidth/window.innerHeight), 15*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraFrontal.position.set(0, 0, 500);
    cameraFrontal.lookAt(scene.position);
    cameras.push(cameraFrontal);

    // Camera lateral (projecao ortogonal)
    const cameraLateral = new THREE.OrthographicCamera(-15*(window.innerWidth/window.innerHeight), 15*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraLateral.position.set(-500, 0, 0);
    cameraLateral.lookAt(scene.position);
    cameras.push(cameraLateral);

    // Camera de topo (projecao ortogonal)
    const cameraTopo = new THREE.OrthographicCamera(-15*(window.innerWidth/window.innerHeight), 15*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraTopo.position.set(0, 500, 0);
    cameraTopo.lookAt(scene.position);
    cameras.push(cameraTopo);

    // Camera isometrica (projecao ortogonal)
    const cameraIsometrica = new THREE.OrthographicCamera(-15*(window.innerWidth/window.innerHeight), 15*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraIsometrica.position.set(500, 500, 500);
    cameraIsometrica.lookAt(scene.position);
    cameras.push(cameraIsometrica);

    // Camera isometrica (projecao perspectiva)
    const cameraPerspectiva = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    cameraPerspectiva.position.set(20, 0, 20);
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

    // cor
    materials.push(new THREE.MeshBasicMaterial({ color: 0x4857DA, wireframe: wf }));
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createRobot(){
    'use strict';

    robot = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: wf });

    createBody(robot, 0, 0, 0);
    createHead(robot, 0, bodyHeight/2, 0);
    createArms(robot, bodyLength/2, 0, 0);
    createAbdomen(robot, 0, -bodyHeight/2, 0);
    createWaist(robot, 0, -bodyHeight/2 - abdomenHeight, 0);
    createLegs(robot, -backLength/3, -backHeight/2 - abdomenHeight - waistHeight, -bodyWidth/2);

    scene.add(robot);

}

function createHead(obj, x, y, z){
    'use strict';

    var head = new THREE.Object3D();
    geometry = new THREE.BoxGeometry(headEdgeLength, headEdgeLength, headEdgeLength);
    mesh = new THREE.Mesh(geometry, materials[8]);
    console.log(materials[0]);
    mesh.position.set(x, y, z);
    head.add(mesh);

    createAntenas(head, y, z);
    createEyes(head, y);
    head.position.y += headEdgeLength/2;
    
    obj.add(head);
    components.push(head);
}

function createAntenas(obj, y, z) {
    'use strict';

    geometry = new THREE.ConeGeometry(antenaRadius, antenaHeight, 32);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(-headEdgeLength/3.5, y + antenaHeight/2 + headEdgeLength/2, z);
    obj.add(mesh);

    geometry = new THREE.ConeGeometry(antenaRadius, antenaHeight, 32);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(headEdgeLength/3.5, y + antenaHeight/2 + headEdgeLength/2, z);
    obj.add(mesh);
}

function createEyes(obj, y) {
    'use strict';
    
    geometry = new THREE.SphereGeometry(eyeRadius, 32, 16);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(headEdgeLength/4, y, headEdgeLength/2);
    obj.add(mesh);

    geometry = new THREE.SphereGeometry(eyeRadius, 32, 16);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(-headEdgeLength/4, y, headEdgeLength/2);
    obj.add(mesh);
}

function createBody(obj, x, y, z){
    'use strict';

    var back = new THREE.BoxGeometry(backLength, backHeight, backWidth);
    mesh = new THREE.Mesh(back, materials[6]);
    mesh.position.set(x, y, z - (bodyWidth-(bodyWidth + backWidth)/2) - backWidth/2);
    obj.add(mesh);

    var body = new THREE.BoxGeometry(bodyLength, bodyHeight, bodyWidth);
    mesh = new THREE.Mesh(body, materials[6]);
    mesh.position.set(x, y, z + backWidth/2);
    obj.add(mesh);
}

function createArms(obj, x, y, z) {
    'use strict';

    // create right arm
    geometry = new THREE.BoxGeometry(armLength, armHeight, armWidth);
    mesh = new THREE.Mesh(geometry, materials[7]);
    mesh.position.set(-x - armLength/2, y, z - (bodyWidth-(bodyWidth+backWidth)/2) - armWidth/2);

    var armR = new THREE.Object3D();
    armR.add(mesh);
    createForearm(armR, -x - armLength/2, y - armHeight/2, z, armLength);
    createPipe(armR, -x - armLength, y, z, false);
    obj.add(armR);
    components.push(armR);

    // create left arm
    geometry = new THREE.BoxGeometry(armLength, armHeight, armWidth);
    mesh = new THREE.Mesh(geometry, materials[7]);
    mesh.position.set(x + armLength/2, y, z - (bodyWidth-(bodyWidth+backWidth)/2) - armWidth/2);

    var armL = new THREE.Object3D();
    armL.add(mesh);
    createForearm(armL, x + armLength/2, y - armHeight/2, z, armLength);
    createPipe(armL, x + armLength, y, z, true);
    obj.add(armL);
}

function createPipe(obj, x, y, z, isLeft) {
    'use strict';

    var pipeX = isLeft ? pipeRadius : -pipeRadius;

    geometry = new THREE.CylinderGeometry(pipeRadius, pipeRadius, pipeHeight, 32);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x + pipeX, y + armHeight/3, z - (bodyWidth-(bodyWidth+backWidth)/2) - armWidth/2);
    obj.add(mesh);

}

function createForearm(obj, x, y, z){
    'use strict';

    geometry = new THREE.BoxGeometry(forearmLength, forearmHeight, forearmWidth);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y - forearmHeight/2, z);
    obj.add(mesh);

}

function createAbdomen(obj, x, y, z){
    'use strict';

    geometry = new THREE.BoxGeometry(abdomenLength, abdomenHeight, abdomenWidth);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(x, y - abdomenHeight/2, z);
    obj.add(mesh);
}

function createWaist(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(waistLength, waistHeight, waistWidth);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x, y - waistHeight/2, z);
    var waist = new THREE.Object3D();
    waist.add(mesh);

    createWheel(waist, bodyLength/2, -(bodyHeight/2 + abdomenHeight), z + waistWidth/2, false);
    createWheel(waist, -bodyLength/2, -(bodyHeight/2 + abdomenHeight), z + waistWidth/2, true);
    obj.add(waist);
}

function createWheel(obj, x, y, z, isRight) {
    'use strict';
    geometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelHeight, 32);
    geometry.rotateZ(Math.PI / 2);
    mesh = new THREE.Mesh(geometry, materials[6]);
    if(isRight) {
        mesh.position.set(x + wheelHeight/2 , y - wheelHeight, z - wheelRadius);
    }
    else {
        mesh.position.set(x - wheelHeight/2 , y - wheelHeight, z - wheelRadius);
    }
    obj.add(mesh);
}

function createLegs(obj, x, y, z){
    'use strict';
    var legR = new THREE.Object3D();
    var legL = new THREE.Object3D();
    
    //create thigh
    geometry = new THREE.BoxGeometry(thighLength, thighHeight, thighWidth);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x,y - thighHeight/2, z + thighWidth/2);
    legR.add(mesh);

    geometry = new THREE.BoxGeometry(thighLength, thighHeight, thighWidth);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(-x, y - thighHeight/2, z + thighWidth/2);
    legL.add(mesh);
    
    //create pernas
    geometry = new THREE.BoxGeometry(legLength, legHeight, legWidth);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y - legHeight/2 - thighHeight, z + thighWidth/2);
    legR.add(mesh);

    geometry = new THREE.BoxGeometry(legLength, legHeight, legWidth);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(-x, y - legHeight/2 - thighHeight, z + thighWidth/2);
    legL.add(mesh);
    
    //create rodas
    createWheel(legR, x - legLength/2 - wheelHeight/2, y - legHeight - footHeight, z + thighWidth/2 + wheelRadius, true);
    createWheel(legR, x - legLength/2 - wheelHeight/2, y - legHeight - footHeight + 2.5*wheelRadius, z + thighWidth/2 + wheelRadius, true);
    createWheel(legL, -x + legLength/2 + wheelHeight/2, y - legHeight - footHeight, z + thighWidth/2 + wheelRadius, false);
    createWheel(legL, -x + legLength/2 + wheelHeight/2, y - legHeight - footHeight + 2.5*wheelRadius, z + thighWidth/2 + wheelRadius, false);

    //create pes
    createFoot(legR, x, y, z, true);
    createFoot(legL, -x, y, z, false);

    obj.add(legR);
    obj.add(legL);
}

function createFoot(obj, x, y, z, isRight) { 
    'use strict';

    var footX = isRight ? x - wheelHeight/4 : x + wheelHeight/4;

    geometry = new THREE.BoxGeometry(footLength, footHeight, footWidth);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(footX, y - thighHeight - legHeight - footHeight/2, z + 2*wheelRadius);
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

    render();
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
    
    if (e.keyCode >= 49 && e.keyCode <= 53) {
        activeCamera = e.keyCode - 49;
    }
    else if (e.keyCode == 54) {
        for(let i = 0; i < 2; i++) {
            if (components[0] instanceof THREE.Object3D) {
                components[0].traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.wireframe = true;
                    }
                });
            }
            console.log(components[0]);
            //components[i].material.wireframe = !components[i].material.wireframe;
        }
        /*scene.traverse(function(object) {
            if (object instanceof THREE.Mesh) {
              object.material.wireframe = !object.material.wireframe; // Set wireframe to true
            }
        });*/
    }
    
    update();
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}