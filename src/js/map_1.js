/** Модуль, который работает с картой. */

(function () {

    /** @Description of the action: Добавление реакции на перемещение (drag) пина текущего заполняемого объявления mapPinMain: */

    let filtersContainer = document.querySelector('.map__filters-container');
    let mapPinMainSize = {
        HEIGHT: 87,
        WIDTH: 65
    };

    let mapBordersCoordinates = {
        top: mapEl.offsetTop + 100,
        right: mapEl.offsetWidth + mapPinMainSize.WIDTH / 2,
        bottom: mapEl.offsetHeight - filtersContainer.offsetHeight,
        left: mapPinMainSize.WIDTH / 2
    };

    mapPinMain.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        let startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        /** Функция перемещения. */
        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();

            let shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };


            /** Функция, ограничивающая перемещение объекта mapPinMain в пределах карты mapEl:*/
            function onDrag(evt) {
                if (mapPinMain.offsetLeft - shift.x >= mapBordersCoordinates.left && mapPinMain.offsetLeft - shift.x <= mapBordersCoordinates.right - mapPinMain.offsetWidth) {
                    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
                }
                if (mapPinMain.offsetTop - shift.y >= mapBordersCoordinates.top && mapPinMain.offsetTop - shift.y <= mapBordersCoordinates.bottom - mapPinMain.offsetHeight) {
                    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
                }

            };


            /** Функция добавления координат метки mapPinsMain в поле Address:
             * внутри функции onMouseMove(moveEvt), потому что переменная shift объявлена локально. Вне пределов этой функции ее не будет видно. */
            let xAddress = mapPinMain.offsetLeft - shift.x;
            let yAddress = mapPinMain.offsetTop - shift.y;

            function refreshAddress() {
                addressForm.value = 'x: ' + xAddress + ', y: ' + yAddress;
            };
            onDrag(evt);
            refreshAddress();
        };


        /** Функция нужна для того, чтобы перетаскивание закончилось при отжатии клавиши мыши. Иначе объект "не отвяжется" от курсора и будет его "преследовать". */
        function onMouseUp(upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

})();

