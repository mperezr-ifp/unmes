AOS.init({ duration: 1000 });

// Generador de Estrellas Original
function createStars() {
    const starContainers = [{ id: 'stars', count: 250, size: '1px', speed: '60s' }, { id: 'stars2', count: 100, size: '2px', speed: '100s' }, { id: 'stars3', count: 50, size: '3px', speed: '140s' }];
    starContainers.forEach(container => {
        const el = document.getElementById(container.id);
        if (!el) return;
        let shadows = [];
        for (let i = 0; i < container.count; i++) {
            const x = Math.floor(Math.random() * window.innerWidth);
            const y = Math.floor(Math.random() * 2000);
            shadows.push(`${x}px ${y}px #FFF`);
        }
        el.style.boxShadow = shadows.join(', ');
        el.style.animation = `animStar ${container.speed} linear infinite`;
    });
}
window.addEventListener('load', createStars);

// Lógica del Temporizador (22 de Marzo 2026)
const startDate = new Date('March 22, 2026 00:00:00').getTime();

function updateTimer() {
    const now = new Date().getTime();
    const diff = now - startDate;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = d;
    document.getElementById('hours').innerText = h;
    document.getElementById('minutes').innerText = m;
    document.getElementById('seconds').innerText = s;
}
setInterval(updateTimer, 1000);

function checkPassword() {
    const pass = document.getElementById('passwordInput').value;
    if (pass === "22") {
        document.getElementById('miCancion').play().catch(e => {});
        const login = document.getElementById('login-screen');
        login.style.opacity = '0';
        setTimeout(() => {
            login.style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
            startTyping();
        }, 1200);
    } else {
        alert("Te has equivocado... Inténtalo de nuevo friki");
    }
}

const text = "Estrellita,\nhoy hacemos un mes y dos desde que nos conocemos… y no sé muy bien cómo explicarlo sin sonar repetitivo, pero de verdad que eres de las cosas más bonitas que me han pasado.\nPuede parecer poco, pero contigo se siente como si te conociera desde siempre. Como si todo hubiera ido encajando poco a poco sin darme cuenta.\nMe gusta pensar en todo lo que hemos construido en este tiempo… en las conversaciones, en los momentos tontos, en las veces que me haces sentir mejor sin siquiera intentarlo.\nNo sabes lo feliz que me hace estar a tu lado. No somos perfectos, a veces sé que soy complicado de sobrellevar… pero aun así, eliges quedarte. Y yo te elegiría a ti una y otra vez.\nGracias por este tiempo, por tu paciencia, por tu forma de quererme.\nY por ser mi luz más brillante ✨\nT'estimo molt, ti amo, te amo.";
let index = 0;
function startTyping() {
    if (index < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(startTyping, 50);
    }
}

function showReason(msg) {
    const display = document.getElementById('reason-display');
    display.style.opacity = 0;
    setTimeout(() => { display.innerText = msg; display.style.opacity = 1; }, 300);
}

document.getElementById('btn-surprise').addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementById('surprise-msg').style.display = 'block';
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#358092', '#a0cfff', '#7fb3d5', '#ffffff'] // AZULES Y BLANCO
    });
});

function openEnvelope() { document.querySelector('.envelope-wrapper').classList.toggle('open'); }

const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
});

// Corazones de fondo
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let hearts = [];
class Heart {
    constructor() { this.x = Math.random() * canvas.width; this.y = canvas.height + 100; this.size = Math.random() * 15 + 5; this.speed = Math.random() * 2 + 1; this.opacity = Math.random() * 0.5 + 0.2; }
    draw() {
        ctx.fillStyle = `rgba(53, 128, 146, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.fill();
    }
    update() { this.y -= this.speed; if (this.y < -50) this.y = canvas.height + 100; }
}
function initHearts() { for (let i = 0; i < 25; i++) hearts.push(new Heart()); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); hearts.forEach(h => { h.update(); h.draw(); }); requestAnimationFrame(animate); }
initHearts(); animate();