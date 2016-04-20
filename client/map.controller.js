
app.controller('MapCtrl', function($scope, esriLoader, $cookies) {

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
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	//'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	visible: true,
		  	options: {
		  		id:"Outlines"
		  	},
		  	style: {
	  			type: "polygon",
	  			tblField: []
	  		}
		 },
		 {
		 	name: 'sewerDistricts',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/9',
		  	visible: true,
		  	options: {
		  		id:"Districts"
		  	},
		  	style: {
	  			type: "polygon",
	  			tblField: []
	  		}
		 },
		 // {
		 // 	name: 'sewerSheets',
		 //  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/7',
		 //  	visible: true,
		 //  	options: {
		 //  		id:"Sheets",
		  		
		 //  	},
		 //  	style: {
	  // 			type: "polygon",
	  // 			tblField: []
	  // 		}
		 // },
		 {
		 	name: 'sewerMains',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/2',
		  	visible: true,
		  	options: {
		  		id:"Mains"
		  	},
	  		style: {
	  			type: "polyline",
	  			tblField: []
	  		}
		 },
		 {
		 	name: 'manholes',
		 	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/0',
		 	visible: true,
		 	options: {
		 		id:"Manholes"
		 	},
		 	style: {
	  			type: "point",
	  			tblField: []
	  		}
		 }
	 ]

	 $scope.layersOn = [];

	 $scope.layers.forEach(function(layer){
	 	$scope.layersOn.push({url:layer.url, options:layer.options})
	 	console.log(layer.options.id)
	 })

	 $scope.toggleLayer = function (layer) {
	 		var push = true;
            for(var j = 0; j < $scope.layersOn.length; j++){
            	if ($scope.layersOn[j].url === layer.url){
	                $scope.layersOn.splice(j, 1);
	                console.log('splice')
	                push = false;
	                break;
	            }
	        }
            if(push === true){
                $scope.layersOn.push({url:layer.url, options:layer.options});
                console.log('push')
            }
            
            console.log('Selected layers: ' + $scope.layersOn);
        };

    


	$scope.onMapLoad = function(map) {
		esriLoader.require([

		    'esri/toolbars/draw',
                'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleLineSymbol', "esri/symbols/SimpleFillSymbol",
                'esri/symbols/PictureFillSymbol', 'esri/symbols/CartographicLineSymbol',
                'esri/graphic',
                'esri/Color', "esri/renderers/SimpleRenderer",
                "esri/dijit/Print", "dojo/dom",
                "esri/dijit/Measurement",
                "dojo/_base/lang", "esri/geometry/Geometry",  "esri/tasks/GeometryService",  "esri/tasks/AreasAndLengthsParameters",  "esri/geometry/Extent","esri/SpatialReference",
                "esri/config", "esri/dijit/Legend", "esri/geometry/Extent"
            ], function(
                Draw,
                SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
                PictureFillSymbol, CartographicLineSymbol,
                Graphic,
                Color, SimpleRenderer,
                Print, dom,
                Measurement,
                lang, Geometry, GeometryService, AreasAndLengthsParameters, Extent, SpatialReference,
                config, Legend, Extent
            ) {


             // print dijit
		        var printer = new Print({
		          map: map,
		          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
		        }, dom.byId("printButton"));
		        printer.startup();	


		    $scope.renderNow = function(){

			    var visibleLayers = map.getLayersVisibleAtScale();
                $scope.layer1 = visibleLayers[1];
                console.log($scope.layer1.renderer.symbol.color)
                $scope.clicked++
                var symbol = new SimpleFillSymbol().setColor(new Color([100,255,100,0.5]));
                var renderer = new SimpleRenderer(symbol);
                $scope.layer1.setRenderer(renderer)
                $scope.layer1.redraw();
                console.log($scope.layer1.renderer.symbol.color)
                $scope.$digest();

		      }



			if (!$cookies.getObject('test') || $cookies.getObject('test').length === 0){
				var bookmarks = [
					{
						name: "LI",
						extent: new Extent(map.extent)
					}
					]
				
				 $cookies.putObject('test', bookmarks)
				}
				else{
					$scope.bookmarks = $cookies.getObject('test')
					$scope.bookmarks.forEach(function(bookmark){
						bookmark.extent = new Extent(bookmark.extent)
					})
		      		
				}


		      $scope.extentFinder = function(){
		      	$scope.testExtent = map.extent
		      	$scope.bookmarks.push({name:$scope.newBookmarkName, extent: map.extent})
		      	$scope.newBookmarkName = "";
				$cookies.putObject('test', $scope.bookmarks);
		      }

		      $scope.removeBookmark = function(index){
		      	$scope.bookmarks.splice(index, 1);
		      	$cookies.putObject('test', $scope.bookmarks);
		      }

		      $scope.zoomToExtent = function(newExtent){
		      	map.setExtent(newExtent);
		      }

		    // Measure 


		    //identify proxy page to use if the toJson payload to the geometry service is greater than 2000 characters.
			//If this null or not available the project and lengths operation will not work.  Otherwise it will do a http post to the proxy.
			// esriConfig.defaults.io.proxyUrl = "/proxy/";
			// esriConfig.defaults.io.alwaysUseProxy = false;



			//to do 

			//Create new legend Create unique rendering class
			$scope.styleInit = function(){
				$scope.layers.forEach(function(layer){
					var singleLayer = map.getLayer(layer.options.id)
					if (singleLayer.types.length > 0 && layer.style.type == 'polygon'){
						for(var i = 0; i < singleLayer.types.length; i++){
							var layerColors = singleLayer.renderer._symbols[i].symbol
							var fillColor = layerColors.getStroke().toCss(true);
							var outlineColor = layerColors.getFill().toCss(true);
							layer.style.typeIdField = singleLayer.typeIdField
							layer.style.tblField.push({name: singleLayer.renderer._symbols[i].label, fill: fillColor, outline: outlineColor})
						}
					}
					else if(singleLayer.types.length > 0 && layer.style.type == 'polyline'){
						console.log(singleLayer.visible)
						singleLayer.renderer.infos.forEach(function(subLayer){
							var name = subLayer.label;
							var color = subLayer.symbol.color.toCss(true);
							layer.style.typeIdField = singleLayer.typeIdField
							layer.style.tblField.push({name:name, fill: color})
						})
					}
					else if(layer.style.type === 'point'){
						console.log(singleLayer.renderer)
						if(singleLayer.renderer.defaultSymbol.type === "picturemarkersymbol"){
							var defaultImage = singleLayer.renderer.defaultSymbol.url
							layer.style.tblField.push({name:singleLayer.renderer.defaultLabel, fill: "url('"+defaultImage+"') no-repeat center"})
						}
						console.log('here')
						for(var k = 0; k < singleLayer.renderer.values.length; k++){
							var fieldSymbol = singleLayer.renderer._symbols[singleLayer.renderer.values[k]];
							console.log(fieldSymbol)
							if(fieldSymbol.symbol.type === "picturemarkersymbol"){
								var fieldImage = fieldSymbol.symbol.url;
								layer.style.tblField.push({name:fieldSymbol.label, fill: "url('"+fieldImage+"') no-repeat center"})
							}
						}	
					}
					else{
						console.log(singleLayer)
						var layerColors = singleLayer.renderer.getSymbol();
						var fillColor = layerColors.getFill().toCss(true);
						var outlineColor = layerColors.getStroke().color.toCss(true);
						layer.style.tblField.push({name:'default', fill: fillColor, outline: outlineColor})
					}
				})
				console.log($scope.layers)
			}

			var doneOnce = false;
			$scope.legendVisible = false;
			$scope.showLegend = function(){
				$scope.legendVisible = !$scope.legendVisible;
				if(doneOnce === false){
					$scope.styleInit();
					doneOnce = true;
				}
			}

			var measureLine;
			$scope.resultLength = 0;

			function initMeasureToolbar(mapObj) {  
				var lengthParams = new esri.tasks.LengthsParameters();
                map = mapObj;
                measureLine = new Draw(map);
                measureLine.on('draw-end', function(e) {
                    $scope.$apply(function() {
                        addMeasureGraphic(e);
                        lengthParams.polylines = [e.geometry];
						lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
						lengthParams.geodesic = true;
						geometryService.lengths(lengthParams)
						.then(function(result){
							$scope.resultLength = (result.lengths[0])
							$scope.$digest;
						});
                    });
                });

                // set the active tool once a button is clicked
                $scope.activateMeasureTool = activateMeasureTool;
            }

            

		    var mLineSymbol = new CartographicLineSymbol(
                            CartographicLineSymbol.STYLE_SOLID,
                            new Color([255, 10, 10]), 2,
                            CartographicLineSymbol.CAP_ROUND,
                            CartographicLineSymbol.JOIN_MITER, 2
                    );


		    function activateMeasureTool(tool) {
                    map.disableMapNavigation();
                    measureLine.activate('polyline');
                }


            initMeasureToolbar(map);


             function addMeasureGraphic(evt) {
                    //deactivate the toolbar and clear existing graphics
                    measureLine.deactivate();
                    map.enableMapNavigation();
                    // figure out which symbol to use
                    var symbol;
                    if (evt.geometry.type === 'point' || evt.geometry.type === 'multipoint') {
                        symbol = markerSymbol;
                    } else if (evt.geometry.type === 'line' || evt.geometry.type === 'polyline') {
                        symbol = mLineSymbol;
                    } else {
                        symbol = fillSymbol;
                    }
                    map.graphics.add(new Graphic(evt.geometry, symbol));
                    console.log(map.graphics)
                }
				var geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
				geometryService.on("lengths-complete", function(e){
            		map.graphics.remove(map.graphics.graphics[map.graphics.graphics.length-1])
            })

			// function getAreaAndLength(evtObj) {
		 //      var map = this,
		 //          geometry = evtObj.geometry;
		 //      map.graphics.clear();
		      
		 //      var graphic = map.graphics.add(new Graphic(geometry, new SimpleFillSymbol()));
		      
		 //      //setup the parameters for the areas and lengths operation
		 //      var areasAndLengthParams = new AreasAndLengthsParameters();
		 //      areasAndLengthParams.lengthUnit = GeometryService.UNIT_FOOT;
		 //      areasAndLengthParams.areaUnit = GeometryService.UNIT_ACRES;
		 //      areasAndLengthParams.calculationType = "geodesic";
		 //      geometryService.simplify([geometry], function(simplifiedGeometries) {
		 //        areasAndLengthParams.polygons = simplifiedGeometries;
		 //        geometryService.areasAndLengths(areasAndLengthParams);
		 //      });
		 //    }


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