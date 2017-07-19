Physijs.scripts.worker = 'physijs_worker.js'
Physijs.scripts.ammo = 'ammo.js'

document.getElementById("music").volume = 0.2

const scene = new Physijs.Scene

const cameraBack = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const cameraFront = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const cameraRight = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const cameraLeft = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )



const cameras = [
    cameraBack,
    cameraRight,
    cameraFront,
    cameraLeft
]

cameras.forEach(function(camera) {
    scene.add(camera)
})

window.currentCameraIndex = 0
let currentCamera = cameras[window.currentCameraIndex]

scene.setGravity(new THREE.Vector3(0, -38, 0))

const renderer = new THREE.WebGLRenderer({ anitalias: true })
renderer.setClearColor("darkred")
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const textureLoader = new THREE.TextureLoader()

function loadTexture(url) {
    return new Promise(function(resolve, reject) {
        textureLoader.load(
            url,
            function(texture) {
                resolve(texture)
            },
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            function(xhr) {
                reject(xhr)
            }
        )
    })
}



const keys = {
    w: 87,
    a: 65,
    s: 83,
    d: 68,
    leftArrow: 37,
    rightArrow: 39
}

//camera.lookAt(new THREE.Vector3(0, 0, 0))

//camera.rotation.x -= 0.4

let cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 1)
let cubeMaterial

loadTexture("/textures/old-brck-wall-texture_thumb.jpg")
    .then(texture => {
        cubeMaterial = new THREE.MeshBasicMaterial({
            map: texture
        })  
    })
    .catch(err => {
        console.log("something went wrong")
    })

let cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial)

cube.__dirtyPosition = true
cube.position.y = 1

scene.add(cube)
console.log(cube instanceof Physijs.BoxMesh)

const wallData = [
    {
        x: -5,
        y: 1,
        z: 0,
        type: "straight"
    },
    {
        x: 5,
        y: 1,
        z: 0,
        type: "straight"
    },
    {
        x: 0,
        y: 1,
        z: 5,
        type: "side"
    },
    {
        x: 10,
        y: 1,
        z: -5,
        type: "side"
    },
    {
        x: -10,
        y: 1,
        z: -5,
        type: "side"
    },
    {
        x: -15,
        y: 0,
        z: -10,
        type: "straight"
    },
    {
        x: -15,
        y: 0,
        z: -15,
        type: "straight"
    },
    {
        x: -15,
        y: 0,
        z: -20,
        type: "straight"
    },
    {
        x: -10,
        y: 0,
        z: -25,
        type: "side"
    },
    {
        x: -5,
        y: 0,
        z: -20,
        type: "straight"
    },
    {
        x: 0,
        y: 0,
        z: -15,
        type: "side"
    },
    {
        x: 10,
        y: 0,
        z: -15,
        type: "side"
    },
    {
        x: 20,
        y: 0,
        z: -5,
        type: "side"
    },
    {
        x: 25,
        y: 0,
        z: -10,
        type: "straight"
    },
    {
        x: 25,
        y: 0,
        z: -20,
        type: "straight"
    },
    {
        x: 15,
        y: 0,
        z: -20,
        type: "straight"
    },
    {
        x: 15,
        y: 0,
        z: -30,
        type: "straight"
    },
    {
        x: 25,
        y: 0,
        z: -30,
        type: "straight"
    },
    {
        x: 25,
        y: 0,
        z: -40,
        type: "straight"
    },
    {
        x: 25,
        y: 0,
        z: -50,
        type: "straight"
    },
    {
        x: 25,
        y: 0,
        z: -60,
        type: "straight"
    },
    {
        x: 20,
        y: 0,
        z: -60,
        type: "side"
    },
    {
        x: 15,
        y: 0,
        z: -55,
        type: "straight"
    },
    {
        x: 15,
        y: 0,
        z: -45,
        type: "straight"
    },
    {
        x: 10,
        y: 0,
        z: -40,
        type: "side"
    },
    {
        x: 10,
        y: 0,
        z: -35,
        type: "side"
    },
    {
        x: 0, 
        y: 0,
        z: -40,
        type: "side"
    },
    {
        x: 0,
        y: 0,
        z: -35,
        type: "side"
    },
    {
        x: -10,
        y: 0,
        z: -35,
        type: "side"
    },
    {
        x: -10,
        y: 0,
        z: -40,
        type: "straight"
    },
    {
        x: -5,
        y: 0,
        z: -45,
        type: "straight"
    },
    {
        x: -10,
        y: 0,
        z: -50,
        type: "straight"
    },
    {
        x: -5,
        y: 0,
        z: -50,
        type: "straight"
    }
]

for(let positionKey in wallData) {
    let data = wallData[positionKey]
    let constraint, wallGeometry, wallMaterial
    
    if(data.type == "straight") {
        wallGeometry = new THREE.BoxGeometry(1, 5, 10)
    } 
    
    else if(data.type == "side") {
        wallGeometry = new THREE.BoxGeometry(10, 5, 1)
    }
    
    
    wallMaterial = new THREE.MeshBasicMaterial({
        color: "#474747"
    })
    
    let wall = new Physijs.BoxMesh(wallGeometry, wallMaterial, 0)
    
    
    wall.position.set(data.x, data.y, data.z)
    wall.__dirtyPosition = true
    
    wall.addEventListener("collision", function( otherObject, relativeVelocity, relativeRotation, contactNormal ) {
        if(otherObject.uuid == cube.uuid) {
            console.log("This is the player cube")
            cube.position.set(0, 0, 0)
        }
    })

    scene.add(wall)
    
    
}

let plane = new Physijs.BoxMesh(
    new THREE.BoxGeometry(500, 0, -500, 0),
    new THREE.MeshBasicMaterial({ color: "black" })
)

plane.__dirtyPosition = true
plane.position.y = -1

scene.add( plane )

let finishPlatformGeometry = new THREE.BoxGeometry(20, 0, 20, 0)
let finishPlatformMaterial = new THREE.MeshBasicMaterial({
    color: "red"
})

let finishPlatform = new Physijs.BoxMesh(finishPlatformGeometry, finishPlatformMaterial)


finishPlatform.position.set(-1, -0.5, -60)
finishPlatform.__dirtyPosition = true

finishPlatform.addEventListener("collision", function(otherObject, relativeVelocity, relativeRotation, contactNormal) {
    if(otherObject.uuid == cube.uuid) {
        //alert("YOU WIN!")
        document.getElementById("music").muted = true
        document.body.removeChild(document.getElementsByTagName("canvas")[0])
        document.getElementById("audio").play()
        document.getElementById("image").style.display = "block"
        
    }
})

scene.add(finishPlatform)

function pushOrientation(orientation, direction) {
    switch(orientation) {
        case 0: {
            switch(direction) {
                case "front": {
                    return new THREE.Vector3(0, 0, -10)
                }
                    
                case "left": {
                    return new THREE.Vector3(-10, 0, 0)
                }
                    
                case "back": {
                    return new THREE.Vector3(0, 0, 10)
                }
                    
                case "right": {
                    return new THREE.Vector3(10, 0, 0)
                }
            }
            
            break
        }
            
        case 1: {
            switch(direction) {
                case "front": {
                    return new THREE.Vector3(-10, 0, 0)
                }
                    
                case "left": {
                    return new THREE.Vector3(0, 0, 10)
                }
                    
                case "back": {
                    return new THREE.Vector3(10, 0, 0)
                }
                    
                case "right": {
                    return new THREE.Vector3(0, 0, -10)
                }
            }
            
            break
        }
            
        case 2: {
            switch(direction) {
                case "front": {
                    return new THREE.Vector3(0, 0, 10)
                }
                    
                case "left": {
                    return new THREE.Vector3(10, 0, 0)
                }
                    
                case "back": {
                    return new THREE.Vector3(0, 0, -10)
                }
                    
                case "right": {
                    return new THREE.Vector3(-10, 0, 0)
                }
            }
            
            break
        }
            
        case 3: {
            switch(direction) {
                case "front": {
                    return new THREE.Vector3(10, 0, 0)
                }
                    
                case "left": {
                    return new THREE.Vector3(0, 0, -10)
                }
                    
                case "back": {
                    return new THREE.Vector3(-10, 0, 0)
                }
                    
                case "right": {
                    return new THREE.Vector3(0, 0, 10)
                }
            }
            
            break
        }
    }
}

window.onkeydown = function(e) {
    switch(e.keyCode) {
        case keys.w: {
            //console.log("W key was pressed")
            cube.setLinearVelocity(pushOrientation(currentCameraIndex, "front"))
            break
        }
        
        case keys.a: {
            //console.log("A key was pressed")
            cube.setLinearVelocity(pushOrientation(currentCameraIndex, "left"))
            break
        }
            
        case keys.s: {
            //console.log("S key was pressed")
            cube.setLinearVelocity(pushOrientation(currentCameraIndex, "back"))
            break
        }
            
        case keys.d: {
            //console.log("D key was pressed")
            cube.setLinearVelocity(pushOrientation(currentCameraIndex, "right"))
            break
        }
            
        case keys.rightArrow: {
            if(currentCameraIndex != 0) {
                currentCameraIndex--
                currentCamera = cameras[currentCameraIndex]
            } else {
                currentCameraIndex = 3
                currentCamera = cameras[currentCameraIndex]
            }
            
            break
        }
            
        case keys.leftArrow: {
            if(currentCameraIndex != 3) {
                currentCameraIndex++
                currentCamera = cameras[currentCameraIndex]
            } else {
                currentCameraIndex = 0  
                currentCamera = cameras[currentCameraIndex]
            }
            
            break
        }
    }
}

function animate() {
    requestAnimationFrame(animate)
    scene.simulate()
    
    cameraBack.position.set(cube.position.x, cube.position.y + 4, cube.position.z + 3)
    cameraFront.position.set(cube.position.x, cube.position.y + 4, cube.position.z - 3)
    cameraRight.position.set(cube.position.x + 3, cube.position.y + 4, cube.position.z)
    cameraLeft.position.set(cube.position.x - 3, cube.position.y + 4, cube.position.z)
    
    currentCamera.lookAt(new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z))
    //console.log(finishPlatform.position.y)
    
    renderer.render(scene, currentCamera)
}

animate()

