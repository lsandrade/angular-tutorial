var app = angular.module('invoice1', []);

var INTEGER_REGEXP = /^-?\d+$/;

function getData($timeout, $q) {
  return function() {
    var defer = $q.defer();

    // simulated async function
    $timeout(function() {
        if(Math.round(Math.random())) {
            defer.resolve('data received!')
        } else {
            defer.reject('oh no and error! try again')
        }
    }, 2000);

    return defer.promise
  }
}

app.factory('getData', getData)
.run(function(getData) {
  var promise = getData()
      .then(function(string){
          console.log(string)
      }, function(error){
          console.error(error)
      })
})