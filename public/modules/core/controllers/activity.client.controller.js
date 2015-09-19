'use strict';


angular.module('core').controller('ActivityController', ['$scope', 'Authentication', '$location', 'activityObj', '$http',
	function($scope, Authentication, $location, activityObj, $http) {
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

		$scope.DoingIt = function(){
			$http.post('/history/record/' + $scope.authentication.user.email + '/' + activityName.name).success(function(res) {
				console.log(res);
			})
		}



	}



]);

