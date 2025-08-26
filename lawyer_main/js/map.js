// Инициализация карты
document.addEventListener('DOMContentLoaded', function() {
    // В реальном приложении здесь был бы код для инициализации карты (Яндекс.Карты или Google Maps)
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Заглушка для карты
        mapContainer.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #eee;">
                <div style="text-align: center;">
                    <i class="fas fa-map-marker-alt" style="font-size: 3rem; color: #1a365d; margin-bottom: 1rem;"></i>
                    <p>г. Москва, ул. Правды, д. 24, офис 305</p>
                    <p style="font-size: 0.9rem; color: #666; margin-top: 1rem;">Здесь будет карта</p>
                </div>
            </div>
        `;
        
        // В реальном приложении:
        // ymaps.ready(init);
        // function init() {
        //     var myMap = new ymaps.Map("map", {
        //         center: [55.76, 37.64],
        //         zoom: 15
        //     });
        // }
    }
});