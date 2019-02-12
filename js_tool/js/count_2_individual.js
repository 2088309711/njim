/**
 * 单项实例
 */
var vueIndividual = new Vue({
    el: '#vue-individual',
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


        compute: function (index, name, num, add, max, miss, method) {

            var subObj = function (name) {
                return {
                    name: name,//名字：大小单双
                    thread: 0,//主线
                    feeder_line: [],//支线
                    betting_amount: 0,//投注额
                    is_betting: false,//是否投注
                    miss: 0,//遗漏
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
            var computeBettingAmount = function (itemIndex, win, vueThis) {

                temp.item[itemIndex].is_betting = true;//开启投注

                // play_audio = true;

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
                            vueThis.register += temp2;//将封顶的金额加入寄存器
                            temp2 = num;
                        }
                        temp.item[itemIndex].thread = temp2;
                    }

                    var preFeederLine = preArr.betting[index].item[itemIndex].feeder_line;//上期的支线（数组）

                    var curMiss = 0;//当前遗漏

                    if (!win) {//如果没赢，上期的支线翻倍

                        //遗漏+1
                        var preMiss = preArr.betting[index].item[itemIndex].miss;//上期的遗漏
                        curMiss = preMiss + 1;
                        temp.item[itemIndex].miss = curMiss;

                        //遍历上期的支线
                        for (var i = 0; i < preFeederLine.length; i++) {
                            var temp2 = preFeederLine[i] * 2;

                            //支线减少金额
                            if (temp2 > 4) {
                                temp2 -= 3;
                            }

                            if (temp2 > 20) {
                                vueThis.register += temp2;//将封顶的金额加入寄存池
                            } else {
                                temp.item[itemIndex].feeder_line.push(temp2);
                            }
                        }

                    }

                    distribution_register(vueThis, win);//分配寄存器

                }

                //如果方法是收尾，则取消新的主线任务
                if (method == '2' && temp.item[itemIndex].thread == num) {
                    // temp.item[itemIndex].is_betting = false;
                    temp.item[itemIndex].thread = 0;
                }

                //相加投注额
                temp.item[itemIndex].betting_amount = temp.item[itemIndex].thread;
                for (var i = 0; i < temp.item[itemIndex].feeder_line.length; i++) {
                    temp.item[itemIndex].betting_amount += temp.item[itemIndex].feeder_line[i];
                }

            };

            var distribution_register = function (vueThis, win) {

                //确定追加支线的数量
                var num = win ? 3 : 0;


                if (vueThis.register >= num) {//确保寄存池内金额充足

                    //追加到支线
                    for (var i = 0; i < num; i++) {
                        temp.item[0].feeder_line.push(1);//每个支线初始金额为1元
                    }

                    vueThis.register -= num;//从寄存器中减去
                }
            }

            //大
            if (is_big(vueData.trs[0].nums[index])) {
                computeBettingAmount(0, true, this);
            } else {
                computeBettingAmount(0, false, this);
            }

            return temp;
        }
    }
});
