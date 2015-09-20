'use strict';


angular.module('core').controller('ActivityController', ['$scope', 'Authentication', '$location', 'activityObj', '$http',
	function($scope, Authentication, $location, activityObj, $http) {
		// This provides Authentication context.

		var activityName = activityObj.data;
		var activityPrefix = activityObj.data;
		$scope.name = activityName.name;
		$scope.prefix = activityPrefix.prefix;
		console.log("Activity"+$scope.name);

		$.ajax({
			url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+$scope.name,
			type: 'GET',
			crossDomain: true, // enable this
			dataType: 'jsonp',
			success: function(response){
				console.log(response.responseData.results[0].url);
				$("#imageToDisplay").attr("src",response.responseData.results[0].url);
				$scope.imageUrl = response.responseData.results[0].url;
			},
			error: function() { alert('Failed!'); }
		});

		$scope.authentication = Authentication;
		if (!$scope.authentication.user) {
			$location.path('/signup');
		}

		$scope.DoingIt = function(){
			$http.post('/history/record/' + $scope.authentication.user.email + '/' + activityName.name).success(function(res) {
				console.log(res);
				$location.path('/')
			})
		}



	}



]);

