'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', '$location',
	function($scope, $http, Authentication, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		if (!$scope.authentication.user) {
			$location.path('/signup');
		}

		console.log($scope.authentication.user.email);

		$scope.findActivity = function(mood) {

			$http.get('/getIntensity/' + $scope.authentication.user.email).success(function(response) {

				//var intensity = response;

				$http.get('/getActivity/' + mood + '/' + response).success(function(res) {
						console.log(res);
					//res.send();
					$location.path('/activity/' + res.name);
				})

			})


		}

	}
]);
