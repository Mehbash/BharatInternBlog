document.addEventListener('DOMContentLoaded', async () => {
    const postIdInput = document.getElementById('postId');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const response = await fetch(`/api/posts/${postId}`);
    const post = await response.json();

    postIdInput.value = post._id;
    titleInput.value = post.title;
    contentInput.value = post.content;

    const editForm = document.getElementById('edit-form');
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const updatedTitle = titleInput.value;
        const updatedContent = contentInput.value;

        await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
        });

        window.location.href = '/';
    });
});
