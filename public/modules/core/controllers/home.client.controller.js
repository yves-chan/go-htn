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

					var checkCounts = function() {
						for (var i = 0; i<res.length ; i++) {
							if (res[i].count < 11) {
								return true;
							}
						}
						return false;
					};

					var shouldRandom = checkCounts();

					var activity;

					var rand = function (min, max) {
						return Math.floor(Math.random() * (max - min + 1)) + min;
					};

					var chooseAlgorithm = function () {
						if (shouldRandom) {
							activity = res[rand(0,res.length-1)];
							console.log('choosing random');
						} else {

							var generateProb = function (activities) {
								var sumCounter = 0;
								var probArray = [];
								for (var i = 0; i < activities.length; i++) {
									try {
										sumCounter += activities[i].count;
									} catch (err) {
										console.log('Some items do not have counts');
									}
								}
								for (var j = 0; j < activities.length; j++) {
									try {
										probArray[j] = (activities[j].count) / sumCounter;
									} catch (err){
										console.log('Some items do not have counts');
									}
								}
								console.log(probArray);

								return probArray;
							};

							var generateWeighedList = function (list, weight) {
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

							var random_num = rand(0, weighed_list.length - 1);

							activity = weighed_list[random_num];
							console.log('choosing biased selection');
							console.log(weighed_list[random_num]);
						}
					}

					chooseAlgorithm();

					//res.send();
					$location.path('/activity/' + activity.name);
				});

			});


		};

	}
]);
