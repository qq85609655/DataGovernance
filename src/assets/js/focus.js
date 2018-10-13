$(function(){
    $(".dgp-login-content-name").focus(function(){
        $("#dgp-active1").addClass("dgp-bottomActive");
    });
    $(".dgp-login-content-name ").blur(function(){
        $("#dgp-active1").removeClass("dgp-bottomActive");
    });
})

$(function(){
    $(".dgp-login-content-password").focus(function(){
        $("#dgp-active2").addClass("dgp-bottomActive");
    });
    $(".dgp-login-content-password ").blur(function(){
        $("#dgp-active2").removeClass("dgp-bottomActive");
    });
})



