'use strict';

angular.module('users').controller('QuestionsController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		var username = $scope.authentication.user;

		$scope.processResults = function() {
			var intensity = $scope.intensity;
			var mood = $scope.mood;
			console.log(mood + intensity);

			$http.get('/getActivity/'+ mood + '/' + intensity, {mood:mood, intensity:intensity}).success(function(response){
				console.log(response + 'in questions client');
			});
			http.post('/history/record').success(function(response){
				console.log(response + 'saved');
			})

		};

	}
]);
