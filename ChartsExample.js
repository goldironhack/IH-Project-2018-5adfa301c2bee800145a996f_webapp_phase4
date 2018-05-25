var barColor = 'steelblue';

function getText(boro) {
    switch (boro){
        case 1:
            return "Manhattan";
        case 2:
            return "The Bronx";
        case 3:
            return "Brooklyn";
        case 4:
            return "Queens";
        case 5:
            return "Staten Island";
    }
}

function histoGram(fD, id){
    var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
    hGDim.w = 500 - hGDim.l - hGDim.r,
        hGDim.h = 300 - hGDim.t - hGDim.b;

    //create svg for histogram.
    var hGsvg = d3.select(id).append("svg")
        .attr("width", hGDim.w + hGDim.l + hGDim.r)
        .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
        .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

    // create function for x-axis mapping.
    var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
        .domain(fD.map(function(d) { return d[0]; }));

    // Add x-axis to the histogram svg.
    hGsvg.append("g").attr("class", "x axis")
        .attr("transform", "translate(0," + hGDim.h + ")")
        .call(d3.svg.axis().scale(x).orient("bottom"));

    // Create function for y-axis map.
    var y = d3.scale.linear().range([hGDim.h, 0])
        .domain([0, d3.max(fD, function(d) { return d[1]; })]);

    // Create bars for histogram to contain rectangles and freq labels.
    var bars = hGsvg.selectAll(".bar").data(fD).enter()
        .append("g").attr("class", "bar");

    //create the rectangles.
    bars.append("rect")
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return hGDim.h - y(d[1]); })
        .attr('fill',barColor)
//        .on("mouseover",mouseover)// mouseover is defined below.
//        .on("mouseout",mouseout);// mouseout is defined below.

    //Create the frequency labels above the rectangles.
    bars.append("text").text(function(d){ return d3.format(",")(d[1])})
        .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
        .attr("y", function(d) { return y(d[1])-5; })
        .attr("text-anchor", "middle");

    function mouseover(d){  // utility function to be called on mouseover.
        // filter for selected state.
        var st = fData.filter(function(s){ return s.State == d[0];})[0],
            nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});

        // call update functions of pie-chart and legend.
        pC.update(nD);
        leg.update(nD);
    }

    function mouseout(d){    // utility function to be called on mouseout.
        // reset the pie-chart and legend.
        pC.update(tF);
        leg.update(tF);
    }

    // create function to update the bars. This will be used by pie-chart.
    hG.update = function(nD, color){
        // update the domain of the y-axis map to reflect change in frequencies.
        y.domain([0, d3.max(nD, function(d) { return d[1]; })]);

        // Attach the new data to the bars.
        var bars = hGsvg.selectAll(".bar").data(nD);

        // transition the height and color of rectangles.
        bars.select("rect").transition().duration(500)
            .attr("y", function(d) {return y(d[1]); })
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr("fill", color);

        // transition the frequency labels location and change value.
        bars.select("text").transition().duration(500)
            .text(function(d){ return d3.format(",")(d[1])})
            .attr("y", function(d) {return y(d[1])-5; });
    }
    return hG;
}

function pieChart(pD, id){
    var pC ={},    pieDim ={w:250, h: 250};
    pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

    // create svg for pie chart.
    var piesvg = d3.select(id).append("svg")
        .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
        .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

    // create function to draw the arcs of the pie slices.
    var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

    // create a function to compute the pie slice angles.
    var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

    // Draw the pie slices.
    piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
        .each(function(d) { this._current = d; })
        .style("fill", function(d) { return segColor(d.data.type); })
        .on("mouseover",mouseover).on("mouseout",mouseout);

    // create function to update pie-chart. This will be used by histogram.
    pC.update = function(nD){
        piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
            .attrTween("d", arcTween);
    }
    // Utility function to be called on mouseover a pie slice.
    function mouseover(d){
        // call the update function of histogram with new data.
        hG.update(fData.map(function(v){
            return [v.State,v.freq[d.data.type]];}),segColor(d.data.type));
    }
    //Utility function to be called on mouseout a pie slice.
    function mouseout(d){
        // call the update function of histogram with all data.
        hG.update(fData.map(function(v){
            return [v.State,v.total];}), barColor);
    }
    // Animating the pie-slice requiring a custom function which specifies
    // how the intermediate paths should be drawn.
    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) { return arc(i(t));    };
    }
    return pC;
}

function legend(lD, id){
    var leg = {};

    // create table for legend.
    var legend = d3.select(id).append("table").attr('class','legend');

    // create one row per segment.
    var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

    // create the first column for each segment.
    tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
        .attr("width", '16').attr("height", '16')
        .attr("fill",function(d){ return segColor(d.type); });

    // create the second column for each segment.
    tr.append("td").text(function(d){ return getText(d.type);});

    // create the third column for each segment.
    tr.append("td").attr("class",'legendFreq')
        .text(function(d){ return d3.format(",")(d.freq);});

    // create the fourth column for each segment.
    tr.append("td").attr("class",'legendPerc')
        .text(function(d){ return getLegend(d,lD);});

    // Utility function to be used to update the legend.
    leg.update = function(nD){
        // update the data attached to the row elements.
        var l = legend.select("tbody").selectAll("tr").data(nD);

        // update the frequencies.
        l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

        // update the percentage column.
        l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});
    }

    function getLegend(d,aD){ // Utility function to compute percentage.
        return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
    }

    return leg;
}

function segColor(c){
    switch (c){
        case 1:
            return '#ffe14c'; //Amarillo
        case 10:
            return '#ffe359'; //Amarillo
        case 11:
            return '#ffe566'; //Amarillo
        case 12:
            return '#ffe772'; //Amarillo
        case 13:
            return '#ffe97f'; //Amarillo
        case 14:
            return '#ffeb8c'; //Amarillo
        case 15:
            return '#ffee99'; //Amarillo
        case 16:
            return '#fff0a5'; //Amarillo
        case 17:
            return '#fff2b2'; //Amarillo
        case 18:
            return '#fff4bf'; //Amarillo
        case 19:
            return '#fff6cc'; //Amarillo
        case 2:
            return '#7f7f72'; // Gris
        case 20:
            return '#727264'; // Gris
        case 21:
            return '#7f7f70'; // Gris
        case 22:
            return '#8c8c7b'; // Gris
        case 23:
            return '#999986'; // Gris
        case 24:
            return '#a5a591'; // Gris
        case 25:
            return '#b2b29d'; // Gris
        case 26:
            return '#bfbfa8'; // Gris
        case 27:
            return '#ccccb3'; // Gris
        case 28:
            return '#d8d8be'; // Gris
        case 29:
            return '#e5e5c9'; // Gris
        case 3:
            return '#f98b4a'; // Naranja
        case 30:
            return '#f99a63'; // Naranja
        case 31:
            return '#f9a270'; // Naranja
        case 32:
            return '#f9aa7c'; // Naranja
        case 33:
            return '#f9b289'; // Naranja
        case 34:
            return '#f9ba95'; // Naranja
        case 35:
            return '#f9c2a2'; // Naranja
        case 36:
            return '#f9caae'; // Naranja
        case 37:
            return '#f9d2bb'; // Naranja
        case 38:
            return '#f9dac7'; // Naranja
        case 39:
            return '#f9e2d4'; // Naranja
        case 4:
            return '#ff4c4c'; // Rojo
        case 40:
            return '#ff5959'; // Rojo
        case 41:
            return '#ff6666'; // Rojo
        case 42:
            return '#ff7272'; // Rojo
        case 43:
            return '#ff7f7f'; // Rojo
        case 44:
            return '#ff8c8c'; // Rojo
        case 45:
            return '#ff9999'; // Rojo
        case 46:
            return '#ffa5a5'; // Rojo
        case 47:
            return '#ffb2b2'; // Rojo
        case 48:
            return '#ffbfbf'; // Rojo
        case 49:
            return '#ffcccc'; // Rojo
        case 5:
            return '#8c5031'; // Cafe
        case 50:
            return '#8c5438'; // Cafe
        case 51:
            return '#915c41'; // Cafe
        case 52:
            return '#96644b'; // Cafe
        case 53:
            return '#996b54'; // Cafe
        case 54:
            return '#9e735e'; // Cafe
        case 55:
            return '#a37d6a'; // Cafe
        case 56:
            return '#a88675'; // Cafe
        case 57:
            return '#ad9082'; // Cafe
        case 58:
            return '#b29a8e'; // Cafe
        case 59:
            return '#baa79e'; // Cafe
        default:
            return 'steelblue';
    }
}

/*function dashboard(id, fData){
    // calculate total frequency by segment for all state.

    var data = [1, 2, 3, 4, 5];
    var legends = data.map(function(d){
        return {type:d, freq: d3.sum(fData.map(function(t){ if(t.boro === d){ return t.total;} return 0;}))};
    });

    for (let i = 10; i < 60; i++) {
        data.push(i);
    }

    var tF = data.map(function(d){
        return {type:d, freq: d3.sum(fData.map(function(t){ if(t.boro === d){ return t.total;} return 0;}))};
    });

    // calculate total frequency by state for all segment.
    var sF = fData.map(function(d){return [d.State,d.total];});
    //alert(JSON.stringify(tF));

    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg= legend(legends);  // create the legend.
}


/*
var freqData=[
        {State:'BX-1',total:12,boro:2}
        ,{State:'BX-10',total:32,boro:2}
        ,{State:'MH-1',total:1,boro:1}
        ,{State:'MH-2',total:2,boro:1}
        ,{State:'SI-3',total:28,boro:3}
        ,{State:'SI-7',total:23,boro:3}
        ,{State:'QN-4',total:50,boro:4}
        ,{State:'QN-8',total:53,boro:4}
        ,{State:'BK-5',total:43,boro:5}
        ,{State:'BK-9',total:41,boro:5}
    ];
    try {
        dashboard('#dashboard', freqData);
    }catch (e) {
        alert(e);
    }
 */