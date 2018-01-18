// Configure the 'monitor' module routes
angular.module('monitor').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/monitor', {
			templateUrl: 'monitor/views/monitor.client.view.html'
		})

	}
]); 
