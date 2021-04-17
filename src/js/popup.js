import render from './../templates/popup.hbs';

var feedbackArray = [];
var popup = document.querySelector('.popup');

function addFeedback(obj, myMap, position, clusterer, popup, hintContent) {
    var inputName = document.querySelector('.form__name');
    var inputPlace = document.querySelector('.form__place');
    var inputText = document.querySelector('.form__text');
    var addButton = document.querySelector('.footer__add-btn')

    var headerAddress = document.querySelector('.header__address-text');

    headerAddress.innerHTML = obj.address;

    var feedbacks = document.querySelector('.feedbacks');
    var feedbackItem = document.createElement('li');

    feedbackItem.classList.add('feedback');
    feedbackItem.innerHTML = hintContent;
    feedbacks.appendChild(feedbackItem);

    addButton.addEventListener('click', () => {
        createItem()
    })

    function createItem() {
        if (inputName.value && inputPlace.value && inputText.value) {
            var feedbackItem = document.createElement('li');
            var row = document.createElement('div');
            var name = document.createElement('div');
            var place = document.createElement('div');
            var text = document.createElement('div');
            var day = document.createElement('div');


            name.innerHTML = inputName.value;
            place.innerHTML = inputPlace.value;
            text.innerHTML = inputText.value;

            var date = new Date();

            day.innerHTML = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

            feedbackItem.classList.add('feedback');
            name.classList.add('feedback__name');
            place.classList.add('feedback__place');
            text.classList.add('feedback__text');
            row.classList.add('feedback__row');
            day.classList.add('day')

            row.appendChild(name);
            row.appendChild(place);
            row.appendChild(day);

            feedbackItem.appendChild(row);
            feedbackItem.appendChild(text);

            feedbacks.appendChild(feedbackItem);

            placemarkContent(obj, myMap, position, clusterer, popup);
            feedbackArray.push(feedbackItem);

            closePopup();
        } else {
            alert('Заполните все поля!')
        }
    }
}


function openPopup(obj, myMap, position, clusterer, hintContent) {

    popup.style.display = 'block';
    popup.innerHTML = render();
    popup.style.position = 'absolute';
    popup.style.top = position[1] + 'px';
    popup.style.left = position[0] + 'px';
    var closeButton = document.querySelector('.header__close');
    addFeedback(obj, myMap, position, clusterer, popup, hintContent);
    closeButton.addEventListener('click', closePopup)
}

function closePopup(clusterer) {
    popup.style.display = 'none';
    popup.innerHTML = '';
}

function placemarkContent(obj, myMap, position, clusterer, popup) {
    let feedbackPlace = popup.querySelectorAll('.feedback__place')
    let feedbackText = popup.querySelectorAll('.feedback__text')
    let day = popup.querySelectorAll('.day')
    for (let i of feedbackPlace) {
        var p = i.innerHTML
    }
    for (let i of feedbackText) {
        var t = i.innerHTML
    }
    for (let i of day) {
        var d = i.innerHTML
    }
    var placemark = new ymaps.Placemark(obj.coords, {
        hintContent: popup.children[1].lastChild.innerHTML,
        balloonContentHeader: obj.address,
        balloonContentBodyHeader: p,
        balloonContentBody: t,
        balloonContentFooter: d,
    }, {
        preset: 'islands#darkOrangeDotIcon',
        openHintOnHover: false
    });
    console.log(popup.children[1]);
    console.log(popup);


    myMap.geoObjects.add(placemark);
    clusterer.add(placemark);

    placemark.events.add('click', () => {
        openPopup(obj, myMap, position, clusterer, placemark.properties._data.hintContent)
    })
}


export {
    openPopup
}