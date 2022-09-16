import { randomIntFromRange, randomColor, distance } from './utils.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
class Circle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
}

// Implementation

let circle1;
let circle2;
function init() {
    circle1 = new Circle(canvas.width / 2, canvas.height / 2, 100, 'black');
    circle2 = new Circle(undefined, undefined, 30, 'red');
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    circle1.color = distance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius ? 'red' : 'black'; 
}

init()
animate()
