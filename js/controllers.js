app

.controller('InvoiceController',
    function(currencyConverter){
    this.qty =1;
    this.cost = 2;
    this.inCurr = 'USD';
    this.currencies = currencyConverter.currencies;
    this.message = "hello";

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
});