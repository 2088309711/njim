function copyInputVal(e) {
    var el = $(e.currentTarget);
    // el.select();//选中文本
    el.zclip({
        path: '/static/zclip/ZeroClipboard.swf',
        copy: function () { //复制内容
            return el.val();
        },
        afterCopy: function () {
            showMsg('复制成功', 1, 500);
        }
    });
}
