/**Модуль для отображение карточек объявлений для объявлений, загруженных из бэкэнда:*/

(function (){

    let ESC_KEYCODE = 27;
    let ENTER_KEYCODE = 13;
    window.mapCard = document.querySelectorAll('.map__card');
    window.mapPin = document.querySelectorAll('.map__pin');
    window.mapPinActive = document.getElementsByClassName('map__pin--active'); // Берём элемент с классом 'map__pin--active'. Так как он всегда на странице один,
// то и работает с ним, как с массивом с одним элементом.
    window.mapPinMain = document.querySelector('.map__pin--main');

window.showCardBackend = function () {

    let mapCard = document.querySelectorAll('.map__card');
    for (let i = 0; i < mapCard.length; i++) {
        mapCard[i].classList.add('hidden');
    }
    let mapPin = document.querySelectorAll('.map__pin');
    for (let i = 0; i < mapPin.length; i++) {
        mapPin[i].style.display = "none"; // Добавит стиль к существующему
    }
    mapPinMain.style = "display: block";


/** Применение стиля к mapPin (загруженных из бэкэнда) при клике на mapPinMain:*/
    mapPinMain.addEventListener("mouseup", function () {
        for (let i = 0; i < mapPin.length; i++) {
            mapPin[i].style.display = ""; // убирает стиль display
        }
    });


    for (let i = 1; i < mapPin.length; i++) {
        mapPin[i].addEventListener("click", function (event) {

            if (mapPinActive.length) {
                mapPinActive[0].classList.remove('map__pin--active');
            }
            mapCardHide(mapCard); // Вызываем функцию, чтобы каждый раз присваивать класс 'hidden' карточкам объявления. Тогда при удалении класса (см. выше) показывается только одна карточка.

            //mapPin[i].classList.toggle('map__pin--active'); //- добавляет/убирает класс при повторном клике на элементе.

            if (!mapPin[i].classList.contains('map__pin--active')) {
                mapPin[i].classList.add('map__pin--active');
                mapCard[i - 1].classList.remove('hidden');
            }
            document.addEventListener('keydown', function (evt) {
                if (evt.keyCode === ESC_KEYCODE || evt.keyCode === ENTER_KEYCODE) {
                    mapPin[i].classList.remove('map__pin--active');
                    mapCard[i - 1].classList.add('hidden');
                }
            });
            popupClose[i - 1].focus();
        });
    }


    /** Действия на кнопку "Крестик" в объявлении.*/
    let popupClose = document.querySelectorAll('.popup__close');
    for (let i = 0; i < popupClose.length; i++) {
        popupClose[i].addEventListener("click", function () {
            mapCard[i].classList.add('hidden');
            mapPin[i + 1].classList.remove('map__pin--active');
        });
        popupClose[i].addEventListener("keydown", function (evt) {
            if (evt.keyCode === ENTER_KEYCODE) {
                mapCard[i].classList.add('hidden');
                mapPin[i + 1].classList.remove('map__pin--active');
            }
        });
     }
};


    /** Функция, скрывающая карточки объявлений:*/
    window.mapCardHide = function (mapCard) {
        for (let i = 0; i < mapCard.length; i++) {
            mapCard[i].classList.add('hidden');
        }
    };


})();