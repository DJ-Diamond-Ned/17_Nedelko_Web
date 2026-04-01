function toogleTheme() {
    document.body.classList.toggle("dark-theme");
}

const reviews = [
    {
        name: "Дмитрий, 52 года",
        text: "Честно? Я купил этот доступ, чтобы удалить из истории пару неприятных моментов из 90-х..."
    },
    {
        name: "Джонни Сильверхенд, ## лет",
        text: "Арасака пососала, благодаря РКН ELITE"
    },
    {
        name: "ЛевРентий, 40 лет",
        text: "Давно не мог найти подобный сервис, и вот он наконец-то вышел..."
    }
];

const container = document.getElementById("reviews");
const form = document.getElementById("reviewForm");
const errorMsg = document.getElementById("error");

function renderReviews() {
    container.innerHTML = "";
    reviews.forEach(review => {
        const div = document.createElement("div");
        div.className = "feedback";
        div.innerHTML = `<h4>${review.name}</h4><p>${review.text}</p>`;
        container.appendChild(div);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const text = document.getElementById("text").value.trim();
    
    errorMsg.textContent = "";

    if (name.length < 2) {
        errorMsg.textContent = "Имя должно содержать минимум 2 символа";
        return;
    }
    if (text.length < 5) {
        errorMsg.textContent = "Отзыв должен содержать минимум 5 символов";
        return;
    }

    reviews.unshift({ name, text });
    renderReviews();
    form.reset();
});

renderReviews();