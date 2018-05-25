const icons = {'university': 'https://i.imgur.com/kmEULZL.png'};

// DATASETS OBLIGATORIOS
let NY_neighborhood_names = {'data':'data', 'markers':''};
var NY_districts_shapes = {'data':'data', 'shapes':''};
let NY_crimes;
let NY_housing;

// DATASETS ELEGIBLES
let NY_public_schools_enrollment_forecast;
let NY_museums = {'data':'data', 'markers':'markers'};
let NY_art_galleries = {'data':'data', 'markers':'markers'};
let NY_farmers_markets;
let NY_open_data_APIs;
let NY_neighborhood_tabulations;
let NY_air_quality;

// VARIABLES DEL SISTEMA
var map;
var selected;
var openWidow;
var university;

var main_data ={1:{1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{}, 11:{}, 12:{}},
                2:{1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{}, 11:{}, 12:{}},
                3:{1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{}, 11:{}, 12:{},13:{}, 14:{}, 15:{}, 16:{}, 17:{}, 18:{}},
                4:{1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{}, 11:{}, 12:{},13:{}, 14:{}},
                5:{1:{}, 2:{}, 3:{}}};

function loadJSON(path, success) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText));
            }
            else {
                alert("error: "+xhr.status);
            }
        }
    };
    xhr.open('GET', path, true);
    xhr.send();
}

window.onload = function initMap() {
    //Extend Polygon
    //taken from https://stackoverflow.com/questions/3081021/how-to-get-the-center-of-a-polygon-in-google-maps-v3?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7142700, lng: -74.0059700},
        zoom: 10.7,
        mapTypeControl: false,
        streetViewControl: false,
        disableDefaultUI: true,
        gestureHandling: 'none',
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ]
    });

    map.data.setStyle( function(feature){
        return ({ fillColor: getColor(feature),
            strokeWeight: getWeight(feature),
            strokeColor: '#FFFFFF',
            fillOpacity: getOpacity(feature),
            clickable: getClickable(feature)
        });
    });

    university = new google.maps.Marker({
        position: {lat: 40.7290549, lng:-73.9965233},
        map: null,
        icon: icons.university,
        zIndex: 1000,
        styles: {'z-index':10000}
    });
    openWidow = new google.maps.InfoWindow({
        content: ""
    });

    map.data.addListener('click', function(event) {
        if(selected !== undefined){
            selected.setProperty('isClicked', false);
            openWidow.close();
        }
        var boro = getBorough(event.feature);
        var dist = getDistrict(event.feature);
        openWidow.setContent(
            "<b>Borough: </b>"+getNameBoro(event.feature.getProperty("BoroCD"))+"<br>"+
            "<b>District: </b>"+dist+"<br>"+
            "<b>Distance: </b>"+main_data[boro][dist].distance+"<br>"+
            "<b>No Crimes: </b>"+main_data[boro][dist].crimes.length+"<br>"+
            "<b>No Museums: </b>"+main_data[boro][dist].museums.length+"<br>"+
            "<b>No Galleries: </b>"+main_data[boro][dist].galleries.length+"<br>"+
            "<b>No Houses: </b>"+main_data[boro][dist].units+"<br>");
        openWidow.open(map);
        openWidow.setPosition(main_data[boro][dist].center);
        selected = event.feature;
        event.feature.setProperty('isClicked', true);
        var dist = getDistrict(event.feature);
        var boro = getBorough(event.feature);
        map.fitBounds(main_data[boro][dist].bounds);
        mostrarVentanaEmergente(event.feature);
    });

    map.data.addListener('dblclick', function(event) {
        map.setCenter({lat: 40.7142700, lng: -74.0059700});
        map.setZoom(10.7);
        if(selected !== undefined){
            selected.setProperty('isClicked', false);
        }
        selected = undefined;
    });

    map.data.addListener('mouseover', function(event) {
        event.feature.setProperty('isHover', true);
    });

    map.data.addListener('mouseout', function(event) {
        event.feature.setProperty('isHover', false);
    });
    try {
        cargarDatasets();
    } catch (e) {
        alert("ERROR 0: "+e);
        cargarDatasets();
    }
}

function showUniversity(){
    if ( document.getElementById("university").checked === true ){
        university.setMap(map);
    } else {
        university.setMap(null);
    }
}

function showNeighborhood(){
    if ( document.getElementById("neighborhood").checked === true ){
        NY_neighborhood_names.markers = makeMarkers(NY_neighborhood_names.data.data, 'house','#771731', 9 );
    } else {
        NY_neighborhood_names.markers.clearMarkers();
    }
}

function showGalleries(){
    if ( document.getElementById("gallery").checked === true ){
        NY_art_galleries.markers = makeMarkers(NY_art_galleries.data.data, 'gallery', '#726842', 9);
    } else {
        NY_art_galleries.markers.clearMarkers();
    }
}

function showMuseums(){
    if ( document.getElementById("museums").checked === true ){
        NY_museums.markers = makeMarkers(NY_museums.data.data, 'museum', '#000000', 8);
    } else {
        NY_museums.markers.clearMarkers();
    }
}

function getDistrict(feature){
    return feature.getProperty('BoroCD')%100;
}

function getBorough(feature){
    return Math.trunc(feature.getProperty('BoroCD')/100);
}

function getColor(feature) {
    if (feature.getProperty('tipo')===2){
        return '#000000';
    }
    const boro = getBorough(feature);
    const district = getDistrict(feature);
    if(district > 20 ){
        return '#a5b076'; // Verde
    }
    switch ( boro ){
        case 1:
            return '#ffd400'; //Amarillo
        case 2:
            return '#747462'; // Gris
        case 3:
            return '#f95b00'; //Naranja
        case 4:
            return '#ff0000'; // Rojo
        case 5:
            return '#8c3100'; // Café
    }
}

function getWeight(feature){
    if(feature.getProperty('isClicked') || feature.getProperty('isHover')){
        return 3.5;
    }
    return 1.0;
}

function getOpacity(feature){
    if(getDistrict(feature) > 20){
        return 1.0;
    } else if(feature.getProperty('isClicked')){
        return 0.7;
    } else if(feature.getProperty('isHover')){
        return 0.5;
    }
    return 0.3;
}

function getClickable(feature){
    var district = feature.getProperty('BoroCD')%100;
    if(district > 20){
        return false;
    }
    return true;
}

function makeMarkers(data, icon, color, index){
    var markers = [];
    try{
        for (var i = 0; i < data.length; i++) {
            var coords = data[i][index].substring(7, data[i][index].length-1).split(" ");
            var latLng = new google.maps.LatLng(coords[1],coords[0]);
            var marker = new google.maps.Marker({
                position: latLng,
                icon: 'https://raw.githubusercontent.com/marobayos/icons/master/'+icon+'.png',
                //map : map
            });
            markers.push(marker);
        }
        var markers = new MarkerClusterer(map, markers,
            {   imagePath: 'https://raw.githubusercontent.com/marobayos/icons/master/'+icon,
                averageCenter: true,
                gridSize: 50,
                minimumClusterSize: 3,
                //styles: [style],
            });
        var style = markers.getStyles();
        for(var i = 0; i< 5 ; i++){
            style[i]["textColor"] = color;
            style[i]["textSize"] = 18;
        }
        //alert(JSON.stringify(style));// =  '#FFFFFF';
        markers.setStyles(style);
    } catch (err){
        //alert("ERROR HERE: "+err);
    }
    return  markers ;
}

function cargarDatasets(){
    //Primero de los datasets obligatorios
    $.getJSON("https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json", function ( data ){ NY_neighborhood_names.data = data;
        NY_neighborhood_names.markers = makeMarkers(data.data, 'house', undefined ,  9);
        NY_neighborhood_names.markers.clearMarkers();
    });


    // Segundo de los datasets obligatorios
    $.getJSON("https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson", function ( data ){
        NY_districts_shapes.data = data;
        NY_districts_shapes.shapes = map.data.addGeoJson(data);
        try{
            for(var i = 0 ; i < NY_districts_shapes.shapes.length ;i++){
                var poly = createPoly(NY_districts_shapes.shapes[i]);
                var bounds = createBounds(NY_districts_shapes.shapes[i]);
                var center = bounds.getCenter();
                var boro = getBorough(NY_districts_shapes.shapes[i]);
                var dist = getDistrict(NY_districts_shapes.shapes[i]);
                main_data[boro][dist] = {
                    shape : NY_districts_shapes.shapes[i],
                    poly : poly,
                    dist : dist,
                    boro : boro,
                    center: center,
                    bounds: bounds,
                    crimes: [],
                    houses: [],
                    museums: [],
                    galleries: [],
                    neigh : [],
                    units : 0,
                    distance: google.maps.geometry.spherical.computeDistanceBetween(center, university.getPosition())/1000
                };
            }
            createTableDistricts(data);
        } catch(err){
            alert("ERROR 1: "+err);
        }
    }).done( function () {
        loadJSON("https://data.cityofnewyork.us/resource/9s4h-37hy.json?cmplnt_fr_dt=2015-12-31T00:00:00.000", function ( data ){
            NY_crimes = data;
            createTableCrimes(data);
        });
        // Cuarto de los datasets obligatorios
        loadJSON("https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json", function ( data ){
            NY_housing = data;
            createTableHousing(data);
        });

        loadJSON("https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json", function ( data ){
            NY_museums.data = data;
            createTableMuseums(data);
            NY_museums.markers = makeMarkers(data.data, 'gallery', map ,  8);
            NY_museums.markers.clearMarkers();});

        loadJSON("https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json", function ( data ){
            NY_art_galleries.data = data;
            createTableGalleries(data);
            NY_art_galleries.markers = makeMarkers(data.data, 'gallery', map ,  9);
            NY_art_galleries.markers.clearMarkers(); });

    } );


    // Otros datasets
    loadJSON("https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json", function ( data ){ NY_air_quality = data; });

    loadJSON("https://data.cityofnewyork.us/api/views/xzy8-qqgf/rows.json", function ( data ){ NY_public_schools_enrollment_forecast = data; });

    loadJSON("https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json", function ( data ){ NY_farmers_markets = data; createTableMarkets(data);});

    loadJSON("https://data.ny.gov/api/views/vfrh-bvhu/rows.json", function ( data ){ NY_open_data_APIs = data; });

    loadJSON("https://data.cityofnewyork.us/api/views/q2z5-ai38/rows.json", function ( data ){ NY_neighborhood_tabulations = data; });
}

function createTableDistricts(data){
    var table = document.getElementById("districts");
    for (let i = 0; i < data.features.length; i++) {
        var datos = data.features[i].properties;
        if((datos.BoroCD)%100 < 20) {
            var row = table.insertRow(0);
            var dist = datos.BoroCD%100;
            var boro = Math.trunc(datos.BoroCD / 100.0);
            row.insertCell(0).innerHTML = getNameBoro(datos.BoroCD);
            row.insertCell(1).innerHTML = (datos.BoroCD) % 100;
            row.insertCell(2).innerHTML = main_data[boro][dist].distance;
            row.insertCell(3).innerHTML = datos.Shape__Area*1000*2.58999*2.58999;
            row.insertCell(4).innerHTML = Math.sqrt(datos.Shape__Area*1000*2.58999*2.58999);
        }
    }
}

function createTableCrimes(data) {
    try {
        var table = document.getElementById("crimes");
        for (let i = 0; i < data.length; i++) {
            if("latitude" in data[i] && "longitude" in data[i]) {
                var row = table.insertRow(0);
                row.insertCell(0).innerHTML = data[i].boro_nm;
                row.insertCell(1).innerHTML = data[i].boro_nm;
                row.insertCell(2).innerHTML = data[i].ofns_desc;
                row.insertCell(3).innerHTML = data[i].pd_desc;
                row.insertCell(4).innerHTML = data[i].law_cat_cd;
                row.insertCell(5).innerHTML = data[i].loc_of_occur_desc;
                row.insertCell(6).innerHTML = data[i].prem_typ_desc;
                var point = new google.maps.LatLng(data[i].latitude, data[i].longitude);
                var boro = getBORO(data[i].boro_nm)
                for (var j in main_data[boro]) {
                    for (let k = 0; k < main_data[boro][j].poly.length; k++) {
                        if (google.maps.geometry.poly.containsLocation(point, main_data[boro][j].poly[k] )) {
                            main_data[boro][j].crimes.push(data[i]);
                            break;
                        }
                    }
                }
            }
        }
    } catch (e) {
        alert("ERROR 2: "+e);
    }
}

function getBORO(boro_nm) {
    switch (boro_nm){
        case "MANHATTAN":
            return 1;
        case "BRONX":
            return 2;
        case "BROOKLYN":
            return 3;
        case "QUEENS":
            return 4;
        case "STATEN ISLAND":
            return 5;
    };
}

function createBounds(feature) {
    var bounds = new google.maps.LatLngBounds();
    if(feature.getGeometry().b[0].b[0].b === undefined) {
        for (let i = 0; i < feature.getGeometry().b.length ; i++) {
            for (let j = 0; j < feature.getGeometry().b[i].b.length; j++) {
                bounds.extend(feature.getGeometry().b[i].b[j]);
            }
        }
    } else {
        for (let i = 0; i < feature.getGeometry().b.length ; i++) {
            for (let j = 0; j < feature.getGeometry().b[i].b.length ; j++) {
                for (let k = 0; k < feature.getGeometry().b[i].b[j].b.length ; k++) {
                    bounds.extend(feature.getGeometry().b[i].b[j].b[k]);
                }
            }
        }
    }
    return bounds;
}

function createPoly(feature) {
    var polys = [];
    if(feature.getGeometry().b[0].b[0].b === undefined){
        for (let i = 0; i < feature.getGeometry().b.length ; i++) {
            polys.push(new google.maps.Polygon({ paths:feature.getGeometry().b[i].b }));
        }
    } else {
        for (let i = 0; i < feature.getGeometry().b.length ; i++) {
            for (let j = 0; j < feature.getGeometry().b[i].b.length ; j++) {
                polys.push(new google.maps.Polygon({ paths:feature.getGeometry().b[i].b[j].b }));
            }
        }
    }
    return polys ;
}

function createTableHousing(data) {
    data = data.data;
    var last = "";
    try {
        var table = document.getElementById("housing");
        for (let i = 0; i < data.length; i++) {
            if (data[i].length === 49 && data[i][9]!= "CONFIDENTIAL" ) {
                var row = table.insertRow(0);
                row.insertCell(0).innerHTML = data[i][15];
                row.insertCell(1).innerHTML = data[i][19];
                row.insertCell(2).innerHTML = data[i][9];
                row.insertCell(3).innerHTML = data[i][16];
                row.insertCell(4).innerHTML = data[i][28];
                row.insertCell(5).innerHTML = data[i][47];
                var dist = parseInt(data[i][19].split('-')[1])%100;
                last = data[i][19]+": "+getBR(data[i][19])+" "+dist;
                main_data[getBR(data[i][19])][dist].units += parseInt(data[i][47]);
                main_data[getBR(data[i][19])][dist].houses.push(data[i]);
            }
        }
    }catch (e) {
        alert("ERROR 3: "+e);
        alert(last);
    }
}

function createTableMuseums(data) {
    data = data.data;
    try {
        var table = document.getElementById("museum");
        for (let i = 0; i < data.length; i++) {
            var row = table.insertRow(0);
            row.insertCell(0).innerHTML = data[i][9];
            row.insertCell(1).innerHTML = data[i][10];
            row.insertCell(2).innerHTML = data[i][11];
            row.insertCell(3).innerHTML = data[i][12] +" "+data[i][13];
            row.insertCell(4).innerHTML = data[i][14];
            row.insertCell(5).innerHTML =  Math.trunc(data[i][15]);
            var coords = data[i][8].substring(7, data[i][8].length-1).split(" ");
            var point = new google.maps.LatLng(coords[1],coords[0]);
            let res = false;
            for (var boro in main_data){
                for(var dist in main_data[boro]){
                    for (let k = 0; k < main_data[boro][dist].poly.length; k++) {
                        if (google.maps.geometry.poly.containsLocation(point, main_data[boro][dist].poly[k] )) {
                            main_data[boro][dist].museums.push(data[i]);
                            res = true;
                            break;
                        }
                    }
                    if(res === true){
                        break;
                    }
                }
                if(res === true){
                    break;
                }
            }
        }
    }catch (e) {
        alert("ERROR 4: "+e);
    }
}

function createTableGalleries(data) {
    data = data.data;
    try {
        var table = document.getElementById("galleries");
        for (let i = 0; i < data.length; i++) {
            var row = table.insertRow(0);
            row.insertCell(0).innerHTML = data[i][8];
            row.insertCell(1).innerHTML = data[i][10];
            row.insertCell(2).innerHTML = data[i][11];
            row.insertCell(3).innerHTML = data[i][12] +" "+data[i][13];
            row.insertCell(4).innerHTML = data[i][14];
            row.insertCell(5).innerHTML =  Math.trunc(data[i][15]);
            var coords = data[i][9].substring(7, data[i][9].length-1).split(" ");
            var point = new google.maps.LatLng(coords[1],coords[0]);
            var res = false;
            for (var boro in main_data){
                for(var dist in main_data[boro]){
                    for (let k = 0; k < main_data[boro][dist].poly.length; k++) {
                        if (google.maps.geometry.poly.containsLocation(point, main_data[boro][dist].poly[k] )) {
                            main_data[boro][dist].galleries.push(data[i]);
                            res = true;
                            break;
                        }
                    }
                    if(res === true){
                        break;
                    }
                }
                if(res === true){
                    break;
                }
            }
        }
    }catch (e) {
        alert("ERROR 5: "+e);
    }
}

function createTableMarkets(data) {
    data = data.data;
    try {
        var table = document.getElementById("markets");
        for (let i = 0; i < data.length; i++) {
            var row = table.insertRow(0);
            row.insertCell(0).innerHTML = data[i][8];
            row.insertCell(1).innerHTML = data[i][10];
            row.insertCell(2).innerHTML = data[i][11];
            row.insertCell(3).innerHTML = data[i][13];
            row.insertCell(4).innerHTML = data[i][9];
        }
    }catch (e) {
        alert("ERROR 6: "+e);
    }
}

function getBR(CommunityBoard) {
    var number = CommunityBoard.split('-')[1];
    switch (CommunityBoard.substring(0, 2)){
        case "MN":
            return 1;
        case "BX":
            return 2;
        case "BK":
            return 3;
        case "QN":
            return 4;
        case "SI":
            return 5;
        default:
            alert(CommunityBoard);
            return "WTF";
    }
}

function getNameBoro(borocd) {
    var boro = Math.trunc(borocd/100);;
    switch (boro){
        case 1:
            return "Manhattan";
        case 2:
            return "Bronx";
        case 3:
            return "Brooklyn";
        case 4:
            return "Queens";
        case 5:
            return "Staten Island";
    }
}

function getName(boro) {
    switch (boro){
        case '1':
            return "Manhattan";
        case '2':
            return "The Bronx";
        case '3':
            return "Brooklyn";
        case '4':
            return "Queens";
        case '5':
            return "Staten Island";
    }
}

var ar = [];

function getRanking(){
    try {
        var parameter = document.getElementById("parameter");
        document.getElementById("HISTOGRAM").innerHTML = "";
        document.getElementById("PIECHART").innerHTML = "";
        document.getElementById("LEGENDS").innerHTML = "";
        switch (parameter.value) {
            case '0':
                document.getElementById("TITLE").innerText = "District";
                ar = rankByDistance();
                break;
            case '1':
                document.getElementById("TITLE").innerText = "No Crimes";
                ar = rankByCrimes();
                break;
            case '2':
                document.getElementById("TITLE").innerText = "No Houses";
                ar = rankByUnits();
                break;
            case '3':
                document.getElementById("TITLE").innerText = "No Museums";
                ar = rankByMuseums();
                break;
            case '4':
                document.getElementById("TITLE").innerText = "No Galleries";
                ar = rankByGalleries();
                break;
        }
        document.getElementById("Download_ranking").disabled = false;
    } catch (e) {
        alert("ERROR IN RANKING: "+e);
    }
}

function getType(boro, dist) {
    var res = "";
    switch (boro) {
        case '1':
            res = "MH";
            break;
        case '2':
            res = "BX";
            break;
        case '3':
            res = "BR";
            break;
        case '4':
            res = "QN";
            break;
        case '5':
            res = "SI";
            break;
    }
    res += '-'+dist;
    return res;
}

function rankByDistance() {
    var values = [];
    for (var boro in main_data) {
        for (var dist in main_data[boro]){
            values.push([main_data[boro][dist].distance, boro, dist]);
        }
    }
    values =  values.sort(function (a, b) {
        return a[0] - b[0];
    });
    var fd = [];
    var table = document.getElementById("top-10");
    table.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = i+1;
        row.insertCell(1).innerHTML = getName(values[i][1]);
        row.insertCell(2).innerHTML = values[i][2];
        row.insertCell(3).innerHTML =  Math.round( parseFloat(values[i][0])*1000 )/1000;
        fd.push([getType(values[i][1], values[i][2]), Math.round( parseFloat(values[i][0])*1000 )/1000 ] );
    }
    histoGram(fd, '#HISTOGRAM');
    return values;
}

function rankByCrimes() {
    var values = [];
    for (var boro in main_data) {
        for (var dist in main_data[boro]){
            if(parseInt(dist)<20)
                values.push([ main_data[boro][dist].crimes.length , boro, dist ]);
        }
    }
    values =  values.sort(function (a, b) {
        return a[0] - b[0];
    });
    var fd = [];
    var tf = [{type:1, freq: 0},{type:2, freq: 0},{type:3, freq: 0},{type:4, freq: 0},{type:5, freq: 0}];
    var table = document.getElementById("top-10");
    table.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = i+1;
        row.insertCell(1).innerHTML = getName(values[i][1]);
        row.insertCell(2).innerHTML = values[i][2];
        row.insertCell(3).innerHTML = parseInt(values[i][0]);
        fd.push([getType(values[i][1], values[i][2]), values[i][0]] );
        tf[parseInt(values[i][1])-1].freq += parseInt(values[i][0]);
    }
    histoGram(fd, '#HISTOGRAM');
    pieChart(tf, '#PIECHART');
    legend(tf, '#LEGENDS');
    return values;
}

function rankByUnits() {
    var values = [];
    for (var boro in main_data) {
        for (var dist in main_data[boro]){
            if(parseInt(dist)<20)
                values.push([ main_data[boro][dist].units , boro, dist ]);
        }
    }
    values =  values.sort(function (a, b) {
        return b[0] - a[0];
    });

    var fd = [];
    var tf = [{type:1, freq: 0},{type:2, freq: 0},{type:3, freq: 0},{type:4, freq: 0},{type:5, freq: 0}];
    var table = document.getElementById("top-10");
    table.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = i+1;
        row.insertCell(1).innerHTML = getName(values[i][1]);
        row.insertCell(2).innerHTML = values[i][2];
        row.insertCell(3).innerHTML = parseInt(values[i][0]);
        fd.push([getType(values[i][1], values[i][2]), values[i][0]] );
        tf[parseInt(values[i][1])-1].freq += parseInt(values[i][0]);
    }
    histoGram(fd, '#HISTOGRAM');
    pieChart(tf, '#PIECHART');
    legend(tf, '#LEGENDS');
    return values;
}

function rankByMuseums() {
    var values = [];
    for (var boro in main_data) {
        for (var dist in main_data[boro]){
            if(parseInt(dist)<20)
                values.push( [ main_data[boro][dist].museums.length , boro, dist ] );
        }
    }
    values =  values.sort(function (a, b) {
        return b[0] - a[0];
    });
    var fd = [];
    var tf = [{type:1, freq: 0},{type:2, freq: 0},{type:3, freq: 0},{type:4, freq: 0},{type:5, freq: 0}];
    var table = document.getElementById("top-10");
    table.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = i+1;
        row.insertCell(1).innerHTML = getName(values[i][1]);
        row.insertCell(2).innerHTML = values[i][2];
        row.insertCell(3).innerHTML = parseInt(values[i][0]);
        fd.push([getType(values[i][1], values[i][2]), values[i][0]] );
        tf[parseInt(values[i][1])-1].freq += parseInt(values[i][0]);
    }
    histoGram(fd, '#HISTOGRAM');
    pieChart(tf, '#PIECHART');
    legend(tf, '#LEGENDS');
    return values;
}

function rankByGalleries() {
    var values = [];
    for (var boro in main_data) {
        for (var dist in main_data[boro]){
            if(parseInt(dist)<20)
                values.push([ main_data[boro][dist].galleries.length , boro, dist ]);
        }
    }
    values =  values.sort(function (a, b) {
        return b[0] - a[0];
    });
    var fd = [];
    var tf = [{type:1, freq: 0},{type:2, freq: 0},{type:3, freq: 0},{type:4, freq: 0},{type:5, freq: 0}];
    var table = document.getElementById("top-10");
    table.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = i+1;
        row.insertCell(1).innerHTML = getName(values[i][1]);
        row.insertCell(2).innerHTML = values[i][2];
        row.insertCell(3).innerHTML = parseInt(values[i][0]);
        fd.push([getType(values[i][1], values[i][2]), values[i][0]] );
        tf[parseInt(values[i][1])-1].freq += parseInt(values[i][0]);
    }
    histoGram(fd, '#HISTOGRAM');
    pieChart(tf, '#PIECHART');
    legend(tf, '#LEGENDS');
    return values;
}

function download() {
    // Sacado de https://gist.github.com/lmfresneda/64101b73efe10ef8b6fd
        //comprobamos compatibilidad
        if(window.Blob && (window.URL || window.webkitURL)){
            var contenido = "",
                d = new Date(),
                blob,
                reader,
                save,
                clicEvent;
            //creamos contenido del archivo
            for (var i = 0; i < ar.length; i++) {
                //construimos cabecera del csv
                if (i == 0)
                    contenido += Object.keys(ar[i]).join(";") + "\n";
                //resto del contenido
                contenido += Object.keys(ar[i]).map(function(key){
                    return ar[i][key];
                }).join(";") + "\n";
            }
            //creamos el blob
            blob =  new Blob(["\ufeff", contenido], {type: 'text/csv'});
            //creamos el reader
            var reader = new FileReader();
            reader.onload = function (event) {
                //escuchamos su evento load y creamos un enlace en dom
                save = document.createElement('a');
                save.href = event.target.result;
                save.target = '_blank';
                //aquí le damos nombre al archivo
                save.download = "TOP-10.csv";
                try {
                    //creamos un evento click
                    clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                } catch (e) {
                    //si llega aquí es que probablemente implemente la forma antigua de crear un enlace
                    clicEvent = document.createEvent("MouseEvent");
                    clicEvent.initEvent('click', true, true);
                }
                //disparamos el evento
                save.dispatchEvent(clicEvent);
                //liberamos el objeto window.URL
                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            }
            //leemos como url
            reader.readAsDataURL(blob);
        }else {
            //el navegador no admite esta opción
            alert("Su navegador no permite esta acción");
        }
}

