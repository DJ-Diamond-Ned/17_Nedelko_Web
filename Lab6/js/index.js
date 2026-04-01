document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const userInput = document.getElementById('userInput');
    
    let localPosts = [];

    const showLoading = () => {
        output.innerHTML = '<p class="loading">ЗАГРУЗКА...</p>';
    };

    document.getElementById('api-weather').addEventListener('click', async () => {
        const city = userInput.value.trim() || 'Moscow';
        showLoading();
        try {
            const response = await fetch(`https://wttr.in/${city}?format=j1&lang=ru`);
            const data = await response.json();
            output.innerHTML = `
                <div class="card">
                    <h2>${city.toUpperCase()}</h2>
                    <p>ГРАДУСЫ: ${data.current_condition[0].temp_C}°C</p>
                    <p>НЕБО: ${data.current_condition[0].lang_ru[0].value.toUpperCase()}</p>
                </div>
            `;
        } catch (e) { output.innerHTML = '<div class="card">ОШИБКА ГОРОДА</div>'; }
    });

    document.getElementById('api-cats').addEventListener('click', async () => {
        showLoading();
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            output.innerHTML = `<div class="card"><p>КОТ В СЕТИ:</p><img src="${data[0].url}"></div>`;
        } catch (e) { output.innerHTML = '<div class="card">КОТ УБЕЖАЛ</div>'; }
    });

    document.getElementById('api-posts').addEventListener('click', () => {
        renderBlog();
    });

    function renderBlog() {
        output.innerHTML = `
            <div class="card">
                <h2 class="blog-main-title">МОЙ БЛОГ</h2>
                <button class="header_button" id="btn-add">+ СОЗДАТЬ ПОСТ</button>
                <p class="helper-text">ДЛЯ СОЗДАНИЯ ИЛИ ИЗМЕНЕНИЯ ИСПОЛЬЗУЙТЕ ПОЛЕ В ШАПКЕ</p>
            </div>
            <div id="blog-list" class="blog-container"></div>
        `;

        const blogList = document.getElementById('blog-list');

        if (localPosts.length === 0) {
            blogList.innerHTML = '<p class="empty-text">СПИСОК ПУСТ</p>';
        }

        localPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'card';
            postCard.style.marginBottom = '15px';
            
            postCard.innerHTML = `
                <h3 class="post-title">${post.title.toUpperCase()}</h3>
                <div class="card-actions">
                    <button class="header_button btn-small btn-update" onclick="updatePost(${post.id})">ИЗМЕНИТЬ (PUT)</button>
                    <button class="header_button btn-small btn-delete" onclick="deletePost(${post.id})">УДАЛИТЬ (DEL)</button>
                </div>
            `;
            blogList.appendChild(postCard);
        });

        document.getElementById('btn-add').onclick = createPost;
    }

    async function createPost() {
        const title = userInput.value.trim() || "БЕЗ НАЗВАНИЯ";
        showLoading();
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({ title, userId: 1 }),
                headers: { 'Content-type': 'application/json' }
            });
            const newPost = await res.json();
            newPost.id = Date.now(); 
            localPosts.unshift(newPost);
            userInput.value = "";
            renderBlog();
        } catch (e) { alert("ОШИБКА POST"); renderBlog(); }
    }

    window.updatePost = async (id) => {
        const newTitle = userInput.value.trim();
        if (!newTitle) {
            alert("СНАЧАЛА ВВЕДИТЕ ТЕКСТ В ПОЛЕ В ШАПКЕ!");
            return;
        }

        showLoading();
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
                method: 'PUT',
                body: JSON.stringify({ id, title: newTitle.toUpperCase(), userId: 1 }),
                headers: { 'Content-type': 'application/json' }
            });
            const updatedData = await res.json();
            localPosts = localPosts.map(p => p.id === id ? { ...p, title: updatedData.title } : p);
            userInput.value = ""; 
            renderBlog();
        } catch (e) { alert("ОШИБКА PUT"); renderBlog(); }
    };

    window.deletePost = async (id) => {
        showLoading();
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
                method: 'DELETE'
            });
            if (res.ok) {
                localPosts = localPosts.filter(p => p.id !== id);
                renderBlog();
            }
        } catch (e) {
            alert("ОШИБКА ПРИ УДАЛЕНИИ");
            renderBlog();
        }
    };
});