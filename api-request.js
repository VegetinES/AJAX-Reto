$(document).ready(function() {
    const postsContainer = $('#posts');
    const loadingIndicator = $('#loading');
    const errorContainer = $('#error');
    const loadButton = $('#loadPosts');

    function showLoading() {
        loadingIndicator.show();
        errorContainer.hide();
        loadButton.prop('disabled', true);
    }

    function hideLoading() {
        loadingIndicator.hide();
        loadButton.prop('disabled', false);
    }

    function showError(message) {
        errorContainer.text(message).show();
    }

    function createPostElement(post) {
        return `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </div>
        `;
    }

    function loadPosts() {
        showLoading();

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            success: function(posts) {
                postsContainer.empty();
                posts.forEach(post => {
                    postsContainer.append(createPostElement(post));
                });
            },
            error: function(xhr, status, error) {
                showError('Error al cargar los posts: ' + error);
            },
            complete: function() {
                hideLoading();
            }
        });
    }

    loadButton.on('click', loadPosts);
});
