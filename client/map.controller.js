
app.controller('MapCtrl', function($scope, esriLoader, customRenderer, $timeout, RelatedDocuments) {

	$scope.map = {
				basemap:'topo',
	            options: {
	                basemap: 'topo',
	                showLabels : true,
	                center: [-73.1350,40.7891],
	                zoom: 11,
	                sliderStyle: 'small'
	            }
	        };

	$scope.tools = {
		About: true,
		Search: true,
		Measure:false, 
		Bookmarks:false, 
		"Basemap Gallery": true, 
		Draw: false,
		Print:false,
		"Select & View": true
		}; 

	$scope.test = function(test){
		console.log((test || 'test'));
	};
	

	$scope.toggleTools = function (tool) {
	 		if( $scope.tools[tool] === false ){
	 			$scope.tools[tool]=true;
	 		}
        };       

	$scope.layers = [
		{
		 	name: 'Sewer Districts',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/9',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",	
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
		 	name: 'Sewer Outlines',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	//'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	visible: true,
			renderOptions: [],
			currentRender: "",
		  	options: {
		  		id:"Outlines",
		  		outFields: ['OBJECTID', 'PkContractOutlineID', 'SDShortName', 'ContractNumber', 'ContractNumberAlt']
		  	},
		  	style: {
	  			type: "polygon",
	  			tblField: []
	  		},
		 },
		  {
		 	name: 'Manholes',
		 	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/0',
		 	visible: true,
		 	renderOptions: [{label:"Investigation Status", id:'investigationStatus'},{label: "Horizontal Quality", id:'horizontalQuality'},{label: "Vertical Quality", id: 'verticalQuality'}],
		 	currentRender: "horizontalQuality",
		 	options: {
		 		id:"Manholes",
		 		outFields: ['OBJECTID', "MhYearBuilt", "FkMhHorizontalQuality", 'FkMhVerticalQuality', 'InvestigationStatus']
		 	},
		 	style: {
	  			type: "point",
	  			tblField: []
	  		}
		 },
		 
		 {
		 	name: 'Sewer Mains',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/2',
		  	visible: true,
		  	renderOptions: [{label: "Pipe Sub Type", id:'PipeSubType'}],
		  	currentRender: "PipeSubType",
		  	options: {
		  		id:"Mains",
		  		outFields: ['OBJECTID', 'FkPipeSewerDistrict', 'YearBuilt', 'PipeSubType']
		  	},
	  		style: {
	  			type: "polyline",
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
	                if(layer.name === "Sewer Mains"){
	                	$scope.graphicsLayer.clear();
	                }
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
                "esri/dijit/Print", "dojo/dom", "esri/geometry/Circle",
                "esri/dijit/Measurement", "esri/tasks/query","esri/tasks/QueryTask", "esri/geometry/Point",
                "dojo/_base/lang", "esri/geometry/Geometry",  "esri/tasks/GeometryService",  "esri/tasks/AreasAndLengthsParameters", "esri/SpatialReference",
                "esri/config", "esri/dijit/Scalebar", "esri/layers/GraphicsLayer", "esri/tasks/PrintTemplate", "esri/geometry/Extent"
            ], function(
                Draw,
                SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
                PictureFillSymbol, CartographicLineSymbol,
                Graphic, RelationshipQuery, 
                Color, SimpleRenderer, PictureMarkerSymbol, UniqueValueRenderer,
                Print, dom, Circle,
                Measurement, Query,QueryTask, Point,
                lang, Geometry, GeometryService, AreasAndLengthsParameters, SpatialReference,
                config, Scalebar, GraphicsLayer, PrintTemplate, Extent
            ) {


             // print dijit
		        var printer = new Print({
			          map: map,
			          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
		        }, dom.byId("printButton"));
		        printer.startup();
		        printer.hide();
		      

		        esriConfig.defaults.io.corsEnabledServers.push("https://sampleserver6.arcgisonline.com/");

		    $scope.printTemplates = [{
		          	  label: "A4 Landscape",
					  format: "PDF",
					  layout: "A4 Landscape",
					  layoutOptions: {
					    titleText: "Sanitarty Sewers GIS",
					    copyrightText: "Suffolk County DPW",
					    scalebarUnit: "Miles"
						}

					}, {
						label: "A4 Portrait",	
						format: "PDF",
						layout: "A4 Portrait",
						layoutOptions: {
						    titleText: "Sanitarty Sewers GIS",
						    copyrightText: "Suffolk County DPW",
						    scalebarUnit: "Miles"
						}
					},
					{
						label: "Letter Landscape",
						format: "PDF",
						layout: "Letter ANSI A Landscape",
						layoutOptions: {
						    titleText: "Sanitarty Sewers GIS",
						    copyrightText: "Suffolk County DPW",
						    scalebarUnit: "Miles"
						}
					},
					{
						label: "Letter Portrait",
						format: "PDF",
						layout: "Letter ANSI A Portrait",
						layoutOptions: {
						    titleText: "Sanitarty Sewers GIS",
						    copyrightText: "Suffolk County DPW",
						    scalebarUnit: "Miles"
						}
					}
					];
		  

		    $scope.printedPage = {
		    						  status: "alert-info",
		    						  message: "Select Layout Size and Click Printer Icon to Print",
		    						  link: ""
		    						}; 

		    $scope.layoutChange = function(){
		    	$scope.printedPage = {
		    						  status: "alert-info",
		    						  message: "Select Layout Size and Click Printer Icon to Print",
		    						  link: ""
		    						}; 
		    };

		    $scope.initiatePrint = function(template){
		    	var temp = new PrintTemplate();
		    	temp.label = template.label;	
				temp.format = template.format;
				temp.layout = template.layout;
				temp.layoutOptions = template.layoutOptions;

		    	printer.printMap(temp);
		    	$scope.printedPage = {
		    						  status: "alert-warning",
		    						  message: "Please Wait While Your Print is Prepared",
		    						  link: ""
		    						};
		    					};

		    printer.on('print-complete',function(evt){
			    $scope.printedPage = {
		    						  status: "alert-success",
		    						  message: "Click Here To View Print Ready PDF",
		    						  link: evt.result.url
		    						};
		    						$scope.$digest();
		    						window.open(evt.result.url);
			});


			printer.on('error', function(error){
				$scope.printedPage = {
		    						  status: "alert-danger",
		    						  message: "Error Occured",
		    						  link: ""
		    						};
		    	console.log(error);
		    	$scope.$digest();
			});
			

		    var scalebar = new Scalebar({
			    map: map,
			    attachTo: "bottom-center"
			  });



	        initSelectToolbar();    

	        $scope.esriMapObject = map;

	        $scope.$broadcast('map-loaded', map);

	        $scope.changeRendering = function(legendLayer, renderField){
	        	if(renderField){	     
		        	legendLayer.currentRender = renderField;
		        	var idx = $scope.layers.indexOf(legendLayer);
		        	var layer = map.getLayer(legendLayer.options.id);
		        	customRenderer[renderField](layer, legendLayer, map);
		        	$scope.layers[idx].style = legendLayer.style;
		        	$scope.layers[idx].currentRender = renderField;
		        	layer.redraw();
		        }
	        };

		   
		    // Measure 

		    map.on('layer-add', function(evt){
		    	var layer = $scope.layers.filter(function(lyr){
		    		return lyr.options.id === evt.layer.id;
		    	});
		    	if(layer.length === 0) return;
		    	if(layer[0].currentRender){
		    		$scope.changeRendering(layer[0], layer[0].currentRender);
			    }
		    });
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
			        $scope.newSelectedFeatures.length > 0 ? $scope.showSelected = true: $scope.showSelected = false;
			        $scope.$digest();
			    });
			}

			$scope.currentScale = map.getScale();
			var homeExtent = new Extent({
				xmin: -8183238.450666123, ymin: 4943600.09971468, xmax: -8100227.837948534, ymax: 5023171.046159441,
				spatialReference: map.spatialReference});
			$scope.zoomHome = function(){
				map.setExtent(homeExtent);
				$scope.graphicsLayer.clear();
			};

			console.log(map.spatialReference);

			$scope.graphicsLayer = new GraphicsLayer({ id: "graphicsLayerA" }); 
            $scope.graphicsLayer.setMinScale(map.getLayer("Mains").minScale);
            $scope.graphicsLayer.setMaxScale(map.getLayer("Mains").maxScale);
            map.addLayer($scope.graphicsLayer);

			map.on('zoom-end', function(){
				$scope.graphicsLayer.clear();
				$scope.currentScale = map.getScale();
				var mainsMinScale = map.getLayer("Mains").minScale;
				if($scope.newSelection && $scope.newSelection.minScale > $scope.currentScale){
					$scope.scaleMessage = false;
					$scope.$digest();
				}
				else if($scope.newSelection && $scope.newSelection.minScale < $scope.currentScale){
					$scope.scaleMessage = "Layer must be visible to select features. Please zoom in.";
					$scope.$digest();
				}
				if($scope.currentScale <= mainsMinScale){
					$scope.addArrows = map.on('extent-change', function(event){
						$scope.graphicsLayer.clear();
						var setAngle = function(p1, p2) {
	                        var rise = Math.abs(p2[1]) - Math.abs(p1[1]);
	                        var run = Math.abs(p2[0]) - Math.abs(p1[0]);
	                        var angle = ((180 / Math.PI) * Math.atan2(run, rise));
	                        return angle - 270;
	            		};

		                var layer = map.getLayer("Mains"); 

		                var query = new Query();
			                query.geometry = event.extent;
			                query.spatialRelationship = Query.SPATIAL_REL_CONTAINS;
			                query.returnGeometry = true;
			                query.outFields = ["OBJECTID"];

		                featureSetQT = new QueryTask(layer.url);
		                featureSetQT.execute(query)
		                .then(function(featureSet) {
		                    featureSet.features.forEach(function(feature, idx, array) {
		                        for (var x in feature.geometry.paths[0]) {
		                        	if(x%2 !== 0){
		                        		
		                        	
		                            var pt1 = feature.geometry.paths[0][x];
		                            var pt2 = feature.geometry.paths[0][x - 1];
		                            if (pt2) {
		                                var midPoint = [(pt1[0] + pt2[0]) / 2, (pt1[1] + pt2[1]) / 2];
		                                var point = new Point(midPoint, map.spatialReference);
		                                var dot = new SimpleMarkerSymbol({ "color": new Color([32, 120, 0]), "size": 12, "angle": setAngle(pt1, pt2), "xoffset": 0, "yoffset": 0 });
		                                dot.setPath('M1,50l99.5,-50c0,0 -40,49.5 -40,49.5c0,0 39.5,50 39.5,50c0,0 -99,-49.5 -99,-49.5z');
		                                var dotGraphic = new Graphic(point, dot, {}, null);
		                                $scope.graphicsLayer.add(dotGraphic);
			                            	}
			                        	}
			                        }
			                    	});

			                	});
							});
					}
				else if($scope.addArrows) {
					$scope.addArrows.remove();
					$scope.graphicsLayer.clear();
				}
			});


		

			$scope.clearSelection = function(){
				$scope.newSelection.clearSelection();
				$scope.newSelectedFeatures = "";
				$scope.showSelected = false;
				$scope.showRelatedDocs = false;
			};

			$scope.change = function(){
				if($scope.highlightOnMouseOver){
					$scope.highlightOnMouseOver.remove();
					$scope.unhighlightOnMouseOut.remove();
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

          		
				
    		};

    		$scope.selectByExtent = function(){
    			if($scope.highlightOnMouseOver){
					$scope.highlightOnMouseOver.remove();
					$scope.unhighlightOnMouseOut.remove();
					$scope.newSelection.clearSelection();
				}
    			map.graphics.clear();
    			if($scope.selectEvent){
    				$scope.selectEvent.remove();
    			}
    			measurement.setTool("area", false);
                measurement.setTool("distance", false);
                measurement.setTool("location", false);
    			selectionToolbar.activate(Draw.EXTENT);
    		};

    		$scope.selectByClick = function() {

    		    selectionToolbar.deactivate();
    		    $scope.highlightOnMouseOver = $scope.newSelection.on('mouse-over', function(evt) {
    		        var highlightGraphic = new Graphic(evt.graphic.geometry, highlightSymbol[$scope.userSelectedLayer.style.type]);
    		        map.graphics.add(highlightGraphic);
    		    });
    		    $scope.unhighlightOnMouseOut = map.graphics.on('mouse-out', function(evt) {
    		        map.graphics.clear();
    		    });

    		    if ($scope.newSelection) {
    		        measurement.setTool("area", false);
    		        measurement.setTool("distance", false);
    		        measurement.setTool("location", false);

    		        var circle;
    		        $scope.selectEvent = map.on('click', function(evt) {
    		            circle = new Circle({
    		                center: evt.mapPoint,
    		                geodesic: true,
    		                radius: 10,
    		                radiusUnit: "esriFeet"
    		            });
    		            map.graphics.clear();
    		            map.infoWindow.hide();
    		            var graphic = new Graphic(circle);
    		            map.graphics.add(graphic);

    		            var query = new Query();
    		            query.geometry = circle.getExtent();
    		            //use a fast bounding box query. will only go to the server if bounding box is outside of the visible map
    		            $scope.newSelection.queryFeatures(query, function(selection) {
    		                if (selection.features.length > 0) {
    		                    var query = new Query();
    		                    query.objectIds = selection.features.map(function(feature){
    		                    	return feature.attributes.OBJECTID;
    		                    });
    		                    $scope.newSelection.selectFeatures(query, $scope.newSelection.SELECTION_NEW, function(results) {
    		                        $scope.newSelectedFeatures = results;
    		                        results.length > 0 ? $scope.showSelected = true : $scope.showSelected = false;
    		                        $scope.$digest();
    		                    });
    		                }
    		            });
    		        });
    		    }
    		};



			
    	
	
    		$scope.showRelatedDocs= false;


 			$scope.checkRecords = function(itemId){

 				RelatedDocuments.findRelated(itemId, $scope.newSelection)
 				.then(function(records){
 					$scope.relatedRecords = records;
 					$scope.relationshipClasses = Object.keys(records);
 					if(Object.keys(records).length === 0){
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
	        
	       
	        $scope.unHighlight = function(){
	        	map.graphics.clear();
	        };

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
					else if(layer.currentRender){
						$scope.changeRendering(layer, layer.currentRender);
					}
					else if(singleLayer.types.length > 0 && layer.style.type == 'polyline'){
						singleLayer.renderer.infos.forEach(function(subLayer){
							var name = subLayer.label;
							var color = subLayer.symbol.color.toCss(true);
							layer.style.typeIdField = singleLayer.typeIdField;
							layer.style.tblField.push({name:name, fill: color});
						});
					}
					else if(layer.style.type === 'point'){
						if(singleLayer.renderer.defaultSymbol.type === "picturemarkersymbol"){
							var defaultImage = singleLayer.renderer.defaultSymbol.url;
							layer.style.typeIdField = singleLayer.renderer.attributeField;
							layer.style.tblField.push({name:singleLayer.renderer.defaultLabel, fill: "url('"+defaultImage+"') no-repeat center"});
						}
						for(var k = 0; k < singleLayer.renderer.values.length; k++){
							var fieldSymbol = singleLayer.renderer._symbols[singleLayer.renderer.values[k]];
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
				{id: 'Point',name: 'Point', icon: 'flag', help: 'Click on map to place 1 point'},{id: 'Multipoint', name: 'Multipoint', icon: 'option-horizontal', help: 'Click on map to place a point, double-click to create'},{id: 'Line',name: 'Line', icon: 'minus', help: "Click and hold down mouse, release to finish line"},
				{id: 'Polyline',name: 'Polyline', icon: 'minus', help: "Click map to place line verticies, double-click to end line"},{id: 'FreehandPolyline',name: 'Freehand Polyline', icon: 'pencil', help: "Click and hold to draw, release to end sketch"},
				{id: 'Triangle', name: 'Triangle' ,icon: 'triangle-top', help: "Click on map and hold button to size triangle"},{id: 'Extent',name: 'Rectangle', icon: 'stop', help: 'Click on map and hold to size rectangle'},
				{id: 'Circle',name: 'Circle', icon: "repeat", help: "Click on map and hold to size circle"},{id: 'Ellipse',name: 'Ellipse', icon: "repeat", help: "Click on map and hold to size ellipse"},
				{id: 'Polygon',name: 'Polygon',icon: 'unchecked', help: "Click on map to start shape, click to place vertex, double click to complete sketch"},{id: 'FreehandPolygon',name: 'Freehand Polygon', icon: 'pencil', help:'Click and hold to draw polygon release to complete sketch'}
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
			var fillSymbol = new SimpleFillSymbol().setColor(new Color([0, 0, 180, 0.25]));

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

			function activateDrawTool(tool, help) {

				$scope.helpMessage = help;
			    map.disableMapNavigation();
			    measurement.setTool("area", false);
			    measurement.setTool("distance", false);
			    measurement.setTool("location", false);
			    tb.activate(tool.toLowerCase());
			}


			$scope.drawGraphicsLayer = new GraphicsLayer({ id: "graphicsLayerB" }); 
			map.addLayer($scope.drawGraphicsLayer);

			$scope.removeLast = function(){
				$scope.drawGraphicsLayer.remove($scope.drawGraphicsLayer[$scope.drawGraphicsLayer.graphics.length-1]);
				$scope.drawGraphicsLayer.refresh();
			};

			$scope.removeAll = function(){
				$scope.drawGraphicsLayer.clear();
			};

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

			    $scope.drawGraphicsLayer.add(new Graphic(evt.geometry, symbol));
			}
			 // bind the toolbar to the map
			initToolbar(map);
		}
	)}
});