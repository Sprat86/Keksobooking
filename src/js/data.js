/** @Description of the action: Создание массива карточек объявлений mapCard: */
/** Модуль, который создает данные. */

(function () {
    const titles = [
        "Большая уютная квартира"
        , "Маленькая неуютная квартира"
        , "Огромный прекрасный дворец"
        , "Маленький ужасный дворец"
        , "Красивый гостевой домик"
        , "Некрасивый негостеприимный домик"
        , "Уютное бунгало далеко от моря"
        , "Неуютное бунгало поколено в воде"
    ];


    const types = ['flat', 'house', 'bungalo'];

    const checkin = ['12:00', '13:00', '14:00'];

    const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    window.mapEl = document.getElementsByClassName('map')[0];
    let mapPins = document.getElementsByClassName('map__pins');
    let RUBLE = '\u20bd';

    for (let i = 1; i < 9; i++) {
        let x = '1',
            y = '2';

        const checkIn = checkin[getRandomInt(0, 2)];//Передаем рандомное значение из массива checkIn (см.выше) и затем используем в переменной publication, чтобы время заезда и выезда синхронизировалось.

        let publication = {
            author: {avatar: "img/avatars/user0" + i},
            offer: {
                title: titles[i - 1],
                address: x + '-' + y,
                price: getRandomInt(1000, 1000000),
                type: types[getRandomInt(0, 2)],
                rooms: getRandomInt(1, 5),
                guests: getRandomInt(1, 10),
                checkin: checkIn,
                checkout: checkIn,
                features: features.slice(Math.floor(Math.random() * ((features.length - 1) + 1))),
                description: "Hi!",
                photos: []
            },
            location: {
                x: getRandomInt(300, 900),
                y: getRandomInt(100, 500)
            }
        };

        createElement(publication);
        createElementArticle(mapEl, publication);
    }

// Create DOM element btn_map (map pin):

    function createElement(publicationCreatingEl) { // Задаем функции параметр "publicationCreatingEl" и внутри функции работаем с этим параметром.
        let buttonMap = document.createElement("button");
        buttonMap.setAttribute('class', 'map__pin');
        buttonMap.style = "left: " + publicationCreatingEl.location.x + "px; top:" + publicationCreatingEl.location.y + "px;";

        let avatarImg = document.createElement('img');
        avatarImg.setAttribute('src', publicationCreatingEl.author.avatar + '.png');
        avatarImg.setAttribute("height", "40");
        avatarImg.setAttribute("width", "40");
        avatarImg.setAttribute("draggable", "false");
        buttonMap.appendChild(avatarImg);
        mapPins[0].appendChild(buttonMap);
    }

// Create DOM element "notice"(map card):

    function createElementArticle(mapEl, publicationCreatingElement) { // Задаем функции параметр "publicationCreatingElement" и внутри функции работаем с этим параметром.
        let publicationBlock = document.createElement("article");
        publicationBlock.setAttribute('class', 'map__card popup');

        let popupAvatar = document.createElement('img');
        popupAvatar.setAttribute('src', publicationCreatingElement.author.avatar + '.png');
        popupAvatar.setAttribute('class', 'popup__avatar');
        popupAvatar.setAttribute("height", "70");
        popupAvatar.setAttribute("width", "70");
        publicationBlock.appendChild(popupAvatar);

        let popupClose = document.createElement("button");
        popupClose.setAttribute('class', 'popup__close');
        popupClose.setAttribute('tabindex', '1');
        let popupCloseText = document.createTextNode('Закрыть');
        popupClose.appendChild(popupCloseText);
        publicationBlock.appendChild(popupClose);

        let title = document.createElement('h3');
        let h3 = document.createTextNode(publicationCreatingElement.offer.title);
        title.appendChild(h3);
        publicationBlock.appendChild(title);

        let address = document.createElement('p');
        let pAddress = document.createTextNode(publicationCreatingElement.offer.address);
        address.appendChild(pAddress);
        publicationBlock.appendChild(address);

        let price = document.createElement('p');
        let pPrice = document.createTextNode(publicationCreatingElement.offer.price + ' ' + RUBLE + '/ночь');
        price.setAttribute('class', 'popup_price');
        price.appendChild(pPrice);
        publicationBlock.appendChild(price);

        let type = document.createElement('h4');
        let h4 = document.createTextNode(getTypeTranslation(publicationCreatingElement.offer.type));
        type.appendChild(h4);
        publicationBlock.appendChild(type);

        let roomsGuest = document.createElement('p');
        let pRoomsGuest = document.createTextNode(publicationCreatingElement.offer.rooms + ' комнаты для ' + publicationCreatingElement.offer.guests + ' гостей');
        roomsGuest.appendChild(pRoomsGuest);
        publicationBlock.appendChild(roomsGuest);

        let checkInCheckOut = document.createElement('p');
        let pCheckInCheckOut = document.createTextNode('Заезд после ' + publicationCreatingElement.offer.checkin + ' , выезд после ' + publicationCreatingElement.offer.checkout);
        checkInCheckOut.appendChild(pCheckInCheckOut);
        publicationBlock.appendChild(checkInCheckOut);


        let features = document.createElement('ul');
        features.setAttribute('class', 'popup__features');
        for (let i = 0; i < publicationCreatingElement.offer.features.length; i++) {
            let li = document.createElement('li');
            li.setAttribute('class', 'feature feature--' + publicationCreatingElement.offer.features[i]);
            features.appendChild(li);
            publicationBlock.appendChild(features)
        }


        let description = document.createElement('p');
        let pDescription = document.createTextNode(publicationCreatingElement.offer.description);
        description.appendChild(pDescription);
        publicationBlock.appendChild(description);


        mapEl.appendChild(publicationBlock);
        console.log(publicationCreatingElement.offer.type)
    }


    function getTypeTranslation(type) {
        if (type === 'bungalo') {
            return 'Бунгало';
        } else if (type === 'flat') {
            return 'Квартира';
        }
        return 'Дом';
    }

})();