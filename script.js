// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Переключение табов меню
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Отправка формы бронирования через Formspree
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');

if (bookingForm) {
    bookingForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(bookingForm);
        try {
            const response = await fetch(bookingForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                bookingForm.style.display = 'none';
                bookingSuccess.style.display = 'block';
            } else {
                alert('Произошла ошибка при отправке.');
            }
        } catch (error) {
            alert('Ошибка сети.');
        }
    });
}

// Модальное окно галереи
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const closeModal = document.getElementsByClassName("close-modal")[0];
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.getAttribute('data-src');
        captionText.innerHTML = this.querySelector('h3').innerHTML;
    });
});

if (closeModal) {
    closeModal.addEventListener('click', () => modal.style.display = "none");
}
window.addEventListener('click', (e) => { if (e.target == modal) modal.style.display = "none"; });

// ===== 1. Мобильное гамбургер-меню =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Закрывать меню при клике на любую ссылку
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== 2. Анимация появления элементов при прокрутке =====
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});
// ===== 3. Аккордеон FAQ =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
        // Закрыть остальные открытые вопросы (опционально)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Переключить текущий
        item.classList.toggle('active');
    });
});

// ===== 4. Уведомление о Cookie =====
const cookiePopup = document.getElementById('cookiePopup');
const acceptCookie = document.getElementById('acceptCookie');

if (cookiePopup && acceptCookie) {
    // Проверим, принимал ли пользователь уже куки ранее
    if (localStorage.getItem('cookieAccepted')) {
        cookiePopup.style.display = 'none';
    }

    acceptCookie.addEventListener('click', () => {
        cookiePopup.classList.add('hide');
        localStorage.setItem('cookieAccepted', 'true');
    });
}
// ===== Переключение подвкладок Винной карты =====
const wineTabBtns = document.querySelectorAll('.wine-tab-btn');
const wineContents = document.querySelectorAll('.wine-content');

wineTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        wineTabBtns.forEach(b => b.classList.remove('active'));
        wineContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const winetabId = btn.getAttribute('data-winetab');
        document.getElementById(winetabId).classList.add('active');
    });
});