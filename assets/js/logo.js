$(function () {
    // 点击去注册链接 注册页面展示
    $('#link_reg').click(function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })

    // 点击去注册链接 注册页面展示
    $('#link_login').click(function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 从layui 对象里面获取form
    var form = layui.form;
    form.verify({
        pass: [/^[\S]{6,15}$/, '密码的长度必须是6-15位的非空字符串'],
        samepwd: function (value, item) {
            if (value != $('.password').val()) {
                return '两次输入的密码不一样'
            }
        }
    })
    // 导入layui提示框
    var layer = layui.layer;

    // 监听注册表单的 提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg input[name=username]').val(),
            password: $('#form_reg input[name=password]').val(),
            repassword: $('#form_reg input[name=repassword]').val(),
        }
        $.post('/api/reg', data, function (res) {
            if (res.code != 0) {
                return layer.msg(res.message);
            }

            layer.msg('注册成功，请登录!');
            // 自动注册点击事件
            $('#link_login').click();
        })
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功!');

                localStorage.setItem('token',res.token);
                location.href = './index.html'
            }
        })
    })
})