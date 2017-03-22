angular
.module('filters',[])
.filter('capitalize', function(){
    return function(text){
        return text.toUpperCase();
    };
})


;