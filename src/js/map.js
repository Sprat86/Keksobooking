
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
let mapPins = document.getElementsByClassName('map__pins');

for (let i = 1; i < 9; i++) {
    let x = '1',
        y = '2';

    const checkIn = checkin[getRandomInt(0, 2)];

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

    createElement(mapEl, publication);
    createElementArticle(mapEl, publication);
}

// Create DOM element btn_map

function createElement(mapEl, publication) {
    let buttonMap = document.createElement("btn");
    buttonMap.setAttribute('class', 'map__pin');
    buttonMap.style = "left: " + publication.location.x + "px; top:" + publication.location.y + "px;";

    let avatarImg = document.createElement('img');
    avatarImg.setAttribute('src', publication.author.avatar + '.png');
    avatarImg.setAttribute("height", "40");
    avatarImg.setAttribute("width", "40");
    avatarImg.setAttribute("draggable", "false");
    buttonMap.appendChild(avatarImg);
    mapPins[0].appendChild(buttonMap);
};

// Create DOM element notice

function createElementArticle(mapEl, publication) {
    let publicationBlock = document.createElement("article");
    publicationBlock.setAttribute('class', 'map__card');

    let title = document.createElement('h3');
    let h3 = document.createTextNode(publication.offer.title);
    title.appendChild(h3);
    publicationBlock.appendChild(title);

    let address = document.createElement('p');
    let pAddress = document.createTextNode(publication.offer.address);
    address.appendChild(pAddress);
    publicationBlock.appendChild(address);

    let price = document.createElement('p');
    let pPrice = document.createTextNode(publication.offer.price+'&#x20bd;/ночь');
    price.setAttribute('class', 'popup_price');
    price.appendChild(pPrice);
    publicationBlock.appendChild(price);

    let type = document.createElement('h4');
    let h4 = document.createTextNode(getTypeTranslation(publication.offer.type));
    type.appendChild(h4);
    publicationBlock.appendChild(type);

    let roomsGuest = document.createElement('p');
    let pRoomsGuest = document.createTextNode(publication.offer.rooms + ' комнаты для ' + publication.offer.guests + ' гостей');
    roomsGuest.appendChild(pRoomsGuest);
    publicationBlock.appendChild(roomsGuest);

    let checkInCheckOut = document.createElement('p');
    let pCheckInCheckOut = document.createTextNode('Заезд после ' + publication.offer.checkin + ' , выезд после ' + publication.offer.checkout);
    checkInCheckOut.appendChild(pCheckInCheckOut);
    publicationBlock.appendChild(checkInCheckOut);


    let features = document.createElement('ul');
    features.setAttribute('class', 'popup__features');
    for(let i = 0; i < publication.offer.features.length; i++)
    {
        let li = document.createElement('li');
        li.setAttribute('class', 'feature feature--' + publication.offer.features[i]);
        features.appendChild(li);
        publicationBlock.appendChild(features)
    }


    let description = document.createElement('p');
    let pDescription = document.createTextNode(publication.offer.description);
    description.appendChild(pDescription);
    publicationBlock.appendChild(description);


    mapEl[0].appendChild(publicationBlock);
    console.log(publication.offer.type)
}


function getTypeTranslation(type) {
    if (type === 'bungalo') {
        return 'Бунгало';
    } else if (type === 'flat') {
        return 'Квартира';
    }
    return 'Дом';
}

//let popAvatar = document.getElementById("popAvatar");
//popAvatar.src = "publication.author.avatar + '.png'";
//popAvatar.src = "img/avatars/user05.png";
//popAvatar.setAttribute('src','img/avatars/user05.png');

//window.onload = function() {
   // mapEl.setAttribute('class', 'map--faded');
    //mapEl.classList.add('map--faded');
    //mapEl.className = 'map--faded';
//};

//document.addEventListener("mapEl", function() {
    //mapEl.classList.add('map--faded');
//});


// Add style for "window.onload"
let mapId = document.getElementById ("map");
let noticeId = document.getElementById("notice");
let fieldset = document.getElementsByTagName("fieldset");
window.onload = function() {
    mapId.classList.add('map--faded');
    noticeId.classList.add("notice__form--disabled");
    for( let i = 0; i < fieldset.length; i++ ) {
        fieldset[i].setAttribute("disabled", "disabled");
        //fieldset[i].disabled = true;
        //fieldset[i].classList.add('map--faded');
    };
};


// Remove slyle for "mouseup"
let mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener("mouseup", function () {
    mapId.classList.remove('map--faded');
    noticeId.classList.remove("notice__form--disabled");
    for( let i = 0; i < fieldset.length; i++ ) {
        fieldset[i].disabled = false;
        }
});









