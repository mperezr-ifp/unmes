AOS.init({ duration: 800, once: true });

// Estrellas
function createStars() {
    const starContainers = ['stars', 'stars2', 'stars3'];
    starContainers.forEach((id, idx) => {
        const el = document.getElementById(id);
        let shadows = [];
        for (let i = 0; i < (100 / (idx + 1)); i++) {
            shadows.push(`${Math.random() * 100}vw ${Math.random() * 2000}px #FFF`);
        }
        el.style.boxShadow = shadows.join(', ');
    });
}
createStars();

// Temporizador
const startDate = new Date('March 22, 2026 00:00:00').getTime();
setInterval(() => {
    const diff = new Date().getTime() - startDate;
    document.getElementById('days').innerText = Math.floor(diff / 86400000);
    document.getElementById('hours').innerText = Math.floor((diff % 86400000) / 3600000);
    document.getElementById('minutes').innerText = Math.floor((diff % 3600000) / 60000);
    document.getElementById('seconds').innerText = Math.floor((diff % 60000) / 1000);
}, 1000);

function checkPassword() {
    if (document.getElementById('passwordInput').value === "22") {
        document.getElementById('miCancion').play().catch(() => {});
        document.getElementById('login-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
            startTyping();
        }, 1000);
    } else {
        alert("Número incorrecto, friki ❤️");
    }
}

const text = "Estrellita...\nHoy hacemos un mes y dos desde que nos conocemos... Eres de las cosas más bonitas que me han pasado. Gracias por tu paciencia, por tu forma de quererme y por ser mi luz más brillante ✨. Te amo.";
let i = 0;
function startTyping() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
        i++;
        setTimeout(startTyping, 40);
    }
}

function showReason(msg) {
    const d = document.getElementById('reason-display');
    d.style.opacity = 0;
    setTimeout(() => { d.innerText = msg; d.style.opacity = 1; }, 200);
}

function openEnvelope() { document.querySelector('.envelope-wrapper').classList.toggle('open'); }

document.getElementById('btn-surprise').addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementById('surprise-msg').style.display = 'block';
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.8 }, colors: ['#358092', '#ffffff'] });
});

// Corazones responsivos
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

let hearts = [];
class Heart {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 10 + 5;
        this.speed = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5;
    }
    draw() {
        ctx.fillStyle = `rgba(53, 128, 146, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() { this.y -= this.speed; if (this.y < -20) this.reset(); }
}
for(let i=0; i<20; i++) hearts.push(new Heart());
function anim() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
    requestAnimationFrame(anim);
}
anim();