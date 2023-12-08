document.addEventListener('DOMContentLoaded', () => {
    const createForm = document.getElementById('create-form');
    createForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        window.location.href = '/';
    });
});
