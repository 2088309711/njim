$(function () {


    $('#data').blur(function () {


        try {
            vueCompute.compute($.parseJSON($(this).val()))
        } catch (e) {
            console.error('数据格式错误');
        } finally {
            $(this).val('')
        }

        // for (var i = 0; i < data.length; i++) {
        //
        //     // data[i] = parseInt(data[i]);
        //
        //     //收益阶段
        //     if (i >= start && i < profitArr.length + start) {
        //         // log(data[i]);
        //         // log(profitArr[i - start])
        //         profit += data[i].count * profitArr[i - start];
        //     }
        //
        //     //亏损阶段
        //     if (i >= profitArr.length + start) {
        //         // log(data[i]);
        //         loss += data[i].count * lossNum;
        //     }
        //
        // }


    })

});

function log(o) {
    console.log(o)
}

var fundingScheme = [
    {
        profit: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 8, 6, 4, 2, 0, 7, 4, 1, 7, 3],
        lossNum: 37
    },
    {
        profit: [9, 8, 7, 6, 5, 4, 3, 11, 9, 7, 5, 3, 10, 7, 4, 10, 6, 11, 6, 10],
        lossNum: 50
    },
];


var vueCompute = new Vue({
    el: '#result',
    data: {
        bettingScheme: [
            {
                name: '方案一',
                profit: 0,
                loss: 0,
                result: 0,
                start: 20,
                capital: fundingScheme[0]
            }
        ]
    }, methods: {
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


