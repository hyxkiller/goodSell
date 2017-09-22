require(["../config"],function(){
    require(["jquery"],function($){
        // register();
        // function register(){
        //     autoCode();
        // }   
        // register.prototype = {
        //     autoCode : function(){
        //         this.code = document.getElementById("code4");
        //         console.log(this.code)
        //         return this
        //     },
        //     test : function(){

        //     }
        // }  
        var yzmclick = document.getElementById("code4"),yzmnum = document.getElementById("autocode");
        yzmclick.addEventListener("click",function(){
            yzmnum.innerText = createCode(4); 
        })
        function createCode(len) {
            var str = "";
            for(var i = 0; i < len; i++) {
                var ascii = randomInt(48, 90);
                while(ascii >= 58 && ascii <= 64) { //随机结果不符合要求
                    ascii = randomInt(48, 90);
                }
                str += String.fromCharCode(ascii);
            }
            return str;
        }
        function randomInt(min,max){
            return Math.round(Math.random()*(max-min)) + min;
        }

        var regist = document.getElementById("regist");
        var phone = document.getElementById("phone"),pwd = document.getElementById("pwd"),cod = document.getElementById("code");
        var tips = document.getElementsByClassName("content-tip");
        var flag1 = flag2 = flag3 = false;
        // var inputs = document.getElementsByName("checkipt");
        // var regexp = {
        //     phone : /^1[34578]\d{9}$/,
        //     password : /^[^_]{6,12}/,
        //     yzm : yzmnum.innerText
        // }
        // inputs.forEach(function(oIpt,x){
        //     oIpt.addEventListener("keyup",function(){
        //         if( x == 2){
        //             // var ispass = regexp[oIpt.getAttribute("pattern")]
        //             return
        //         }
        //         var ispass = regexp[oIpt.getAttribute("pattern")].test(this.value);
        //         this.setAttribute("pass",ispass);
        //         if(ispass){
        //             tips[x].style.diplay = "block";
        //         }
        //     })
        // })
        function confirmPhone(value){
            var reg=/^1[34578]\d{9}$/;
            return reg.test(value);
        }
        function comfirmPwd(value){
            var reg = /^[0-9a-zA-Z-_=&\$#@]{6,12}$/
            return reg.test(value)
        }
        function comfirmYzm(value){
            return value == yzmnum.innerText;
        }

        phone.addEventListener("blur",function(){
            if( confirmPhone(this.value) ){
                flag1 = true;
            }else{
                flag1 = false;
                tips[0].style.display = "block";
            }
        })
        phone.addEventListener("focus",function(){
            tips[0].style.display = "none"; 
            tips[0].innerHTML = "请输入正确的手机号码";           
        })

        pwd.addEventListener("blur",function(){
            if( comfirmPwd(this.value) ){
                flag2 = true;
            }else{
                flag2 = false;
                tips[1].style.display = "block";
            }
        })
        pwd.addEventListener("focus",function(){
            tips[1].style.display = "none";            
        })

        cod.addEventListener("blur",function(){
            if(comfirmYzm(this.value)){
                flag3 = true;
            }else{
                flag3 = false;
                tips[2].style.display = "block";
            }
        })
        cod.addEventListener("focus",function(){
            tips[2].style.display = "none";
        })
        regist.addEventListener("click",function(){
            if(flag1 && flag2 && flag3){
                $.ajax({
                    type : "post",
                    url : "http://datainfo.duapp.com/shopdata/userinfo.php",
                    data : {
                        status : 'register',
                        userID : phone.value,
                        password : pwd.value
                    }
                })
                .then(function(res){
                    switch(res){
                        case '0' : tips[0].style.display = "block";tips[0].innerHTML = "该用户名已存在"; break;
                        case '1' : location.href = "http://localhost:8080/html/login.html"; break;
                        case '2' : tips[0].style.display = "block";tips[0].innerHTML = "数据库报错"; break;
                    }
                },function(res){
                    tips[0].style.display = "block";
                    tips[0].innerHTML = "GG";
                })
            }
        })    
    })
})