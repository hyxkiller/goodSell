require(["../config"],function(){
    require(["jquery"],function($){
        var $phone = $("#phone"),$pwd = $("#pwd"),$login = $("#loginbtn"),$err = $("#msg-error");
        var autologin = document.getElementById("autologin");
        $login.on("click",function(){
            $.ajax({
                type : "get",
                url  : "http://datainfo.duapp.com/shopdata/userinfo.php",
                data : {
                    status : 'login',
                    userID : $phone.val(),
                    password : $pwd.val()
                }
            })
            .then(function(res){
                switch(res){
                    case "0" : $err.text("用户名不存在");break;
                    case "2" : $err.text("用户名密码不匹配");break;
                    default : location.href = "http://localhost:8080/html/index.html";break;
                }
            });
            login();
        })
        $phone.on("focus",function(){
            $err.text("");
        })
        $pwd.on("focus",function(){
            $err.text("");
        })
        function login(){
            var storage = window.localStorage;
            var session = window.sessionStorage;
            if(autologin.checked==true){
                storage.setItem("name",$phone.val());
            }else{
                session.setItem("name",$phone.val())
            }
        }
    })
})