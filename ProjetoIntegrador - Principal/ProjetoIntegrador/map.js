var AirPureCity

// Inicializar um objeto Plataform
var platform = new H.service.Platform({
    'apikey': 'hYHpLheXz9vg5bHZtRH8WDnMczjzVOFVKvRlQO54z7o'
});
var omvService = platform.getOMVService({path: 'v2/vectortiles/core/mc'})
var baseUrl = 'https://js.api.here.com/v3/3.1/styles/omv/oslo/japan/'
// Criar um style specifico para a cidade
var style = new H.map.Style(`${baseUrl}normal.day.yaml`, baseUrl)

// Instanciar provedor e layer para o basemap
var omvProvider = new H.service.omv.Provider(omvService, style)
var omvlayer = new H.map.layer.TileLayer(omvProvider, {max: 22})

// Instanciar e mostrar o mapa
var map = new H.Map(
    document.getElementById('mapContainer'),
    omvlayer,
    {
        zoom: 17,
        center: {lat: 35.68026, lng: 139.76744}
    }
)
function buscarCidade(){
    AirPureCity = document.getElementById("inputAirPureCity")
    console.log(AirPureCity)
}