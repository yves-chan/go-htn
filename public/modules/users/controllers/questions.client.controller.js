'use strict';

angular.module('users').controller('QuestionsController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication, $q, $timeout) {
		$scope.authentication = Authentication;

		var username = $scope.authentication.user.email;
		console.log($scope.authentication);

		$scope.intensity = 0;

		$scope.save = function () {
			var deferred = $q.defer();
			$timeout(function () {
				$scope.intensity += number;
				deferred.resolve();
			}, 2000);
			return deferred.promise;
		}

		var activity;

		$scope.processResults = function() {
			var intensity = $scope.intensity;
			var mood = $scope.mood;
			console.log(mood + intensity);

			$http.post('/setMood/'+ username + '/' + mood, {moodPreference: mood}).success(function(response){
				console.log(response);
				//activity= response.name;
				$http.post('/setIntensity/'+ username + '/' + intensity, {intensityPreference: intensity}).success(function(response){
					console.log(response + 'saved');
				});
			});

			$location.path('/');

		};

	}
]);
