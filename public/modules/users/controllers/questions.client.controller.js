'use strict';

angular.module('users').controller('QuestionsController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		var username = $scope.authentication.user.email;
		console.log($scope.authentication);

		var activity;

		$scope.processResults = function() {
			var intensity = $scope.intensity;
			var mood = $scope.mood;
			console.log(mood + intensity);

			$http.get('/getActivity/'+ mood + '/' + intensity, {mood:mood, intensity:intensity}).success(function(response){
				console.log('The Activity is '+ response.name);
				activity= response.name;
				$http.post('/history/record/'+ username + '/' + activity).success(function(response){
					console.log(response + 'saved');
				});
			});
			//$http.post('/history/record/'+ username + '/' + activity).success(function(response){
			//	console.log(response + 'saved');
			//});

		};

	}
]);
