import { openPopup } from './../js/popup';

function mapInit() {
    ymaps.ready(() => {
        var myMap = new ymaps.Map('map', {
            center: [55.74954, 37.621587],
            zoom: 13,
            controls: ['zoomControl'],
            behaviors: ['drag', 'dblClickZoom', 'scrollZoom']
        }, {
            searchControlProvider: 'yandex#search',
            geoObjectOpenBalloonOnClick: false
        });

        var clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedDarkOrangeClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true,
            groupByCoordinates: false,
            clusterBalloonContentLayout: 'cluster#balloonCarousel'
        });

        myMap.geoObjects.add(clusterer);

        myMap.events.add('click', function(e) {
            var coords = e.get('coords');
            var geoCoords = ymaps.geocode(coords);
            var position = e.get('position');

            geoCoords.then(res => {
                var obj = {};

                obj.coords = coords;
                obj.address = res.geoObjects.get(0).properties.get('text');
                obj.comments = [];

                if (position[1] > window.screen.availHeight - 526) {
                    position[1] = window.screen.availHeight - 526;
                }
                if (position[0] > window.screen.availWidth - 380) {
                    position[0] = window.screen.availWidth - 760;
                }

                openPopup(obj, myMap, position, clusterer, '');
            });
        });
    });
}

export {
    mapInit
}