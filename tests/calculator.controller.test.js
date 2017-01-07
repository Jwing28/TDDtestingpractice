describe('calculator', function () {

  //by default, only ngModules are loaded..
  beforeEach(module('calculatorApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('sum', function () {
    it('1 + 1 should equal 2', function () {
      var $scope = {};
      var controller = $controller('CalculatorController', { $scope: $scope });
      $scope.x = 1;
      $scope.y = 2;
      $scope.sum();
      expect($scope.z).toBe(3);
    }); 

    it('z should have default value of zero', function () {
      var $scope = {};
      var controller = $controller('CalculatorController', { $scope: $scope });
      expect($scope.z).toBe(0); 
    });    

    //note injected $http service
    it('should return 1736.952 if 90026 and 60651', inject(function ($http, $httpBackend) {
      var $scope = {};
      var controller = $controller('CalculatorController', { $scope: $scope});
      var testDistance = 0;
      $scope.code1 = 90026;
      $scope.code2 = 60651;
      
      //code to test
      $http.get('https://www.zipcodeapi.com/rest/ImN9v5XtyAE3HHnweuLXAlR1hCT0M9YvwLE2RCvpdatVSQs6ld3WzVXRyRRl1QQy/distance.json/90026/60651/mile')
        .success(function(data, status, headers, config){
          console.log('data',data);
          testDistance = data;
          $scope.valid = true;
        })
        .error(function(data, status, headers, config){
          $scope.valid = false;
        });

      //mock
      $httpBackend
        .when('GET','https://www.zipcodeapi.com/rest/ImN9v5XtyAE3HHnweuLXAlR1hCT0M9YvwLE2RCvpdatVSQs6ld3WzVXRyRRl1QQy/distance.json/90026/60651/mile')
        .respond(200,{"distance": 1736.952});

      $httpBackend.flush();//aborts any pending requests. you don't want requests to hang. use when done requesting


      expect($scope.valid).toBe(true);
      expect(testDistance).toEqual({"distance": 1736.952});
    }));
  });

});