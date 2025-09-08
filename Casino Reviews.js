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
    const maxParticles = 8; // Reduced for performance
    let lastParticleTime = 0;
    const particleInterval = 50; // Slightly slower spawning

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
    displayBlogs(1);
    handlePagination();
    handleSearch();
    createMouseTrail(); // Initialize mouse trail
}

document.addEventListener('DOMContentLoaded', init);

// Note: Updated dates are hardcoded in HTML. For dynamic updates, a backend (e.g., CMS) would be needed to modify blog items or fetch from a database.