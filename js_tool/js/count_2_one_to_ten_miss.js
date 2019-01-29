/**
 * 1~10名遗漏实例
 */
var vueOneToTenMiss = new Vue({
    el: '#vue-one-to-ten-miss',
    data: {
        result: [
            // {
            //     issue: vueData.trs[0].issue + 1,
            //     betting: [
            //         {
            //             name: name,
            //             item: [
            //                 {
            //                     number: number,
            //                     is_betting: false,
            //                     betting_amount: 0,//当期投注金额
            //                     miss: null,//当期遗漏值
            //                     frequency: 0,//当期投注次数
            //                     total_sum: 0//本轮投注总金额
            //                 }
            //             ]
            //         }
            //     ]
            // }
        ]
    },
    methods: {

        /**
         * 复制文本
         * @param e
         */
        copyText: copyInputVal,


        isShow: function () {
            return this.result.length > 0
        },


        get: function (issue) {
            for (var i = 0; i < this.result.length; i++) {
                if (this.result[i].issue === issue) {
                    return this.result[i];
                }
            }
            return null;
        },


        compute: function (index, name, num, method) {


            var minMiss = 20;//最小遗漏
            var maxMiss = 39;//最大遗漏


            var plan = [
                1 * num, 1 * num, 1 * num, 1 * num, 1 * num, 1 * num, 1 * num, 1 * num, 1 * num, 1 * num,
                2 * num, 2 * num, 2 * num, 2 * num, 2 * num, 3 * num, 3 * num, 3 * num, 4 * num, 4 * num
            ];


            var numObj = function (number) {
                return {
                    number: number,
                    is_betting: false,
                    betting_amount: 0,//当期投注金额
                    miss: null,//当期遗漏值
                    frequency: 0,//当期投注次数
                    total_sum: 0//本轮投注总金额
                }
            }

            var countMiss = function (number) {
                for (var i = 0; i < vueData.trs.length; i++) {
                    if (vueData.trs[i].nums[index] === number) {
                        return i;
                    }
                }
            }

            var temp = {
                name: name,
                item: []
            };

            //创建十个号码对象
            for (var i = 0; i < 10; i++) {
                temp.item[i] = numObj(i + 1);
            }

            //获取上一期的投注方案
            var preData = this.get(vueData.trs[0].issue);

            //和往期数据对比，计算出 10 个号码的遗漏值
            for (var i = 0; i < temp.item.length; i++) {
                temp.item[i].miss = countMiss(temp.item[i].number);


                //必须在遗漏范围内才能投注
                if (temp.item[i].miss >= minMiss && temp.item[i].miss <= maxMiss) {


                    var is_betting = true;//是否投注

                    if (preData != null) { //有上期的投注方案

                        var preIsBetting = preData.betting[index].item[i].is_betting;//上期是否投注

                        //如果上期没有投注当前号码并且当前号码遗漏大于最小遗漏，取消投注
                        if (!preIsBetting && temp.item[i].miss > minMiss) {
                            // is_betting = false;
                        }

                    } else {
                        //没有上期的投注方案并且当前号码遗漏大于最小遗漏，取消投注
                        if (temp.item[i].miss > minMiss) {
                            // is_betting = false;
                        }
                    }

                    //如果是收尾并且为起始投注，取消投注
                    if (method == '2' && temp.item[i].miss == minMiss) {
                        // is_betting = false;
                    }


                    if (is_betting) {//投注
                        play_audio = true;
                        // $('#head-5').css(headColor);
                        temp.item[i].is_betting = true;//开启投注
                        temp.item[i].betting_amount = plan[temp.item[i].miss - 20];
                    }


                }

            }

            return temp;
        }
    }
});