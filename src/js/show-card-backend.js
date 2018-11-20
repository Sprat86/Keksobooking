/**Модуль для отображение карточек объявлений для объявлений, загруженных из бэкэнда:*/

(function () {

    let ESC_KEYCODE = 27;
    let ENTER_KEYCODE = 13;
    window.mapCard = document.querySelectorAll('.map__card');
    window.mapPin = document.querySelectorAll('.map__pin');
    window.mapPinActive = document.getElementsByClassName('map__pin--active');

    window.showCardBackend = function () {
        let mapCard = document.querySelectorAll('.map__card');
        let mapPin = document.querySelectorAll('.map__pin');

        mapCardHide(mapCard);
        mapPinHide(mapPin);
        mapPinMain.style = "display: block";

        mapPinAction();

        /** Применение стилей к загруженной странице при клике на mapPinMain:*/

        let mapPinMainListener = function () {
            mapPinShow(mapPin);
            mapId.classList.remove('map--faded');
            noticeId.classList.remove("notice__form--disabled");
            for (let i = 0; i < fieldset.length; i++) {
                fieldset[i].disabled = false;
            }
            mapPinMain.removeEventListener('click', mapPinMainListener);
        };
        mapPinMain.addEventListener('click', mapPinMainListener);

    };



    /** При клике делает пин активным, убирает выделение c предыдущего пина, открывает карточку объявления mapCard:*/
    window.mapPinAction = function () {
        let mapPin = document.querySelectorAll('.map__pin');
        let mapPinActive = document.getElementsByClassName('map__pin--active');
        let mapCard = document.querySelectorAll('.map__card');

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