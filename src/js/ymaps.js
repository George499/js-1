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

        var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class=ballon__content>' +
            '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
            '<div class=ballon_body_header>{{ properties.balloonContentBodyHeader|raw }}</div>' +
            '<div class=ballon_body_center>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>' +
            '</div>', {
                build: function() {
                    customItemContentLayout.superclass.build.call(this);
                    var ballonHeader = document.querySelector(".ballon_header");
                    ballonHeader.addEventListener('click', (e) => {
                        var clusterAdress = e.target.innerHTML
                        var myGeocoder = ymaps.geocode(clusterAdress)
                        myGeocoder.then(
                            function(res) {
                                var pixel = res.geoObjects.get(0).geometry.getCoordinates()
                                var obj = {}
                                obj.coords = pixel;
                                obj.address = clusterAdress;
                                obj.comments = [];
                                var newObj = []
                                let arr = []

                                for (let i = 0; i < myMap.geoObjects._map.balloon._balloon._data.properties._sourceDataManager._data.geoObjects.length; i++) {
                                    var hint = myMap.geoObjects._map.balloon._balloon._data.properties._sourceDataManager._data.geoObjects[i]
                                    newObj.push(hint)
                                }

                                for (let i of newObj) {
                                    let ul = document.createElement('ul')
                                    console.log(arr);

                                    for (let a of arr) {
                                        let li = document.createElement('li')
                                        li.innerHTML = i.properties._data.hintContent
                                        arr.push(a)

                                        ul.appendChild(li)
                                        popup(obj, myMap, pixel, clusterer, "");
                                    }


                                }
                            },
                            function(err) {
                                alert('Ошибка');
                            }
                        );

                    });
                },
            }
        );


        var clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedDarkOrangeClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true,
            groupByCoordinates: false,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: customItemContentLayout,
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


                popup(obj, myMap, position, clusterer, "");
            });
        });
    });
}

export {
    mapInit
}