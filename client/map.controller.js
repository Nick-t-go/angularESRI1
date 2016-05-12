
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
		About: false,
		Search: true,
		Measure:false, 
		Bookmarks:false, 
		"Basemap Gallery": false, 
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
		  		outFields: ['OBJECTID', 'SdLocality', 'SDShortName', 'dSdLifeCycleStatus', 'SdLongName'],
		  		infoTemplate: {
		  			title: '<b>Sewer Districts Info</b>',
		  			content: 'Locality: ${SdLocality}<br>Long Name: ${SdLongName}<br>Short Name: ${SDShortName}<br>Life Cycle Status: ${dSdLifeCycleStatus}'
		  		}
		  	},
		  	style: {
	  			type: "polygon",
	  			tblField: []
	  		}
		 },
		 {
		 	name: 'Sewer Contract Outlines',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	//'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	visible: true,
			renderOptions: [],
			currentRender: "",
		  	options: {
		  		id:"Outlines",
		  		outFields: ['OBJECTID', 'ContractNumber', 'ContractNumberAlt'],
		  		infoTemplate: {
		  			title: '<b>Sewer Contract Outlines</b>',
		  			content: 'Contract Number: ${ContractNumber}<br> Alt Contract Number: ${ContractNumberAlt}'
		  		}
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
		 		outFields: ['OBJECTID','HansenMatchStatus','MhYearBuilt', 'dMhLifeCycleStatus', 
		 		'LastFieldSurveyDate', 'FlushCount', 'CoverLocationDate', 'MhRimElevRecord', 'MhRimElevNAVD88',
		 		'MHsubType','MhContractNumber','dCountyResponsible','MhContractName', 'UnitID',
		 		 "FkMhHorizontalQuality", 'FkMhVerticalQuality', 'InvestigationStatus'],
		 		infoTemplate: {
		  			title: '<b>Manholes</b>',
		  			content: 'Contract Number: ${MhContractNumber}<br>Contract Name: ${MhContractName}<br>Hansen Unit ID: ${UnitID}<br>'+
                             'County Responsible?: ${dCountyResponsible}<br> Hansen Match Status: ${HansenMatchStatus }<br>' +
                             'Manhole Type: ${MHsubType}<br> Rim Elevation Record: ${MhRimElevRecord}<br> Rim Elevation NAVD88: ${MhRimElevNAVD88}<br>' + 
                             'Flush Count: ${FlushCount}<br> Horizontal Quality: ${FkMhHorizontalQuality}<br> Vertical Quality: ${FkMhVerticalQuality}<br>' +
                             'Cover Location: ${CoverLocationDate}<br> Last Field Survey: ${LastFieldSurveyDate}<br> Life Cycle Status: ${dMhLifeCycleStatus}<br> Year Built: ${MhYearBuilt}'
		  		}
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
		  		outFields: ['OBJECTID', 'FkPipeSewerDistrict', 'YearBuilt', 'PipeSubType', 'FkPipeContractID', 'PipeContractNumber', 'PipeContractName',
		  		'dCountyResponsible', 'dPipeDiameterRecord', 'dPipeMaterialRecord', 'dPipeClassRecord', 'LengthRecord', 'SlopeRecord',
		  		 'InvertUpRecord', 'InvertDownRecord', 'InvertUpNAVD1988', 'InvertDownNAVD1988', 'dPipeLifeCycleStatus'],
		  		infoTemplate: {
		  			title: '<b>Sewer Mains</b>',
		  			content: ' Contract ID:${FkPipeContractID}<br> Contract Number: ${PipeContractNumber}<br>'+
		  			'Contract Name: ${PipeContractName}<br>County Responsible?: ${dCountyResponsible}<br> Diameter: ${dPipeDiameterRecord}<br>' +   
                    'Material: ${dPipeMaterialRecord}<br>Pipe Class: ${dPipeClassRecord}<br>Record Length: ${LengthRecord}<br>'+  
                    'Slope Record: ${SlopeRecord}<br>Pipe Type: ${PipeSubType}<br>Upstream Invert: ${InvertUpRecord}<br>' +
                    'Downstream Invert: ${InvertDownRecord}<br> Upstream Invert - 1988 Datum: ${InvertUpNAVD1988}<br>' +  
                    'Downstream Invert - 1988 Datum: ${InvertDownNAVD1988}<br>Life Cycle Status: ${dPipeLifeCycleStatus}<br> Year Built: ${YearBuilt}'
		  			
		  		}
		  	},
	  		style: {
	  			type: "polyline",
	  			tblField: []
	  		}
		 },
		 {
		 	name: 'Sewer Interceptors',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/1',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "interceptorDefault",
		  	options: {
		  		id:"Interceptors",
		  		outFields: ['OBJECTID', 'InterceptorName'],
		  		infoTemplate: {
		  			title: '<b>Sewer Interceptors</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polyline",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Main Casings',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/3',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Castings",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Main Casings</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polyline",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Easements',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/4',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Easements",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Easements</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Pump Stations',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/5',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Stations",
		  		outFields: ['FkPsContractID','ProjectName','dPsSewerDistrict', 'PsLocation', 'FkParcelID','dLifeCycleStatus', 'StructureDescription','dCountyResponsible', 'PsManufacturer',
		  						'FkPsType', 'PsNumberOfUnits','PsUnitIDnumbers', 'CapacityGPM', 'TotalHeadFeet', 'MotorHP', 'MotorRPM', 'MotorElectric' ],    
		  		infoTemplate: {
		  			title: '<b>Sewer Pump Stations</b>',
		  			content: 'Contract Number: ${FkPsContractID}<br> Contract Name: ${ProjectName}<br>Sewer District: ${dPsSewerDistrict}<br>Location: ${PsLocation}<br>Tax Parcel ID: ${FkParcelID}<br>' +
		  			'Life Cycle Status: ${dLifeCycleStatus}<br>Structure Description: ${StructureDescription}<br>County Responsible: ${dCountyResponsible}<br>Manufacturer: ${PsManufacturer}<br>' +
		  			'Type: ${FkPsType}<br>Number of Units: ${PsNumberOfUnits}<br>Unit ID Numbers: ${PsUnitIDnumbers}<br>Capacity (GPM): ${CapacityGPM}<br>Total Head (Ft.): ${TotalHeadFeet}<br>' +
		  			'Motor Electric: ${MotorElectric}<br>Motor RPM: ${MotorRPM}<br>Motor Horsepower: ${MotorHP}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Treatment Plants',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/6',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Plants",
		  		outFields: ['StpName','StpAddress', 'FkStpOwner','dStpSewerDistrict', 'SpdesPermitNumber', 'dCountyResponsible',
		  					'dStpProcess', 'StpFlowDesignMGD', 'StpFlowPermittedMGD', 'StpFlowAnnualAverageMGD', 'StpFlowOverflowCapacityMGD',
		  					  'StpFlowAnnualAverageMGD', 'StpFlowOverflowCapacityMGD', 'dStpDischargeMethod', 'dLifeCycleStatus', 'StpRemarks'],
		  		infoTemplate: {
		  			title: '<b>Sewer Treatment Plants</b>',
		  			content: 'Plant Name: ${StpName}<br> Location: ${StpAddress}<br> Hamlet: ${StpHamletAddress}<br>Owner: ${FkStpOwner}'+ 
                    'District: ${dStpSewerDistrict}<br>SPDES Permit #: ${SpdesPermitNumber}<br>County Responsible? ${dCountyResponsible} <br>'+
                    'Process ${dStpProcess}<br>Design Flow(MGD): ${StpFlowDesignMGD}<br>Permitted Flow (MGD): ${StpFlowPermittedMGD}<br>' + 
                    'Annual Average Flow (MGD): ${StpFlowAnnualAverageMGD} <br>Overflow Capacity (MGD): ${StpFlowOverflowCapacityMGD} <br>' +
                    'Discharge Method: ${dStpDischargeMethod} <br>Life Cycle Status: ${dLifeCycleStatus} <br>Remarks: ${StpRemarks}'
		  		} 
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Sheet Outlines',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/7',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"SheetOutlines",
		  		outFields: ['OBJECTID', 'ContractNumber', 'ContractName', 'SheetNumA', 'SheetDescription', 'dDocumentType', 'WebRelativeImagePath'],
		  		infoTemplate: {
		  			title: '<b>Sewer Sheet Outlines</b>',
		  			content: 'Contract Number: ${ContractNumber}<br>Contract Name: ${ContractName}<br>Sheet Number: ${SheetNumA}<br>Sheet Description: ${SheetDescription}<br> Document Type: ${dDocumentType}<br>Path: <a href=${WebRelativeImagePath}>${WebRelativeImagePath}</a>'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Problems',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/10',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Problems",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Problems</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Contractee Parcels',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/11',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"ContracteeParcels",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Contractee Parcels</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'House Connection Permits',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/12',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"ConnectionPermits",
		  		outFields: ['OBJECTID', 'TaxParcelID', 'PermitNumber', 'Comments', 'WebRelativeImagePath'],
		  		infoTemplate: {
		  			title: '<b>House Connection Permits</b>',
		  			content: 'Tax Parcel ID: ${TaxParcelID}<br>Permit Number: ${PermitNumber}<br>Comments: ${Comments}<br>Path: <a href=${WebRelativeImagePath}>${WebRelativeImagePath}</a><br>'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Aerial Photo Centers',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/15',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"PhotoCenters",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Aerial Photo Centers</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "point",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Possible Easement Parcels',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/17',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"EasementParcels",
		  		outFields: ['PARCELID', 'LAST_NAME', 'STREET', 'CITY', "MAIL_ZIP", "OWNER_NAME"],
		  		infoTemplate: {
		  			title: '<b>Possible Easement Parcels</b>',
		  			content: 'Tax Map: ${PARCELID} <br> Last Name: ${LAST_NAME} <br> Street: ${STREET}<br> City: ${CITY}<br> Mail Zip: ${MAIL_ZIP}<br> Owner Name: ${OWNER_NAME}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},	
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
	                if(layer.name === "Sewer Interceptors"){
	                	$scope.interceptorGraphics.clear();
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
                "dojo/dom", "esri/geometry/Circle",
                "esri/dijit/Measurement", "esri/tasks/query","esri/tasks/QueryTask", "esri/geometry/Point",
                "dojo/_base/lang", "esri/geometry/Geometry",  "esri/tasks/GeometryService",  "esri/tasks/AreasAndLengthsParameters", "esri/SpatialReference",
                "esri/config", "esri/dijit/Scalebar", "esri/layers/GraphicsLayer",  "esri/geometry/Extent"
            ], function(
                Draw,
                SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
                PictureFillSymbol, CartographicLineSymbol,
                Graphic, RelationshipQuery, 
                Color, SimpleRenderer, PictureMarkerSymbol, UniqueValueRenderer,
                dom, Circle,
                Measurement, Query,QueryTask, Point,
                lang, Geometry, GeometryService, AreasAndLengthsParameters, SpatialReference,
                config, Scalebar, GraphicsLayer,  Extent
            ) {


             
			

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

		    

			$scope.currentScale = map.getScale();
			var homeExtent = new Extent({
				xmin: -8183238.450666123, ymin: 4943600.09971468, xmax: -8100227.837948534, ymax: 5023171.046159441,
				spatialReference: map.spatialReference});
			$scope.zoomHome = function(){
				map.setExtent(homeExtent);
				$scope.graphicsLayer.clear();
			};


			$scope.graphicsLayer = new GraphicsLayer({ id: "graphicsLayerA" }); 
            $scope.graphicsLayer.setMinScale(map.getLayer("Mains").minScale);
            $scope.graphicsLayer.setMaxScale(map.getLayer("Mains").maxScale);
            map.addLayer($scope.graphicsLayer);

            
            var renderLines = true;
			map.on('zoom-end', function(){
				$scope.graphicsLayer.clear();
				$scope.currentScale = map.getScale();
				if(renderLines === true){
					renderLines = false;
					renderArrowLines();
				};
				
				if($scope.newSelection && $scope.newSelection.minScale > $scope.currentScale){
					$scope.scaleMessage = false;
					$scope.$digest();
				}
				else if($scope.newSelection && $scope.newSelection.minScale < $scope.currentScale){
					$scope.scaleMessage = "Layer must be visible to select features. Please zoom in.";
					$scope.$digest();
				}
			});

			function renderArrowLines(){
				var lineLayers = [map.getLayer("Interceptors"), map.getLayer("Mains")];
		   		lineLayers.forEach(function(lineLayer){
		   			var layer = $scope.layers.filter(function(lyr){
		    			return lyr.options.id === lineLayer.id;
		    		});
		    		$scope.changeRendering(layer[0], layer[0].currentRender);
			   	});
			}



			var setAngle = function(p1, p2) {
	                        var rise = Math.abs(p2[1]) - Math.abs(p1[1]);
	                        var run = Math.abs(p2[0]) - Math.abs(p1[0]);
	                        var angle = ((180 / Math.PI) * Math.atan2(run, rise));
	                        return angle - 270;
	                    };


			$scope.addArrows = map.on('extent-change', function(event){
				$scope.currentScale = map.getScale();
				$scope.mainsMinScale = map.getLayer("Mains").minScale;
				$scope.graphicsLayer.clear();
				var layer = map.getLayer("Mains"); 
				switch($scope.currentScale > $scope.mainsMinScale){
					case true:
						$scope.graphicsLayer.clear();
						break;
					case false:	
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
	            }
	        });

			$scope.interceptorGraphics = new GraphicsLayer({ id: "interceptorGraphics" }); 
            $scope.interceptorGraphics.setMinScale(map.getLayer("Interceptors").minScale);
            $scope.interceptorGraphics.setMaxScale(map.getLayer("Interceptors").maxScale);
            map.addLayer($scope.interceptorGraphics);

	        $scope.addIntArrows = map.on('extent-change', function(event){
	        	var layer = map.getLayer("Interceptors");
				$scope.currentScale = map.getScale();
				$scope.interceptorGraphics.clear();
				 
				switch($scope.currentScale > layer.minScale || $scope.currentScale < layer.maxScale){
					case true:
						$scope.interceptorGraphics.clear();
						break;
					case false:	
		                var query = new Query();
		                query.geometry = event.extent;
		                query.spatialRelationship = Query.SPATIAL_REL_CONTAINS;
		                query.returnGeometry = true;
		                query.outFields = ["OBJECTID"];

		                featureSetQT = new QueryTask(layer.url);
		                featureSetQT.execute(query)
		                .then(function(featureSet) {
		                	count = 0;
		                    featureSet.features.forEach(function(feature, idx, array) {		                    	
		                        for (var x in feature.geometry.paths[0]) {
		                        	count++;
		                        	if(count%3===0){
			                            var pt1 = feature.geometry.paths[0][x];
			                            var pt2 = feature.geometry.paths[0][x - 1];
			                            if (pt2) {
			                                var midPoint = [(pt1[0] + pt2[0]) / 2, (pt1[1] + pt2[1]) / 2];
			                                var point = new Point(midPoint, map.spatialReference);
			                                var dot = new SimpleMarkerSymbol({ "color": new Color([0, 0, 0]), "size": 8, "angle": setAngle(pt1, pt2), "xoffset": 0, "yoffset": 0 });
			                                dot.setPath('M1,50l99.5,-50c0,0 -40,49.5 -40,49.5c0,0 39.5,50 39.5,50c0,0 -99,-49.5 -99,-49.5z');
			                                var dotGraphic = new Graphic(point, dot, {}, null);
			                                $scope.interceptorGraphics.add(dotGraphic);
			                            	}
			                        	}
			                        }
			                });
	                	});
	            }
	        });

			function initSelectToolbar() {
			    selectionToolbar = new Draw(map);
			    var selectQuery = new Query();

			    selectionToolbar.on("DrawEnd", function(geometry) {
			        selectionToolbar.deactivate();
			        selectQuery.geometry = geometry;
			        runQuery(selectQuery);
			    });
			}


			function runQuery(query, type){
				$scope.newSelection.selectFeatures(query, $scope.newSelection.SELECTION_NEW);
		        $scope.newSelectedFeatures = $scope.newSelection.getSelectedFeatures();	        
		        $scope.newSelectedFeatures.length > 0 ? $scope.showSelected = true: $scope.showSelected = false
		        if(type != 'where'){
		        	$scope.$digest();
		        	$scope.$broadcast('hideMenu');
		        }
		        else{
		        	$scope.selectSearch = false;
		        	$scope.$broadcast('selectionResults', {featureCount:$scope.newSelectedFeatures.length} );
		        }
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

			$scope.$on('searchQuery', function(ev, data){
				var searchQuery = new Query();
				searchQuery.where = "ContractNumber LIKE '" + data.search + "%'";
				$scope.newSelection = map.getLayer('Outlines');
				$scope.outFields = $scope.newSelection._outFields;
				$scope.newSelection.setSelectionSymbol(fieldsSelectionSymbol.polygon);
				runQuery(searchQuery, 'where');
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

				$scope.selectSearch = true;

				$scope.showSelected = false;
				$scope.showRelatedDocs = false;
    			$scope.newSelection = map.getLayer($scope.userSelectedLayer.options.id);

    			if($scope.newSelection.minScale < $scope.currentScale){

    				$scope.scaleMessage = "Layer must be visible to select features. Please zoom in.";
    			} else{
    				$scope.scaleMessage = false;
    			}

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
    			$scope.selectSearch = true;
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
    		    $scope.selectSearch = true;
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
    		            	$scope.$broadcast('hideMenu');
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
						console.log(singleLayer);
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
					else if(layer.style.type === 'polyline' && singleLayer.renderer.getSymbol().style === 'solid'){
						var layerStyle = singleLayer.renderer.getSymbol();
						var fill = layerStyle.color.toCss();
						layer.style.tblField.push({name:'default', fill: fill});
					}
					else{
						console.log(singleLayer.renderer.getSymbol());
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