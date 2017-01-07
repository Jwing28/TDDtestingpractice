angular.module('calculatorApp', []).controller('CalculatorController', function CalculatorController($scope, $http) {
  $scope.z = 0;
  $scope.result = 0;
  $scope.sum = function() {
    $scope.z = $scope.x + $scope.y;
  };

  $scope.distance = function() {
    var apiKey = 'ImN9v5XtyAE3HHnweuLXAlR1hCT0M9YvwLE2RCvpdatVSQs6ld3WzVXRyRRl1QQy';
    var url = 'https://www.zipcodeapi.com/rest/' + apiKey + '/distance.json/' + $scope.code1 + '/' + $scope.code2 + '/mile';
    $http.get(url)
      .then(function(result){
        $scope.result = result.data.distance;
        //console.log('success', result.data);
      },
      function(err) {
        console.log('error occured', err);
      });
  }
});


//'https://www.zipcodeapi.com/rest/ImN9v5XtyAE3HHnweuLXAlR1hCT0M9YvwLE2RCvpdatVSQs6ld3WzVXRyRRl1QQy/distance.json/90026/60651/mile'