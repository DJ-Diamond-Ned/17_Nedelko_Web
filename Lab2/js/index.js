function toogleTheme(){
    document.body.classList.toggle("dark-theme");
}

const reviews = [
  {
    name: "Дмитрий, 52 года",
    text: "Честно? Я купил этот доступ, чтобы удалить из истории пару неприятных моментов из 90-х..."
  },
  {
    name: "Иван, 45 лет",
    text: "Раньше я пользовался обычными VPN, чтобы читать западные СМИ..."
  },
  {
    name: "ЛевРентий, 40 лет",
    text: "Давно не мог найти подобный сервис, и вот он наконец-то вышел..."
  }
];

const container = document.getElementById("reviews");
const form = document.getElementById("reviewForm");
const error = document.getElementById("error");

// Функция отображения отзывов
function renderReviews() {
  container.innerHTML = "";
  reviews.forEach(review => {
    const div = document.createElement("div");
    div.classList.add("feedback");
    div.innerHTML = `
      <h4>${review.name}</h4>
      <p>${review.text}</p>
    `;
    container.appendChild(div);
  });
}

// Первичная отрисовка отзывов
renderReviews();

// Обработка отправки формы
form.addEventListener("submit", function(e) {
  e.preventDefault();

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

  reviews.push({ name, text });
  renderReviews();
  form.reset();
});