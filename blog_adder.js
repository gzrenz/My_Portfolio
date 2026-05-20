// blog_adder.js
const fs = require('fs');
const path = require('path');

const mainDataPath = path.join(__dirname, 'data', 'blog_posts.json');
const newPostPath = path.join(__dirname, 'new_blog.json');

function addBlogFromFile() {
    // Check if new-blog.json exists
    if (!fs.existsSync(newPostPath)) {
        console.error("❌ 'new-blog.json' file not found in project root!");
        console.log("Please create 'new-blog.json' first.");
        return;
    }

    let newPost;
    try {
        const data = fs.readFileSync(newPostPath, 'utf8');
        newPost = JSON.parse(data);
    } catch (err) {
        console.error("❌ Error reading new-blog.json:", err.message);
        return;
    }

    // Validate required fields
    if (!newPost.title || !newPost.content) {
        console.error("❌ Error: 'title' and 'content' are required in new-blog.json");
        return;
    }

    // Read existing blog posts
    let posts = [];
    if (fs.existsSync(mainDataPath)) {
        try {
            const mainData = fs.readFileSync(mainDataPath, 'utf8');
            posts = JSON.parse(mainData);
        } catch (err) {
            console.warn("⚠️ Could not read existing blog_posts.json, starting fresh.");
        }
    }

    // Create new blog object
    const blogEntry = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        date: new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date()),
        category: (newPost.category || "General").trim()
    };

    // Add new post at the beginning
    posts.unshift(blogEntry);

    // Save to main blog_posts.json
    fs.writeFileSync(mainDataPath, JSON.stringify(posts, null, 4));

    console.log("✅ Blog post successfully added!");
    console.log(`📌 Title: ${blogEntry.title}`);
    console.log(`📌 Category: ${blogEntry.category}`);
    console.log(`📌 Total posts: ${posts.length}`);

    // Optional: Clear or archive the new-blog.json
    const clearedTemplate = {
        "title": "",
        "content": "",
        "category": "General"
    };
    fs.writeFileSync(newPostPath, JSON.stringify(clearedTemplate, null, 4));
    
    console.log("🧹 new-blog.json has been cleared for next post.");
}

addBlogFromFile();