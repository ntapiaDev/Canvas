import { randomIntFromRange, randomColor, distance } from './utils.js';
import { resolveCollision } from './utils-elastic-collision.js';

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = document.body.getBoundingClientRect().width
canvas.height = document.body.getBoundingClientRect().height

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FF7F66', 'pink']

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
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        }
        this.radius = radius;
        this.color = color;
        this.mass = 1;
        this.opacity = 0;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    update(particules) {
        this.draw()

        for (let i = 0; i < particules.length; i++) {
            if(this === particules[i]) continue;
            if(distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
              resolveCollision(this, particles[i]);
            }            
        }

        //Gérer la sortie de l'écran
        if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) this.velocity.x = - this.velocity.x;
        if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) this.velocity.y = - this.velocity.y;

        //Mouse collision
        if(distance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2) {
            this.opacity += 0.02;
        } else if(this.opacity > 0) {
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 400; i++) {
        const radius = 15;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);       
        const color = randomColor(colors);

        if(i !== 0) {
            for(let j = 0; j < particles.length; j++) {
                if(distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);   

                    j = -1;
                }
            }
        }

        particles.push(new Particle(x, y, radius, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update(particles)
    })
}

init()
animate()
