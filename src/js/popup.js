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

    addButton.addEventListener('click', createItem)

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

    var placemark = new ymaps.Placemark(obj.coords, {
        hintContent: popup.children[1].lastChild.innerHTML,
        balloonContentHeader: obj.address,
        balloonContentBodyHeader: popup.querySelectorAll('.feedback__place')[0].innerHTML,
        balloonContentBody: popup.querySelectorAll('.feedback__text')[0].innerHTML,
        balloonContentFooter: popup.querySelectorAll('.day')[0].innerHTML,

    }, {
        preset: 'islands#darkOrangeDotIcon',
        openHintOnHover: false
    });

    myMap.geoObjects.add(placemark);
    clusterer.add(placemark);

    placemark.events.add('click', () => {

        openPopup(obj, myMap, position, clusterer, placemark.properties._data.hintContent)
    })
}

export {
    openPopup
}