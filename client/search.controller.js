app.controller('searchCtrl', function($scope, esriLoader, FindLocal, $timeout) {

	$scope.$on('map-loaded', function(evt, map){
		esriLoader.require([
			"esri/tasks/locator",
			"esri/geometry/Extent",
			"esri/SpatialReference",
			 "esri/tasks/query",
			 "esri/layers/GraphicsLayer",
			 'esri/graphic',
			 "esri/geometry/Point",
			 'esri/symbols/SimpleMarkerSymbol',
			 'esri/Color'
			 ], 
			function(Locator, Extent, SpatialReference, Query, GraphicsLayer, Graphic, Point, SimpleMarkerSymbol, Color){

				var locator = new Locator("https://gisservices2.suffolkcountyny.gov/arcgis/rest/services/SCGeocoder/GeocodeServer/");
				locator.countryCode = "USA";
				locator.outSpatialReference = map.spatialReference;
				var categories = ['Address','Postal'];
				var mapRef = map.spatialReference;
			    var distance = 10000;
				

				$scope.inputChange = function(input){
					if(!$scope.input.searchType) $scope.input.searchType = 'address';
					if($scope.input.searchType === "contract"){
						$scope.searchWait = true;
						$scope.suggestions = "";
						$scope.searchContracts(input);
					}
					else{
						var text = input;
						var maxSuggestions = 5;
						$scope.count = -1;
						var location = map.extent.getCenter().normalize();
						var params = {text: text, category: categories,  location: location, distance:distance};
						locator.suggestLocations(params)
						.then(function(suggestions, error){
							$scope.suggestions = suggestions;
							$timeout(function(){
								$scope.$digest();
							});
						});
					}
				};

				$scope.test = function(value){
					console.log(value);
				};

				var searchResultGraphic = new GraphicsLayer({
					infoTemplate: {
						title: '<b>${Match_addr}</b>',
			  			content: 'Address: ${StAddr} <br>City: ${City}<br>Zip: ${Zip}<br>'
			  		},
			  		id: "searchResult" 
				});
				map.addLayer(searchResultGraphic);

				var markerSymbol = new SimpleMarkerSymbol();
				markerSymbol.setPath('M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z');
				markerSymbol.setColor(new Color('#00FFFF'));

				$scope.zoomToAddress = function(local){
					searchResultGraphic.clear();
					var SingleLine = local.text;
					//.slice(0, local.text.indexOf(', USA'));
					var f = 'json';
					var outSR = new SpatialReference(102100);
					var outFields = '*';
					var countryCode = "USA";
					// var location = map.extent.getCenter().normalize();
					// var distance = 50000;
					var maxLocations = 6;
					var params = {SingleLine: SingleLine, f: f, "outSR": outSR, outFields: outFields, magicKey: local.magicKey, countryCode: countryCode, maxLocations: maxLocations};
					FindLocal.find(params)
					.then(function(response){

						var firstHit = response.data.candidates[0];
						var pt = new Point(firstHit.location.x,firstHit.location.y,new SpatialReference({wkid:102100}));
						var attr = {"StAddr":firstHit.address,"City":firstHit.attributes.City, 'Zip': firstHit.attributes.ZIP};
						var pinGraphic = new Graphic(pt,markerSymbol,attr);
						searchResultGraphic.add(pinGraphic);
						$timeout(function(){
							map.centerAndZoom(pt, 16);
						});
						searchResultGraphic.refresh();
					});
				};

				$scope.searchContracts = function(contract){
					$scope.$emit('searchQuery', {search: contract});
					$scope.searchWait = false;
				};

				$scope.$on('selectionResults', function(evt, data){
					$scope.count = data.featureCount;
					$scope.searchWait = false;
				});
				$scope.$on('hideMenu', function(evt, data){
					$scope.count = -1;
					$timeout(function(){
						$scope.$digest();
					});
				});

				$scope.resetSearch = function(){
					$scope.suggestions="";
					$scope.input.text = "";
					searchResultGraphic.clear();
					$scope.searchWait = false;
				};



		});

	});

});