/*初始化rem*/
(function refreshRem() {
    $(window).resize(()=>{
        var width = document.body.clientWidth||document.documentElement.clientWidth;
        var rem = width * 100 / 1920;
        $('head').append("<style>html{font-size: "+rem+"px !important;}</style>");
    });
    var width = document.body.clientWidth||document.documentElement.clientWidth;
    var rem = width * 100 / 1920;
    $('head').append("<style>html{font-size: "+rem+"px !important;}</style>");
})()