(function () {
	'use strict';

	angular.module('LaunchApp', [])

		.controller('LaunchAppController', LaunchAppController);

	LaunchAppController.$inject = ['$scope'];
	function LaunchAppController($scope) {

		$scope.countDishes = function () {
			$scope.notEmptyItem = "";
			var dishesCount = 0;
			if ($scope.dishesText && $scope.dishesText.trim() !== "") {
				var dishes = $scope.dishesText.split(",");
				var isEmptyItem = false;
				var dishesCount = 0;
				for (var i = 0; i < dishes.length; i++) {
					if (dishes[i].trim() === "") {
						$scope.notEmptyItem = "empty items are not counted";
					} else {
						dishesCount++;
					}
				}
			}
			if (dishesCount <= 0) {
				$scope.message = "Please enter data first";
				$scope.messageStyle = 'red';
			} else {
				$scope.message = dishesCount < 4 ? "Enjoy!" : "Too much!";
				$scope.messageStyle = 'green';
			}
		}
	}

})();
