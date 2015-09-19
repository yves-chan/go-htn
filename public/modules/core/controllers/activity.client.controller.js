'use strict';


angular.module('core').controller('ActivityController', ['$scope', 'Authentication', '$location', 'activityObj',
	function($scope, Authentication, $location, activityObj) {
		// This provides Authentication context.

		var activityName = activityObj.data;
		var activityPrefix = activityObj.data;
		$scope.name = activityName.name;
		$scope.prefix = activityPrefix.prefix;
		console.log($scope.name);

		$scope.authentication = Authentication;
		if (!$scope.authentication.user) {
			$location.path('/signup');
		}



	}



]);

