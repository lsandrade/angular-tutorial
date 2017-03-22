var app = angular.module('invoice1', ['filters']);

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