'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing	
		$stateProvider.
			state('home', {
				url: '/',
				templateUrl: 'modules/core/views/home.client.view.html'
			})
			.state('questions', {
				url: '/questions',
				templateUrl: 'modules/users/views/settings/questions.client.view.html'
			})
			.state('newactivity', {
				url: '/newactivity',
				templateUrl: 'modules/core/views/newactivity.client.view.html'
			})
			.state('activity', {
				url: '/activity/:activityName',
				templateUrl: 'modules/core/views/activity.client.view.html',
				controller: 'ActivityController',
				resolve: {
					activityObj : ['$http', '$stateParams', function($http, $stateParams) {
						return $http.get('/getActivity/' + $stateParams.activityName, {name: $stateParams.activityName})
							.success(function (response) {
								return response;
							});
					}]
				}
			});

		//if ($scope.authentication.user) {
		//	$stateProvider.
		//		state('home', {
		//			url: '/',
		//			templateUrl: 'modules/core/views/home.client.view.html'
		//		});
		//} else {
		//	$stateProvider.state('home', {
		//		url: '/',
		//		templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		//	});
		//}
	}
]);
