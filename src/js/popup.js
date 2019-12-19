import render from './../templates/popup.hbs';

var feedbackArray = [];

function openPopup(obj, myMap, position, clusterer, hintContent) {
    var popup = document.querySelector('.popup');

    popup.style.display = 'block';
    popup.innerHTML = render();
    popup.style.position = 'absolute';
    popup.style.top = position[1] + 'px';
    popup.style.left = position[0] + 'px';

    addFeedback(obj, myMap, position, clusterer, popup, hintContent);

    closePopup(popup);
}

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
        if (inputName.value && inputPlace.value && inputText.value) {
            var feedbackItem = document.createElement('li');

            var name = document.createElement('div');
            var place = document.createElement('div');
            var text = document.createElement('div');
            var day = document.createElement('div');
            var row = document.createElement('div');

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

            row.appendChild(name);
            row.appendChild(place);
            row.appendChild(day);

            feedbackItem.appendChild(row);
            feedbackItem.appendChild(text);

            feedbacks.appendChild(feedbackItem);

            placemarks(obj, myMap, position, clusterer, popup);
            feedbackArray.push(feedback);
        } else {
            alert('Заполните все поля!')
        }
    })
}

function placemarks(obj, myMap, position, clusterer, popup) {
    var placemark = new ymaps.Placemark(obj.coords, {
        hintContent: popup.children[1].lastChild.innerHTML,
        balloonContent: obj.address + popup.children[1].lastChild.innerHTML
    }, {
        preset: 'islands#darkOrangeDotIcon',
        openHintOnHover: false
    });

    myMap.geoObjects.add(placemark);
    clusterer.add(placemark);

    placemark.events.add('click', () => {
        openPopup(obj, myMap, position, clusterer);
    })
}

function closePopup(popup) {
    var closeButton = document.querySelector('.header__close');

    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
        popup.innerHTML = '';
    })
}

export {
    openPopup
}