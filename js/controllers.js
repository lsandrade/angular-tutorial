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

.controller('myNewServiceController', function($scope, ListService){
    $scope.items =  ListService.items();
    $scope.add = function(item){
        ListService.add(item);
        console.log($scope.items);
        $scope.items = ListService.items();
    }
})

.controller('ExpressionController', function($scope){
    var exprs = $scope.exprs = [];
    $scope.expr= '3*10|currency';
    $scope.addExp = function(expr){
        exprs.push(expr);
    };

    $scope.removeExp = function(index){
        exprs.splice(index,1);
    };
})

.controller('EventController', function($scope){

    $scope.clickMe = function(clickEvent) {
        $scope.clickEvent = simpleKeys(clickEvent);
        console.log(clickEvent);
    }


    function simpleKeys(original){
        return Object.keys(original)
            .reduce(function(obj, key){
                obj[key] = typeof original[key] === 'object' ? '{ ... }': original[key];
                return obj
            }, {});
    }
})

.controller('OneTimeBinding', function($scope){
    var counter = 0;
    var names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];

    $scope.clickMe = function(clickEvent){
        $scope.name = names[counter % names.length];
        counter++;
    };
})

.controller('FormController', function($scope){
    $scope.master = {};

  $scope.update = function(user) {
    $scope.master = angular.copy(user);
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
})

.controller('CustomForm', function($scope){
    $scope.user = {};
})

.controller('FormNonImmetiate', function($scope){
    $scope.user = {};
})

.controller('FilterCtrl', function($scope){
    $scope.myString = "hello filter";
})

.controller('FilterSearch', function($scope){
    $scope.people = [
        {
            name: "Eric Simons",
            born: "Chicago"
        },
        {
            name: "Albert Pai",
            born: "Taiwan"
        },
        {
            name: "Mathew Greenster",
            born: "Virginia"
        }
    ];
})

.controller('FunController', function(){
    this.start = function(){
        console.log('Fun times have started!! :D');
    }
    this.end = function(){
        console.log("Fun time is over.");
    }
})

.controller("ChoreCtrl", function($scope){
    $scope.logChore = function(chore){
        alert(chore + " is done!");
    };
})

.controller("drinkCtrl", function($scope){
    $scope.ctrlFlavor = "blackberry";
})

.controller("phoneCtrl", function($scope){
    $scope.callHome = function(message){
        alert(message);
    };
})
    
.controller("InvoiceCtrl", function ($scope) {
    $scope.leaveVoicemail= function(number, message){
        alert("Number: " + number + "Said: " +
        message);
    };
})

.controller('TemplateCache', function(){
})

.controller('msgCtrl', function($routeParams, $scope){
    $scope.name = $routeParams.name;
    $scope.lastname = $routeParams.lastname;
})

.controller('HttpCtrl', function($scope, $http){
    $http.get('http://test-routes.herokuapp.com/test/hello')
        .then(function(res){
        $scope.message = res.data.message;
    });
    $scope.sendMsg = function(data) {
        data = {message:data};
        $http.post('http://test-routes.herokuapp.com/test/uppercase', data)
            .success(function(body){
                console.log(body.message);
            });
    }


})
;