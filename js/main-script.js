//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;
var geometry, mesh;

var cameras = [];
var activeCamera = 0;
var startTime;
var direction;

var materials = [];
var objects3D = [];
var robot;
var trailer;

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

var collided = false;
var isRobot = true;

var finalPosition = new THREE.Vector3(0, wheelRadius, 11);
const robotBounds = new THREE.Box3();
const trailerBounds = new THREE.Box3();

// TODO : mover no eixo do z

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFEEAC2);
    
    createRobot();
    createTrailer(0, 3, -23);
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
    //head - 0
    materials.push(new THREE.MeshBasicMaterial({ color: 0xe4e3e3, wireframe: false }));

    //eyes and antenas - 1
    materials.push(new THREE.MeshBasicMaterial({ color: 0xff8a3d, wireframe: false }));

    //forearm and pipe - 2
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffbcbc, wireframe: false }));

    //arms - 3
    materials.push(new THREE.MeshBasicMaterial({ color: 0xb17e7e, wireframe: false }));

    //legs - 4
    materials.push(new THREE.MeshBasicMaterial({ color: 0xdd9292, wireframe: false }));

    //abdomen - 5
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffa1a1, wireframe: false }));

    //waist - 6
    materials.push(new THREE.MeshBasicMaterial({ color: 0xff8d8d, wireframe: false }));

    //wheels - 7
    materials.push(new THREE.MeshBasicMaterial({ color: 0x776464, wireframe: false }));

    //feet - 8
    materials.push(new THREE.MeshBasicMaterial({ color: 0xe1c4c4, wireframe: false }));

    //thigh - 9
    materials.push(new THREE.MeshBasicMaterial({ color: 0x959595, wireframe: false }));

    //body and back - 10
    materials.push(new THREE.MeshBasicMaterial({ color: 0xb9d8d8, wireframe: false }));

}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createRobot(){
    'use strict';

    robot = new THREE.Object3D();
    robot.name = 'robot 3D';
    createBody(robot);
    createHead(robot);
    createArm(robot, true);
    createArm(robot, false);
    createAbdomen(robot);
    createWaist(robot);
    createLegs(robot, true);
    createLegs(robot, false);

    robot.position.set(0, 3, 0)
    scene.add(robot);

}

function createHead(obj){
    'use strict';

    var head = new THREE.Object3D();
    head.position.set(0, -0.80, 0);
    head.name = 'head';

    geometry = new THREE.BoxGeometry(headEdgeLength, headEdgeLength, headEdgeLength);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.y += 0.75;
    mesh.name = 'head';
    head.add(mesh);

    createEye(head, -headEdgeLength/4, 0.75, headEdgeLength/2, true);
    createEye(head, headEdgeLength/4, 0.75, headEdgeLength/2, false);
    createAntena(head, -headEdgeLength/3.5, headEdgeLength/2+antenaHeight/2 + 0.75, 0, true);
    createAntena(head, headEdgeLength/3.5, headEdgeLength/2+antenaHeight/2 + 0.75, 0, false);

    head.position.y += bodyHeight/2 + headEdgeLength/2;

    obj.add(head);
    moves.push(head);
}

function createAntena(obj, x, y, z, isRight){
    'use strict';
    geometry = new THREE.ConeGeometry(antenaRadius, antenaHeight, 32);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.name = isRight ? 'right antena' : 'left antena';
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createEye(obj, x, y, z, isRight){
    'use strict';
    geometry = new THREE.SphereGeometry(eyeRadius, 32, 16);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.name = isRight ? 'right eye' : 'left eye';
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createBody(obj){
    'use strict';
    var body = new THREE.Object3D();
    geometry = new THREE.BoxGeometry(backLength, backHeight, backWidth);
    mesh = new THREE.Mesh(geometry, materials[10]);
    mesh.name = 'back';
    body.add(mesh);
    

    geometry = new THREE.BoxGeometry(bodyLength, bodyHeight, bodyWidth);
    mesh = new THREE.Mesh(geometry, materials[10]);
    mesh.position.z = backWidth/2 + bodyWidth/2;
    mesh.name = 'body';
    body.add(mesh);

    body.position.z += - (bodyWidth-(bodyWidth + backWidth)/2) - backWidth/2;

    obj.add(body);
    objects3D.push(body);
}

function createArm(obj, isRight){
    'use strict'
    var arm = new THREE.Object3D();
    arm.name = 'arm';
    
    var pipeX = isRight ? -armLength/2 - pipeRadius/2 : armLength/2 + pipeRadius/2;
    var forearmX = isRight ? -forearmLength/4 : forearmLength/4;

    geometry = new THREE.BoxGeometry(armLength, armHeight, armWidth);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.name = isRight ? 'right arm' : 'left arm';
    arm.add(mesh);

    createForearm(arm, forearmX, - armHeight/2 - forearmHeight/2, forearmLength/2 + armWidth, isRight);
    createPipe(arm, pipeX , armHeight/3, 0, isRight);

    arm.position.x = isRight ? -bodyLength/2 - armLength/2 : bodyLength/2 + armLength/2;
    arm.position.z = - (bodyWidth-(bodyWidth+backWidth)/2) - armWidth/2;
    
    obj.add(arm);

    moves.push(arm);
}

function createPipe(obj, x, y, z, isRight) {
    'use strict';

    geometry = new THREE.CylinderGeometry(pipeRadius, pipeRadius, pipeHeight, 32);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.name = isRight ? 'right pipe' : 'left pipe';
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createForearm(obj, x, y, z, isRight){
    'use strict';

    geometry = new THREE.BoxGeometry(forearmLength, forearmHeight, forearmWidth);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.name = isRight ? 'right forearm' : 'left forearm';
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createAbdomen(obj){
    'use strict';

    geometry = new THREE.BoxGeometry(abdomenLength, abdomenHeight, abdomenWidth);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.y = - (bodyHeight/2 + abdomenHeight/2);
    mesh.name = 'abdomen';
    obj.add(mesh);
}

function createWaist(obj) {
    'use strict';

    geometry = new THREE.BoxGeometry(waistLength, waistHeight, waistWidth);
    mesh = new THREE.Mesh(geometry, materials[6]);
    mesh.name = 'waist';
    var waist = new THREE.Object3D();
    waist.name = 'waist 3D';
    waist.add(mesh);

    createWheel(waist, waistLength/2, 0 - wheelRadius/2, waistWidth/2 - wheelRadius, false);
    createWheel(waist, -waistLength/2, 0 - wheelRadius/2, waistWidth/2 - wheelRadius, true);

    waist.position.set(0, -(bodyHeight/2 + abdomenHeight + waistHeight/2), 0);
    obj.add(waist);
}

function createWheel(obj, x, y, z, isRight) {
    'use strict';
    geometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelHeight, 32);
    geometry.rotateZ(Math.PI / 2);
    mesh = new THREE.Mesh(geometry, materials[7]);
    mesh.name = isRight ? 'right wheel' : 'left wheel';
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createLegs(obj, isRight){
    'use strict';
    var leg = new THREE.Object3D();
    var n = isRight ? -1 : 1;

    leg.name = isRight ? 'right leg' : 'left leg';
    
    //create thigh
    createThigh(leg, 0, -thighHeight/2 - thighLength, thighWidth/2 - thighWidth, isRight);

    //create leg
    createLeg(leg, 0, - (thighHeight + legHeight/2) - thighLength, thighWidth/2 - thighWidth, isRight);
    
    //create wheels
    createWheel(leg, n * (legLength/2 + wheelHeight/2), - (legHeight + footHeight) - thighLength, thighWidth/2- thighWidth + wheelRadius/2, isRight);
    createWheel(leg, n * (legLength/2 + wheelHeight/2), - (legHeight + footHeight) + 2.5*wheelRadius - thighLength, thighWidth/2 - thighWidth + wheelRadius/2, isRight);

    //create feet
    createFoot(leg, n*wheelHeight/2, - (thighHeight + legHeight) + footHeight/2 - thighLength, -thighWidth/2 + legWidth, isRight);

    leg.position.set(n*backLength/3, -(backHeight/2 + abdomenHeight + waistHeight) + thighLength, -bodyWidth/2 + thighWidth);

    obj.add(leg);

    moves.push(leg);
}

function createThigh(obj, x, y, z, isRight){
    'use strict'
    geometry = new THREE.BoxGeometry(thighLength, thighHeight, thighWidth);
    mesh = new THREE.Mesh(geometry, materials[9]);
    mesh.name = isRight ? 'right thigh': 'left thigh';
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createLeg(obj, x, y, z, isRight){
    'use strict'
    geometry = new THREE.BoxGeometry(legLength, legHeight, legWidth);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(x, y, z);
    mesh.name = isRight ? 'right leg' : 'left leg';
    obj.add(mesh);
}

function createFoot(obj, x, y, z, isRight) { 
    'use strict';
    var foot = new THREE.Object3D();
    foot.position.set(x, y - footHeight/2, z - footWidth/2);
    
    geometry = new THREE.BoxGeometry(footLength, footHeight, footWidth);
    mesh = new THREE.Mesh(geometry, materials[8]);
    mesh.position.set(0, footHeight/2, footWidth/2);
    mesh.name = isRight ? 'right foot' : 'left foot';
  
    foot.add(mesh);
    obj.add(foot);
    moves.push(foot);
}

function createTrailer(x, y, z){
    'use strict';
    
    trailer = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(trailerLength, trailerHeight, trailerWidth);
    mesh = new THREE.Mesh(geometry, materials[8]);
    mesh.name = 'trailer';
    mesh.position.set(x, y, z);
    
    trailer.add(mesh);

    createWheel(trailer, x - trailerLength/2 + wheelHeight/2, y - trailerHeight/2 - wheelRadius, z - trailerWidth/2 + 1.5 + wheelRadius, true);
    createWheel(trailer, x - trailerLength/2 + wheelHeight/2, y - trailerHeight/2 - wheelRadius, z - trailerWidth/2 + 1.5 + 3*wheelRadius, true);
    createWheel(trailer, x + trailerLength/2 - wheelHeight/2, y - trailerHeight/2 - wheelRadius, z - trailerWidth/2 + 1.5 + wheelRadius, false);
    createWheel(trailer, x + trailerLength/2 - wheelHeight/2, y - trailerHeight/2 - wheelRadius, z - trailerWidth/2 + 1.5 + 3*wheelRadius, false);

    trailer.position.y += 2/3*legWidth - wheelRadius/2;
    scene.add(trailer);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

    robotBounds.setFromObject(robot);
    trailerBounds.setFromObject(trailer);

    if(robotBounds.intersectsBox(trailerBounds) && !isRobot && !collided) {
        direction = new THREE.Vector3().subVectors(finalPosition, trailer.position).normalize();
        startTime = Date.now();
        collided = true;
        handleCollisions();
    }
    if(collided && !robotBounds.intersectsBox(trailerBounds)) {
        collided = false;
    }

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

    var currentTime = Date.now();
    var elapsed = currentTime - startTime;
    
    var elapsedSeconds = elapsed / 1000;
    
    var distanceToMove = 0.05 * elapsedSeconds;

    if (distanceToMove > trailer.position.distanceTo(finalPosition)) {
        trailer.position.copy(finalPosition);
        // DUVIDA: o que é suposto fazer dps da colisao?
        return;
    }
    
    trailer.position.addScaledVector(direction, distanceToMove);
    
    requestAnimationFrame(handleCollisions);

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
    
    if (!collided) {
        if (feetRotatingU && moves[3].rotation.x <= Math.PI && !feetRotatingD) {
            moves[3].rotation.x += moveSpeed;
            moves[5].rotation.x += moveSpeed;
        } 
        
        else if (feetRotatingD && moves[3].rotation.x >= 0 && !feetRotatingU) {
            moves[3].rotation.x -= moveSpeed;
            moves[5].rotation.x -= moveSpeed;
        } 
        
        else if (legRotatingL && moves[4].rotation.x <= 1.548 && !legRotatingR) {
            moves[4].rotation.x += moveSpeed;
            moves[6].rotation.x += moveSpeed;
        } 
        
        else if (legRotatingR && moves[4].rotation.x >= 0 && !legRotatingL) {
            moves[4].rotation.x -= moveSpeed;
            moves[6].rotation.x -= moveSpeed;
        } 
        
        else if (armsRotatingL && moves[1].position.x >= -bodyLength/2 - armLength/2 
                    && moves[2].position.x <= bodyLength/2 + armLength/2 && !armsRotatingR) {
            moves[1].position.x -= moveSpeed;
            moves[2].position.x += moveSpeed;
        } 
        
        else if (armsRotatingR && moves[1].position.x <= (-bodyLength/2 + armLength/2) 
                    && moves[2].position.x >= bodyLength/2 - armLength/2 && !armsRotatingL) {
            moves[1].position.x += moveSpeed;
            moves[2].position.x -= moveSpeed;
        } 
        
        else if (headRotatingR && moves[0].rotation.x <= 0 && !headRotatingL) {
            moves[0].rotation.x += moveSpeed;
        } 
        
        else if (headRotatingL && moves[0].rotation.x >= -Math.PI && !headRotatingR) {
            moves[0].rotation.x -= moveSpeed;
        } 
        
        if(moves[3].rotation.x >= 3.14 && moves[4].rotation.x >= 1.5 && moves[0].rotation.x <= -3.14 && moves[1].position.x >= -2.25) {
            isRobot = false;
        }
        else {
            isRobot = true;
        }
    }

    if (up) {
        if(left) 
            trailer.position.add(new THREE.Vector3(-0.1, 0, -0.1));
        else if(right) 
            trailer.position.add(new THREE.Vector3(0.1, 0, -0.1));
        else if(!down) 
            trailer.position.add(new THREE.Vector3(0, 0, -0.1));
    } 
    
    else if (down) {
        if(left) 
            trailer.position.add(new THREE.Vector3(-0.1, 0, 0.1));
        else if(right) 
            trailer.position.add(new THREE.Vector3(0.1, 0, 0.1));
        else if(!up) 
            trailer.position.add(new THREE.Vector3(0, 0, 0.1));    
    } 
    
    else if (left && !right) {
        trailer.position.add(new THREE.Vector3(-0.1, 0, 0));
    } 
    
    else if (right && !left) {
        trailer.position.add(new THREE.Vector3(0.1, 0, 0));
    }

    checkCollisions();

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
        for(let i = 0; i < materials.length; i++) {
            materials[i].wireframe = !materials[i].wireframe;
        }
    }
    
    update();

}