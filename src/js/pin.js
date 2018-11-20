/** Модуль для отрисовки пина и взаимодействия с ним*/

(function () {


    window.mapId = document.getElementById("map");
    window.noticeId = document.getElementById("notice");
    window.fieldset = document.getElementsByTagName("fieldset");
    window.mapPinMain = document.querySelector('.map__pin--main');

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

        download(createPinsBackend, window.popup.errorHandler);
    });

    /** Функция, скрывающая пины объявлений:*/
    window.mapPinHide = function (mapPin) {
        for (let i = 0; i < mapPin.length; i++) {
            mapPin[i].style.display = "none";
        }
    };

    /** Функция, показывающая пины объявлений:*/
    window.mapPinShow = function (mapPin) {
        for (let i = 0; i < mapPin.length; i++) {
            mapPin[i].style.display = "";
        }
    };


})();