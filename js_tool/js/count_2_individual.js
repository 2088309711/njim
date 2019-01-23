
/**
 * 单项遗漏实例
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
                    name: name,//名字：大小单双龙虎
                    miss: null, //遗漏
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

            //计算投注额
            var computeBettingAmount = function (itemIndex, miss2) {

                temp.item[itemIndex].miss = miss2;
                if (miss2 >= miss) {//子对象中的遗漏值大于等于设定遗漏值时开启投注

                    temp.item[itemIndex].is_betting = true;

                    //没有之前的投注数据，或者上次投注的期号和最新开奖的期号不一致
                    if (preArr == null || preArr.issue !== vueData.trs[0].issue) {

                        //如果方法是收尾，则取消新的投注项目
                        if (method == '2') {
                            temp.item[itemIndex].is_betting = false;
                            temp.item[itemIndex].betting_amount = 0;
                        } else {
                            temp.item[itemIndex].betting_amount = num;
                        }

                    } else {//之前有投注数据

                        var preNum = preArr.betting[index].item[itemIndex].betting_amount;//上期的投注额

                        if (preNum === 0) {//上次没有投注这个项目
                            temp.item[itemIndex].betting_amount = num;
                        } else {
                            var temp2 = preNum * 2 + add;
                            if (temp2 > max) {//封顶
                                temp2 = num;
                            }
                            temp.item[itemIndex].betting_amount = temp2;
                        }
                    }
                }
            };

            //大遗漏
            for (var i = 0; i < vueData.trs.length; i++) {
                if (is_big(vueData.trs[i].nums[index])) {
                    computeBettingAmount(0, i);
                    break;
                }
            }

            //小遗漏
            for (var i = 0; i < vueData.trs.length; i++) {
                if (is_small(vueData.trs[i].nums[index])) {
                    computeBettingAmount(1, i);
                    break;
                }
            }

            //单遗漏
            for (var i = 0; i < vueData.trs.length; i++) {
                if (is_single(vueData.trs[i].nums[index])) {
                    computeBettingAmount(2, i);
                    break;
                }
            }


            //双遗漏
            for (var i = 0; i < vueData.trs.length; i++) {
                if (is_double(vueData.trs[i].nums[index])) {
                    computeBettingAmount(3, i);
                    break;
                }
            }


            if (index < 5) {
                //龙遗漏
                for (var i = 0; i < vueData.trs.length; i++) {
                    if (is_loong(vueData.trs[i].nums, index)) {
                        computeBettingAmount(4, i);
                        break;
                    }
                }

                //虎遗漏
                for (var i = 0; i < vueData.trs.length; i++) {
                    if (is_tiger(vueData.trs[i].nums, index)) {
                        computeBettingAmount(5, i);
                        break;
                    }
                }
            }


            return temp;
        }
    }
});
