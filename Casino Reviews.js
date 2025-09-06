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

function init() {
    displayBlogs(1);
    handlePagination();
    handleSearch();
}

document.addEventListener('DOMContentLoaded', init);

// Note: Updated dates are hardcoded in HTML. For dynamic updates, a backend (e.g., CMS) would be needed to modify blog items or fetch from a database.