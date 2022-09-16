let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(300, 300, 100, 100);

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// for (let i = 0; i < 10; i++) {
//     c.beginPath();
//     c.arc(
//         Math.random() * window.innerWidth,
//         Math.random() * window.innerHeight,
//         30,
//         0,
//         Math.PI * 2,
//         false
//     );
//     c.strokeStyle = `rgba(
//         ${Math.random() * 255},
//         ${Math.random() * 255},
//         ${Math.random() * 255},
//         ${Math.random()})`;
//     c.stroke();
// }

// Animation à la souris

let mouse = {
    x: undefined,
    y: undefined
};

const handleMouse = (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
}
window.addEventListener('mousemove', handleMouse);

// Génération des circles

class Circle {
    constructor() {
        this.speed = Math.random() * 10;
        this.radius = Math.random() * 10 + 1;
        this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius; 
        this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius;
        this.dx = (Math.random() - 0.5) * this.speed;
        this.dy = (Math.random() - 0.5) * this.speed;
        this.minRadius = this.radius;
        this.maxRadius = this.radius * 5;
        this.color = `rgba(
            ${Math.random() * 255},
            ${Math.random() * 255},
            ${Math.random() * 255},
            ${Math.random()}
        )`;;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = this.color;
        // c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.x > innerWidth - this.radius || this.x < this.radius ? this.dx = -this.dx : '';
        this.y > innerHeight - this.radius || this.y < this.radius ? this.dy = -this.dy : '';
        this.x += this.dx;
        this.y += this.dy;

        // Intéractivité
        Math.abs(mouse.x - this.x) < 150 && Math.abs(mouse.y - this.y) < 150 && this.radius < this.maxRadius ? 
            this.radius += 1 :
            this.radius > this.minRadius ? this.radius -= 1 : '';

        this.draw();
    }
}

let circles = [];
for(let i = 0; i < 2500; i++) circles.push(new Circle());

const animate = () => {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    circles.map(circle => circle.update());
}

animate();
