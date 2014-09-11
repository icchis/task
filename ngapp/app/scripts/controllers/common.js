(function() {

        // var el_hitarea = document.getElementById('hitarea');
        // var el_x = document.getElementById('x');
        // var el_y = document.getElementById('y');
        // var el_z = document.getElementById('z');
        // var startX = null;
        // var startY = null;
        // var endX = null;
        // var endY = null;
        // var moveX = null;
        // var moveY = null;
        // var resultX = null;
        // var resultY = null;
        // resultX = 0;


        // // イベント設定

        // el_hitarea.addEventListener('touchstart', function(event) {
        //     resultX = 0;

        //     startX = event.changedTouches[0].pageX;
        //     startY = event.changedTouches[0].pageY;

        // }, false);

        // el_hitarea.addEventListener('touchmove', function(event) {
        //     // event.preventDefault(); // タッチによる画面スクロールを止める
        //     endX = event.changedTouches[0].pageX;
        //     endY = event.changedTouches[0].pageY;

        //     moveX =  endX - startX;
        //     moveY =  endY - startY;

        //     // resultX <= 240;
        //     // resultX >= 0;
        //     // $("#side_nav").css('left', resultX + "px");


        //     if(moveX > 50){

        //         // event.preventDefault();

        //         resultX = moveX -240;
        //         // resultX = -240 - moveX;

        //         $("#side_nav").css('left', resultX + "px");
        //         $("#sub_wrap").fadeIn("fast");
        //         if(moveX <= 0){
        //             moveX = 0;
        //         }

        //         // resultX = 0;
        //     }
        //     if(moveX < 0){
        //         $("#side_nav").css('left', "-240px");
        //         moveX = 0;
        //     }

        //     if(moveX > 240){
        //         $("#side_nav").css('left', "0px");
        //         moveX = 240;
        //     }

        //     // if(resultX=0){
        //     //     resultX = moveX -240;
        //     //     $("#side_nav").css('left', resultX + "px");
        //     // }

        //     // el_x.innerHTML = moveX;
        //     // el_y.innerHTML = moveY;
        //     // el_z.innerHTML = resultX;

        // }, false);

        // el_hitarea.addEventListener('touchend', function(event) {

        //     // if(moveX < 100 && moveY <=20 && moveY >= -20){
        //     //     $("#side_nav").animate({"left": "-240px"}, "fast");
        //     //     $("#sub_wrap").fadeOut("fast");
        //     //     // resultX = -240;
        //     // }

        //     // if(resultX >= -100){
        //         // $("#side_nav").animate({"left": "0px"}, "fast");
        //         // $("#sub_wrap").fadeIn("fast");
        //         // resultX = 0;
        //         // $("#side_nav").css('left', "0px");
        //     // }
        //     // moveX = 120;

        //     // resultX = 0;

        // }, false);
        var menu = document.getElementById('menu_bar');

        menu.addEventListener('touchstart', function(event) {
            // event.preventDefault();
        }, false);

        menu.addEventListener('touchmove', function(event) {
            // event.preventDefault(); // タッチによる画面スクロールを止める
            event.preventDefault();
        }, false);



    $(".menu_icon").click(function(){
        $("#menu_bar").css("display","block");
        $(".home").animate({"top": "26%"}, 400,"easeInOutQuint");
        $(".tasks").delay(100).animate({"top": "52%"}, 400,"easeInOutQuint");
        $(".progress").delay(200).animate({"top": "52%"}, 400,"easeInOutQuint");
    });

    $(".home,.tasks,.progress").click(function(){
       $(".home").animate({"top": "-126%"}, 600,"easeInOutBack");
        $(".tasks").delay(100).animate({"top": "-152%"}, 600,"easeInOutBack");
        $(".progress").delay(200).animate({"top": "-152%"}, 600,"easeInOutBack");
    });
    $("#menu_bar").click(function(){
       $(".home").animate({"top": "126%"}, 400,"easeInOutQuint");
        $(".tasks").animate({"top": "152%"}, 400,"easeInOutQuint");
        $(".progress").animate({"top": "152%"}, 400,"easeInOutQuint");
        setTimeout("menu_bg()",600);
    });
    function menu_bg(){
        $("#menu_bar").fadeOut("fast");
    }

    $(".side_list a").click(function(){
        $("#sub_wrap").fadeOut("fast");
        $("#side_nav").animate({"left": "-240px"}, 400,"easeInOutQuint");
    });

    // $("#sub_wrap").click(function(event) {
    //     $("#sub_wrap").fadeOut("fast");
    //     $("#side_nav").animate({"left": "-240px"}, "fast");
    // });

    $(".task_add").click(function(event) {
        $(".task_add").addClass("rubberBand");
        $("#section2").css('display', 'block');
        $("#section1,#tasks").css("display","none");
        setTimeout("removeaddanime()",1000);
    });

    function removeaddanime(){
        $(".task_add").removeClass("rubberBand");
    }


    $(".task_list dt").click(function(){
        $(".task_list dd").css("display","block");
    });

    $(".progress").click(function(){
        // $("footer").addClass("tada");
        $("#section3").css('display', 'block');
    });

    $(".progress_push").click(function(event) {
        $("#section3").addClass("bounceOutUp");
        // $("footer").css("display","none");
        setTimeout("removeprogress()",1000);
    });


    $("#menu_bar .home").click(function(){
        document.getElementById("top_title").innerText = 'トップページ';
        $("header").animate({"backgroundColor": "#3CC16C"}, "fast");
    });

    $("#menu_bar .tasks").click(function(){
        document.getElementById("top_title").innerText = 'タスク一覧';
        $("header").animate({"backgroundColor": "rgb(243, 175, 72)"}, "fast");
    });

    $(".prev_page").click(function(){
        $("#section3").addClass("rollOut");
        setTimeout("removeprev()", 600);
    });

})();

