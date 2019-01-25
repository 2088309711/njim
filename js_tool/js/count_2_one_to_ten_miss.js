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


        compute: function (index, name, num, min, miss, method) {

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
                // return null;
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


                //大于等于最小遗漏才能投注
                if (temp.item[i].miss >= miss) {

                    temp.item[i].is_betting = true;//开启投注

                    play_audio = true;

              $('#head-5').css('color', '#f00');
                    /*
                  <strong>投注面板</strong>
          <ul class="tab-nav">
              <li class="active"><a id="head-1" href="#tab-1">一大一小</a></li>
              <li><a id="head-2" href="#tab-2">双大双小</a></li>
              <li><a id="head-3" href="#tab-3">三大三小</a></li>
              <li><a id="head-4" href="#tab-4">单项遗漏</a></li>
              <li><a id="head-5" href="#tab-5">1~10名遗漏</a></li>
              <li><a id="head-6" href="#tab-6">双大一小</a></li>
              <li><a id="head-7" href="#tab-7">三大一小</a></li>
              <li><a id="head-8" href="#tab-8">四大一小</a></li>
          </ul>
              */


                    var start = true;//起始投注

                    if (preData != null) { //有上期的投注方案


                        //如果遗漏 = 0，说明上期中奖了
                        if (temp.item[i].miss === 0) {
                            preData.betting[index].item[i].total_sum = 0;//截止到上期投注总额设置为 0
                            preData.betting[index].item[i].frequency = 0;//截止到上期投注次数设置为 0
                        }


                        var preNum = preData.betting[index].item[i].betting_amount;//上期投注额
                        var total_sum = preData.betting[index].item[i].total_sum;//截止到上期投注总额
                        var preFrequency = preData.betting[index].item[i].frequency;//上期的投注次数

                        if (preNum !== 0) {
                            start = false;//上期投注额不等于0，非起始投注
                            var nowNum = num;//初始投注额
                            var odds = 9.99;//赔率
                            var flag = true;
                            while (flag) {

                                //本次投注额 * 赔率 > 截止上期的投注总额 + 本次投注额 + 最低收益
                                if (nowNum * odds > total_sum + nowNum + min) {
                                    flag = false;//已计算出本次投注额
                                } else {
                                    nowNum++;//不满足条件，本次投注额 + 1
                                }
                            }


                            //投注
                            temp.item[i].betting_amount = nowNum;
                            temp.item[i].frequency = preFrequency + 1;
                            temp.item[i].total_sum = total_sum + nowNum;


                        } else {//上期没有投注该号码，为起始投注


                        }


                    } else {
                        //没有上期的投注方案，为起始投注

                    }


                    //起始投注
                    if (start) {
                        temp.item[i].betting_amount = num;
                        temp.item[i].frequency = 1;
                        temp.item[i].total_sum = num;


                        //如果是收尾并且为起始投注，取消投注
                        if (method == '2') {
                            temp.item[i].is_betting = false;
                            temp.item[i].betting_amount = 0;
                            temp.item[i].frequency = 0;
                            temp.item[i].total_sum = 0;
                        }
                    }


                }

            }

            return temp;
        }
    }
});