// Система отзывов
document.addEventListener('DOMContentLoaded', function() {
    const reviewsList = document.querySelector('.reviews-list');
    const addReviewForm = document.getElementById('addReviewForm');
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('reviewRating');
    
    // Загрузка отзывов из localStorage
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    
    // Функция для отображения отзывов
    function displayReviews() {
        reviewsList.innerHTML = '';
        
        reviews.forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            
            // Форматирование даты
            const reviewDate = new Date(review.date);
            const formattedDate = `${reviewDate.getDate().toString().padStart(2, '0')}.${(reviewDate.getMonth() + 1).toString().padStart(2, '0')}.${reviewDate.getFullYear()}`;
            
            // Создание звезд рейтинга
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                starsHtml += `<i class="fas fa-star${i <= review.rating ? '' : '-o'}"></i>`;
            }
            
            reviewCard.innerHTML = `
                <div class="review-header">
                    <span class="review-author">${review.name}</span>
                    <span class="review-date">${formattedDate}</span>
                </div>
                <div class="review-rating">${starsHtml}</div>
                <div class="review-text">${review.text}</div>
                <div class="moderator-controls">
                    <button class="delete-btn" data-index="${index}">Удалить отзыв</button>
                </div>
            `;
            
            reviewsList.appendChild(reviewCard);
        });
        
        // Добавление обработчиков событий для кнопок удаления
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                deleteReview(index);
            });
        });
    }
    
    // Функция для добавления отзыва
    function addReview(name, rating, text) {
        const newReview = {
            name,
            rating,
            text,
            date: new Date().toISOString()
        };
        
        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        displayReviews();
    }
    
    // Функция для удаления отзыва
    function deleteReview(index) {
        reviews.splice(index, 1);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        displayReviews();
    }
    
    // Обработка выбора звезд рейтинга
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            ratingInput.value = value;
            
            stars.forEach(s => {
                const starValue = parseInt(s.getAttribute('data-value'));
                if (starValue <= value) {
                    s.classList.add('active');
                    s.innerHTML = '<i class="fas fa-star"></i>';
                } else {
                    s.classList.remove('active');
                    s.innerHTML = '<i class="far fa-star"></i>';
                }
            });
        });
    });
    
    // Обработка отправки формы отзыва
    addReviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value;
        const rating = parseInt(document.getElementById('reviewRating').value);
        const text = document.getElementById('reviewText').value;
        
        if (rating === 0) {
            alert('Пожалуйста, выберите оценку');
            return;
        }
        
        addReview(name, rating, text);
        addReviewForm.reset();
        
        // Сброс звезд
        stars.forEach(star => {
            star.classList.remove('active');
            star.innerHTML = '<i class="far fa-star"></i>';
        });
        ratingInput.value = 0;
        
        alert('Спасибо за ваш отзыв!');
    });
    
    // Проверка режима модератора
    function checkModeratorMode() {
        const isModerator = localStorage.getItem('moderatorMode') === 'true';
        if (isModerator) {
            document.body.classList.add('moderator-mode');
        }
    }
    
    // Инициализация
    displayReviews();
    checkModeratorMode();
});