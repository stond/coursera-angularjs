(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.constant('MenuUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json')
		.directive('foundItems', FoundItemsDirective);


	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService){
		var ctrl = this;

		ctrl.found = [];

		ctrl.narrowDown = function(searchTerm) {
			var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

			promise.then(function (result) {
				// process result and only keep items that match
				var foundItems = [];

				for (var i = 0; i < result.data.menu_items.length; i++) {
					var menuItem = result.data.menu_items[i];
					if (menuItem.description.indexOf(searchTerm) !== -1) {
						foundItems.push(menuItem);
					}
				}

				// return processed items
				ctrl.found = foundItems;
			}).catch(function (error) {
				console.log("error: " + error);
			})
		}

		ctrl.remove = function(index) {
			ctrl.found.splice(index, 1);
		}
	}

	function FoundItemsDirective() {
		var ddo = {
			scope: {
				found: '<',
				onRemove: '&'
			},
			templateUrl: 'templates/itemsFound.html',
			controller: FoundItemsDirectiveCtrl,
			controllerAs: 'itemsCtrl',
			bindToController: true,
		};

		return ddo;
	}
	function FoundItemsDirectiveCtrl () {
		var ctrl = this;

	}

	MenuSearchService.$inject = ['MenuUrl', '$http'];
	function MenuSearchService(MenuUrl, $http) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: 'GET',
				url: MenuUrl
			});

		};
	}


})();
