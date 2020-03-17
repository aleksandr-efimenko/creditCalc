

const car = (name, model, owner, year, phone, image, date) => ({
    name,
    model,
    owner,
    year,
    phone,
    image,
    date
})


const cars = [
    car('Ford', 'Focus', 'Max', 2016, '+7 929 123 45 67', 'focus.webp', '2019-10-04'),
    car('Ford', 'Mondeo', 'Vladimir', 2018, '+7 900 532 35 67', 'ford.webp', '2019-10-04'),
    car('Porshe', 'Panamera', 'Irina', 2015, '+7 214 877 00 00', 'panamera.jpg', '2009-03-10T00:00:00')
]

new Vue({
    el: '#app',
    data: {
        cars: cars,
        car: cars[0],
        selectedCarIndex: 0,
        phoneVisibility: false,
        search: '',
        modalVisibility: false,
        hover: false
    },
    methods: {
        selectCar: function (index) {
            console.log('Click', index)
            this.car = cars[index]
            this.selectedCarIndex = index
        }
    },
    computed: {
        phoneBtnText() {
            return this.phoneVisibility ? 'Hide phone' : 'Show phone'
        },
        filteredCars() {
            return this.cars.filter(car => {
                return car.name.indexOf(this.search) > -1 || car.model.indexOf(this.search) > -1
            })
        }
    },
    filters: {
        momentDate: function (date) {
            moment.locale('ru');
            return moment(date).format('LL');
        }

    }
});
