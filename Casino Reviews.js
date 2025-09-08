const blogsPerPage = 10;
const totalPages = 3;

function displayBlogs(page = 1, searchTerm = '') {
    const blogList = document.getElementById('blog-list');
    const allBlogs = Array.from(blogList.getElementsByClassName('blog-item'));

    allBlogs.forEach(blog => blog.style.display = 'none');

    let filteredBlogs = allBlogs;
    if (searchTerm) {
        const firstLetter = searchTerm.charAt(0).toUpperCase();
        filteredBlogs = allBlogs.filter(blog => {
            const title = blog.querySelector('h2').textContent;
            return title.charAt(0).toUpperCase() === firstLetter;
        });
    }

    const start = (page - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    filteredBlogs.slice(start, end).forEach(blog => blog.style.display = 'block');
}

function handlePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const page = parseInt(button.dataset.page);
            displayBlogs(page);
        });
    });
}

function handleSearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        displayBlogs(1, searchTerm);
    });
}

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

    // Update mouse position for mouse events
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Update mouse position for touch events
    document.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling on touch
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
    }, { passive: false });

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

    // Initialize touch position on touchstart
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
    }, { passive: true });

    requestAnimationFrame(animateParticles);
}

function init() {
    displayBlogs(1);
    handlePagination();
    handleSearch();
    createMouseTrail(); // Initialize mouse trail
}

document.addEventListener('DOMContentLoaded', init);

// Note: Updated dates are hardcoded in HTML. For dynamic updates, a backend (e.g., CMS) would be needed to modify blog items or fetch from a database.