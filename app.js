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
        sum: 0,
        percent: 0,
        term: 0,
        dateStart: 0,
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
            });
        }
    }
 ,
   watch: {
      term: function () {
          this.tbData.length = 0;
          for (i = 0; i < this.term; ++i) 
          this.fAddNewRow('01.01.2020', 100, 10, 90, 1000)
   }
    }
});
