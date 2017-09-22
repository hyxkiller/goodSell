require(["../config"],function(){
    require(["jquery","common","template"],function($,head,tem){
        $("#top").load("http://localhost:8080/html/head.html",function(){
            head();
            $(".categorys").on("mouseover",function(){
                $(".category").css({display:"block"});
            })
            $(".categorys").on("mouseout",function(){
                $(".category").css({display:"none"});
            })
            bigImg();
            changeImg();
            items();
            count();
            similar();
            scroll();
            cart();
            $.ajax({
                type : "get",
                url  : "../js/my-pluin/dl.json",
                success : function(data){
                    var delist = document.getElementsByClassName("left-list")[0];
                    delist.innerHTML = tem("delist",data);
                }
            })
        });
        $("#rightside").load("http://localhost:8080/html/rightside.html");
        $("#foot").load("http://localhost:8080/html/footer.html");

        
        function similar(){
            var $cur = $(".tab li"), $cont = $(".similar-content");
            $cur.on("click",function(){
                var index = $(this).index();
                $(this).addClass("cur").siblings().removeClass("cur");
                $(this).find("b").addClass("b");
                $(this).siblings().find("b").removeClass("b");
                $cont.hide();
                $cont.eq(index).show();
            })
        }
        function scroll(){
            var $til = $(".similar-tittle2"), $scrolltop = $(window).scrollTop(),$pimg = $(".pimg"),a = 0 ;
            $(window).on("scroll",function(){
                $scrolltop = $(window).scrollTop();
                if($scrolltop>880){
                    $til.css({position:"fixed",left:321,top:0,overflow:"hidden"});
                }else{
                    $til.css({position:"absolute",left:0,top:0,overflow:"visible"})
                }
                //详情图片懒加载
                if($scrolltop>1500+430*a && a<=5){
                    $pimg.eq(a).find("img").attr("src",'../images/details/waterfall/wall'+a+'.jpg');
                    a++;
                }
            })
        }
        function items(){
            var $items = $(".items"), $select = $("#hasselect"), $erwei = $(".erwei a"),$erweima = $(".erweiimg");
            $items.on("click",function(){
                $(this).addClass("select").siblings().removeClass("select");
                $(this).find("b").show();
                $(this).siblings().find("b").hide();
                $select.text(" “ "+$(this).find("i").text()+" ” ")
            })
            $erwei.hover(function(){
                $erweima.show();
            },function(){
                $erweima.hide();
            })
        }
        function count(){
            var $reduce = $(".btn-reduce"),$add = $(".btn-add"),$ipt = $(".btn-count");
            $reduce.on("click",function(){
                if($ipt.val()>1){
                    $ipt.val( $ipt.val()-1 );
                }else{
                    $reduce.css({cursor:"not-allowed"})
                }
            })
            $reduce.on("mouseenter",function(){
                if($ipt.val()>1){
                    $reduce.css({cursor:"pointer"})                    
                }else{
                    $reduce.css({cursor:"not-allowed"})                                        
                }
            })
            $add.on("click",function(){
                $ipt.val( +$ipt.val()+1  );
            })
        }
        function bigImg(){
            var $smallImg = $("#smallImg"),$smallCursor = $("#smallCursor"),$bigCursor = $("#bigCursor"), $bigImg = $("#bigImg");
            $smallCursor.width($smallImg.outerWidth()*$bigCursor.outerWidth()/$bigImg.outerWidth() );
            $smallCursor.height($smallCursor.width());
            var rate = $bigCursor.width()/$smallCursor.width();
            $smallImg.hover(function(){
                $smallCursor.fadeIn();
                $smallCursor.css({cursor:"move"});
                $bigCursor.fadeIn();
            },function(){
                $smallCursor.fadeOut();
                $bigCursor.fadeOut();
            })
            $smallImg.on("mousemove",function(e){
                $smallCursor.css({
                    left : Math.min($smallImg.width()-$smallCursor.width(),Math.max(0,e.pageX-$smallImg.offset().left-$smallCursor.width()/2)),
					top : Math.min($smallImg.height()-$smallCursor.height(),Math.max(0,e.pageY-$smallImg.offset().top-$smallCursor.height()/2))
                });
                $bigImg.css({
                    left : -$smallCursor.position().left * rate,
                    top : -$smallCursor.position().top * rate                    
                })
            })
        }
        function changeImg(){
            var $lists = $(".preview-list").find("img"),$smallImg = $("#smallImg"),$bigImg = $("#bigImg");
            $lists.hover(function(){
                $(this).css({border:"1px solid #000"});
                $smallImg.css({"background-image":"url("+$(this).attr("src")+")"});
                $bigImg.attr("src",$(this).attr("src"));
            },function(){
                $(this).css({border:0});
            })
        }

        function cart(){
            var $cart = $(".choose-append");
            $cart.on("click",function(){
                storage();
                jump();
            })
        }
        function storage(){
            var id = $(".hide").text();
            var count = $(".btn-count").val();
            var $number = $(".side-cart em");
            $number.text( +$number.text() + parseInt(count) );
            var number = $number.text();
            var color = $("#hasselect").text();
            var price = $(".tpspan").text();
            var tittle = $(".name").find("h2").text();
            var img = $("#smallImg").css('backgroundImage').substring(4,51);
            var bat = { "count":number, "color":color,"price":price,"tittle":tittle,"img":img};
            var batString = JSON.stringify(bat);
            window.localStorage.setItem("bat"+id,batString);            
        }
        function jump(){
            var $chooseapp = $(".choose-append"), $sidecart = $(".side-cart i"),s = document.getElementsByClassName("side-cart")[0].children[0];
            var start = {x:$chooseapp.offset().left,y:$chooseapp.offset().top};
            var target = {x:$sidecart.offset().left,y:$sidecart.offset().top};
            var x = target.x - start.x;
            var y = target.y - start.y;
            var img = $("#smallImg").css('backgroundImage').substring(4,51).substring(1,46);
            var $goods = $("<img>").appendTo($chooseapp);
            $goods.css({width:60,height:60,position:"absolute",top:-5,left:60,zIndex:1000})
            $goods.attr("src",img);
            $goods.animate({left:x+40,top:y,width:0,height:0},800);
            // var img = document.createElement("img");
            // img.style.position = "absolute";
            // img.style.top = -5+"px";
            // img.style.left = 60+"px";
            // img.style.width = 60+"px";
            // img.style.height = 60+"px"; 
            // img.src =  $("#smallImg").css('backgroundImage').substring(4,51).substring(1,46);                      
            // document.getElementsByClassName("choose-append")[0].appendChild(img);
            // console.log(img)
            // var a = -0.0001;
            // var b = (y - a*x*x)/x;
            // console.log(b)
            // var coordX = 0;
            // var speedx = 5;
            // var speedy = 10;
            // setInterval(function(){
            //     img.style.left = parseInt(img.style.left) + speedx + coordX+"px";
            //     img.style.top = parseInt(img.style.top) + speedy + a*coordX*coordX + b*coordX+"px";
            //     img.style.width = (parseInt(img.style.width)-3)+"px";
            //     img.style.height = (parseInt(img.style.height)-3)+"px";                
            //     coordX += 5;
            //     speedy -= 2;
            // },50)
        }
    })
})