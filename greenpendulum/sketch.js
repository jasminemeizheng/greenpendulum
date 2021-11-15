const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
const waveHeight = 200
let pendulum

function setup(){
    createCanvas(canvasWidth, canvasHeight) 
    pendulum = createPendulum()
}

function draw(){
    background(255)
    updatePendulumAngle(pendulum)
    updatePendulumPosition(pendulum)
    drawPendulum(pendulum)
}

const drawLine = (pendulum) => {
    stroke(0)
    line(pendulum.center.x, pendulum.center.y, pendulum.lineStart.x, pendulum.lineStart.y)
}


const drawCircle = (pendulum) => {
    fill(pendulum.color)
    ellipse(pendulum.center.x, pendulum.center.y, pendulum.size)
}

const drawPendulum = (pendulum) => {
    drawLine(pendulum)
    drawCircle(pendulum)
}

const updatePendulumAngle = (pendulum) => {
    // a formula that I didn't make up
    // (see: http://www.myphysicslab.com/pendulum1.html)
    pendulum.acceleration = (-1 * pendulum.gravity/pendulum.size) * sin(pendulum.angle)
    pendulum.velocity += pendulum.acceleration
    pendulum.damping -= 0.00001
    pendulum.velocity *= pendulum.damping
    pendulum.prevAngle = pendulum.angle
    pendulum.angle += pendulum.velocity
    // if(Math.abs(pendulum.prevAngle - pendulum.angle < 0.0001)){
    //     pendulum.ended = true
    // }
    
}


const updatePendulumPosition = (pendulum) => {
    pendulum.center.x = pendulum.swingRadius * sin(pendulum.angle) + pendulum.lineStart.x
    pendulum.center.y = pendulum.swingRadius * cos(pendulum.angle) + pendulum.lineStart.y
}



const createPendulum = (idx) => {
    return {
        origin: {x: canvasWidth/2, y: 500},
        center: {x: canvasWidth/2, y: 500},
        lineStart: {x: canvasWidth/2, y: 200},
        size: 100,
        swingRadius: 200,
        color: [170, 230, 165],
        gravity: 0.9,
        damping: 0.99995,
        angle: PI/2,
        acceleration: 0,
        velocity: 0,
    }
}