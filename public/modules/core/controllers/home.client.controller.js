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
					//Choose one activity out of those listed in user preferences
					//var activity = res[Math.floor(Math.random() * res.length)];

					var rand = function(min, max) {
						return Math.floor(Math.random() * (max - min + 1)) + min;
					};

					var generateProb = function(activities) {
						var sumCounter = 0;
						var probArray = [];
						for (var i=0; i<activities.length;i++ ){
							sumCounter += activities[i].count;
						}
						for (var j=0; j<activities.length;j++){
							probArray[j] = (activities[j].count)/sumCounter;
						}
						console.log(probArray);

						return probArray;
					};

					var generateWeighedList = function(list, weight) {
						var weighed_list = [];

						// Loop over weights
						for (var i = 0; i < weight.length; i++) {
							var multiples = weight[i] * 100;

							// Loop over the list of items
							for (var j = 0; j < multiples; j++) {
								weighed_list.push(list[i]);
							}
						}

						return weighed_list;
					};

					var weighsArray = generateProb(res);
					var weighed_list = generateWeighedList(res, weighsArray);

					var random_num = rand(0, weighed_list.length-1);

					var activity = weighed_list[random_num];
					console.log(weighed_list[random_num]);

					//res.send();
					$location.path('/activity/' + activity.name);
				});

			});


		};

	}
]);
