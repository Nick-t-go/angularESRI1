app.factory('customRenderer', function(esriLoader) {
		
		return{

			PipeSubType: function(layer, legendLayer, mapObj){
				esriLoader.require([
					"esri/renderers/SimpleRenderer", 
					"esri/symbols/SimpleMarkerSymbol", 
					"esri/symbols/SimpleLineSymbol", 
					"esri/Color",
					"esri/renderers/UniqueValueRenderer",
					"esri/layers/GraphicsLayer", 
					"esri/graphic",
					"esri/tasks/query",
					"esri/geometry/Point",
					"esri/SpatialReference",
					"esri/symbols/PictureMarkerSymbol",
					"esri/symbols/TextSymbol"
					], 
					function(
						SimpleRenderer,
						SimpleMarkerSymbol,
						SimpleLineSymbol,
						Color,
						UniqueValueRenderer,
						GraphicsLayer,
						Graphic,
						Query, 
						Point,
						PictureMarkerSymbol,
						TextSymbol
						){


					var arrow = function(pt1,pt2){      
			          return new SimpleMarkerSymbol({   
						angle: setAngle(pt1, pt2),  
				      }).setPath("M16,16, L16, 48, L48, 32, Z");  
					}; 

					var setAngle = function (p1, p2){  
			        var rise = p2[1] - p1[1];  
			        var run = p2[0] - p1[0];  
			        var angle = ((180/Math.PI) * Math.atan2(run, rise));  
						return angle-180;  
					};   




				var graphicsLayer = new GraphicsLayer({ id: "graphicsLayerA" });
                mapObj.addLayer(graphicsLayer);
                var query = new Query();
                query.geometry = mapObj.extent;
			    query.spatialRelationship = Query.SPATIAL_REL_CONTAINS;
			    query.returnGeometry = true;
			    query.outFields = ["*"];
			    var dot = SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
				    				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
				    				new Color([32,120,0]), 1),
				    				new Color([0,0,0,1]));
			    var markerSymbol = new SimpleMarkerSymbol();
			    markerSymbol.setPath('M 16, 16, L 36, 24, L 16, 32, L 32, 24, Z');
			    markerSymbol.setColor(new Color([32,120,0]));
			    var symbol =  new PictureMarkerSymbol({"angle":0,"xoffset":0,"yoffset":0,"type":"esriPMS","url":"http://static.arcgis.com/images/Symbols/Arrows/icon28.png","imageData":"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADqSURBVEhLvdANDQIxDIbhk4AEJCAJCUhAAhJwBBKQgANos33JsnQ/3dp+yZss3IVdnmNjF+qcjrF7ULd0jN2HeqVj3Jj5lwvlZmZcHMrNzLg4jLtkRiHcJTMK4S6ZkTu3xIxcuSVm5MotMSM37h4zcuHuMSMX7h4zMueeYUam3DPMyJR7hhmZcWuYkQm3hhmZcGuY0Tb3CjPa4u4xv3PSM26Lu8X8pE45PkvvLHNLzF/qStXj3/hZ/f4Sd83MrPwxrfGzmn6Ju2QG7Wg1vZobzC3a0Up6FTczj2hHA72K+07N0I7G/yFcfBx/wb/gQl3zWyYAAAAASUVORK5CYII=","contentType":"image/png","width":30,"height":30});
			    layer.queryFeatures(query, function (featureSet){
			      featureSet.features.forEach(function(feature, idx, array){
			      	for(var x in feature.geometry.paths[0]){  
							 var pt1 = feature.geometry.paths[0][x];   
							 var pt2 = feature.geometry.paths[0][x-1] || feature.geometry.paths[0][x+1];
							 var point = new Point(pt1, mapObj.spatialReference);
							 if(pt2){
							 markerSymbol.setAngle(setAngle(pt1, pt2));	
							 var dotGraphic = new Graphic(point, markerSymbol, {}, null);
							 graphicsLayer.add(dotGraphic);
							 console.log(graphicsLayer);
							 }
						} 	  
				    });
				});

				
				var forceMain = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#9A670D"),3);
				var gravity = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#3BD815"),3);
				var outFall = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#325DEE"),3);
				var generic = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]),3);
				var renderer = new UniqueValueRenderer(generic, "PipeSubType");
				renderer.addValue(1 , forceMain);
				renderer.addValue(0 , gravity);
				renderer.addValue(2 , outFall);
				layer.setRenderer(renderer);
				layer.redraw();
				legendLayer.style = {
					type: "polyline",
					typeIdField: "Pipe Sub Type",
					tblField: [
					{fill: "#9A670D", name: "Force Main" },
					{fill: "#3BD815", name: "Gravity"},
					{fill: "#325DEE", name: "Outfall"}
					]
				};
			}
		)},

			verticalQuality: function(layer, legendLayer){
				esriLoader.require([
					"esri/renderers/SimpleRenderer", 
					"esri/symbols/PictureMarkerSymbol",
					"esri/renderers/UniqueValueRenderer"
					], 
					function(
						SimpleRenderer,
						PictureMarkerSymbol,
						UniqueValueRenderer
						){
				var surveygradeURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAqZJREFUOI2t1E1I02EcwPGvufWXbQ00hopC+IYKmofhDhGIc1BqIHYQ8aIOJlrtoFIIKnYSybdhDvNgHgRBA0sTY4iKCAqCeEgY6z8QX8C3OdIMeZJZB9l0NSSi3+15+/D8fs+Lgv8UimvG4oBiIBNQS5K0L4RYAiaB07+BIiRJagNhKS9Hjo+XwqanRZLJJBaGh8l1uXgN1AHD10G3oqKYLi0V8XV1SCoVWbu7gs1NsFh4aLFw5nRKkwUF4hVIqUKIlpBQairDJhOZQqAKCwuZrlKrFcVGIz9mZ4UZcPl3dhXKT07G2NCAyumEjg6orYX19VQODw/weLycnUFrK7S1cdPj4UteHt3Ae+A0ABUW8qKqClV4OGRkwMlJLE1Nd6mvf0l7u46lpU8MDrbQ2elFpwOdDqNej3NlhUfAuwB0fIwhMfFye0dHZnp6rERHRwOQlPQMUKBU1gTmlJVJ39bWuCeEuISWl1HZbOCvTUTEARUV0UEFys7OpbHxDpGRGwBsbYksIZCDapSejq+ignCt9qLtcMQhhECSpAC0t7eHxZJBbOwFNDuL1+HgexCk1/P1/JzbOp2/raa/vx+z2YxarcbtdmOztdLV5cBv7+zgAz4HQWlpzMzNUZKSAjs70NvbSG1tFwMDfczNLVBZmU9ZmQe7HaxWEAJGRtABH4IgjYYny8s8nplBMTYGzc2CmJinaDSwtgYGw8dAinY7KJWcAm+B7SCopobD0dEoq83m7auuhpgYQobBAFNT/HS5WN/Y4Lm/P+hml5R434yPR90cGfF2yzI3jMaLU/T54OAAZBmGhjhXKFhaXCSfK4/3j0dbVOTtmZ9nTJYZmJjg/uoqqu1t2N/nLCEBWauleWiIsd/XhfxGcnLYBh5c7XO7Q6d6LfQv8QtQB/Sb++GWZgAAAABJRU5ErkJggg==";
				var nonSurveyGradeURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAXxJREFUOI2t1M8rBGEcx/H397HtpM0BB/EHOCgnBweOyoXItEv8A8rFxa/IaYWzf4HINkl+FaX8AxQXiYNSXFCKetidr8Ouof2h3eFTc3hmmtfzeZrmG+EfE/ntofbSQLXTAjYGziPWnss2rxVh6uJimADaUZu7ayHKuybYReuSkno6+xXTPmJEWQX6S2weRRmAp35NMC+bLBTFFKqI4gHdpY7xIwYl6btOtfHsXGEzl6kyoSBi7KzGnRNJ2aMA0wT1KNOVQN+xi8A3hjII1ITDaNOhxlbZuL/INoMOCSkB4N93AllMfJow4S3NOE1gc8c0pP9STKrsO3x9AJ9rMXSFr8ZNgAkcAqMhqQxvHAcYHjvEnSuwzZWXwjN7PPxslta0HSfCXnZZdl7EZ/JrEfwBssWBxpkBlsqE3sCJi2dvCzAASbGsLncYVoDa0o5zCbHh/MlRMILEY01H2OeDMZQeoAWIAY/AKcI6m3ZVsJn8d4vOM1njGUjmrrLzCct2dr/YO+HKAAAAAElFTkSuQmCC";
				var surveyGradeMarker = new PictureMarkerSymbol(surveygradeURL, 17.33, 17.33);
				var nonSurveyGradeMarker = new PictureMarkerSymbol(nonSurveyGradeURL, 18.66, 18.66);
				var renderer = new UniqueValueRenderer(nonSurveyGradeMarker, "FkMhVerticalQuality");
				renderer.addValue("SURVEY", surveyGradeMarker);
				layer.setRenderer(renderer);
				layer.redraw();
				legendLayer.style = {
					type: "point",
					typeIdField: "FkMhVerticalQuality",
					tblField: [
					{fill: "url('"+nonSurveyGradeURL+"') no-repeat center", name: "Not Survey-grade Location" },
					{fill: "url('"+surveygradeURL+"') no-repeat center", name: "Survey-grade Location"}
					]
				};
			}
		)},

			horizontalQuality: function(layer, legendLayer){
				esriLoader.require([
					"esri/renderers/SimpleRenderer", 
					"esri/symbols/PictureMarkerSymbol",
					"esri/renderers/git aUniqueValueRenderer"
					], 
					function(
						SimpleRenderer,
						PictureMarkerSymbol,
						UniqueValueRenderer
						){
				var surveygradeURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAqZJREFUOI2t1E1I02EcwPGvufWXbQ00hopC+IYKmofhDhGIc1BqIHYQ8aIOJlrtoFIIKnYSybdhDvNgHgRBA0sTY4iKCAqCeEgY6z8QX8C3OdIMeZJZB9l0NSSi3+15+/D8fs+Lgv8UimvG4oBiIBNQS5K0L4RYAiaB07+BIiRJagNhKS9Hjo+XwqanRZLJJBaGh8l1uXgN1AHD10G3oqKYLi0V8XV1SCoVWbu7gs1NsFh4aLFw5nRKkwUF4hVIqUKIlpBQairDJhOZQqAKCwuZrlKrFcVGIz9mZ4UZcPl3dhXKT07G2NCAyumEjg6orYX19VQODw/weLycnUFrK7S1cdPj4UteHt3Ae+A0ABUW8qKqClV4OGRkwMlJLE1Nd6mvf0l7u46lpU8MDrbQ2elFpwOdDqNej3NlhUfAuwB0fIwhMfFye0dHZnp6rERHRwOQlPQMUKBU1gTmlJVJ39bWuCeEuISWl1HZbOCvTUTEARUV0UEFys7OpbHxDpGRGwBsbYksIZCDapSejq+ignCt9qLtcMQhhECSpAC0t7eHxZJBbOwFNDuL1+HgexCk1/P1/JzbOp2/raa/vx+z2YxarcbtdmOztdLV5cBv7+zgAz4HQWlpzMzNUZKSAjs70NvbSG1tFwMDfczNLVBZmU9ZmQe7HaxWEAJGRtABH4IgjYYny8s8nplBMTYGzc2CmJinaDSwtgYGw8dAinY7KJWcAm+B7SCopobD0dEoq83m7auuhpgYQobBAFNT/HS5WN/Y4Lm/P+hml5R434yPR90cGfF2yzI3jMaLU/T54OAAZBmGhjhXKFhaXCSfK4/3j0dbVOTtmZ9nTJYZmJjg/uoqqu1t2N/nLCEBWauleWiIsd/XhfxGcnLYBh5c7XO7Q6d6LfQv8QtQB/Sb++GWZgAAAABJRU5ErkJggg==";
				var nonSurveyGradeURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAXxJREFUOI2t1M8rBGEcx/H397HtpM0BB/EHOCgnBweOyoXItEv8A8rFxa/IaYWzf4HINkl+FaX8AxQXiYNSXFCKetidr8Ouof2h3eFTc3hmmtfzeZrmG+EfE/ntofbSQLXTAjYGziPWnss2rxVh6uJimADaUZu7ayHKuybYReuSkno6+xXTPmJEWQX6S2weRRmAp35NMC+bLBTFFKqI4gHdpY7xIwYl6btOtfHsXGEzl6kyoSBi7KzGnRNJ2aMA0wT1KNOVQN+xi8A3hjII1ITDaNOhxlbZuL/INoMOCSkB4N93AllMfJow4S3NOE1gc8c0pP9STKrsO3x9AJ9rMXSFr8ZNgAkcAqMhqQxvHAcYHjvEnSuwzZWXwjN7PPxslta0HSfCXnZZdl7EZ/JrEfwBssWBxpkBlsqE3sCJi2dvCzAASbGsLncYVoDa0o5zCbHh/MlRMILEY01H2OeDMZQeoAWIAY/AKcI6m3ZVsJn8d4vOM1njGUjmrrLzCct2dr/YO+HKAAAAAElFTkSuQmCC";
				var surveyGradeMarker = new PictureMarkerSymbol(surveygradeURL, 17.33, 17.33);
				var nonSurveyGradeMarker = new PictureMarkerSymbol(nonSurveyGradeURL, 18.66, 18.66);
				var renderer = new UniqueValueRenderer(nonSurveyGradeMarker, "FkMhHorizontalQuality");
				renderer.addValue("SURVEY", surveyGradeMarker);
				layer.setRenderer(renderer);
				layer.redraw();
				legendLayer.style = {
					type: "point",
					typeIdField: "FkMhHorizontalQuality",
					tblField: [
					{fill: "url('"+nonSurveyGradeURL+"') no-repeat center", name: "Not Survey-grade Location" },
					{fill: "url('"+surveygradeURL+"') no-repeat center", name: "Survey-grade Location"}
					]
				};				
			}
		)}, 
		//horizontal


			investigationStatus: function(layer, legendLayer){
				esriLoader.require([
					"esri/renderers/SimpleRenderer", 
					"esri/symbols/SimpleMarkerSymbol", 
					"esri/symbols/SimpleLineSymbol", 
					"esri/Color",
					"esri/renderers/UniqueValueRenderer"
					], 
					function(
						SimpleRenderer,
						SimpleMarkerSymbol,
						SimpleLineSymbol,
						Color,
						UniqueValueRenderer
						){
				var completeMarker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
    				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    				new Color([32,120,0]), 1),
    				new Color([0,0,0,1]));
				var defaultMarker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
    				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    				new Color([0,90,120]), 1),
    				new Color([0,255,0,1]));
				var renderer = new UniqueValueRenderer(defaultMarker, "InvestigationStatus");
				renderer.addValue("2", completeMarker);
				layer.setRenderer(renderer);
				layer.redraw();
				legendLayer.style = {
					type: "point",
					typeIdField: "Investigation Status",
					tblField: [
					{fill: "rgb(32,120,0)", name: "Complete", outline:"rgba(0,255,0,0.25)"},
					{fill: "rgb(0,90,120)", name: "Incomplete",outline:"rgba(0,255,0,0.25)" }
					]
				};				
			}
		)}
	};
});