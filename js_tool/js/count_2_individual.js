/**
 * 单项实例
 */
var vueIndividual = new Vue({
    el: '.vue-individual',
    data: {
        register: 0,//寄存器
        result: [
            // {  this.result[0].betting[index].item[0].feeder_line
            //     issue: vueData.trs[0].issue + 1,
            //     betting: [
            //         {
            //             name: name,
            //             item: [
            //                 {
            //                      name: name,//名字：大小单双
            //                      thread: 0,//主线
            //                      feeder_line: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//10条支线
            //                      betting_amount: 0,//投注额
            //                      is_betting: false,//是否投注
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


        /**
         * 分配寄存器
         */
        distribution_register: function (index, max) {

            //大
            if (this.result.length > 0) {


                if (is_big(vueData.trs[0].nums[index])) {

                    var temp = 0;
                    if (this.register < 5 && this.register >= 1) {
                        temp = this.register;
                    } else {
                        temp = Math.floor(this.register / 5);//从寄存器取出的数量，向下取整
                        if (temp > max) {//支线金额限制
                            temp = max;
                        }
                    }

                    //插入到支线
                    this.result[0].betting[index].item[0].feeder_line = temp;
                    this.register -= temp;//从寄存器中减去

                }


                //相加投注额
                this.result[0].betting[index].item[0].betting_amount = this.result[0].betting[index].item[0].thread
                    + this.result[0].betting[index].item[0].feeder_line;
            }
        },


        compute: function (index, name, num, add, max, miss, method) {


            var subObj = function (name) {
                return {
                    name: name,//名字：大小单双
                    thread: 0,//主线
                    feeder_line: 0,//支线
                    betting_amount: 0,//投注额
                    is_betting: false,//是否投注
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
                    temp.item[itemIndex].thread = num;
                } else {//之前有投注数据

                    //上期的主线
                    var preNum = preArr.betting[index].item[itemIndex].thread;
                    if (preNum === 0 || win) {//上次没有投注这个项目或者赢了
                        temp.item[itemIndex].thread = num;
                    } else {
                        var temp2 = preNum * 2 + add;
                        if (temp2 > max) {//封顶
                            this.register += temp2 - add;//将封顶的金额加入寄存器
                            log(this.temp2 - add);
                            temp2 = num;
                        }
                        temp.item[itemIndex].thread = temp2;
                    }


                    //上期的支线
                    var preFeederLine = preArr.betting[index].item[itemIndex].feeder_line;

                    if (!win) {//如果没赢，上期的支线翻倍
                        var temp2 = preFeederLine * 2;
                        if (temp2 > max) {
                            this.register += temp2;//将封顶的金额加入寄存器
                        } else {
                            temp.item[itemIndex].feeder_line = temp2;
                        }
                    }


                }


                //如果方法是收尾，则取消新的主线任务
                if (method == '2' && temp.item[itemIndex].thread == num) {
                    temp.item[itemIndex].is_betting = false;
                    temp.item[itemIndex].thread = 0;
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
