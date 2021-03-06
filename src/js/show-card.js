/** Модуль показывает карточку выбранного жилья по нажатию на метку на карте */

(function (){

    /** Show/hide mapCard (notice): */

    let ESC_KEYCODE = 27;
    let ENTER_KEYCODE = 13;
    window.mapCard = document.querySelectorAll('.map__card');
    window.mapPin = document.querySelectorAll('.map__pin');
    window.mapPinActive = document.getElementsByClassName('map__pin--active');


        for (let i = 1; i < mapPin.length; i++) {
            mapPin[i].addEventListener("click", function (event) {

                if (mapPinActive.length) {
                    mapPinActive[0].classList.remove('map__pin--active');
                }
                mapCardHide(mapCard);
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


    window.mapCardHide = function (mapCard) {
        for (let i = 0; i < mapCard.length; i++) {
            mapCard[i].classList.add('hidden');
        }
    };

    function mapCardShow(mapCard) {
        for (let i = 0; i < mapCard.length; i++) {
            mapCard[i].classList.remove('hidden');
        }
    };




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

})();
