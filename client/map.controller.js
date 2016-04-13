app.controller('MapCtrl', function($scope, esriLoader) {

	$scope.map = {
	            options: {
	                basemap: 'topo',
	                center: [-73.1350,40.7891],
	                zoom: 10,
	                sliderStyle: 'small'
	            }
	        };

	$scope.basemapOptions = [
			{name:"gray"},
			{name: "dark-gray"},
			{name: "topo"},
			{name: "streets"},
	        {name: "satellite"},
	        {name: "hybrid"},
	        {name: "oceans"},
	        {name: "national-geographic"},
	        {name: "terrain"},
	        {name: "osm"}]
	        

	$scope.layers = [
		 {
		 	name: 'sewerOutlines',
		  	url: 'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8'
		 },
		 {
		 	name: 'sewerDistricts',
		  	url: 'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/9'
		 },
		 {
		 	name: 'sewerSheets',
		  	url: 'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/7'
		 },
		 {
		 	name: 'sewerOutlines',
		  	url: 'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8'
		 },
		 {
		 	name: 'sewerMains',
		  	url: 'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/2'
		 }
	 ]



    // sewerDistricts.relId = [5, 6];
    // sewerOutlines.relId = [4]


	$scope.onMapLoad = function(map) {
		console.log('loaded')
		esriLoader.require([

		    'esri/toolbars/draw',
                'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleLineSymbol',
                'esri/symbols/PictureFillSymbol', 'esri/symbols/CartographicLineSymbol',
                'esri/graphic',
                'esri/Color',
                "esri/dijit/Print", "dojo/dom",
                "esri/dijit/Measurement",
                "dojo/_base/lang", "esri/geometry/Geometry",  "esri/tasks/GeometryService",  "esri/tasks/AreasAndLengthsParameters",  "esri/geometry/Extent","esri/SpatialReference",
                "esri/config",
            ], function(
                Draw,
                SimpleMarkerSymbol, SimpleLineSymbol,
                PictureFillSymbol, CartographicLineSymbol,
                Graphic,
                Color,
                Print, dom,
                Measurement,
                lang, Geometry, GeometryService, AreasAndLengthsParameters, Extent, SpatialReference,
                config
            ) {


             // print dijit
		        var printer = new Print({
		          map: map,
		          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
		        }, dom.byId("printButton"));
		        printer.startup();	

		    // Measure 


		    //identify proxy page to use if the toJson payload to the geometry service is greater than 2000 characters.
			//If this null or not available the project and lengths operation will not work.  Otherwise it will do a http post to the proxy.
			esriConfig.defaults.io.proxyUrl = "/proxy/";
			esriConfig.defaults.io.alwaysUseProxy = false;

		    var measureLine = new Draw(map);
		    map.disableMapNavigation();
		    // measureLine.on("draw-end", lang.hitch(map, getAreaAndLength));
		    measureLine.active(Draw.FREEHAND_POLYLINE);

		    // var geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
      // geometryService.on("areas-and-lengths-complete", outputAreaAndLength);


		   //  var mLineSymbol = new CartographicLineSymbol(
     //                        CartographicLineSymbol.STYLE_SOLID,
     //                        new Color([255, 10, 10]), 2,
     //                        CartographicLineSymbol.CAP_ROUND,
     //                        CartographicLineSymbol.JOIN_MITER, 2
     //                );

     //        function getAreaAndLength(evtObj) {
			  //     var map = this,
			  //         geometry = evtObj.geometry;
			  //     map.graphics.clear();
			      
			  //     var graphic = map.graphics.add(new Graphic(geometry, new SimpleFillSymbol()));
			      
			  //     //setup the parameters for the areas and lengths operation
			  //     var areasAndLengthParams = new AreasAndLengthsParameters();
			  //     areasAndLengthParams.lengthUnit = GeometryService.UNIT_FOOT;
			  //     areasAndLengthParams.areaUnit = GeometryService.UNIT_ACRES;
			  //     areasAndLengthParams.calculationType = "geodesic";

			  //     geometryService.simplify([geometry], function(simplifiedGeometries) {
			  //       areasAndLengthParams.polygons = simplifiedGeometries;
			  //       geometryService.areasAndLengths(areasAndLengthParams);
			  //     });
			  //   }

			  //   function outputAreaAndLength(evtObj) {
			  //     var result = evtObj.result;
			  //     console.log(json.stringify(result));
			  //   }
			  // });                 



			 var tb;

                // markerSymbol is used for point and multipoint, see //raphaeljs.com/icons/#talkq for more examples
                var markerSymbol = new SimpleMarkerSymbol();
                markerSymbol.setPath('M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z');
                markerSymbol.setColor(new Color('#00FFFF'));

                // lineSymbol used for freehand polyline, polyline and line.
                var lineSymbol = new CartographicLineSymbol(
                    CartographicLineSymbol.STYLE_SOLID,
                    new Color([255, 0, 0]), 10,
                    CartographicLineSymbol.CAP_ROUND,
                    CartographicLineSymbol.JOIN_MITER, 5
                );

                // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
                // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png
                var fillSymbol = new PictureFillSymbol(
                    // 'images/mangrove.png',
                    '//developers.arcgis.com/javascript/samples/graphics_add/images/mangrove.png',
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color('#000'),
                        1
                    ),
                    42,
                    42
                );

                // get a local reference to the map object once it's loaded
                // and initialize the drawing toolbar
                 function initToolbar(mapObj) {
                    map = mapObj;
                    tb = new Draw(map);
                    tb.on('draw-end', function(e) {
                        $scope.$apply(function() {
                            addGraphic(e);
                        });
                    });

                    // set the active tool once a button is clicked
                    $scope.activateDrawTool = activateDrawTool;
                }

                function activateDrawTool(tool) {

                    map.disableMapNavigation();
                    tb.activate(tool.toLowerCase());
                }

                function addGraphic(evt) {
                    //deactivate the toolbar and clear existing graphics
                    tb.deactivate();
                    map.enableMapNavigation();

                    // figure out which symbol to use
                    var symbol;
                    if (evt.geometry.type === 'point' || evt.geometry.type === 'multipoint') {
                        symbol = markerSymbol;
                    } else if (evt.geometry.type === 'line' || evt.geometry.type === 'polyline') {
                        symbol = lineSymbol;
                    } else {
                        symbol = fillSymbol;
                    }

                    map.graphics.add(new Graphic(evt.geometry, symbol));
                    console.log(map.graphics)
                }
                 // bind the toolbar to the map
                initToolbar(map);
			}
	)}
})