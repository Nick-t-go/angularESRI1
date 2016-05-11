app.controller('searchCtrl', function($scope, esriLoader, FindLocal) {

	$scope.$on('map-loaded', function(evt, map){
		esriLoader.require([
			"esri/tasks/locator",
			"esri/geometry/Extent",
			"esri/SpatialReference",
			 "esri/tasks/query"
			 ], 
			function(Locator, Extent, SpatialReference, Query){

				var locator = new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
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
						var params = {text: text, categories: categories, maxSuggestions: maxSuggestions, location: location, distance:distance, region: 'New York'};
						locator.suggestLocations(params)
						.then(function(suggestions, error){
							$scope.suggestions = suggestions;
							$scope.$digest();
						});
					}
				};

				$scope.test = function(value){
					console.log(value);
				};

				$scope.zoomToAddress = function(local){
					var SingleLine = local.text;
					//.slice(0, local.text.indexOf(', USA'));
					var f = 'json';
					var outSR = new SpatialReference(102100);
					var outFields = '*';
					var countryCode = "USA";
					// var location = map.extent.getCenter().normalize();
					// var distance = 50000;
					var maxLocations = 6;
					var params = {SingleLine: SingleLine, f: f, outSR: outSR, outFields: outFields, magicKey: local.magicKey, countryCode: countryCode, maxLocations: maxLocations};
					FindLocal.find(params)
					.then(function(response){
						var firstHit = response.data.candidates[0];
						var zoomExtent = new Extent(firstHit.extent.xmin, firstHit.extent.ymin, firstHit.extent.xmax,firstHit.extent.ymax, new SpatialReference({wkid:102100}));
						map.setExtent(zoomExtent);
					});
				};

				$scope.searchContracts = function(contract){
					$scope.$emit('searchQuery', {search: contract});
				};

				$scope.$on('selectionResults', function(evt, data){
					$scope.count = data.featureCount;
					$scope.searchWait = false;
				});
				$scope.$on('hideMenu', function(evt, data){
					$scope.count = -1;
					$scope.$digest();
				});


		});

	});

});