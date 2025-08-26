// Основные функции сайта
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Закрытие мобильного меню при клике на ссылку
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Обработка формы консультации
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // В реальном приложении здесь был бы код для отправки данных на сервер
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            console.log('Данные формы:', formData);
            
            // Показ сообщения об успехе
            alert('Ваша заявка успешно отправлена! Я свяжусь с вами в ближайшее время.');
            consultationForm.reset();
        });
    }
    

    
    // Закрытие модального окна
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('moderatorModal').style.display = 'none';
    });
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('moderatorModal')) {
            document.getElementById('moderatorModal').style.display = 'none';
        }
    });
});