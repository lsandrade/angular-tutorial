var app = angular.module('invoice1', []);

var INTEGER_REGEXP = /^-?\d+$/;

function getData($timeout, $q) {
  return function() {
    return $q(function(resolve,reject){
        $timeout(function(){
            if(Math.round(Math.random())){
                resolve('data received!')
            } else {
                reject('oh no an error! try again')
            }
        }, 2000)
    })
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
      .finally(function(){
          console.log('finished at:', new Date())
      })
})