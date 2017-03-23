var app = angular.module('invoice1', ['filters', 'ngRoute']);

var INTEGER_REGEXP = /^-?\d+$/;

function getData($timeout, $q) {
  return function() {
    return $q(function(resolve,reject){
        $timeout(function(){
            resolve(Math.floor(Math.random() * 10))
        }, 2000)
    })
  }
}

app.factory('getData', getData)
.run(function(getData) {
  var promise = getData()
      .then(function(num){
          console.log(num)
          return num * 2
      })
      .then(function(num){
          console.log(num)
      })
})

.config(function($logProvider){
  $logProvider.debugEnabled(false);
})
.run(function($rootScope, $log){
  $rootScope.$log = $log;
})


//Routing
.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: "antigo.html"
        })
        .when('/template',{
            controller: "TemplateCache",
            templateUrl: "template.html"
        })
        .when('/cookies',{
            template: "NOM NOM NOM"
        })
        .when('/look/:name/:lastname',{
            template: "<h1>Hello ({{lastname | uppercase}}, {{ name}})</h1>",
            controller: "msgCtrl"
        })
        .when('/redirect', {
            redirectTo: function (routeParams, path, search) {
                console.log(routeParams);
                console.log(path);
                console.log(search);
                return "/";
            }
        })
        .otherwise({
            redirectTo: '/'
        });
})


;