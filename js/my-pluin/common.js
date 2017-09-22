define(["jquery"], function($) {
    return function(){
        close();
        select();
        item();
        rightside();
        login();
        storage();

        function storage(){
            for(var i=0;i<localStorage.length;i++){
                var key = localStorage.key(i)
                var content =  JSON.parse(localStorage.getItem(key));
                $(".side-cart em").text(content.count);
            }
        }
        function close(){ //二维码关闭
            var $close = $(".close");
            $close.on("click",function(){
                $(this).parent().hide(1000);
            })
        }
        function select(){  //商品店铺选框
            var $select = $(".select");
            var $UL = $(".searchbox ul");
            $select.on("click",function(e){ 
                e.stopPropagation();
                $UL.show();
                $UL.find("li").on("click",function(){
                    $select.get(0).innerText = $(this).text();
                })
            })
            $("body").on("click",function(){
                $UL.hide();
            })
        }
        function item(){  //全部商品分类列表
            var $item = $(".item");
            $item.on("mouseenter",function(){
                $(this).addClass("hover");
                $(this).find("h3").css({color:"#90be16"});
                $(this).find(".category-details").css({"display":"block"});
            })
            $item.on("mouseleave",function(){
                $(this).removeClass("hover");
                $(this).find("h3").css({color:"#fff"});
                $(this).find(".category-details").css({"display":"none"});
            })
        }
            
        function rightside(){ //右侧导航栏
            var $rightli = $(".right-menu li"),$rightlast = $(".right-menu li:last");
            var $righttop = $(".menu-top li:not(:last)"),$rightmenu = $(".right-menu"),$rightcon = $(".right-content");
            $rightli.on("mouseenter",function(){
                $(this).addClass("action").find("span").animate({right:40,opacity:'show'},200);
            })
            $rightli.on("mouseleave",function(){
                $(this).removeClass("action").find("span").animate({right:60,opacity:'hide'},200);
            })
            $rightlast.click(function(){
                $("body").animate({scrollTop:0},500);
            })
            // var isclose = true;
            $righttop.on("click",function(){
                // if(isclose){
                    $rightmenu.animate({right:220},500);
                    $rightcon.show().animate({right:0},500);
                //     isclose = false;
                // }else{
                //     $rightmenu.animate({right:0},500);
                //     $rightcon.animate({right:-220},500);
                //     isclose = true;
                // }
            })
            var $rightclose = $(".right-content .a1");
            $rightclose.on("click",function(){
                $rightmenu.animate({right:0},500);
                $rightcon.animate({right:-220},500);
                // isclose = true;
            })
            var $center3 = $(".center-3 li"), $rightdiv = $(".right-content>div");
            $center3.on("click",function(){
                var n = $(this).index();
                $rightdiv.eq(n).show().siblings().hide(); 
            })
        }
        
        function login(){  //登录
            var username = localStorage.getItem("name") ? localStorage.getItem("name") : sessionStorage.getItem("name");
            var $nolog = $("#no-login"),$yeslog = $("#yes-login"),$out = $("#out");
            if(username){
                $("#name").html(username);
                $nolog.css({display:"none"});
                $yeslog.css({display:"block"});
                $out.on("click",function(){
                    localStorage.removeItem("name");
                    sessionStorage.removeItem("name");
                    location.reload();
                })
            }
        }
            
            

    }
});