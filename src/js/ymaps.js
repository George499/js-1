function mapInit() {
    ymaps.ready(() => {
        let moscowMap = new ymaps.Map("map", {
            center: [55.7, 37.6],
            zoom: 16
        })
    })
}

export {
    mapInit
}