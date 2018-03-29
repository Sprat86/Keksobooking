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


})();