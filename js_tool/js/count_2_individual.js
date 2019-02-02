/**
 * 单项实例
 */
var vueIndividual = new Vue({
    el: '#vue-individual',
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
            //                     miss: null, //遗漏
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


        compute: function (index, name, num, add, max, miss, method) {


            var subObj = function (name) {
                return {
                    name: name,//名字：大小单双

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

            //分配大小单双对象
            for (var i = 0; i < 4; i++) {
                var name = ['大', '小', '单', '双'];
                temp.item[i] = subObj(name[i]);
            }

            //找出上一期的投注数据
            var preArr = this.get(vueData.trs[0].issue);

            //计算投注额
            var computeBettingAmount = function (itemIndex, win) {


                temp.item[itemIndex].is_betting = true;//开启投注

                play_audio = true;

                // $('#head-4').css(headColor);


                //没有之前的投注数据，或者上次投注的期号和最新开奖的期号不一致
                if (preArr == null || preArr.issue !== vueData.trs[0].issue) {
                    temp.item[itemIndex].betting_amount = num;
                } else {//之前有投注数据

                    var preNum = preArr.betting[index].item[itemIndex].betting_amount;//上期的投注额

                    if (preNum === 0 || win) {//上次没有投注这个项目或者赢了
                        temp.item[itemIndex].betting_amount = num;
                    } else {
                        var temp2 = preNum * 2 + add;
                        if (temp2 > max) {//封顶
                            temp2 = num;
                        }
                        temp.item[itemIndex].betting_amount = temp2;
                    }

                }


                //如果方法是收尾，则取消新的投注项目
                if (method == '2' && temp.item[itemIndex].betting_amount == num) {
                    temp.item[itemIndex].is_betting = false;
                    temp.item[itemIndex].betting_amount = 0;
                }

            };

            //大
            if (is_big(vueData.trs[0].nums[index])) {
                computeBettingAmount(0, true);
            } else {
                computeBettingAmount(0, false);
            }

            return temp;
        }
    }
});
