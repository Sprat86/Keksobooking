/** Модуль для отрисовки пина и взаимодействия с ним*/

(function () {


    let mapId = document.getElementById("map");
    let noticeId = document.getElementById("notice");
    let fieldset = document.getElementsByTagName("fieldset");


    /** Применение стилей при загрузке страницы: */
    document.addEventListener("DOMContentLoaded", function () {
        mapId.classList.add('map--faded');
        noticeId.classList.add("notice__form--disabled");
        for (let i = 0; i < fieldset.length; i++) {
            fieldset[i].setAttribute("disabled", "disabled");
        }
        mapPinHide(mapPin);
        mapCardHide(mapCard);
        mapPinMain.style = "display: block";
        download(createPins, window.popup.errorHandler);
    });

/** Функция, скрывающая пины объявлений:*/
    function mapPinHide(mapPin) {
        for (let i = 0; i < mapPin.length; i++) {
            // mapPin[i].style = "display: none"; - Перезапишет существующее значение style (в данном случае координаты) - использовать нельзя.
            mapPin[i].style.display = "none"; // Добавит стиль к существующему
        }
    }

    /** Функция, показывающая пины объявлений:*/
    function mapPinShow(mapPin) {
        for (let i = 0; i < mapPin.length; i++) {
            mapPin[i].style.display = ""; // убирает стиль display
        }
    }

    /** Применение стилей при клике на mapPinMain (созданных из массива): */
    window.mapPinMain = document.querySelector('.map__pin--main');
    mapPinMain.addEventListener("mouseup", function () {
        mapId.classList.remove('map--faded');
        noticeId.classList.remove("notice__form--disabled");
        for (let i = 0; i < fieldset.length; i++) {
            fieldset[i].disabled = false;
        }
        mapPinShow(mapPin);
    });


})();