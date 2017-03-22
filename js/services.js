app

.factory('currencyConverter', function(){
    var currencies = ['USD', 'EUR', 'CNY'];
    var usdToForeignRates = {
        USD: 1,
        EUR: 0.74,
        CNY: 6.09
    };
    var convert = function(amount, inCurr, outCurr){
        return amount * usdToForeignRates[outCurr]
            / usdToForeignRates[inCurr];
    };

    return {
        currencies: currencies,
        convert: convert
    }
})

.factory('notify',['$window', function(win){
    var msgs = [];
    return function(msg){
        msgs.push(msg);
        if (msgs.length === 3){
            alert(msgs.join('\n'));
            msgs = [];
        }
    };
}])
;