(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {

		var toBuyCtrl = this;

		toBuyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();

		toBuyCtrl.buy = function (index) {
			ShoppingListCheckOffService.buy(index);
		}
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {

		var boughtCtrl = this;

		boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();



	}

	function ShoppingListCheckOffService() {
		var service = this;

		service.toBuy = [
			{ name: 'Cookies', quantity: 3},
			{ name: 'Chips', quantity: 4},
			{ name: 'Cola', quantity: 5},
			{ name: 'Beer', quantity: 10},
			{ name: 'Banana', quantity: 15}
		];
		service.bought = [];

		service.buy = function (index) {
			service.bought.push(service.toBuy[index]);
			service.toBuy.splice(index, 1);
		}

		service.getItemsToBuy = function() {
			return service.toBuy;
		}

		service.getBoughtItems = function() {
			return service.bought;
		}
	}

})();
