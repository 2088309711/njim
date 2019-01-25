/**
 * 双大一小实例
 */
var vueTwoBigAndOneSmall = new Vue({
    el: '#vue-two-big-and-one-small',
    data: {
        result: [
            // {
            //     issue: vueData.trs[0].issue + 1,
            //     betting: [
            //         {
            //             name: name,
            //             item: [
            //                 {
            //                     name: name,//名字：大小单双龙虎
            //                     betting_amount: 0,//投注额
            //                     total_sum: 0,//总金额
            //                     is_betting: false,//是否投注
            //                     betting_count: 0,//投注次数
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


        compute: function (index, name, num, add, max, method) {

            var subObj = function (name) {
                return {
                    name: name,//名字：大小单双龙虎
                    betting_amount: 0,//投注额
                    total_sum: 0,//总金额
                    is_betting: false,//是否投注
                    betting_count: 0,//投注次数
                }
            }

            var temp = {
                name: name,
                item: []
            };

            //给一个名次分配6个对象
            for (var i = 0; i < 6; i++) {
                var name = ['大', '小', '单', '双', '龙', '虎'];
                if (i < 4) {//大小单双
                    temp.item[i] = subObj(name[i]);
                } else {//龙虎
                    if (index < 5) {//前5个名次有龙虎
                        temp.item[i] = subObj(name[i]);
                    }
                }
            }

            //找出上一期的投注数据
            var preArr = this.get(vueData.trs[0].issue);

            /**
             * 计算投注额
             * @param itemIndex
             * @param preItemIndex
             */
            var computeBettingAmount = function (itemIndex, preItemIndex) {

                temp.item[itemIndex].is_betting = true;//开启投注

                var start = true;

                //没有之前的投注数据，或者上次投注的期号和最新开奖的期号不一致
                if (preArr != null && preArr.issue === vueData.trs[0].issue) {
                    //之前有投注数据并且有效

                    var preNum = preArr.betting[index].item[preItemIndex].betting_amount;//上期的投注额
                    if (preNum > 0) {//上次有投注这个项目
                        var betting_amount = preNum * 2 + add;
                        if (betting_amount <= max) {//没超过封顶
                            start = false;//非初始投注
                            temp.item[itemIndex].betting_amount = betting_amount;
                        }
                    }
                }

                //初始投注
                if (start) {
                    temp.item[itemIndex].betting_amount = num;

                    //如果方法是收尾，取消新的投注项目
                    if (method == '2') {
                        temp.item[itemIndex].is_betting = false;
                        temp.item[itemIndex].betting_amount = 0;
                    }
                }

            };


            //两大一小
            if (//小
                is_small(vueData.trs[0].nums[index]) &&//大
                is_big(vueData.trs[1].nums[index]) &&//小
                is_big(vueData.trs[2].nums[index]) &&//小
                is_small(vueData.trs[3].nums[index]) &&//大
                is_big(vueData.trs[4].nums[index]) &&
                is_big(vueData.trs[5].nums[index])
            ) {
                computeBettingAmount(1, 0);// 0大 1小 2单 3双 4龙 5虎
            }


            if (//小
                is_big(vueData.trs[0].nums[index]) &&//小
                is_small(vueData.trs[1].nums[index]) &&//大
                is_big(vueData.trs[2].nums[index]) &&//小
                is_big(vueData.trs[3].nums[index]) &&//小
                is_small(vueData.trs[4].nums[index]) &&//大
                is_big(vueData.trs[5].nums[index]) &&
                is_big(vueData.trs[6].nums[index])
            ) {
                computeBettingAmount(1, 1);// 0大 1小 2单 3双 4龙 5虎
            }


            if (//大
                is_big(vueData.trs[0].nums[index]) &&//小
                is_big(vueData.trs[1].nums[index]) &&//小
                is_small(vueData.trs[2].nums[index]) &&//大
                is_big(vueData.trs[3].nums[index]) &&//小
                is_big(vueData.trs[4].nums[index]) &&//小
                is_small(vueData.trs[5].nums[index]) &&//大
                is_big(vueData.trs[6].nums[index]) &&
                is_big(vueData.trs[7].nums[index])
            ) {
                computeBettingAmount(0, 1);// 0大 1小 2单 3双 4龙 5虎
            }


            //两小一大
            if (//大
                is_big(vueData.trs[0].nums[index]) &&//小
                is_small(vueData.trs[1].nums[index]) &&//大
                is_small(vueData.trs[2].nums[index]) &&//大
                is_big(vueData.trs[3].nums[index]) &&//小
                is_small(vueData.trs[4].nums[index]) &&
                is_small(vueData.trs[5].nums[index])

            ) {
                computeBettingAmount(0, 1);// 0大 1小 2单 3双 4龙 5虎
            }

            if (//大
                is_small(vueData.trs[0].nums[index]) &&//大
                is_big(vueData.trs[1].nums[index]) &&//小
                is_small(vueData.trs[2].nums[index]) &&//大
                is_small(vueData.trs[3].nums[index]) &&//大
                is_big(vueData.trs[4].nums[index]) &&//小
                is_small(vueData.trs[5].nums[index]) &&
                is_small(vueData.trs[6].nums[index])
            ) {
                computeBettingAmount(0, 0);// 0大 1小 2单 3双 4龙 5虎
            }


            if (//小
                is_small(vueData.trs[0].nums[index]) &&//大
                is_small(vueData.trs[1].nums[index]) &&//大
                is_big(vueData.trs[2].nums[index]) &&//小
                is_small(vueData.trs[3].nums[index]) &&//大
                is_small(vueData.trs[4].nums[index]) &&//大
                is_big(vueData.trs[5].nums[index]) &&//小
                is_small(vueData.trs[6].nums[index]) &&
                is_small(vueData.trs[7].nums[index])
            ) {
                computeBettingAmount(1, 0);// 0大 1小 2单 3双 4龙 5虎
            }


            //两单一双
            if (//双
                is_double(vueData.trs[0].nums[index]) &&//单
                is_single(vueData.trs[1].nums[index]) &&//双
                is_single(vueData.trs[2].nums[index]) &&//双
                is_double(vueData.trs[3].nums[index]) &&//单
                is_single(vueData.trs[4].nums[index]) &&
                is_single(vueData.trs[5].nums[index])
            ) {
                computeBettingAmount(3, 2);// 0大 1小 2单 3双 4龙 5虎
            }


            if (//双
                is_single(vueData.trs[0].nums[index]) &&//双
                is_double(vueData.trs[1].nums[index]) &&//单
                is_single(vueData.trs[2].nums[index]) &&//双
                is_single(vueData.trs[3].nums[index]) &&//双
                is_double(vueData.trs[4].nums[index]) &&//单
                is_single(vueData.trs[5].nums[index]) &&
                is_single(vueData.trs[6].nums[index])
            ) {
                computeBettingAmount(3, 3);// 0大 1小 2单 3双 4龙 5虎
            }


            if (//单
                is_single(vueData.trs[0].nums[index]) &&//双
                is_single(vueData.trs[1].nums[index]) &&//双
                is_double(vueData.trs[2].nums[index]) &&//单
                is_single(vueData.trs[3].nums[index]) &&//双
                is_single(vueData.trs[4].nums[index]) &&//双
                is_double(vueData.trs[5].nums[index]) &&//单
                is_single(vueData.trs[6].nums[index]) &&
                is_single(vueData.trs[7].nums[index])
            ) {
                computeBettingAmount(2, 3);// 0大 1小 2单 3双 4龙 5虎
            }


            //两双一单
            if (//单
                is_single(vueData.trs[0].nums[index]) &&//双
                is_double(vueData.trs[1].nums[index]) &&//单
                is_double(vueData.trs[2].nums[index]) &&//单
                is_single(vueData.trs[3].nums[index]) &&//双
                is_double(vueData.trs[4].nums[index]) &&
                is_double(vueData.trs[5].nums[index])

            ) {
                computeBettingAmount(2, 3);// 0大 1小 2单 3双 4龙 5虎
            }


            if (//单
                is_double(vueData.trs[0].nums[index]) &&//单
                is_single(vueData.trs[1].nums[index]) &&//双
                is_double(vueData.trs[2].nums[index]) &&//单
                is_double(vueData.trs[3].nums[index]) &&//单
                is_single(vueData.trs[4].nums[index]) &&//双
                is_double(vueData.trs[5].nums[index]) &&
                is_double(vueData.trs[6].nums[index])
            ) {
                computeBettingAmount(2, 2);// 0大 1小 2单 3双 4龙 5虎
            }


            if (//双
                is_double(vueData.trs[0].nums[index]) &&//单
                is_double(vueData.trs[1].nums[index]) &&//单
                is_single(vueData.trs[2].nums[index]) &&//双
                is_double(vueData.trs[3].nums[index]) &&//单
                is_double(vueData.trs[4].nums[index]) &&//单
                is_single(vueData.trs[5].nums[index]) &&//双
                is_double(vueData.trs[6].nums[index]) &&
                is_double(vueData.trs[7].nums[index])
            ) {
                computeBettingAmount(3, 2);// 0大 1小 2单 3双 4龙 5虎
            }


            if (index < 5) {//龙虎


                //两龙一虎
                if (//虎
                    is_tiger(vueData.trs[0].nums, index) &&//龙
                    is_loong(vueData.trs[1].nums, index) &&//虎
                    is_loong(vueData.trs[2].nums, index) &&//虎
                    is_tiger(vueData.trs[3].nums, index) &&//龙
                    is_loong(vueData.trs[4].nums, index) &&
                    is_loong(vueData.trs[5].nums, index)

                ) {
                    computeBettingAmount(5, 4);// 0大 1小 2单 3双 4龙 5虎
                }


                if (//虎
                    is_loong(vueData.trs[0].nums, index) &&//虎
                    is_tiger(vueData.trs[1].nums, index) &&//龙
                    is_loong(vueData.trs[2].nums, index) &&//虎
                    is_loong(vueData.trs[3].nums, index) &&//虎
                    is_tiger(vueData.trs[4].nums, index) &&//龙
                    is_loong(vueData.trs[5].nums, index) &&
                    is_loong(vueData.trs[6].nums, index)
                ) {
                    computeBettingAmount(5, 5);// 0大 1小 2单 3双 4龙 5虎
                }


                if (//龙
                    is_loong(vueData.trs[0].nums, index) &&//虎
                    is_loong(vueData.trs[1].nums, index) &&//虎
                    is_tiger(vueData.trs[2].nums, index) &&//龙
                    is_loong(vueData.trs[3].nums, index) &&//虎
                    is_loong(vueData.trs[4].nums, index) &&//虎
                    is_tiger(vueData.trs[5].nums, index) &&//龙
                    is_loong(vueData.trs[6].nums, index) &&
                    is_loong(vueData.trs[7].nums, index)
                ) {
                    computeBettingAmount(4, 5);// 0大 1小 2单 3双 4龙 5虎
                }


                //两虎一龙
                if (//龙
                    is_loong(vueData.trs[0].nums, index) &&//虎
                    is_tiger(vueData.trs[1].nums, index) &&//龙
                    is_tiger(vueData.trs[2].nums, index) &&//龙
                    is_loong(vueData.trs[3].nums, index) &&//虎
                    is_tiger(vueData.trs[4].nums, index) &&
                    is_tiger(vueData.trs[5].nums, index)
                ) {
                    computeBettingAmount(4, 5);// 0大 1小 2单 3双 4龙 5虎
                }


                if (//龙
                    is_tiger(vueData.trs[0].nums, index) &&//龙
                    is_loong(vueData.trs[1].nums, index) &&//虎
                    is_tiger(vueData.trs[2].nums, index) &&//龙
                    is_tiger(vueData.trs[3].nums, index) &&//龙
                    is_loong(vueData.trs[4].nums, index) &&//虎
                    is_tiger(vueData.trs[5].nums, index) &&
                    is_tiger(vueData.trs[6].nums, index)
                ) {
                    computeBettingAmount(4, 4);// 0大 1小 2单 3双 4龙 5虎
                }


                if (//虎
                    is_tiger(vueData.trs[0].nums, index) &&//龙
                    is_tiger(vueData.trs[1].nums, index) &&//龙
                    is_loong(vueData.trs[2].nums, index) &&//虎
                    is_tiger(vueData.trs[3].nums, index) &&//龙
                    is_tiger(vueData.trs[4].nums, index) &&//龙
                    is_loong(vueData.trs[5].nums, index) &&//虎
                    is_tiger(vueData.trs[6].nums, index) &&
                    is_tiger(vueData.trs[7].nums, index)
                ) {
                    computeBettingAmount(5, 4);// 0大 1小 2单 3双 4龙 5虎
                }

            }

            return temp;
        }
    }
});