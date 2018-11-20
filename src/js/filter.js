/** Модуль фильтрации объявлений по запросу пользователя*/

(function () {

    let housingType = document.querySelector('#housing-type');
    let housingPrice = document.querySelector('#housing-price');
    let housingRooms = document.querySelector('#housing-rooms');
    let housingGuests = document.querySelector('#housing-guests');
    let housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));
    let mapEl = document.getElementsByClassName('map')[0];
    let housingFeaturesValue = document.querySelector('#housing-features');


    /** Фильтрация объявлений по типу жилья:*/
    window.housingTypeArray = function (avatar) {
        let valueType = housingType.value;
        if (valueType === 'any') {
            return avatar.offer.type;
        } else if (valueType === valueType) {
            return avatar.offer.type === valueType;
        }
    };

    /** Фильтрация объявлений по цене: */
    window.housingPriceArray = function (avatar) {
        let valuePrice = housingPrice.value;
        switch (valuePrice) {
            case 'any':
                return true;
            case 'middle':
                return avatar.offer.price >= 10000 && avatar.offer.price <= 50000;
            case 'low':
                return avatar.offer.price < 10000;
            case 'high':
                return avatar.offer.price > 50000;
        }
    };

    /** Фильтрация объявлений по количеству комнат: */
    window.housingRoomsArray = function (avatar) {
        let valueRooms = housingRooms.value;
        switch (valueRooms) {
            case 'any':
                return true;
            case '1':
                return avatar.offer.rooms === 1;
            case '2':
                return avatar.offer.rooms === 2;
            case '3':
                return avatar.offer.rooms === 3;
        }
    };

    /** Фильтрация объявлений по числу гостей:*/
    window.housingGuestsArray = function (avatar) {
        let valueGuests = housingGuests.value;
        switch (valueGuests) {
            case 'any':
                return true;
            case '1':
                return avatar.offer.guests === 1;
            case '2':
                return avatar.offer.guests === 2;
        }
    };


    /** Фильтрация объявлений по опциям (features):*/
    window.housingFeaturesArray = function (avatar) {
        let checkedElements = housingFeaturesValue.querySelectorAll('input[type="checkbox"]:checked');
        let selectedFeatures = [].map.call(checkedElements, function (item) {
            return item.value;
        });
        return selectedFeatures.every(function (currentFeature) {
            return avatar.offer.features.includes(currentFeature);
        });
    };


    let sortedArray;

    /**Функция - callback для "слушателя".*/
    let filteredArrayFunc = function () {
        let mapPin = document.querySelectorAll('.map__pin');
        mapPinHide(mapPin);
        mapPinMain.style = "display: block";

        sortedArray = jointArray.filter(housingTypeArray).filter(housingPriceArray).filter(housingRoomsArray).filter(housingGuestsArray).filter(housingFeaturesArray);

        console.log(sortedArray);
        createPinsFilter(sortedArray);
        createCardsBackend(mapEl, sortedArray);

        let mapCard = document.querySelectorAll('.map__card');
        mapCardHide(mapCard);

        mapPinAction();

    };

    housingType.addEventListener('change', filteredArrayFunc);
    housingPrice.addEventListener('change', filteredArrayFunc);
    housingRooms.addEventListener('change', filteredArrayFunc);
    housingGuests.addEventListener('change', filteredArrayFunc);
    housingFeaturesValue.addEventListener('change', filteredArrayFunc);



})();