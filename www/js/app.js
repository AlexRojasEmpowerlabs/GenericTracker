(function(){
  'use strict';
  var todosTicket={};
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert(''+device.uuid);
      }, 100);
    };
  });

  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
    //navigator.notification.vibrate(2000); //milliseconds
	//navigator.notification.beep(2); // numbr of times
  });

  module.controller('MasterController', function($scope, $data, $http) {
    $scope.items = todosTicket;  
    $http.get('http://empowerlabs.com/proyectos/soporte/todos.php').
  success(function(data, status, headers, config) {
  	data.reverse();
    $data.items=data;
    todosTicket=data;
    $scope.items = $data.items;  
    $scope.showDetail = function(item) {
      var selectedItem = item;
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
    };
  }).
  error(function(data, status, headers, config) {
  	
  });
  
    $scope.nuevo=function(){
    	$scope.ons.navigator.pushPage('nuevo.html');
    };
  });

  module.factory('$data', function() {
      var data = {};
      
      data.items = todosTicket;
      
      return data;
  });
})();

