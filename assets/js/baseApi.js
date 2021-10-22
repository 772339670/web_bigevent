
// 注意: 每次调用 $.ajax $.get $.post 时
// 会先调用$.ajaxPrefilter 函数
// 在这个函数中  可以拿到给ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    // 在发起真正的ajax 之前  统一拼接请求的根路径

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 统一为有权限的接口  设置 headers 请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局 统一挂载 complete 函数
    options.complete= function(res) {
          // 在 complete 回调函数中  可以使用 res.responseJSON 拿到服务器响应回来的数据
          if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.  强制情况 token
            localStorage.removeItem('token')
            // 2. 强制跳转登录页面
            location.href='/login.html'
        }
    }

})