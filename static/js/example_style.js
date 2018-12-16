var code_object = {
    icon: [
        '<div id="njim_open_click" style="width:80px; height:80px; position:fixed; bottom:50px; ' +
        'right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;"><img ' +
        'src="http://njim.com/static/images/staff-icon.png" style="position:absolute; top:13px; ' +
        'left:14px; width:50px; margin:0; padding:0;"/><span style="position:absolute; bottom:6px; ' +
        'color:#fff; text-align:center; width:100%; font:15px \'宋体\'; ' +
        'margin:0; padding:0;">在线客服</span></div>'
    ],
    invitation: [
        '<div style="width: 340px; height: 200px; background: #282828 ' +
        'url(http://njim.com/static/images/invitation.jpg) no-repeat;position: fixed; top:50%; ' +
        'left:50%; margin: -100px 0 0 -170px;"><div style="position: absolute;bottom: 5px;' +
        'right: 5px;"><button id="njim_invitation_open_chat" style="float: left; margin: 5px; ' +
        'border: 1px solid #b3a800;background: #fff000; padding: 3px 10px; font:12px \'宋体\'; ' +
        'color: #333;">现在咨询</button><button id="njim_invitation_continue" style="float: left; ' +
        'margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; ' +
        'color: #333;">稍后再说</button><button id="njim_invitation_close" style="float: left; ' +
        'margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; ' +
        'color: #333;">不在提示</button></div></div>'
    ]
};


function insertCode($) {
    $('.n-icon-code').click(function () {
        $('#icon_code').val(code_object.icon[$(this).attr('index')]);
    });
    $('.n-invitation-code').click(function () {
        $('#invitation_code').val(code_object.invitation[$(this).attr('index')]);
    });
}
