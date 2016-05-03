app.factory('customRenderer', function(esriLoader) {
		
		return{

			mainType: function(layer, LegendLayer, map){
				esriLoader.require([
					"esri/renderers/SimpleRenderer", 
					"esri/symbols/PictureMarkerSymbol",
					"esri/renderers/UniqueValueRenderer",
					"esri/symbols/SimpleLineSymbol", 
					"esri/Color",
					"esri/tasks/query",
					"esri/graphic", 
					"esri/geometry/Point",
					"esri/symbols/SimpleMarkerSymbol", 
					], 
					function(
						SimpleRenderer,
						PictureMarkerSymbol,
						UniqueValueRenderer,
						SimpleLineSymbol,
						Color,
						Query,
						Graphic,
						Point,
						SimpleMarkerSymbol
						){
						console.log(map);
						var arrow = function(pt1,pt2){     
					          return new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
				    				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
				    				new Color([32,120,0]), 1),
				    				new Color([0,0,0,1]));
					      }; 

						var setAngle = function (p1, p2){  
					        var rise = p2[1] - p1[1];  
					        var run = p2[0] - p1[0];  
					        var angle = ((180/Math.PI) * Math.atan2(run, rise));  
						  	return angle-180;  
						};
						var holder = [];

						var query = new Query();
					    query.geometry = map.extent;
					    query.spatialRelationship = Query.SPATIAL_REL_ENVELOPEINTERSECTS;
					    query.returnGeometry = true;
					    query.outFields = ["*"];

					    layer.queryFeatures(query, function (featureSet){
					      featureSet.features.forEach(function(feature, idx, array){
					      	//loop over the points on your line//  
							for(var x in feature.geometry.paths[0]){  
							  
							 var pt1 = feature.geometry.paths[0][x];   
							 var pt2 = feature.geometry.paths[0][x-1];   
							  
							 var point = new Point(pt1);
							 if(pt2){ 
							 	holder.push(
							 		new Graphic(point, arrow(
							 			pt1,pt2)
							 		)
							 	);

							}
							 
							}
							if(idx === array.length-1){
								holder.forEach(function(graph, idx, array2){
									console.log('adding');
									map.graphics.add(graph);
								});
								var ext = (holder[0]._extent);
								console.log(holder[0].geometry.getLatitude(), holder[0].geometry.getLongitude());

							}   
					    });
					      // populate the Geometry cache by calling getExtent()
					      
					  }, function(err){console.log(err);}
					  );


						var line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([32,120,0]), 10);
						var renderer = new UniqueValueRenderer(line, "dPipeLifeCycleStatus");
						layer.setRenderer(renderer);
						layer.redraw();
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