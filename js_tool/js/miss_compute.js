$(function () {


    $('#data').blur(function () {


        try {
            vueCompute.compute($.parseJSON($(this).val()))
        } catch (e) {
            console.error('数据格式错误');
        } finally {
            $(this).val('')
        }

    })

});

function log(o) {
    console.log(o)
}

var fundingScheme = [
    {
        profit: [9, 8, 7, 6, 5],
        lossNum: 5
    },
    {
        profit: [9],
        lossNum: 1
    },
    {
        profit: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        lossNum: 10
    },
    {
        profit: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 8, 6, 4, 2, 0, 7, 4, 1, 7, 3],
        lossNum: 37
    },
    {
        profit: [9, 8, 7, 6, 5, 4, 3, 2, 1, 9, 7, 5, 3, 1, 8, 5, 2, 8, 4, 9],
        lossNum: 41
    },

    {
        profit: [9, 8, 7, 6, 5, 4, 3, 2, 10, 8, 6, 4, 2, 9, 6, 3, 9, 5, 10, 5],
        lossNum: 45
    },

    {
        profit: [9, 8, 7, 6, 5, 4, 3, 11, 9, 7, 5, 3, 10, 7, 4, 10, 6, 11, 6, 10],
        lossNum: 50
    },
    {
        profit: [9, 8, 7, 6, 5, 4, 12, 10, 8, 6, 4, 11, 8, 5, 11, 7, 12, 7, 11, 5],
        lossNum: 55
    },
    {
        profit: [9, 8, 7, 6, 5, 13, 11, 9, 7, 5, 12, 9, 6, 12, 8, 13, 8, 12, 6, 9],
        lossNum: 61
    },
];

var vueCompute = new Vue({
    el: '#result',
    data: {
        bettingScheme: [
            //最低收益：0，亏损：37，期数：20
            {
                name: 1,
                profit: 0,
                loss: 0,
                result: 0,
                start: 15,
                capital: fundingScheme[0]
            }, {
                name: 2,
                profit: 0,
                loss: 0,
                result: 0,
                start: 16,
                capital: fundingScheme[0]
            },
            {
                name: 3,
                profit: 0,
                loss: 0,
                result: 0,
                start: 17,
                capital: fundingScheme[0]
            },
            {
                name: 4,
                profit: 0,
                loss: 0,
                result: 0,
                start: 18,
                capital: fundingScheme[0]
            },
            {
                name: 5,
                profit: 0,
                loss: 0,
                result: 0,
                start: 19,
                capital: fundingScheme[0]
            },
            {
                name: 6,
                profit: 0,
                loss: 0,
                result: 0,
                start: 20,
                capital: fundingScheme[0]
            },
            {
                name: 7,
                profit: 0,
                loss: 0,
                result: 0,
                start: 21,
                capital: fundingScheme[0]
            },
            {
                name: 8,
                profit: 0,
                loss: 0,
                result: 0,
                start: 22,
                capital: fundingScheme[0]
            },
            {
                name: 9,
                profit: 0,
                loss: 0,
                result: 0,
                start: 23,
                capital: fundingScheme[0]
            },
            {
                name: 10,
                profit: 0,
                loss: 0,
                result: 0,
                start: 24,
                capital: fundingScheme[0]
            },
            {
                name: 11,
                profit: 0,
                loss: 0,
                result: 0,
                start: 25,
                capital: fundingScheme[0]
            },
            {
                name: 12,
                profit: 0,
                loss: 0,
                result: 0,
                start: 26,
                capital: fundingScheme[0]
            },
            {
                name: 13,
                profit: 0,
                loss: 0,
                result: 0,
                start: 27,
                capital: fundingScheme[0]
            },
            {
                name: 14,
                profit: 0,
                loss: 0,
                result: 0,
                start: 28,
                capital: fundingScheme[0]
            },
            {
                name: 15,
                profit: 0,
                loss: 0,
                result: 0,
                start: 29,
                capital: fundingScheme[0]
            },
            {
                name: 16,
                profit: 0,
                loss: 0,
                result: 0,
                start: 30,
                capital: fundingScheme[0]
            },
            {
                name: 17,
                profit: 0,
                loss: 0,
                result: 0,
                start: 31,
                capital: fundingScheme[0]
            },
            {
                name: 18,
                profit: 0,
                loss: 0,
                result: 0,
                start: 32,
                capital: fundingScheme[0]
            },
            {
                name: 19,
                profit: 0,
                loss: 0,
                result: 0,
                start: 33,
                capital: fundingScheme[0]
            },
            {
                name: 20,
                profit: 0,
                loss: 0,
                result: 0,
                start: 34,
                capital: fundingScheme[0]
            },
            {
                name: 21,
                profit: 0,
                loss: 0,
                result: 0,
                start: 35,
                capital: fundingScheme[0]
            },
            {
                name: 22,
                profit: 0,
                loss: 0,
                result: 0,
                start: 36,
                capital: fundingScheme[0]
            },
            {
                name: 23,
                profit: 0,
                loss: 0,
                result: 0,
                start: 37,
                capital: fundingScheme[0]
            },

        ]
    }, methods: {

        findMax: function (num) {
            for (var i = 0; i < this.bettingScheme.length; i++) {
                if (this.bettingScheme[i].result > num) {
                    return 'yellow'
                }
            }
            return 'red'
        },

        compute: function (data) {

            //执行每一个方案
            for (var i = 0; i < this.bettingScheme.length; i++) {

                //遍历遗漏数据
                for (var j = 0; j < data.length; j++) {

                    //收益阶段
                    if (j >= this.bettingScheme[i].start && j <
                        this.bettingScheme[i].capital.profit.length + this.bettingScheme[i].start) {
                        // log(data[j]);
                        // log(profitArr[j - start])
                        this.bettingScheme[i].profit += data[j].count *
                            this.bettingScheme[i].capital.profit[j - this.bettingScheme[i].start];
                    }


                    //亏损阶段
                    if (j >= this.bettingScheme[i].capital.profit.length + this.bettingScheme[i].start) {
                        // log(data[j]);
                        this.bettingScheme[i].loss += data[j].count * this.bettingScheme[i].capital.lossNum;
                    }
                }


                this.bettingScheme[i].result = this.bettingScheme[i].profit - this.bettingScheme[i].loss;

            }
        }
    }
});


