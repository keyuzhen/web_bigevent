$(function(){
    //调用getUserInfo 获取用户基本信息
    getUserInfo()

    var layer=layui.layer

    //点击按钮实现退出功能
    $('#btnLogout').on('click',function(){
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空本地存储的token
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href='/login.html'
            //这是关闭confirm询问框
            layer.close(index);
          });

    })
})

//获取用户基本信息
function getUserInfo(){      //如果执行成功执行success回调函数，失败执行error，无论成功与失败最终都会执行complete回调函数
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //headers就是请求头配置对象
       // headers:{
       //     Authorization:localStorage.getItem('token')||''
       // },
        success:function(res){   //状态码为200执行success函数
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvater()渲染用户头像
            renderAvater(res.data)
        },
        //complete:function(res){
            //console.log('执行了complete回调函数')
           // console.log(res)
            //再complete回调函数中 可以使用res.responseJSON 拿到服务器响应回来的数据
        //    if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        //        //强制清空token
        //        localStorage.removeItem('token')
        //        //强制跳转到登陆页面
        //        location.href='/login.html'
         //   }
       // }
    })
}

//渲染用户头像
function renderAvater(user){
    //获取用户名称
    var name=user.nickname||user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //按需渲染用户头像
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}