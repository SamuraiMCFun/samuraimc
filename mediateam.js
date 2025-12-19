document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas dinámicas
    createParticles();
    
    // Animación de números en estadísticas
    animateStats();
    
    // Efecto hover en tarjetas
    initCardEffects();
    
    // Efecto de aparición al hacer scroll
    initScrollAnimations();
    
    // Efecto de sonido en botones
    initSoundEffects();
    
    // Contador de visitantes
    initVisitorCounter();
});

function createParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Estilos aleatorios
        const size = Math.random() * 10 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            background: ${i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#0099ff' : '#ff00ff'};
            opacity: ${Math.random() * 0.5 + 0.2};
            box-shadow: 0 0 10px ${i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#0099ff' : '#ff00ff'};
            animation: particleFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
        `;
        
        // Añadir keyframes dinámicos
        const keyframes = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: ${Math.random() * 0.5 + 0.2};
                }
                25% {
                    transform: translateY(-100px) translateX(50px) rotate(90deg);
                }
                50% {
                    transform: translateY(-200px) translateX(0) rotate(180deg);
                    opacity: ${Math.random() * 0.5 + 0.2};
                }
                75% {
                    transform: translateY(-300px) translateX(-50px) rotate(270deg);
                }
                100% {
                    transform: translateY(-400px) translateX(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        // Agregar keyframes si no existen
        if (!document.querySelector('#particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        container.appendChild(particle);
    }
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent === '0' ? 0 : 
                      stat.textContent === '∞' ? '∞' : 
                      stat.textContent === '100%' ? 100 : 0;
        
        if (typeof target === 'number') {
            let current = 0;
            const increment = target / 50;
            const interval = 30;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, interval);
        }
    });
}

function initCardEffects() {
    const cards = document.querySelectorAll('.stat-card, .benefit, .placeholder-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 255, 136, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.stat-card, .benefit, .placeholder-card, .requirements-list li');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initSoundEffects() {
    const buttons = document.querySelectorAll('.apply-btn, .cta-btn, .discord-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Evitar que se dispare si es un enlace externo
            if (this.href && this.href.includes('http')) {
                return;
            }
            
            // Crear sonido de clic
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 523.25; // Nota Do
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        });
    });
}

function initVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');
    if (counterElement) {
        // Número aleatorio entre 1000 y 5000 para simular visitantes
        const targetCount = Math.floor(Math.random() * 4000) + 1000;
        let currentCount = 0;
        const increment = targetCount / 100;
        
        const counterInterval = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                counterElement.textContent = targetCount.toLocaleString();
                clearInterval(counterInterval);
            } else {
                counterElement.textContent = Math.floor(currentCount).toLocaleString();
            }
        }, 20);
    }
}

// Efecto de cursor personalizado
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #00ff88;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, background 0.3s;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cambiar cursor al pasar sobre elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .nav-link, .card, .stat-card, .benefit');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.background = 'rgba(0, 255, 136, 0.2)';
        cursor.style.borderColor = '#00ff88';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
        cursor.style.borderColor = '#00ff88';
    });
});

// Efecto de texto RGB en el título
const titleParts = document.querySelectorAll('.title-part-1, .title-part-2');
titleParts.forEach(part => {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        if (part.classList.contains('title-part-1')) {
            part.style.background = `linear-gradient(90deg, hsl(${hue}, 100%, 60%), hsl(${(hue + 60) % 360}, 100%, 60%))`;
            part.style.webkitBackgroundClip = 'text';
        } else {
            part.style.background = `linear-gradient(90deg, hsl(${(hue + 120) % 360}, 100%, 60%), hsl(${(hue + 180) % 360}, 100%, 60%))`;
            part.style.webkitBackgroundClip = 'text';
        }
    }, 50);
});
