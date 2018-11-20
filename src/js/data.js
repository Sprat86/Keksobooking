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
    window.mapPins = document.getElementsByClassName('map__pins');


    /** Функция создания пинов и карточек объявлений на основе массива из проекта:*/

    let projectArray = [];
    window.jointArray = [];
    window.createPinCard = function () {

        for (let i = 1; i < 9; i++) {
            let x = '1',
                y = '2';

            const checkIn = checkin[getRandomInt(0, 2)];
            const publication =
                {
                    author: {
                        avatar: "img/avatars/user0" + i + '.png'
                    },
                    offer: {
                        title: titles[i - 1],
                        address: x + '-' + y,
                        price: getRandomInt(1000, 80000),
                        type: types[getRandomInt(0, 2)],
                        rooms: getRandomInt(1, 5),
                        guests: getRandomInt(1, 10),
                        checkin: checkIn,
                        checkout: checkIn,
                        features: features.slice(Math.floor(Math.random() * ((features.length - 1) + 1))),
                        description: "",
                        photos: []
                    },
                    location: {
                        x: getRandomInt(300, 900),
                        y: getRandomInt(100, 500)
                    }
                }
            ;
            projectArray.push(publication);
            jointArray.push(publication);

            createPinsProject(projectArray);
            createCardsProject(mapEl, projectArray);
        }
    };
    createPinCard();



    /** Функция создания пина из массива по данным проекта:*/
    function createPinsProject(publicationCreatingEl) {
        for (let i = 0; i < publicationCreatingEl.length; i++) {
            let buttonMap = document.createElement("button");
            buttonMap.setAttribute('class', 'map__pin');
            buttonMap.style = "left: " + publicationCreatingEl[i].location.x + "px; top:" + publicationCreatingEl[i].location.y + "px;";
            let avatarImg = document.createElement('img');
            avatarImg.setAttribute('src', publicationCreatingEl[i].author.avatar/* + '.png'*/);
            avatarImg.setAttribute("height", "40");
            avatarImg.setAttribute("width", "40");
            avatarImg.setAttribute("draggable", "false");
            buttonMap.appendChild(avatarImg);
            mapPins[0].appendChild(buttonMap);
        }
    };


    /** Функция создания пина из отфильтрованного массива по данным проекта*/
    window.createPinsFilter = function (publicationCreatingEl) {
        publicationCreatingEl.forEach(function(item){
            let buttonMap = document.createElement("button");
            buttonMap.setAttribute('class', 'map__pin');
            buttonMap.style = "left: " + item.location.x + "px; top:" + item.location.y + "px;";
            let avatarImg = document.createElement('img');
            avatarImg.setAttribute('src', item.author.avatar/* + '.png'*/);
            avatarImg.setAttribute("height", "40");
            avatarImg.setAttribute("width", "40");
            avatarImg.setAttribute("draggable", "false");
            buttonMap.appendChild(avatarImg);
            mapPins[0].appendChild(buttonMap);
        });

    };


    /** Функция создания пина из данных бэкэнда:*/
    window.createPinsBackend = function (avatars) {
        for (let i = 0; i < avatars.length; i++) {
            let buttonMap = document.createElement("button");
            buttonMap.setAttribute('class', 'map__pin');
            buttonMap.style = "left: " + avatars[i].location.x + "px; top:" + avatars[i].location.y + "px;";

            let avatarImg = document.createElement('img');
            avatarImg.setAttribute('src', avatars[i].author.avatar);
            avatarImg.setAttribute("height", "40");
            avatarImg.setAttribute("width", "40");
            avatarImg.setAttribute("draggable", "false");
            buttonMap.appendChild(avatarImg);
            mapPins[0].appendChild(buttonMap);
        }
        createCardsBackend(mapEl, avatars);
        showCardBackend();
    };


})();