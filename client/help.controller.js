app.controller('HelpCtrl', function($scope, $stateParams, $state) {

	$scope.helpSection = $stateParams.section || 'All';
	$scope.tools = {
		All: false,
		Basic: false,
		Legend: false,
		Tools: false,
		Search: false,
		Measure: false,
		Bookmarks: false,
		'Basemap Gallery': false,
		Draw: false,
		Print: false,
		'Select & View': false
	};

	$scope.toggleTools = function(tool){
		$state.go('help', {section: tool});
	};


});