document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const cityInput = document.getElementById('city');

    const showLoading = () => {
        output.innerHTML = '<p class="loading">ЗАГРУЗКА...</p>';
    };

    // 1. ПОГОДА
    document.getElementById('api1').addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) {
            output.innerHTML = '<div class="card">ВВЕДИТЕ ГОРОД</div>';
            return;
        }
        showLoading();
        try {
            const response = await fetch(`https://wttr.in/${city}?format=j1&lang=ru`);
            const data = await response.json();
            const temp = data.current_condition[0].temp_C;
            const desc = data.current_condition[0].lang_ru[0].value;
            output.innerHTML = `
                <div class="card">
                    <h2 style="color:rgb(207, 104, 245)">${city.toUpperCase()}</h2>
                    <p>НА УЛИЦЕ: ${desc.toUpperCase()}</p>
                    <p>ТЕМПЕРАТУРА: ${temp}°C</p>
                </div>
            `;
        } catch (e) {
            output.innerHTML = '<div class="card">ОШИБКА: ГОРОД НЕ НАЙДЕН</div>';
        }
    });

    // 2. ЦИТАТА
    document.getElementById('api2').addEventListener('click', async () => {
        showLoading();
        try {
            const response = await fetch('https://raw.githubusercontent.com/dwyl/quotes/master/quotes.json');
            const data = await response.json();
            
            const randomQuote = data[Math.floor(Math.random() * data.length)];
            
            const translateRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(randomQuote.text)}&langpair=en|ru`);
            const translateData = await translateRes.json();
            const translatedText = translateData.responseData.translatedText;

            output.innerHTML = `
                <div class="card">
                    <p style="color:rgb(207, 104, 245)">"${translatedText.toUpperCase()}"</p>
                    <p>— ${randomQuote.author.toUpperCase()}</p>
                </div>
            `;
        } catch (e) {
            output.innerHTML = '<div class="card">ОШИБКА СВЯЗИ</div>';
        }
    });

    // 3. ФАКТ
    document.getElementById('api3').addEventListener('click', async () => {
        showLoading();
        try {
            const response = await fetch('https://meowfacts.herokuapp.com/?lang=rus');
            const data = await response.json();
            output.innerHTML = `
                <div class="card">
                    <h3 style="color:rgb(207, 104, 245)">ИНТЕРЕСНЫЙ ФАКТ:</h3>
                    <p>${data.data[0].toUpperCase()}</p>
                </div>
            `;
        } catch (e) {
            output.innerHTML = '<div class="card">ФАКТЫ ВРЕМЕННО НЕДОСТУПНЫ</div>';
        }
    });

    // 4. КОТИКИ
    document.getElementById('api4').addEventListener('click', async () => {
        showLoading();
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            output.innerHTML = `
                <div class="card">
                    <p>КОТ В СЕТИ:</p>
                    <img src="${data[0].url}" alt="Cat">
                </div>
            `;
        } catch (e) {
            output.innerHTML = '<div class="card">КОТ УБЕЖАЛ</div>';
        }
    });
});