app.controller('messengerCtrl', function($scope, $timeout) {
	$scope.hidden = 'true';

	$scope.$on('message', function(evt, args){
		$scope.hidden = false;
		$scope.message = args.message;
		$scope.class = 'fadein ' + args.type;
		

		$timeout(function(){
			$scope.hidden = 'true';

		}, args.time);


	});

});