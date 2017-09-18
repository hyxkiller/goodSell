require(["../js/config"],function(){ //require路径根据调用此js的页面的路径
    require(["jquery","common"],function($,head){
        $(function(){
            $("#loadhead").load("http://localhost:8020/aqfh5/stage2/coopbuy/html/head.html",function(){
               head();//加载头部
            });
            $("#loadfooter").load("http://localhost:8020/aqfh5/stage2/coopbuy/html/footer.html");
            $("#rightside").load("http://localhost:8020/aqfh5/stage2/coopbuy/html/rightside.html")
            //banner
            var i = 1, j = 1, $listbanner = $(".slide li"), $listbar = $(".slide-bar span"),isout=true;
            setInterval(function(){
                if(isout){
                    bannertimer();
                }
            },2000)
            $listbanner.on("mouseenter",function(){
                isout = false;
            })
            $listbanner.on("mouseleave",function(){
                isout = true;
            })
            $listbar.on("mouseenter",function(){
                isout = false;
            })
            $listbar.on("mouseleave",function(){
                isout = true;
            })
            //banner函数
            function bannertimer(){
                //图片、小圆自动跳转
                if(i <= $listbanner.length-1 ){
                    $($listbanner[i]).addClass('active').siblings().removeClass("active");
                    $($listbar[i]).addClass("bar").siblings().removeClass("bar");
                    i++;
                    if(i==$listbanner.length){
                        i=0;
                    }
                }
                 //放在小圆上变图片            
                $listbar.on("mouseenter",function(){
                    i = $(this).index();
                    $(this).addClass("bar").siblings().removeClass("bar");
                    $listbanner.eq(i).addClass("active").siblings().removeClass("active");
                })
            }
           

            //活动、公告
            var $wrapli = $(".wrapul>li"),$tapul = $(".tap ul");
            $wrapli.on("mouseenter",function(){
                $(this).addClass("listyle").siblings().removeClass("listyle");
                $tapul.eq($(this).index()).show().siblings().hide();
            })
            //话费、收视费
            var $rec = $(".rec"),$hovershow = $(".hovershow");
            $rec.on("mouseenter",function(){
                $hovershow.show().animate({bottom:0},1000)
            })
            //话费、收视费转换
            var $taptop = $(".taptop li"), $mon = $(".mon");
            $taptop.on("mouseenter",function(){
                $(this).removeClass("tapaction").siblings().addClass("tapaction");
                $mon.eq($(this).index()).show().siblings().hide();
            })
            //关闭话费、收视费
            var $closebox = $(".closebox");
            $closebox.on("click",function(){
                $hovershow.hide().css({bottom:-259});
            })
            //话费金额
            var num = '',money = document.getElementById("money"),need = document.getElementsByClassName("need")[0];
            money.onchange = function(){
                need.innerText = "￥" +  this.value;
            }
            //滑入图片透明度变化
            var $lazyload = $(".lazyload");
            $lazyload.on("mouseenter",function(){
                $(this).css({opacity:0.8});
            })
            $lazyload.on("mouseleave",function(){
                $(this).css({opacity:1});
            })
            //导航栏
            var $floornav = $(".floor-nav"), $floorli = $(".floor-nav ul li:not(:last)"), $floorlast = $(".last");
            //导航栏返回顶部
            $floorlast.on("mouseenter",function(){
                $(this).addClass("hover");
            })
            $floorlast.on("mouseleave",function(){
                $(this).removeClass("hover");
            })
            $floorlast.on("click",function(){
                $("body").animate({scrollTop:0},500);
            })
            //导航栏移入移出及点击
            $floorli.on("mouseenter",function(){
                $(this).addClass("hover");
            })
            $floorli.on("mouseleave",function(){
                $(this).removeClass("hover");
                $floorli.eq(ind).addClass("hover")
            })
            $floorli.on("click",function(){
                var index = $(this).index();
                $("body").animate({scrollTop:950+index*530},500);                
            })
            //鼠标滑动
            $(window).scroll(function(){
                var $scrollTop = $(window).scrollTop();
                ind = parseInt( ($(window).scrollTop()-950) /530);
                if($scrollTop>900){
                    $floornav.fadeIn(500);
                }else{
                    $floornav.fadeOut(500);                    
                }
                $floorli.eq(ind).addClass("hover").siblings().removeClass("hover");
            })
            
        })
    })
})