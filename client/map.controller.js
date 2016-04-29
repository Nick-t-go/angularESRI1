
app.controller('MapCtrl', function($scope, esriLoader, customRenderer, $timeout, RelatedDocuments) {

	$scope.map = {
				basemap:'topo',
	            options: {
	                basemap: 'topo',
	                center: [-73.1350,40.7891],
	                zoom: 10,
	                sliderStyle: 'small'
	            }
	        };

	$scope.tools = {
		About: false,
		Measure:false, 
		Bookmarks:false, 
		"Basemap Gallery": false, 
		Draw: false,
		Print:false,
		"Select & View": false
		}; 

	$scope.test = function(){
		console.log('test');
	};
	

	$scope.toggleTools = function (tool) {
	 		if( $scope.tools[tool] === false ){
	 			$scope.tools[tool]=true;
	 		}
        };       

	$scope.layers = [
		 {
		 	name: 'Sewer Outlines',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	//'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	visible: true,
			renderOptions: [],
		  	options: {
		  		id:"Outlines",
		  		outFields: ['OBJECTID', 'PkContractOutlineID', 'SDShortName', 'ContractNumber']
		  	},
		  	style: {
	  			type: "polygon",
	  			tblField: []
	  		},
		 },
		 {
		 	name: 'Sewer Districts',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/9',
		  	visible: true,
		  	renderOptions: [],	
		  	options: {
		  		id:"Districts",
		  		outFields: ['OBJECTID', 'SdLocality', 'SDShortName', 'PkSewerDistrict', 'SdLongName']
		  	},
		  	style: {
	  			type: "polygon",
	  			tblField: []
	  		}
		 },
		 {
		 	name: 'Sewer Mains',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/2',
		  	visible: true,
		  	renderOptions: [],
		  	options: {
		  		id:"Mains",
		  		outFields: ['OBJECTID', 'FkPipeSewerDistrict', 'YearBuilt', 'dPipeLifeCycleStatus']
		  	},
	  		style: {
	  			type: "polyline",
	  			tblField: []
	  		}
		 },
		 {
		 	name: 'Manholes',
		 	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/0',
		 	visible: true,
		 	renderOptions: ['investigationStatus','horizontalQuality','verticalQuality'],
		 	options: {
		 		id:"Manholes",
		 		outFields: ['OBJECTID', "MhYearBuilt", "FkMhHorizontalQuality", 'FkMhVerticalQuality']
		 	},
		 	style: {
	  			type: "point",
	  			tblField: []
	  		}
		 }
	 ];

	 $scope.layersOn = [];

	 $scope.layers.forEach(function(layer){
	 	$scope.layersOn.push({url:layer.url, options:layer.options});
	 });

	 $scope.toggleLayer = function (layer) {
	 		var push = true;
            for(var j = 0; j < $scope.layersOn.length; j++){
            	if ($scope.layersOn[j].url === layer.url){
	                $scope.layersOn.splice(j, 1);

	                push = false;
	                break;
	            }
	        }
            if(push === true){
                $scope.layersOn.push({url:layer.url, options:layer.options});
            }
        };

    

	$scope.onMapLoad = function(map) {
		esriLoader.require([

		    'esri/toolbars/draw',
                'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleLineSymbol', "esri/symbols/SimpleFillSymbol",
                'esri/symbols/PictureFillSymbol', 'esri/symbols/CartographicLineSymbol',
                'esri/graphic', "esri/tasks/RelationshipQuery",
                'esri/Color', "esri/renderers/SimpleRenderer", "esri/symbols/PictureMarkerSymbol", "esri/renderers/UniqueValueRenderer",
                "esri/dijit/Print", "dojo/dom",
                "esri/dijit/Measurement", "esri/tasks/query",
                "dojo/_base/lang", "esri/geometry/Geometry",  "esri/tasks/GeometryService",  "esri/tasks/AreasAndLengthsParameters", "esri/SpatialReference",
                "esri/config", "esri/dijit/Scalebar"
            ], function(
                Draw,
                SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
                PictureFillSymbol, CartographicLineSymbol,
                Graphic, RelationshipQuery, 
                Color, SimpleRenderer, PictureMarkerSymbol, UniqueValueRenderer,
                Print, dom,
                Measurement, Query,
                lang, Geometry, GeometryService, AreasAndLengthsParameters, SpatialReference,
                config, Scalebar
            ) {


             // print dijit
		        var printer = new Print({
		          map: map,
		          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
		        }, dom.byId("printButton"));
		        printer.startup();	



		    var scalebar = new Scalebar({
			    map: map,
			    attachTo: "bottom-center"
			  });



	        initSelectToolbar();    

	        $scope.esriMapObject = map;

	        $scope.$broadcast('map-loaded', map);

	        $scope.changeRendering = function(legendLayer, renderField){
	        	var idx = $scope.layers.indexOf(legendLayer);
	        	var layer = map.getLayer(legendLayer.options.id);
	        	customRenderer[renderField](layer, legendLayer);
	        	$scope.layers[idx].style = legendLayer.style;
	        	layer.redraw();
	        };

		    $scope.renderNow = function(){

			    var visibleLayers = map.getLayersVisibleAtScale();
                $scope.layer1 = visibleLayers[1];
                console.log($scope.layer1.renderer.symbol.color);
                $scope.clicked++;
                var symbol = new SimpleFillSymbol().setColor(new Color([100,255,100,0.5]));
                var renderer = new SimpleRenderer(symbol);
                $scope.layer1.setRenderer(renderer);
                $scope.layer1.redraw();
                console.log($scope.layer1.renderer.symbol.color);
                $scope.$digest();

		      };

		    // Measure 


		    //identify proxy page to use if the toJson payload to the geometry service is greater than 2000 characters.
			//If this null or not available the project and lengths operation will not work.  Otherwise it will do a http post to the proxy.
			// esriConfig.defaults.io.proxyUrl = "/proxy/";
			// esriConfig.defaults.io.alwaysUseProxy = false;
			var selectionToolbar;
		    $scope.newSelection = ""; 

		    function initSelectToolbar() {
			    selectionToolbar = new Draw(map);
			    var selectQuery = new Query();

			    selectionToolbar.on("DrawEnd", function(geometry) {
			        selectionToolbar.deactivate();
			        selectQuery.geometry = geometry;
			        $scope.newSelection.selectFeatures(selectQuery, $scope.newSelection.SELECTION_NEW);
			        $scope.newSelectedFeatures = $scope.newSelection.getSelectedFeatures();	        
			        $scope.showSelected = true;
			        console.log($scope.newSelectedFeatures);
			        $scope.$digest();
			    });
			}

			$scope.currentScale = map.getScale();

			map.on('zoom-end', function(){
				$scope.currentScale = map.getScale();
				if($scope.newSelection && $scope.newSelection.minScale > $scope.currentScale){
					$scope.scaleMessage = false;
					$scope.$digest();
				}
				else if($scope.newSelection && $scope.newSelection.minScale < $scope.currentScale){
					$scope.scaleMessage = "Layer must be visible to select features. Please zoom in.";
					$scope.$digest();
				}
			});

			$scope.change = function(){
				if($scope.highlightOnMouseOver){
					$scope.highlightOnMouseOver.remove();
					$scope.highlightOnMouseOut.remove();
					$scope.newSelection.clearSelection();
				}

				$scope.showSelected = false;
				$scope.showRelatedDocs = false;
    			$scope.newSelection = map.getLayer($scope.userSelectedLayer.options.id);

    			if($scope.newSelection.minScale < $scope.currentScale){
    				$scope.scaleMessage = "Layer must be visible to select features. Please zoom in.";
    			} else{
    				$scope.scaleMessage = false;
    			}
    			
    			var fieldsSelectionSymbol = {
    				polygon: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
	            		new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
	          			new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.5])),
    				point: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 30,
		    			new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
		    			new Color([255,0,0]), 1),new Color([255,255,0,0.6])),
    				polyline: new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]),15)
    			};
          			
          		$scope.newSelection.setSelectionSymbol(fieldsSelectionSymbol[$scope.userSelectedLayer.style.type]);
          		$scope.outFields = $scope.newSelection._outFields;

          		$scope.highlightOnMouseOver = $scope.newSelection.on('mouse-over', function(evt){
		        	var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol[$scope.userSelectedLayer.style.type]);
	          		map.graphics.add(highlightGraphic);
		        });
				$scope.highlightOnMouseOut = $scope.newSelection.on('mouse-out', unHighlight);
    		};

    		$scope.selectByExtent = function(){
    			measurement.setTool("area", false);
                measurement.setTool("distance", false);
                measurement.setTool("location", false);
    			selectionToolbar.activate(Draw.EXTENT);
    		};

    		$scope.selectByClick = function(){
    			if($scope.newSelection){
    				console.log($scope.newSelection);
	    			measurement.setTool("area", false);
	                measurement.setTool("distance", false);
	                measurement.setTool("location", false);

			        

	                var singleSelectQuery = new Query();
	                $scope.newSelection.on('click', function(evt){	
	                	singleSelectQuery.geometry = evt.mapPoint;
	                	$scope.newSelection.selectFeatures(singleSelectQuery, $scope.newSelection.SELECTION_NEW, function(selection){
	                		$scope.newSelectedFeatures = selection;
	                		$scope.showSelected = true;
	                		$scope.$digest();
	                	});

	                });
	            }
    		};
	
    		$scope.showRelatedDocs= false;


 			$scope.checkRecords = function(itemId){

 				RelatedDocuments.findRelated(itemId, $scope.newSelection)
 				.then(function(records){
 					console.log(records);
 					$scope.relatedRecords = records;
 					$scope.relationshipClasses = Object.keys(records);
 					if(Object.keys(records).length === 0){
 						console.log('sent');
 						$scope.$broadcast('message',{message: 'No Related Documents Found.', type: 'alert-danger', time: 5000});
 					}
 					$scope.selectedFeatureId = itemId;
 					$scope.showRelatedDocs = true;
 			 		$scope.relationShow = $scope.relationshipClasses[0];
 				});
 			};

 			$scope.turnOffRelatedDocs = function(){
 				$scope.showRelatedDocs = false;
 			};

 			$scope.changeTable = function(relation){
 				$scope.relationShow = relation;
 			};

 			var highlightSymbol = {
 				polygon:  new SimpleFillSymbol(
		          SimpleFillSymbol.STYLE_SOLID,
		          new SimpleLineSymbol(
		            SimpleLineSymbol.STYLE_SOLID,
		            new Color([255,0,0]), 3),
		          new Color([125,125,125,0.35])
		        ),
 				point: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 15,
    			new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    			new Color([255,0,0]), 1),new Color([125,125,125,0.35])),
    			polyline: new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]),15)
 			};
	        

	      	$scope.featureTableMouseOver = function(id){
	      		var queryOne = new Query();
	      		queryOne.objectIds = [id];
	      		queryOne.where = "OBJECTID = '" + id + "'";
	      		$scope.newSelection.selectFeatures(queryOne, $scope.newSelection.SELECTION_NEW);
	      	};
	        
	       
	        function unHighlight(){
	        	map.graphics.clear();
	        }

			//Create new legend Create unique rendering class
			$scope.styleInit = function(){
				$scope.layers.forEach(function(layer){
					var singleLayer = map.getLayer(layer.options.id);
					if (singleLayer.types.length > 0 && layer.style.type == 'polygon'){
						for(var i = 0; i < singleLayer.types.length; i++){
							var layerColors = singleLayer.renderer._symbols[i].symbol;
							var fillColor = layerColors.getStroke().toCss(true);
							var outlineColor = layerColors.getFill().toCss(true);
							layer.style.typeIdField = singleLayer.typeIdField;
							layer.style.tblField.push({name: singleLayer.renderer._symbols[i].label, fill: fillColor, outline: outlineColor});
						}
					}
					else if(singleLayer.types.length > 0 && layer.style.type == 'polyline'){
						console.log(singleLayer.visible);
						singleLayer.renderer.infos.forEach(function(subLayer){
							var name = subLayer.label;
							var color = subLayer.symbol.color.toCss(true);
							layer.style.typeIdField = singleLayer.typeIdField;
							layer.style.tblField.push({name:name, fill: color});
						});
					}
					else if(layer.style.type === 'point'){
						console.log(singleLayer.renderer);
						if(singleLayer.renderer.defaultSymbol.type === "picturemarkersymbol"){
							var defaultImage = singleLayer.renderer.defaultSymbol.url;
							layer.style.typeIdField = singleLayer.renderer.attributeField;
							layer.style.tblField.push({name:singleLayer.renderer.defaultLabel, fill: "url('"+defaultImage+"') no-repeat center"});
						}
						for(var k = 0; k < singleLayer.renderer.values.length; k++){
							var fieldSymbol = singleLayer.renderer._symbols[singleLayer.renderer.values[k]];
							console.log(fieldSymbol);
							if(fieldSymbol.symbol.type === "picturemarkersymbol"){
								var fieldImage = fieldSymbol.symbol.url;
								layer.style.tblField.push({name:fieldSymbol.label, fill: "url('"+fieldImage+"') no-repeat center"});
							}
						}	
					}
					else{
						var layerColors = singleLayer.renderer.getSymbol();
						var fillColor = layerColors.getFill().toCss(true);
						var outlineColor = layerColors.getStroke().color.toCss(true);
						layer.style.tblField.push({name:'default', fill: fillColor, outline: outlineColor});
					}
				});
				console.log($scope.layers);
			};


			var doneOnce = false;
			$scope.legendVisible = false;
			$scope.showLegend = function(){
				$scope.legendVisible = !$scope.legendVisible;
				if(doneOnce === false){
					$scope.styleInit();
					doneOnce = true;
				}
			};


			//initMeasureToolbar(map);
            var measurement = new Measurement({
		          map: map
		        }, dom.byId("measurementDiv"));
		    measurement.startup();


			var tb; //draw Tool Bar i.e tb

			$scope.drawOptions = [
				{id: 'Point',name: 'Point'},{id: 'Multipoint', name: 'Multipoint'},{id: 'Line',name: 'Line'},
				{id: 'Polyline',name: 'Polyline'},{id: 'FreehandPolyline',name: 'Freehand Polyline'},
				{id: 'Triangle',name: 'Triangle'},{id: 'Extent',name: 'Rectangle'},
				{id: 'Circle',name: 'Circle'},{id: 'Ellipse',name: 'Ellipse'},
				{id: 'Polygon',name: 'Polygon'},{id: 'FreehandPolygon',name: 'Freehand Polygon'}
			];

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
			        new Color('#000'),1),42,42);

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
			    measurement.setTool("area", false);
			    measurement.setTool("distance", false);
			    measurement.setTool("location", false);
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
			}
			 // bind the toolbar to the map
			initToolbar(map);
		}
	)}
});