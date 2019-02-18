/**
 * 单项实例
 */
var vueIndividual = new Vue({
    el: '#vue-individual',
    data: {
        register: 0,//寄存池
        issue_num: 0,//期数

        /**
         * 支线IO情况
         * 0=支线1
         * 1=支线2
         * 2=支线3
         * 3=支线4
         * 4=支线5
         */
        feeder_line_io: [
            {
                out: 0,
                input: 0
            }, {
                out: 0,
                input: 0
            }, {
                out: 0,
                input: 0
            }, {
                out: 0,
                input: 0
            }, {
                out: 0,
                input: 0
            },
        ],
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
            //                      feeder_line: [],//支线
            //                      betting_amount: 0,//投注额
            //                      is_betting: false,//是否投注
            //                      miss: 0,//遗漏
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
                    feeder_line: [],//支线1
                    feeder_line2: [],//支线2
                    feeder_line3: [],//支线3
                    feeder_line4: [],//支线4
                    feeder_line5: [],//支线5
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
                            vueThis.register += temp2;//主线溢出
                            temp2 = num;
                        }
                        temp.item[itemIndex].thread = temp2;
                    }

                    var curMiss = 0;//当前遗漏

                    if (!win) {//如果没赢，上期的支线翻倍

                        //遗漏+1
                        var preMiss = preArr.betting[index].item[itemIndex].miss;//上期的遗漏
                        curMiss = preMiss + 1;
                        temp.item[itemIndex].miss = curMiss;

                        //遍历上期的支线1
                        var preFeederLine = preArr.betting[index].item[itemIndex].feeder_line;//上期的支线1（数组）
                        for (var i = 0; i < preFeederLine.length; i++) {
                            var temp2 = preFeederLine[i] * 2;

                            //支线减少金额
                            if (temp2 > 4) {
                                var deduction = 3;
                                temp2 -= deduction;
                                vueThis.register += deduction;//支线1扣除3元
                                vueThis.feeder_line_io[0].out += deduction;//支线1输出
                            }

                            if (temp2 > 20) {// 1  2  4  5  7  11  19
                                vueThis.register += temp2;//支线1溢出
                                vueThis.feeder_line_io[0].out += temp2;//支线1输出
                            } else {
                                temp.item[itemIndex].feeder_line.push(temp2);
                            }
                        }


                        //遍历上期的支线2
                        var preFeederLine2 = preArr.betting[index].item[itemIndex].feeder_line2;//上期的支线2（数组）
                        for (var i = 0; i < preFeederLine2.length; i++) {
                            temp2 = preFeederLine2[i] * 2;

                            //支线减少金额
                            if (temp2 > 4) {
                                var deduction = 3;
                                temp2 -= deduction;
                                vueThis.register += deduction;//支线2扣除3元
                                vueThis.feeder_line_io[1].out += deduction;//支线2输出
                            }

                            if (temp2 > 20) {// 1  2  4  5  7  11  19
                                vueThis.register += temp2;//支线2溢出
                                vueThis.feeder_line_io[1].out += temp2;//支线2输出
                            } else {
                                temp.item[itemIndex].feeder_line2.push(temp2);
                            }
                        }


                        //遍历上期的支线3
                        var preFeederLine3 = preArr.betting[index].item[itemIndex].feeder_line3;//上期的支线3（数组）
                        for (var i = 0; i < preFeederLine3.length; i++) {
                            temp2 = preFeederLine3[i] * 2;

                            //支线减少金额
                            if (temp2 > 4) {
                                deduction = 3;
                                temp2 -= deduction;
                                vueThis.register += deduction;//支线3扣除3元
                                vueThis.feeder_line_io[2].out += deduction;//支线3输出
                            }

                            if (temp2 > 20) {// 1  2  4  5  7  11  19
                                vueThis.register += temp2;//支线3溢出
                                vueThis.feeder_line_io[2].out += temp2;//支线3输出
                            } else {
                                temp.item[itemIndex].feeder_line3.push(temp2);
                            }
                        }


                        //遍历上期的支线4
                        var preFeederLine4 = preArr.betting[index].item[itemIndex].feeder_line4;//上期的支线4（数组）
                        for (var i = 0; i < preFeederLine4.length; i++) {
                            temp2 = preFeederLine4[i] * 2;

                            //支线减少金额
                            if (temp2 > 4) {
                                var deduction = 3;
                                temp2 -= deduction;
                                vueThis.register += deduction;//支线4扣除3元
                                vueThis.feeder_line_io[3].out += deduction;//支线4输出
                            }

                            if (temp2 > 20) {// 1  2  4  5  7  11  19
                                vueThis.register += temp2;//支线4溢出
                                vueThis.feeder_line_io[3].out += temp2;//支线4输出
                            } else {
                                temp.item[itemIndex].feeder_line4.push(temp2);
                            }
                        }

                        //遍历上期的支线5
                        var preFeederLine5 = preArr.betting[index].item[itemIndex].feeder_line5;//上期的支线5（数组）
                        for (var i = 0; i < preFeederLine5.length; i++) {
                            temp2 = preFeederLine5[i] * 2;

                            //支线减少金额
                            if (temp2 > 4) {
                                var deduction = 3;
                                temp2 -= deduction;
                                vueThis.register += deduction;//支线5扣除3元
                                vueThis.feeder_line_io[4].out += deduction;//支线5输出
                            }

                            if (temp2 > 20) {// 1  2  4  5  7  11  19
                                vueThis.register += temp2;//支线5溢出
                                vueThis.feeder_line_io[4].out += temp2;//支线5输出
                            } else {
                                temp.item[itemIndex].feeder_line5.push(temp2);
                            }
                        }

                    }

                    distribution_register(vueThis, curMiss);//分配寄存池

                }

                //如果方法是收尾，则取消新的主线任务
                if (method == '2' && temp.item[itemIndex].thread == num) {
                    // temp.item[itemIndex].is_betting = false;
                    temp.item[itemIndex].thread = 0;
                }

                //相加投注额
                temp.item[itemIndex].betting_amount = temp.item[itemIndex].thread;//主线

                //支线1
                for (var i = 0; i < temp.item[itemIndex].feeder_line.length; i++) {
                    temp.item[itemIndex].betting_amount += temp.item[itemIndex].feeder_line[i];
                }

                //支线2
                for (var i = 0; i < temp.item[itemIndex].feeder_line2.length; i++) {
                    temp.item[itemIndex].betting_amount += temp.item[itemIndex].feeder_line2[i];
                }

                //支线3
                for (var i = 0; i < temp.item[itemIndex].feeder_line3.length; i++) {
                    temp.item[itemIndex].betting_amount += temp.item[itemIndex].feeder_line3[i];
                }

                //支线4
                for (var i = 0; i < temp.item[itemIndex].feeder_line4.length; i++) {
                    temp.item[itemIndex].betting_amount += temp.item[itemIndex].feeder_line4[i];
                }

                //支线5
                for (var i = 0; i < temp.item[itemIndex].feeder_line5.length; i++) {
                    temp.item[itemIndex].betting_amount += temp.item[itemIndex].feeder_line5[i];
                }

            };

            var distribution_register = function (vueThis, miss) {

                /*
                 *
                 * 主线，溢出：15	支线1，溢出：0，扣损：2523	支线2，溢出：350，扣损：1099
                 * 支线3，溢出：245，扣损：174	支线4，溢出：0，扣损：53	支线5，溢出：0，扣损：33，总计：4492
                 *
                 */

                //分配支线1
                var num = miss === 0 ? 3 : 0;
                if (vueThis.register >= num) {//从主线溢出取值

                    //插入到支线1
                    for (var i = 0; i < num; i++) {
                        temp.item[0].feeder_line.push(1);
                    }

                    vueThis.feeder_line_io[0].input += num;//支线1输入
                    vueThis.register -= num;//从主线溢出中减去
                }

                //分配支线2
                num = miss === 2 ? 5 : 0;
                if (temp.item[0].feeder_line2.length === 0) {//支线2必须为空
                    if (vueThis.register >= num) {//从支线1被扣除的3元取值
                        //插入到支线2
                        for (var i = 0; i < num; i++) {
                            temp.item[0].feeder_line2.push(1);
                        }

                        vueThis.feeder_line_io[1].input += num;//支线2输入
                        vueThis.register -= num;//从支线1被扣除的3元中减去
                    }
                }

                //分配支线3
                num = miss === 4 ? 7 : 0;
                if (temp.item[0].feeder_line3.length === 0) {//支线3必须为空
                    if (vueThis.register >= num) {//从支线2被扣除的3元取值
                        //插入到支线3
                        for (var i = 0; i < num; i++) {
                            temp.item[0].feeder_line3.push(1);
                        }

                        vueThis.feeder_line_io[2].input += num;//支线3输入
                        vueThis.register -= num;//从支线2被扣除的3元中减去
                    }
                }

                //分配支线4
                num = miss === 6 ? 9 : 0;
                if (temp.item[0].feeder_line4.length === 0) {//支线4必须为空
                    if (vueThis.register >= num) {//从支线3被扣除的3元取值
                        //插入到支线4
                        for (var i = 0; i < num; i++) {
                            temp.item[0].feeder_line4.push(1);
                        }

                        vueThis.feeder_line_io[3].input += num;//支线4输入
                        vueThis.register -= num;//从支线3被扣除的3元中减去
                    }
                }

                //分配支线5
                num = miss === 8 ? 11 : 0;
                if (temp.item[0].feeder_line5.length === 0) {//支线必须为空
                    if (vueThis.register >= num) {
                        //插入到支线5
                        for (var i = 0; i < num; i++) {
                            temp.item[0].feeder_line5.push(1);
                        }

                        vueThis.feeder_line_io[4].input += num;//支线5输入
                        vueThis.register -= num;//从支线4被扣除的3元中减去
                    }
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
