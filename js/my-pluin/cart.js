require(["../config"],function(){
    require(["jquery","common"],function($,head){
        $("#top").load("http://localhost:8080/html/head.html",function(){
            $(".search-bar").hide();
            $(".nav-bar").hide();
            head();
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
            var html = "";
            for(var i in localStorage){
                var local = localStorage[i];
                // console.log(localStorage.getItem())
                var content = JSON.parse(local)
                var item = `<div class="cart-item">
                <ul class="clear">
                    <li class="it1">
                        <input type="checkbox" name="" class="inp">
                    </li>
                    <li class="it2 clear">
                        <div class="goodsimg fl">
                            <a href="javascipt:void(0)">
                                <img src="../${content.img.substring(23,46)}" alt="">
                            </a>
                        </div>
                        <div class="goodscon fl">
                            <a href="javascript:void(0)">
                                <p class="p1">${content.tittle}</p>
                                <p class="p2">颜色：${content.color}</p>
                            </a>
                        </div>
                    </li>
                    <li class="it3">¥
                        <span class="price">${content.price}</span>  
                    </li>
                    <li class="it4">
                        <a  class="reduce">-</a>
                        <input type="text" value="${content.count}" class="number">
                        <a  class="add">+</a>                            
                    </li>
                    <div class="it5 del"><p style=" display:none ">${content.id}</p>删除</div>
                </ul>
            </div>`;
                html += item;              
            }
            document.getElementsByClassName("cart-items")[0].innerHTML = html;
            count();   
            ipt();            
        }

        function count(){
            var $reduce = $(".reduce"),$add = $(".add"),$ipt = $(".number");
            var $price = $(".price"),$total = $(".buyspan"),$delete = $(".del");
            var $cartitem = $(".cart-item"),$message = $(".message"),$cartlist = $(".cart-list");
            var nu = 0;
            for(var i=0;i<$delete.length;i++){
                var num =  parseFloat($price.eq(i).text())* ($ipt.eq(i).val());
                nu += num;
            }
            $total.text(nu.toFixed(2));
            $reduce.on("click",function(){  
                if($(this).next().val()>1){
                    $(this).next().val( +$(this).next().val()-1);
                    var nu = 0;
                    for(var i=0;i<$delete.length;i++){
                        var num =  parseFloat($price.eq(i).text())* parseFloat($ipt.eq(i).val());
                        nu += num;
                    }
                    $total.text(nu.toFixed(2));
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
            $add.on("mouseenter",function(){
                $add.css({cursor:"pointer"})
            })
            $add.on("click",function(){
                $(this).prev().val( +$(this).prev().val()+1);
                var nu = 0;
                for(var i=0;i<$delete.length;i++){
                    var num =  parseFloat($price.eq(i).text())* parseFloat($ipt.eq(i).val());
                    nu += num;
                }
                $total.text(nu.toFixed(2)); 
            })
            $ipt.on("keyup",function(){
                var nu = 0;
                for(var i=0;i<$delete.length;i++){
                    var num =  parseFloat($price.eq(i).text())* parseFloat($ipt.eq(i).val());
                    nu += num;
                }
                $total.text(nu.toFixed(2));
            })
            $delete.on("click",function(){
                $(this).parent().parent().remove();
                var mz = parseInt($(this).find("p").text());
                localStorage.removeItem("bat"+mz);
                $cartitem.length -= 1;
                if($cartitem.length == 0){
                    $message.show();
                    $cartlist.hide();
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