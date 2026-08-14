window.blog_posts = [];

// Load blog posts from JSON
async function loadBlogPosts() {
    try {
        const response = await fetch('data/blog_posts.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        window.blog_posts = await response.json();
        console.log(`✅ Loaded ${window.blog_posts.length} blog posts`);
    } catch (error) {
        console.error("❌ Failed to load blog posts:", error);
        window.blog_posts = [];
    }
}

function loadBlogs() {
    const container = document.getElementById('blogPosts');
    if (!container) {
        console.error("❌ Element with id='blogPosts' not found!");
        return;
    }

    container.innerHTML = '';

    if (window.blog_posts.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                No blog posts found yet.
            </div>`;
        return;
    }

    window.blog_posts.forEach(post => {
        const formattedContent = post.content
        .replace(/\n/g, '<br>')
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');  // or '&emsp;' etc.


        const card = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${formattedContent}</p>
                    <p class="card-text">
                        <small class="text-muted">${post.date} • ${post.category || 'General'}</small>
                    </p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Tab Switching
function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('d-none');
        tab.classList.remove('active');
    });

    // Show selected tab
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.classList.remove('d-none');
        activeTab.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${tabId}`);
    });

    // Refresh blogs when switching to blog tab
    if (tabId === 'blog' && window.blog_posts.length === 0) {
        loadBlogs();
    }
}

// Contact Form
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert("Please enter your name.");
        return;
    }
    alert(`Thank you, ${name}! Your message has been sent.`);
    this.reset();
});

// Initialize everything
document.addEventListener('DOMContentLoaded', async () => {
    await loadBlogPosts();   // Wait for blogs to load
    loadBlogs();             // Load blogs on home or initial page
    showTab('home');         // Show home tab by default
});