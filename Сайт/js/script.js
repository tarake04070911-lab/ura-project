// Переключение страниц
const pages = {
    home: document.getElementById('home-page'),
    services: document.getElementById('services-page'),
    portfolio: document.getElementById('portfolio-page'),
    about: document.getElementById('about-page'),
    contacts: document.getElementById('contacts-page')
};

const navLinks = document.querySelectorAll('.nav-link');

function showPage(pageId) {
    Object.values(pages).forEach(page => {
        page.classList.remove('active-page');
    });
    pages[pageId].classList.add('active-page');
    // Обновить активный класс в меню
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    // Прокрутка вверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        if (pageId) showPage(pageId);
        // Закрыть мобильное меню
        document.querySelector('.nav-links').classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Обработка кликов по кнопкам с data-page-link
document.querySelectorAll('[data-page-link]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = el.getAttribute('data-page-link');
        if (pageId && pages[pageId]) showPage(pageId);
    });
});

// Логотип -> на главную
document.getElementById('logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    showPage('home');
});

// Мобильное меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Форма обратной связи
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        if (name) {
            alert(`Спасибо, ${name}! Мы свяжемся с вами в ближайшее время. 🎉`);
            form.reset();
        } else {
            alert('Пожалуйста, введите ваше имя.');
        }
    });
}

// Плавное появление секций (на всех страницах)
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));