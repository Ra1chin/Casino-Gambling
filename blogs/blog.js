// Stylish Mouse Trail Effect
function createMouseTrail() {
    const trailContainer = document.createElement('div');
    trailContainer.className = 'mouse-trail';
    document.body.appendChild(trailContainer);

    let mouseX = 0, mouseY = 0;
    const particles = [];
    const maxParticles = 12; // Slightly more particles for a richer effect
    let lastParticleTime = 0;
    const particleInterval = 40; // Faster spawning for smoother trail

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Create and animate particles
    function animateParticles(timestamp) {
        if (timestamp - lastParticleTime > particleInterval) {
            if (particles.length < maxParticles) {
                const particle = document.createElement('div');
                particle.className = 'trail-particle';
                // Randomize size and slight offset for natural look
                const size = Math.random() * 6 + 6; // Between 6px and 12px
                const offsetX = (Math.random() - 0.5) * 10; // Slight random offset
                const offsetY = (Math.random() - 0.5) * 10;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${mouseX + offsetX}px`;
                particle.style.top = `${mouseY + offsetY}px`;
                trailContainer.appendChild(particle);
                particles.push({ element: particle, life: 800, velocityX: (Math.random() - 0.5) * 2, velocityY: (Math.random() - 0.5) * 2 }); // Shorter life for dynamic effect
                lastParticleTime = timestamp;
            }
        }

        // Update particles
        particles.forEach((particle, index) => {
            particle.life -= 16; // Approx 60fps frame time
            if (particle.life <= 0) {
                particle.element.remove();
                particles.splice(index, 1);
                return;
            }
            // Update position with velocity for trailing effect
            const currentLeft = parseFloat(particle.element.style.left);
            const currentTop = parseFloat(particle.element.style.top);
            particle.element.style.left = `${currentLeft + particle.velocityX}px`;
            particle.element.style.top = `${currentTop + particle.velocityY}px`;
            // Fade and pulse effect
            const opacity = particle.life / 800;
            const scale = 0.5 + (particle.life / 800) * 0.5; // Pulse between 0.5 and 1
            particle.element.style.opacity = opacity;
            particle.element.style.transform = `scale(${scale})`;
        });

        requestAnimationFrame(animateParticles);
    }

    requestAnimationFrame(animateParticles);
}

function init() {
    createMouseTrail(); // Initialize mouse trail
}

document.addEventListener('DOMContentLoaded', init);