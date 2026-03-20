let editMode = false;

class Card {
    constructor(image, title, aura) {
        this.image = image;
        this.title = title;
        this.aura = aura;
    }

    renderHTML() {
        return `<div class="card">Карточка</div>`;
    }
}

class TeacherCard extends Card {
    constructor(image, name, age, aura, exp, loyalty, subject, danger, quality ) {
        super(image, name, aura);

        this.age = age;
        this.exp = exp;
        this.loyalty = loyalty;
        this.subject = subject;
        this.danger = danger;
        this.quality = quality;
        
    }

    renderHTML(index) {
        return `
        <div class="card">
            <h1>WANTED</h1>

            <img src="${this.image}" alt="photo">

            <h2>${this.title}</h2>

            <p>Возраст: ${this.age}</p>
            <p>Аура: ${this.aura}</p>
            <p>Опыт общения: ${this.exp}</p>
            <p>Лояльность: ${this.loyalty}</p>
            <p>Предмет: ${this.subject}</p>
            <p>Степень опасности: ${this.danger}</p>
            <p class="reward">Награда: ${this.quality}$</p>

            ${editMode ? `<button onclick="editCard(${index})">Редактировать</button>` : ""}
        </div>
        `;
    }


    conductControl() {
        console.log(`${this.title} проводит контрольную`);
    }

    
    checkControl() {
        console.log(`${this.title} проверяет контрольную`);
    }

    setScore() {
        console.log(`${this.title} поставил автомат`);
    }

    failTest() {
        console.log(`${this.title} завалил на зачёте`);
    }

    helpAssessment() {
        console.log(`${this.title} вытянул на зачёте`);
    }
}

const cards = [
    new TeacherCard(
        "resourses/sidorenko.jpg",
        "Сидоренко Н.В.",
        23,
        300,
        70,
        90,
        "Веб-программирование",
        "Особо опасен!",
        100000
    ),

    new TeacherCard(
        "resourses/lebedev.jpg",
        "Лебедев Д.А.",
        30,
        "∞",
        90,
        70,
        "Органическая химия/Виртуальный химический практикум/Основы алгоритмизации и программирование/Основы информационных систем",
        "Особо опасен!",
        "1000000 Гвоздей"
    ),

    new TeacherCard(
        "resourses/dudarov.jpg",
        "Дударов С.П.",
        52,
        "∞",
        70,
        80,
        "Алгоритмы вычислительной математики",
        "Особо опасен!",
        100000
    ),

    new TeacherCard(
        "resourses/nedelko.jpg",
        "Неделько Д.О.",
        19,
        100,
        100,
        100,
        "Студент РХТУ",
        "Достаточно опасный",
        10000
    ),

    new TeacherCard(
        "resourses/ovchinnikov.jpg",
        "Овчинников Л.Д.",
        19,
        200,
        100,
        -10000,
        "Студент Политеха",
        "Не то что бы опасен",
        "Пачка сухариков"
    ),

    new TeacherCard(
        "resourses/kirillovM.jpg",
        "Бледный К.А.",
        9,
        40,
        8,
        "2к15",
        "Студент РХТУ",
        "ааээа",
        "10000"
    ),

    new TeacherCard(
        "resourses/kumanyaeva.jpg",
        "Куманяева Т.А.",
        19,
        228,
        "Социально недоразвита",
        100,
        "Студент РХТУ",
        "Голландский штурвал",
        "1 чизбургер и флеш золотой"
    ),

    new TeacherCard(
        "resourses/riger.jpg",
        "Ригер Т.В.",
        "Неизвестно",
        400,
        100,
        70,
        "Математика",
        "Для своих не опасна",
        "10^e+5"
    ),

    new TeacherCard(
        "resourses/bazchutina.jpg",
        "Бажутина Е.Е.",
        19,
        100,
        100,
        70,
        "Студент РХТУ",
        "Для своих не опасна",
        10000
    ),

    new TeacherCard(
        "resourses/plotnikova.jpg",
        "Плотникова Ю.А.",
        "Неизвестно",
        200,
        500,
        200,
        "Математика",
        "Не опасна",
        100000
    ),

    new TeacherCard(
        "resourses/ustinov.jpg",
        "Устинов И.Е.",
        19,
        100,
        100,
        60,
        "Студент РХТУ",
        "Ларик",
        10000
    ),

    
    
];

function renderPage() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    cards.forEach((card, index) => {
        app.innerHTML += card.renderHTML(index);
    });
}

function toggleEdit() {
    editMode = !editMode;
    renderPage();
}

function editCard(index) {
    let newName = prompt("Введите ФИО:", cards[index].title);
    let newAura = prompt("Введите ауру (0-100):", cards[index].aura);

    if (newName !== null) cards[index].title = newName;
    if (newAura !== null) cards[index].aura = Number(newAura);

    renderPage();
}


renderPage();