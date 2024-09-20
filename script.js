document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const content = document.getElementById('postContent').value;
    const image = document.getElementById('postImage').files[0];
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
        formData.append('image', image);
    }

    fetch('https://your-app.herokuapp.com/post', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `<p>${data.content}</p>`;
        if (data.image) {
            const img = document.createElement('img');
            img.src = data.image;
            post.appendChild(img);
        }
        document.getElementById('posts').appendChild(post);
    })
    .catch(error => console.error('Error:', error));
});