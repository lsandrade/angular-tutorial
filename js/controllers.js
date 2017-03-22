app

.controller('InvoiceController',
    function(currencyConverter, $scope){
    this.qty =1;
    this.cost = 2;
    this.inCurr = 'USD';
    this.currencies = currencyConverter.currencies;
    this.message = "hello";
    $scope.bla = "bla bla bla";
    $scope.spice = "very";

    $scope.double = function(n){
        return 2 * n;
    };

    $scope.chiliSpicy = function(){
        $scope.spice = 'chili';
    };

    $scope.jalapenoSpicy = function(){
        $scope.spice = 'jalapeno';
    };

    $scope.customSpicy= function(spice){
        $scope.spice = spice;
    };

    this.usdToForeignRates = {
        USD: 1,
        EUR: 0.74,
        CNY: 0.09
    };

    this.total = function(outCurr){
        return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
    };

    this.pay = function(){
        alert('thanks');
    };
})

.controller('MainController', ['$scope', function($scope) {
  $scope.timeOfDay = 'morning';
  $scope.name = 'Nikki';
}])
.controller('ChildController', ['$scope', function($scope) {
  $scope.name = 'Mattie';
}])

.controller('GrandChildController', ['$scope', function($scope) {
  $scope.timeOfDay = 'evening';
  $scope.name = 'Gingerbread Baby';
}])

.controller('myServiceController', function($scope, notify){
    $scope.callNotify = function(msg){
        notify(msg);
    };
})

;