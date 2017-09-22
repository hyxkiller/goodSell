require(["../config"],function(){
    require(["jquery","common"],function($,head){
        $("#top").load("http://localhost:8080/html/head.html",function(){
            $(".search-bar").hide();
            $(".nav-bar").hide();
            head();
            ipt();
            hasgoods();
        })
        
        function hasgoods(){
            var $mes = $(".message"), $cart = $(".cart-list");
            if(window.localStorage.length!=0){
                storage();
            }else{
                $mes.show();
                $cart.hide();
            }
        }
        function storage(){
            for(var i=0;i<localStorage.length;i++){
                var key = localStorage.key(i)
                var content =  JSON.parse(localStorage.getItem(key))
                var item = $(".cart-item").clone().prependTo(".cart-items");
                $(".goodsimg img").attr("src",content.img.substring(1,46));
                $(".p1").text(content.tittle);
                $(".p2").text("颜色："+content.color);
                $(".price").text(content.price);
                $(".number").val(content.count);
                $(".cart-item").eq(0).remove();
            }
            count();            
        }

        function count(){
            var $reduce = $(".reduce"),$add = $(".add"),$ipt = $(".number");
            var $price = $(".price"),$total = $(".buyspan"),$delete = $(".del");
            var $cartitem = $(".cart-item"),$message = $(".message"),$cartlist = $(".cart-list");
            // for(var i=0;i<$delete.length;i++){
            //     $total.text( +$total.text() + $price.eq(i).text()*$ipt.eq(i).val() )
            // }
            $total.text( parseInt( ($price.text() * $ipt.val() )*100)/100 );
            $reduce.on("click",function(){
                if($ipt.val()>1){
                    $ipt.val($ipt.val()-1)
                    $total.text( parseInt( ($price.text() * $ipt.val() )*100)/100 );
                    // var q = $(this).index();
                    // $ipt.eq(q).val( +$ipt.eq(q).val()+1  );
                    // for(var j=0;j<$delete.length;j++){
                    //     // $ipt.eq(j).val( $ipt.eq(j).val()-1 );
                    //     $total.text( $total.text() - $price.eq(j).text()*$ipt.eq(j).val() )
                    // }
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
                $ipt.val(+$ipt.val()+1);
                $total.text( parseInt( ($price.text() * $ipt.val() )*100)/100 );
                // var m = $(this).index();
                // console.log(m)
                // $ipt.eq(m).val( +$ipt.eq(m).val()+1  );
                // for(var k=0;k<$delete.length;k++){
                //     $total.text( +$total.text() + $price.eq(k).text()*$ipt.eq(k).val() )
                // }
            })
            $ipt.on("keyup",function(){
                for(var i=0;i<$delete.length;i++){
                    $total.text("");
                    $total.text( +$total.text() + $price.eq(i).text()*$ipt.eq(i).val() )
                }
            })
            $delete.on("click",function(){
                var index = $(this).index();
                $cartitem.eq(index).hide();
                if($cartitem.length == 1){
                    $message.show();
                    $cartlist.remove();
                    localStorage.removeItem("bat1");
                }
            })
            
        }
        function ipt(){
            $(".inp:first").click(function(){
				$(".inp:gt(0)").prop("checked", $(this).prop("checked"));
			});
			$(".inp:gt(0)").click(function(){
				var all = true;
				$(".inp:gt(0)").each(function(index){
					if( $(this).prop("checked") == false) {
						all = false;
					}
				});
				all ? $(".inp:first").prop("checked", true) : $(".inp:first").prop("checked", false);
			});
        }
    })
})