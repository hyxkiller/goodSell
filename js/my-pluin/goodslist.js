require(["../config"],function(){
    require(["jquery","common","template"],function($,head,tem){
        $("#top").load("http://localhost:8080/html/head.html",function(){
            head();
            $(".cate-all").on("mouseenter",function(){
                $(".category").css({display:"block"});
            })
            $(".cate-all").on("mouseleave",function(){
                $(".category").css({display:"none"});
            })
            $.ajax({
                type:"get",
                url : "../js/my-pluin/gl.json",
                success : function(msg){
                    var oDiv=document.getElementsByClassName("lists")[0];
                    oDiv.innerHTML = tem("mylist",msg);
                }
            })
        });
        $("#rightside").load("http://localhost:8080/html/rightside.html");
        $("#foot").load("http://localhost:8080/html/footer.html");
    })
})