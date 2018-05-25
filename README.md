## webapp_phase4

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