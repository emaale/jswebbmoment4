var courseApp = angular.module("todoApp", []);

courseApp.controller("todoCtrl", ["$scope", "$http", function($scope, $http) {
	// Fetch all the courses
	$http.get("/todoitem").
		then(function(response) {
			// Add the todoitems to the array
			$scope.todoitems = response.data.todoitems;
		});

	// Function that creates a new todoitem
	$scope.createTodoItem = function(desc) {
		$http.post("/todoitem", {description: desc}).
			then(function(response) {
				// Add the newly created todoitem to the todoitems array
				$scope.todoitems.push(response.data.todoitem);
			});
	};

	// Function that toggles the isFinished boolean
	$scope.toggleIsFinished = function(id) {
		// Send a request to toggle isFinished for the given id
		$http.put("/todoitem/" + id);
	};
}]);