function toogleTheme(){
    document.body.classList.toggle("dark-theme");
}

const reviews = [
  {
    name: "Дмитрий, 52 года",
    text: "Честно? Я купил этот доступ, чтобы удалить из истории пару неприятных моментов из 90-х..."
  },
  {
    name: "Джонни Сильверхенд, ## лет",
    text: "Арасака пососала, благодаря РКН ELITE  "
  },
  {
    name: "ЛевРентий, 40 лет",
    text: "Давно не мог найти подобный сервис, и вот он наконец-то вышел..."
  }
];

const container = document.getElementById("reviews");
const form = document.getElementById("reviewForm");
const error = document.getElementById("error");

function renderReviews() {

  container.innerHTML = "";

  for (let review of reviews) {

    const div = document.createElement("div");
    div.className = "feedback";

    div.innerHTML = `
      <h4>${review.name}</h4>
      <p>${review.text}</p>
    `;

    container.appendChild(div);
  }
}

function sendReview(event) {

  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("text").value.trim();

  error.textContent = "";

  if (name.length < 2) {
    error.textContent = "Имя должно содержать минимум 2 символа";
    return;
  }

  if (text.length < 5) {
    error.textContent = "Отзыв должен содержать минимум 5 символов";
    return;
  }

  // добавляем отзыв в начало массива
  reviews.unshift({ name, text });

  renderReviews();

  form.reset();
}

form.addEventListener("submit", sendReview);

renderReviews();