// Tab Switching
function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('d-none');
        tab.classList.remove('active');
    });

    // Show selected tab
    const activeTab = document.getElementById(tabId);
    activeTab.classList.remove('d-none');
    activeTab.classList.add('active');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${tabId}`) {
            link.classList.add('active');
        }
    });
}

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission (replace with actual backend logic)
    alert(`Thank you, ${name}! Your message has been sent.`);
    this.reset();
});

// Sample Blog Posts
const blogPosts = [
    { title: 'My First Blog Post', content: 'Lorem ipsum, walang mailagay basta \'yan', date: '2025-04-17' },
    { title: 'Learning Bootstrap', content: 'Lorem ipsum, same dito', date: '2025-04-17' }
];

function loadBlogs() {
    const blogContainer = document.getElementById('blogPosts');
    blogContainer.innerHTML = '';
    blogPosts.forEach(post => {
        const blogCard = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.content}</p>
                    <p class="card-text"><small class="text-muted">${post.date}</small></p>
                </div>
            </div>
        `;
        blogContainer.innerHTML += blogCard;
    });
}

// Load blogs on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBlogs();
    showTab('home'); // Show home tab by default
});