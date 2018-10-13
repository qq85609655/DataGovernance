/*初始化rem*/
(function refreshRem() {
    var width = window.screen.width;
    var rem = width * 100 / 1920;
    var s = document.createElement("style");
    s.innerHTML = 'html{font-size:' + rem + 'px !important;}';
    document.getElementsByTagName("head")[0].appendChild(s);
})()