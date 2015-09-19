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
