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

let mapEl = document.getElementsByClassName('map');

    for (let i = 1; i < 9; i++) {
    let x = '1',
        y = '2';

    const checkIn = checkin[getRandomInt(0, 2)];

    let myObj = {
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
            description: "",
            photos: []
        },
        location: {
            x: getRandomInt(300, 900),
            y: getRandomInt(100, 500)
        }
    };
    createElement(mapEl, myObj)
}


function createElement(mapEl, publication) {
    let btn_map = document.createElement("btn");
    btn_map.setAttribute('class', 'map__pin');
    btn_map.style = "left: " + publication.location.x + "px; top:" + publication.location.y + "px;";

    let avatarImg = document.createElement('img');
    avatarImg.setAttribute('src', publication.author.avatar + '.png');
    avatarImg.setAttribute("height", "40");
    avatarImg.setAttribute("width", "40");
    avatarImg.setAttribute("draggable", "false");
    btn_map.appendChild(avatarImg);
    mapEl[0].appendChild(btn_map);
}

