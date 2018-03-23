/** Модуль для отрисовки пина и взаимодействия с ним*/

(function (){


    // Add style for "window.onload"

    let mapId = document.getElementById("map");
    let noticeId = document.getElementById("notice");
    let fieldset = document.getElementsByTagName("fieldset");
    window.mapPin = document.querySelectorAll('.map__pin');


    window.onload = function () {
        mapId.classList.add('map--faded');
        noticeId.classList.add("notice__form--disabled");
        for (let i = 0; i < fieldset.length; i++) {
            fieldset[i].setAttribute("disabled", "disabled");
        }
        mapPinHide(mapPin);
        window.mapCardHide(mapCard);
        mapPinMain.style = "display: block";
    };


    function mapPinHide(mapPin) {
        for (let i = 0; i < mapPin.length; i++) {
            // mapPin[i].style = "display: none"; - Перезапишет существующее значение style (в данном случае координаты) - использовать нельзя.
            mapPin[i].style.display = "none"; // Добавит стиль к существующему
        }
    }




    /** Remove slyle on "mouseup" for mapPinMain: */

    window.mapPinMain = document.querySelector('.map__pin--main');
    mapPinMain.addEventListener("mouseup", function () {
            mapId.classList.remove('map--faded');
            noticeId.classList.remove("notice__form--disabled");
            for (let i = 0; i < fieldset.length; i++) {
                fieldset[i].disabled = false;
            }
            mapPinShow(mapPin);
        }
    );

    function mapPinShow(mapPin) {
        for (let i = 0; i < mapPin.length; i++) {
            //mapPin[i].style = "display: block";
            mapPin[i].style.display = ""; // убирает стиль display
        }
    }






})();