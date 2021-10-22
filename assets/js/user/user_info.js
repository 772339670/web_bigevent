$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return layer.msg('用户昵称长度必须在1~6个字符之间')
            }
        }

    })

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                layer.msg('获取用户信息成功')
                form.val('formUserInfo', res.data)
                window.parent.getUserInfo()
            }
        })
    }

    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })


    $('.layui-form').on('click', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户数据失败')
                }
                window.parent.getUserInfo()
            }
        })
    })
})