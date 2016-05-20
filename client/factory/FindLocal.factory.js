app.factory('FindLocal', function(esriLoader, $http) {

            return {
	            find: function(params){
	            	return $http.get('https://gisservices2.suffolkcountyny.gov/arcgis/rest/services/SCGeocoder/GeocodeServer/findAddressCandidates',{params: params});
	            }
        };

});

