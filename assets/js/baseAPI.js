//注意：每次调用$.get()或$.post()或$.ajax()的时候会先调用这个函数$.ajaxPrefilter()
//可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    //再发起真郑的ajax请求之前，统一拼接请求的根路径
    options.url='http://api-breakingnews-web.itheima.net'+options.url
})