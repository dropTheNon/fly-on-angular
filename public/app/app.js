var app = angular.module('AirplaneApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('airplanes', {
      url: '/',
      controller: 'MainCtrl',
      templateUrl: 'app/views/airplanes.html'
    }, {
      url: '/api/airplanes/:id',
      templateUrl: 'app/views/edit.html'
    })
    .state('404', {
      url: '/404',
      template: '<h2>404</h2>'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/views/about.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'app/views/contact.html'
    });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/404');
}]);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.airplane = {
    manufacturer: '',
    model: '',
    engines: ''
  }

  $http.get('/api/airplanes').then(function success(res) {
    $scope.airplanes = res.data;
  }, function error(res) {
    console.log(res);
  });

  $scope.delete = function(id, idx) {
    $http.delete('/api/airplanes/' + id).then(function success(res) {
      $scope.airplanes.splice(idx, 1);
    }, function error(res) {
      alert('Error!');
    });
  }

  $scope.add = function() {
    $http.post('/api/airplanes', $scope.airplane).then(function success(res) {
      $scope.airplanes.push(res.data);
    }, function error(err) {
      alert('Error!');
    });
  }

  $scope.update = function(id, idx) {
    $http.put('/api/airplanes/' + id).then(function success(res) {
      $scope.airplanes.splice(idx, 1).push(res.data);
    }, function error(res) {
      alert('Error!');
    });
  }

  $scope.edit = function(id) {
    $http.get('/api/airplanes/' + id).then(function success(res) {
      $scope.airplane = res.data;
    }, function error(res) {
      alert('Error!');
    });
  }
}]);
