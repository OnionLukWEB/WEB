// Система аутентификации модератора
document.addEventListener('DOMContentLoaded', function() {
    const moderatorLoginForm = document.getElementById('moderatorLoginForm');
    
    // Простые учетные данные для демонстрации (в реальном приложении нужна серверная аутентификация)
    const MODERATOR_CREDENTIALS = {
        login: 'moderator',
        password: 'password123'
    };
    
    moderatorLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const login = document.getElementById('moderatorLogin').value;
        const password = document.getElementById('moderatorPassword').value;
        
        if (login === MODERATOR_CREDENTIALS.login && password === MODERATOR_CREDENTIALS.password) {
            // Успешный вход
            localStorage.setItem('moderatorMode', 'true');
            activateModeratorMode();
            document.getElementById('moderatorModal').style.display = 'none';
            alert('Режим модератора активирован');
        } else {
            alert('Неверные учетные данные');
        }
        
        moderatorLoginForm.reset();
    });
    
    // Активация режима модератора
    function activateModeratorMode() {
        document.body.classList.add('moderator-mode');
        updateModeratorButton();
    }
    
    // Деактивация режима модератора
    function deactivateModeratorMode() {
        localStorage.removeItem('moderatorMode');
        document.body.classList.remove('moderator-mode');
        updateModeratorButton();
        alert('Режим модератора деактивирован');
    }
    
    // Обновление кнопки модератора
    function updateModeratorButton() {
        const isModerator = localStorage.getItem('moderatorMode') === 'true';
        const moderatorBtn = document.querySelector('.moderator-login-btn');
        
        if (moderatorBtn) {
            if (isModerator) {
                moderatorBtn.innerHTML = '<i class="fas fa-user-shield"></i> Выйти из режима модератора';
                moderatorBtn.style.backgroundColor = '#38a169'; // Зеленый для активного режима
            } else {
                moderatorBtn.innerHTML = '<i class="fas fa-user"></i> Вход для модератора';
                moderatorBtn.style.backgroundColor = 'var(--accent-color)'; // Исходный цвет
            }
        }
    }
    
    // Создание кнопки модератора
    function createModeratorButton() {
        const moderatorBtn = document.createElement('button');
        moderatorBtn.classList.add('moderator-login-btn');
        moderatorBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            color: var(--primary-color);
            border: none;
            padding: 12px 18px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        
        document.body.appendChild(moderatorBtn);
        
        // Обработчик клика для кнопки
        moderatorBtn.addEventListener('click', function() {
            const isModerator = localStorage.getItem('moderatorMode') === 'true';
            
            if (isModerator) {
                // Если уже в режиме модератора - выход
                deactivateModeratorMode();
            } else {
                // Если не в режиме модератора - показать форму входа
                document.getElementById('moderatorModal').style.display = 'block';
            }
        });
        
        updateModeratorButton();
    }
    
    // Проверка режима модератора при загрузке
    function checkModeratorMode() {
        const isModerator = localStorage.getItem('moderatorMode') === 'true';
        if (isModerator) {
            activateModeratorMode();
        }
    }
    
    // Инициализация
    createModeratorButton();
    checkModeratorMode();
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('moderatorModal')) {
            document.getElementById('moderatorModal').style.display = 'none';
        }
    });
});