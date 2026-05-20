let blog_posts = [];

// Load blogs from JSON
async function loadBlogPosts() {
    try {
        const response = await fetch('data/blog_posts.json');
        blog_posts = await response.json();
    } catch (error) {
        console.error("Failed to load blog posts:", error);
        blog_posts = [];
    }
}

// Make it available globally
window.blog_posts = blog_posts;
window.loadBlogPosts = loadBlogPosts;