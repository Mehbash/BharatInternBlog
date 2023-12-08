document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.getElementById('posts');
    const response = await fetch('/api/posts');
    const posts = await response.json();

    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button onclick="deletePost('${post._id}')">Delete</button>
        `;
        postsContainer.appendChild(li);
    });

    const deleteAllButton = document.createElement('button');
    deleteAllButton.innerHTML = 'Delete All';
    deleteAllButton.addEventListener('click', () => deleteAllPosts());
    document.body.appendChild(deleteAllButton);
});

async function deletePost(postId) {
    await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
    window.location.reload();
}

async function deleteAllPosts() {
    const confirmation = confirm('Are you sure you want to delete all posts? This action cannot be undone.');

    if (confirmation) {
        await fetch('/api/posts', { method: 'DELETE' });
        window.location.reload();
    }
}
