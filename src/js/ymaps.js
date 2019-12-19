import { openPopup as popup } from './../js/popup';

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

            geoCoords.then(resolve => {
                var obj = {};

                obj.coords = coords;
                obj.address = resolve.geoObjects.get(0).properties.get('text');
                obj.comments = [];

                if (position[0] > window.screen.width - 380) {
                    position[0] = window.screen.width - 400;
                }
                if (
                    position[1] > window.screen.height - 526) {
                    position[1] = window.screen.height - 700;
                }

                popup(obj, myMap, position, clusterer, '');
            });
        });
    });
}

export {
    mapInit
}