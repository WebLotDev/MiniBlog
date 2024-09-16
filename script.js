document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const saveButton = document.getElementById('savePost');
    const postsContainer = document.getElementById('posts');

    function renderPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <button class="remove-btn" data-index="${index}">Remove Post</button>
            `;
            postsContainer.appendChild(postElement);
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removePost(index);
            });
        });
    }

    function savePost() {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (title && content) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push({ title, content });
            localStorage.setItem('posts', JSON.stringify(posts));
            titleInput.value = '';
            contentInput.value = '';
            renderPosts();
        }
    }

    function removePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
    }

    saveButton.addEventListener('click', savePost);

    renderPosts();
});
