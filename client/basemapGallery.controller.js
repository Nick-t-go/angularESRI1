app.controller('basemapGalleryCtrl', function($scope, esriLoader, $timeout) {

	$scope.$on('map-loaded', function(evt, esriMapObject){

		esriLoader.require([
			"esri/basemaps", "esri/layers/ArcGISImageServiceLayer", "esri/layers/ImageServiceParameters"
			], 
			function(
				esriBasemaps, ArcGISImageServiceLayer, ImageServiceParameters){

					var imageServiceUrls = [
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/BW_1947/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/BW_1962/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/BW_1978/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/BW_1984/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/CR_2001/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/CR_2004/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/CR_2006/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/CR_2007/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/CR_2010/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/CR_2013/ImageServer',
						'https://gisimages.suffolkcountyny.gov/arcgis/rest/services/IR_2013/ImageServer',
						];
					var params = new ImageServiceParameters();
					$scope.imageServices = imageServiceUrls.map(function(url){
						return new ArcGISImageServiceLayer(url, {imageServiceParameters: params });
					});
					
					console.log($scope.imageServices);
					$scope.currentImageLayer = $scope.imageServices[0];
		});

		$scope.activeBase = 'esri';
		$scope.currentSelection = 'topo';

		$scope.basemapChange = function(basemap, type){
			if($scope.currentImageLayer.getMap()){
					$timeout(function(){
						esriMapObject.removeLayer($scope.currentImageLayer);
					});
				}
			$scope.currentSelection = basemap;
			if(type === "imageService") {
				

				esriMapObject.basemapLayerIds.forEach(function(id){
					esriMapObject.getLayer(id).setVisibility(false);
				});
	
				$timeout(function(){
					$scope.currentImageLayer = basemap;
					esriMapObject.addLayer($scope.currentImageLayer, 1000);
				});

			} else{
				$scope.map.basemap = basemap;
			}
		};
		//{url:"http://www.orthos.dhses.ny.gov/ArcGIS/rest/services/2013/MapServer/"}
		esriMapObject.on('update-start', (function(evt) {
                $scope.disable = true;
            }));
            esriMapObject.on('update-end', (function(evt) {
                $scope.disable = false;
                $timeout(function() {
                    $scope.$digest();
                });
            }));
 

		$scope.hoverImage = 'none';   
		
		$scope.showpreview = function(image){
			$scope.hoverImage = image;
		};

		$scope.basemapOptions = [
			{
				name:"gray",
				displayName:"Light-Gray",
				show: false,
				imagery: "url('https://www.arcgis.com/sharing/rest/content/items/8b3b470883a744aeb60e5fff0a319ce7/info/thumbnail/light_gray_canvas.jpg')"
			},
			{
				name: "dark-gray",
				displayName:"Dark-Gray",
				imagery: "url('https://www.arcgis.com/sharing/rest/content/items/25869b8718c0419db87dad07de5b02d8/info/thumbnail/DGCanvasBase.png')"
			},
			{
				name: "topo",
				displayName: "Topo",
				show: false,
				imagery: "url('https://www.arcgis.com/sharing/rest/content/items/931d892ac7a843d7ba29d085e0433465/info/thumbnail/usa_topo.jpg')"
			},
			{
				name: "streets",
				displayName: "Streets",
				show: false,
				imagery: "url('https://www.arcgis.com/sharing/rest/content/items/d8855ee4d3d74413babfb0f41203b168/info/thumbnail/world_street_map.jpg')"
			},
			{
				name: "satellite",
				displayName: "Satellite",
				show: false,
				imagery: "url('https://www.arcgis.com/sharing/rest/content/items/86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/tempimagery.jpg')"
			},
		    {
		    	name: "hybrid",
		    	displayName: "Hybrid",
		    	show: false,
		    	imagery: "url('https://www.arcgis.com/sharing/rest/content/items/413fd05bbd7342f5991d5ec96f4f8b18/info/thumbnail/imagery_labels.jpg')"
		    },
		    {
		    	name: "oceans",
		    	displayName: "Oceans",
		    	show: false,
		    	imagery: "url('https://www.arcgis.com/sharing/rest/content/items/48b8cec7ebf04b5fbdcaf70d09daff21/info/thumbnail/tempoceans.jpg')"
		    },
		    {
		    	name: "national-geographic",
		    	displayName: "National Geographic",
		    	show: false,
		    	imagery: "url('https://www.arcgis.com/sharing/rest/content/items/509e2d6b034246d692a461724ae2d62c/info/thumbnail/natgeo.jpg')"
			},
		    {
		    	name: "terrain",
		    	displayName: "Terrain",
		    	show: false,
		    	imagery: "url('https://www.arcgis.com/sharing/rest/content/items/aab054ab883c4a4094c72e949566ad40/info/thumbnail/terrain_labels.jpg')"
		    },
		    {
		    	name: "osm",
		    	displayName: "Open Street Map",
		    	show: false,
		    	imagery: "url('https://www.arcgis.com/sharing/rest/content/items/5d2bfa736f8448b3a1708e1f6be23eed/info/thumbnail/temposm.jpg')"
		    }];
		});

});