var row = (month, sum, mainPay, percentPay, balance) => ({
    month,
    sum,
    mainPay,
    percentPay,
    balance
})
var tbData = [ // Массив строк

            ]
new Vue({
    el: '#app',

    data: {
        countMonth: 0,
        sum: 50000,
        yearPercent: 15,
        term: 12,
        dateStart: 0,
        monthlyPayment: 0,
        monthlyPercent: 0,
        overpayment: 0,
        currency: '',
        tbData: tbData
    },
    computed: { // Определяем вычисляемое свойство для автоматического пересчета сумм и итога

    },
    methods: {
        fAddNewRow: function (month, sum, mainPay, percentPay, balance) { // Добавить новую строку в таблицу
            this.tbData.push({
                month: month,
                sum: sum,
                mainPay: mainPay,
                percentPay: percentPay,
                balance: balance
            })
        },
        countMonthlyPayment: function () {
            this.monthlyPercent = this.yearPercent / 100 / 12;

            this.monthlyPayment = Math.round(parseFloat(this.sum * this.monthlyPercent / (1 - Math.pow((1 + this.monthlyPercent), -this.term))) * 100) / 100;
            this.overpayment = Math.round((this.sum * this.monthlyPercent / (1 - Math.pow((1 + this.monthlyPercent), -this.term)) * this.term - this.sum) * 100) / 100;
        },
        fillTable: function () {
            this.tbData.length = 0; // Обнуление массива
            var addMonth = new Date();
            var remainSum = this.sum;
            for (i = 0; i < this.term; ++i) {
                addMonth = moment(addMonth).add(1, 'months'); // дата через месяц
                var daysInThisYear = (new Date(addMonth.format('YYYY'), 11, 31) - new Date(addMonth.format('YYYY'), 0, 0)) / 86400000;
                var dailyPercent = this.yearPercent / 100 / daysInThisYear;

                     var monthPercentSum = remainSum * dailyPercent * (moment(addMonth).add(1, 'months') - addMonth) / 86400000;
                                var creditSum =  this.monthlyPayment - monthPercentSum;
                remainSum = remainSum - creditSum;
                this.fAddNewRow(addMonth.locale('ru', null).format('DD MMMM YYYY'),Math.round(this.monthlyPayment * 100) / 100, Math.round(creditSum * 100) / 100, Math.round(monthPercentSum * 100) / 100, Math.round(remainSum * 100) / 100);
            }
        }
    },
    watch: {
        sum: function () {
            this.countMonthlyPayment();           
            this.fillTable();
        },
        yearPercent: function () {
            this.countMonthlyPayment();           
            this.fillTable();
        },
        term: function () {
            this.countMonthlyPayment();
            this.fillTable();
            //    var daysInThisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
            //      var daysInThisYear = (new Date(new Date().getFullYear(), 11, 31) - new Date(new Date().getFullYear(), 0, 0)) / 86400000;
            //      var dailyPercent = this.yearPercent / 100 / daysInThisYear;

        }
    }
});
