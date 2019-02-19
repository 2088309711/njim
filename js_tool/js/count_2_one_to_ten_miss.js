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

            //遗漏距离
            var distance = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];

            //投注8期，最小收益2，共8元
            var plan = [1 * num, 1 * num, 1 * num, 1 * num, 1 * num, 1 * num, 1 * num, 1 * num];

            //开始位置
            var start_position = 27;

            var numObj = function (number) {
                return {
                    number: number,
                    is_betting: false,
                    betting_amount: 0,//当期投注金额
                    miss: null,//遗漏值
                    miss_distance: null,//遗漏距离
                    frequency: 0//当期投注次数
                }
            }

            //计算遗漏值
            var computeMiss = function (number) {
                for (var i = 0; i < vueData.trs.length; i++) {
                    if (vueData.trs[i].nums[index] === number) {
                        return i;
                    }
                }
            }


            //传入需要比对的遗漏值，计算出相同遗漏值上次触发的距离
            var computeMissDistance = function (miss) {

                //遍历开奖数据
                for (var i = 0; i < vueData.trs.length; i++) {

                    //判断索引是否存在
                    if (i + miss + 1 >= vueData.trs.length) {
                        continue;
                    }

                    //如果 i 索引的号码 = i 索引 + 遗漏值 + 1 的号码
                    if (vueData.trs[i].nums[index] === vueData.trs[i + miss + 1].nums[index]) {

                        var flag = true;

                        //继续判断在这个范围是否出现号码
                        for (var j = i + 1; j <= i + miss; j++) {
                            if (vueData.trs[i].nums[index] === vueData.trs[j].nums[index]) {
                                flag = false;//中途出现该号码
                            }
                        }

                        if (flag) {
                            return i;
                        }

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


            //和往期数据对比，计算出 10 个号码的遗漏值
            // for (var i = 0; i < 10; i++) {
            //     temp.item[i].miss = computeMiss(temp.item[i].number);
            // }

            //和往期数据对比，计算出 10 个号码遗漏值的距离
            // for (var i = 0; i < 10; i++) {
            //     temp.item[i].miss_distance = computeMissDistance(temp.item[i].miss);
            // }

            //获取上一期的投注方案
            var preData = this.get(vueData.trs[0].issue);

            //和往期数据对比，计算出 10 个号码的遗漏值
            for (var i = 0; i < temp.item.length; i++) {
                temp.item[i].miss = computeMiss(temp.item[i].number);


                // 必须在遗漏范围内才能投注 27 28 29 30 31 32 33 34
                if (temp.item[i].miss >= start_position && temp.item[i].miss < start_position + plan.length) {

                    var is_betting = true;//开启投注

                    if (preData != null) { //有上期的投注方案

                        var preIsBetting = preData.betting[index].item[i].is_betting;//上期是否投注

                        // 如果上期没有投注当前号码并且当前号码遗漏大于最小遗漏，取消投注
                        if (!preIsBetting && temp.item[i].miss > start_position) {
                            is_betting = false;
                        }

                    } else {
                        // 没有上期的投注方案并且当前号码遗漏大于最小遗漏，取消投注
                        if (temp.item[i].miss > start_position) {
                            is_betting = false;
                        }
                    }

                    // 如果是收尾并且为起始投注，取消投注
                    if (method == '2' && temp.item[i].miss == start_position) {
                        is_betting = false;
                    }

                    if (is_betting) {//投注
                        // play_audio = true;
                        // $('#head-5').css(headColor);
                        temp.item[i].is_betting = true;//开启投注
                        //投注额 = 当前遗漏值 - 开始位置
                        temp.item[i].betting_amount = plan[temp.item[i].miss - start_position];
                    }

                }

            }

            return temp;
        }
    }
});