// Stylish Mouse Trail Effect
function createMouseTrail() {
    const trailContainer = document.createElement('div');
    trailContainer.className = 'mouse-trail';
    document.body.appendChild(trailContainer);

    let mouseX = 0, mouseY = 0;
    const particles = [];
    const maxParticles = 8; // Reduced for performance
    let lastParticleTime = 0;
    const particleInterval = 50; // Slower spawning for efficiency

    // Update mouse position for mouse and touch events
    const updatePosition = (x, y) => {
        mouseX = x;
        mouseY = y;
    };
    document.addEventListener('mousemove', (e) => updatePosition(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
    }, { passive: true });

    // Create and animate particles
    function animateParticles(timestamp) {
        if (timestamp - lastParticleTime > particleInterval && particles.length < maxParticles) {
            const particle = document.createElement('div');
            particle.className = 'trail-particle';
            const size = Math.random() * 4 + 6; // Smaller range: 6px to 10px
            const offsetX = (Math.random() - 0.5) * 8; // Reduced offset
            const offsetY = (Math.random() - 0.5) * 8;
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${mouseX + offsetX}px`,
                top: `${mouseY + offsetY}px`
            });
            trailContainer.appendChild(particle);
            particles.push({
                element: particle,
                life: 600, // Shorter life for faster cleanup
                velocityX: (Math.random() - 0.5) * 1.5, // Reduced velocity
                velocityY: (Math.random() - 0.5) * 1.5
            });
            lastParticleTime = timestamp;
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.life -= 16;
            if (particle.life <= 0) {
                particle.element.remove();
                particles.splice(i, 1);
                continue;
            }
            const left = parseFloat(particle.element.style.left) + particle.velocityX;
            const top = parseFloat(particle.element.style.top) + particle.velocityY;
            const opacity = particle.life / 600;
            const scale = 0.5 + (particle.life / 600) * 0.5;
            Object.assign(particle.element.style, {
                left: `${left}px`,
                top: `${top}px`,
                opacity: opacity,
                transform: `scale(${scale})`
            });
        }

        requestAnimationFrame(animateParticles);
    }

    requestAnimationFrame(animateParticles);
}

function init() {
    createMouseTrail(); // Initialize mouse trail
}

document.addEventListener('DOMContentLoaded', init);