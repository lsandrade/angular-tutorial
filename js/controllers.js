app

.controller('InvoiceController', function(){
    this.qty =1;
    this.cost = 2;
    this.inCurr = 'USD';
    this.currencies = ['USD', 'EUR', 'CNY'];

    this.usdToForeignRates = {
        USD: 1,
        EUR: 0.74,
        CNY: 0.09
    };

    this.total = function(outCurr){
        var result = this.convertCurrency(this.qty * this.cost,
            this.inCurr, outCurr);
        console.log(outCurr);
        return result;
    };

    this.convertCurrency = function(amount, inCurr, outCurr){
        var result = amount * this.usdToForeignRates[outCurr];
        return result;
    };

    this.pay = function(){
        alert('thanks');
    };
});