// blog_adder.js - Run this from terminal to add new blogs
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'blog_posts.json');

function addBlog(title, content, category = "General") {
    if (!title || !content) {
        console.error("❌ Title and content are required!");
        return;
    }

    let posts = [];
    
    // Read existing posts
    if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, 'utf8');
        posts = JSON.parse(data);
    }

    const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        title: title,
        content: content,
        date: new Intl.DateTimeFormat('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(new Date()),
        category: category
    };

    posts.unshift(newPost); // Add to the beginning

    // Write back to file
    fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4));

    console.log("✅ Blog post added successfully!");
    console.log(`Title: ${title}`);
    console.log(`Category: ${category}`);
    console.log(`Total posts: ${posts.length}`);
}

// Command line usage
if (require.main === module) {
    const title = process.argv[2];
    const content = process.argv[3];
    const category = process.argv[4] || "General";

    if (!title || !content) {
        console.log("\nUsage:");
        console.log("node blog_adder.js \"Blog Title\" \"Blog content here\" \"Category\"");
        console.log("\nExample:");
        console.log('node blog_adder.js "My New Post" "This is the content of my blog..." "Career"');
    } else {
        addBlog(title, content, category);
    }
}

module.exports = { addBlog };