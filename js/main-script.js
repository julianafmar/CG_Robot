//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;
var geometry, mesh;

var cameras = [];
var activeCamera = 0;

var materials = [];
var components = [];
var robot;
var truck;

var moves = [];

var feetRotatingU = false;
var feetRotatingD = false;

var legRotatingL = false;
var legRotatingR = false;

var armsRotatingL = false;
var armsRotatingR = false;

var headRotatingL = false;
var headRotatingR = false;

var left = false;
var right = false;
var up = false;
var down = false;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFEEAC2);
    
    createRobot();
    createTruck(0, 3, -23);
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
    materials.push(new THREE.MeshBasicMaterial({ color: 0x067BC2, wireframe: false }));

    // light blue - 1
    materials.push(new THREE.MeshBasicMaterial({ color: 0x84BCDA, wireframe: false }));

    // white - 2
    materials.push(new THREE.MeshBasicMaterial({ color: 0xFCFCFC, wireframe: false }));

    // light red - 3
    materials.push(new THREE.MeshBasicMaterial({ color: 0xD56062, wireframe: false }));

    // light green - 4
    materials.push(new THREE.MeshBasicMaterial({ color: 0xB8C073, wireframe: false }));

    // black - 5
    materials.push(new THREE.MeshBasicMaterial({ color: 0x2F2F2F, wireframe: false }));

    // yellow - 6
    materials.push(new THREE.MeshBasicMaterial({ color: 0xECC30B, wireframe: false }));

    // orange/red - 7
    materials.push(new THREE.MeshBasicMaterial({ color: 0xF37748, wireframe: false }));

    // mustard - 8
    materials.push(new THREE.MeshBasicMaterial({ color: 0xD2C23F, wireframe: false }));

    // orange - 9
    materials.push(new THREE.MeshBasicMaterial({ color: 0xF09D2A, wireframe: false }));

    // coral - 10
    materials.push(new THREE.MeshBasicMaterial({ color: 0xE46C55, wireframe: false }));
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createRobot(){
    'use strict';

    robot = new THREE.Object3D();
    robot.name = 'robot 3D';
    createBody(robot, 0, 0, 0);
    createHead(robot, 0, bodyHeight/2, 0);
    createArm(robot, bodyLength/2, 0, 0, true);
    createArm(robot, bodyLength/2, 0, 0, false);
    createAbdomen(robot, 0, -bodyHeight/2, 0);
    createWaist(robot, 0, -bodyHeight/2 - abdomenHeight, 0);
    createLegs(robot, backLength/3, -backHeight/2 - abdomenHeight - waistHeight, -bodyWidth/2);

    robot.position.set(0, 3, 0)
    scene.add(robot);

}

function createHead(obj, x, y, z){
    'use strict';

    var head = new THREE.Object3D();
    head.name = "head 3D";
    geometry = new THREE.BoxGeometry(headEdgeLength, headEdgeLength, headEdgeLength);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    mesh.name = 'head';
    head.add(mesh);
    components.push(mesh);

    createEye(head, x - headEdgeLength/4, y, z + headEdgeLength/2);
    createEye(head, x + headEdgeLength/4, y, z + headEdgeLength/2);
    createAntena(head, x - headEdgeLength/3.5, y + headEdgeLength/2, z);
    createAntena(head, x + headEdgeLength/3.5, y + headEdgeLength/2, z);
    head.position.y += headEdgeLength/2;
    
    obj.add(head);
    
    moves.push(head);
}

function createAntena(obj, x, y, z){
    'use strict';
    geometry = new THREE.ConeGeometry(antenaRadius, antenaHeight, 32);
    mesh = new THREE.Mesh(geometry, materials[8]);
    mesh.position.set(x, y + antenaHeight/2, z);
    mesh.name = 'right antena';
    obj.add(mesh);
}

function createEye(obj, x, y, z){
    'use strict';
    geometry = new THREE.SphereGeometry(eyeRadius, 32, 16);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x, y, z);
    mesh.name = 'eye';
    obj.add(mesh);
}

function createBody(obj, x, y, z){
    'use strict';

    var back = new THREE.BoxGeometry(backLength, backHeight, backWidth);
    mesh = new THREE.Mesh(back, materials[4]);
    mesh.position.set(x, y, z - (bodyWidth-(bodyWidth + backWidth)/2) - backWidth/2);
    mesh.name = 'back';
    obj.add(mesh);

    var body = new THREE.BoxGeometry(bodyLength, bodyHeight, bodyWidth);
    mesh = new THREE.Mesh(body, materials[4]);
    mesh.position.set(x, y, z + backWidth/2);
    mesh.name = 'body';
    obj.add(mesh);
    components.push(mesh);
}

function createArm(obj, x, y, z, isRight){
    'use strict'
    var arm = new THREE.Object3D();
    arm.name = 'arm';

    var armX = isRight ? - x - armLength/2 : x + armLength/2;
    var pipeX = isRight ? - x - armLength : x + armLength;

    geometry = new THREE.BoxGeometry(armLength, armHeight, armWidth);
    mesh = new THREE.Mesh(geometry, materials[7]);
    mesh.position.set(armX, y, z - (bodyWidth-(bodyWidth+backWidth)/2) - armWidth/2);
    mesh.name = isRight ? 'right arm' : 'left arm';
    arm.add(mesh);
    components.push(mesh);

    createForearm(arm, armX, y - armHeight/2, z, armLength);
    createPipe(arm, pipeX, y, z, isRight);

    obj.add(arm);

    moves.push(arm);
}

function createPipe(obj, x, y, z, isRight) {
    'use strict';

    var pipeX = isRight ? -pipeRadius : pipeRadius;

    geometry = new THREE.CylinderGeometry(pipeRadius, pipeRadius, pipeHeight, 32);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x + pipeX, y + armHeight/3, z - (bodyWidth-(bodyWidth+backWidth)/2) - armWidth/2);
    mesh.name = 'pipe';
    obj.add(mesh);
    components.push(mesh);
}

function createForearm(obj, x, y, z){
    'use strict';

    geometry = new THREE.BoxGeometry(forearmLength, forearmHeight, forearmWidth);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y - forearmHeight/2, z);
    mesh.name = 'forearm';
    obj.add(mesh);
    components.push(mesh);
}

function createAbdomen(obj, x, y, z){
    'use strict';

    geometry = new THREE.BoxGeometry(abdomenLength, abdomenHeight, abdomenWidth);
    mesh = new THREE.Mesh(geometry, materials[6]);
    mesh.position.set(x, y - abdomenHeight/2, z);
    mesh.name = 'abdomen';
    components.push(mesh);
    obj.add(mesh);
}

function createWaist(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(waistLength, waistHeight, waistWidth);
    mesh = new THREE.Mesh(geometry, materials[8]);
    mesh.position.set(x, y - waistHeight/2, z);
    mesh.name = 'waist';
    var waist = new THREE.Object3D();
    waist.name = 'waist 3D';
    waist.add(mesh);
    components.push(mesh);

    createWheel(waist, bodyLength/2, -(bodyHeight/2 + abdomenHeight), z + waistWidth/2, false);
    createWheel(waist, -bodyLength/2, -(bodyHeight/2 + abdomenHeight), z + waistWidth/2, true);
    obj.add(waist);
}

function createWheel(obj, x, y, z, isRight) {
    'use strict';
    geometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelHeight, 32);
    geometry.rotateZ(Math.PI / 2);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.name = 'wheel';
    var wheelX = isRight ? x+wheelHeight/2 : x - wheelHeight/2;
    mesh.position.set(wheelX, y - wheelRadius, z - wheelRadius);
    obj.add(mesh);
    components.push(mesh);
}

function createLegs(obj, x, y, z){
    'use strict';
    var legR = new THREE.Object3D();
    legR.name = 'legR 3D';
    var legL = new THREE.Object3D();
    legL.name = 'legL 3D';
    
    //create thigh
    createThigh(legR, x, y, z, true);
    createThigh(legL, x, y, z, false);
    components.push(mesh);
    
    //create legs
    createLeg(legR, x, y - thighHeight, z + thighWidth/2, true);
    createLeg(legL, x, y - thighHeight, z + thighWidth/2, false);
    components.push(mesh);
    
    //create wheels 
    createWheel(legR, -x - legLength/2 - wheelHeight/2, y - legHeight - footHeight + 0.5*wheelRadius, z + thighWidth/2 + wheelRadius, true);
    createWheel(legR, -x - legLength/2 - wheelHeight/2, y - legHeight - footHeight + 3*wheelRadius, z + thighWidth/2 + wheelRadius, true);
    createWheel(legL, x + legLength/2 + wheelHeight/2, y - legHeight - footHeight + 0.5*wheelRadius, z + thighWidth/2 + wheelRadius, false);
    createWheel(legL, x + legLength/2 + wheelHeight/2, y - legHeight - footHeight + 3*wheelRadius, z + thighWidth/2 + wheelRadius, false);
    components.push(mesh);

    //create feet
    createFoot(legR, -x, y - thighHeight - legHeight, z, true);
    createFoot(legL, x, y - thighHeight - legHeight, z, false);

    obj.add(legR);
    obj.add(legL);

    moves.push(legL);
    moves.push(legR);
}

function createThigh(obj, x, y, z, isRight){
    'use strict'
    var thighX = isRight ? -x : x;
    geometry = new THREE.BoxGeometry(thighLength, thighHeight, thighWidth);
    mesh = new THREE.Mesh(geometry, materials[LIGHT_GREY]);
    mesh.position.set(thighX, y - thighHeight/2, z + thighWidth/2);
    mesh.name = isRight ? 'right thigh': 'left thigh';
    obj.add(mesh);
}

function createLeg(obj, x, y, z, isRight){
    'use strict'
    var legX = isRight ? -x : x;
    geometry = new THREE.BoxGeometry(legLength, legHeight, legWidth);
    mesh = new THREE.Mesh(geometry, materials[DARK_BLUE]);
    mesh.position.set(legX, y - legHeight/2, z);
    mesh.name = isRight ? 'right leg' : 'left leg';
    obj.add(mesh);
}

function createFoot(obj, x, y, z, isRight) { 
    'use strict';

    var footX = isRight ? x - wheelHeight/4 : x + wheelHeight/4;

    geometry = new THREE.BoxGeometry(footLength, footHeight, footWidth);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(footX, y - footHeight/2, z + 2*wheelRadius);
    mesh.name = isRight ? 'right foot' : 'left foot';
    obj.add(mesh);
    components.push(mesh);

    moves.push(mesh);
}

function createTruck(x, y, z){
    'use strict';
    
    truck = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(truckLength, truckHeight, truckWidth);
    mesh = new THREE.Mesh(geometry, materials[7]);
    mesh.name = 'truck';
    mesh.position.set(x, y, z);
    components.push(mesh);
    truck.add(mesh);

    createWheel(truck, x - truckLength/2, y - truckHeight/2, z - truckWidth/2 + 1.5 + wheelRadius, true);
    createWheel(truck, x - truckLength/2, y - truckHeight/2, z - truckWidth/2 + 1.5 + 3*wheelRadius, true);
    createWheel(truck, x + truckLength/2, y - truckHeight/2, z - truckWidth/2 + 1.5 + wheelRadius, false);
    createWheel(truck, x + truckLength/2, y - truckHeight/2, z - truckWidth/2 + 1.5 + 3*wheelRadius, false);

    scene.add(truck);
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

    if (feetRotatingU && moves[4].rotation.x < 0) {
        moves[3].rotation.x += moveSpeed;
        moves[4].rotation.x += moveSpeed;
    } else if (feetRotatingD && moves[4].rotation.x > -1.60) {
        moves[3].rotation.x -= moveSpeed;
        moves[4].rotation.x -= moveSpeed;
    } else if (legRotatingL && moves[5].rotation.x) {
        moves[5].rotation.x += moveSpeed;
        moves[6].rotation.x += moveSpeed;
    } else if (legRotatingR && moves[5].rotation.x) {
        moves[5].rotation.x -= moveSpeed;
        moves[6].rotation.x -= moveSpeed;
    } else if (armsRotatingL && moves[1].position.x > -0.2 && moves[2].position.x < 0.2) {
        moves[1].position.x -= moveSpeed;
        moves[2].position.x += moveSpeed;
    } else if (armsRotatingR && moves[1].position.x < (bodyLength/2 - armLength) && moves[2].position.x > (-bodyLength/2 + armLength)) {
        moves[1].position.x += moveSpeed;
        moves[2].position.x -= moveSpeed;
    } else if (headRotatingR && moves[0].rotation.x < 0) {
        moves[0].rotation.x += moveSpeed;
    } else if (headRotatingL && moves[0].rotation.x > -2) {
        moves[0].rotation.x -= moveSpeed;
    } else if (up && left) {
        truck.position.add(new THREE.Vector3(-0.1, 0, -0.1));
    } else if (up && right) {
        truck.position.add(new THREE.Vector3(0.1, 0, -0.1));
    } else if (down && left) {
        truck.position.add(new THREE.Vector3(-0.1, 0, 0.1));
    } else if (down && right) {
        truck.position.add(new THREE.Vector3(0.1, 0, 0.1));
    } else if (left && !right) {
        truck.position.add(new THREE.Vector3(-0.1, 0, 0));
    } else if (right && !left) {
        truck.position.add(new THREE.Vector3(0.1, 0, 0));
    } else if (up && !down) {
        truck.position.add(new THREE.Vector3(0, 0, -0.1));
    } else if (down && !up) {
        truck.position.add(new THREE.Vector3(0, 0, 0.1));
    }

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
        cameras[activeCamera].aspect = window.innerWidth / window.innerHeight;
        cameras[activeCamera].updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 81: // Q
            feetRotatingU = true;
            break;
        case 65: // A
            feetRotatingD = true;
            break;
        case 87: // W
            legRotatingL = true;
            break;
        case 83: // S
            legRotatingR = true;
            break;
        case 69: // E
            armsRotatingL = true;
            break;
        case 68: // D
            armsRotatingR = true;
            break;
        case 82: // R
            headRotatingL = true;
            break;
        case 70: // F
            headRotatingR = true;
            break;  
        case 37: // left arrow
            left = true;
            break;
        case 39: // right arrow
            right = true;
            break;
        case 38: // up arrow
            up = true;
            break;
        case 40: // down arrow
            down = true;
            break;
    }
    
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    if (e.keyCode >= 49 && e.keyCode <= 53) 
        activeCamera = e.keyCode - 49;
    else if (e.keyCode == 81) // Q
        feetRotatingU = false;
    else if (e.keyCode == 65) // A
        feetRotatingD = false;
    else if (e.keyCode == 87) // W
        legRotatingL = false;
    else if (e.keyCode == 83) // S
        legRotatingR = false;
    else if (e.keyCode == 69) // E
        armsRotatingL = false;
    else if (e.keyCode == 68) // D
        armsRotatingR = false;
    else if (e.keyCode == 82) // R 
        headRotatingL = false;
    else if (e.keyCode == 70) // F
        headRotatingR = false;
    else if (e.keyCode == 37) // left arrow
        left = false;
    else if (e.keyCode == 39) // right arrow
        right = false;
    else if (e.keyCode == 38) // up arrow
        up = false;
    else if (e.keyCode == 40) // down arrow
        down = false;
    else if (e.keyCode == 54) {
        for(let i = 0; i < components.length; i++) {
            console.log(components[i].name + " wireframe: " + components[i].material.wireframe);
        }
        for(let i = 0; i < components.length; i++) {
            console.log(components[i].name + " ANTES wireframe: " + components[i].material.wireframe);
            components[i].material.wireframe = !components[i].material.wireframe;
            console.log(components[i].name + " DEPOIS wireframe: " + components[i].material.wireframe);
            /*if (components[i] instanceof THREE.Object3D) {
                console.log("Is the " + components[i].name + " a mesh? " + components[i] instanceof THREE.Mesh);
                components[i].traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        console.log(child);
                        console.log("before: " + child.material.wireframe);
                        child.material.wireframe = !child.material.wireframe; // por algum motivo se isto estiver = true o wireframe 
                                                                              // aparece mas se estiver a negacao dele proprio so muda alguns
                        console.log("after: " + child.material.wireframe + "\n");
                    }
                });
            }*/
        }
    }
    
    update();

}