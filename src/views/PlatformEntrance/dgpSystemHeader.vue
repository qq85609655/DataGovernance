<template>
    <div class="dgp-system-header">
        <div class="dgp-header-top clearfix">
            <div class="dgp-header-layout-left">
                <img :src="logo"/>
                <span class="dgp-header-logo-spot"></span>
                <span class="dgp-header-logo-subtext">{{logoSubtext}}</span>
            </div>
            <div class="dgp-header-layout-right">
                <Icon type="ios-refresh"  @click.stop="refreshMyself"/>
                <Icon v-if="isFullScreen" @click.stop="exitFull"  type="ios-contract" />
                <Icon v-else @click.stop="fullScreen" type="ios-expand" />
                <Icon type="ios-help-circle-outline" />
                <Icon type="ios-notifications-outline" />
                <span @click="isShowUserInfo=!isShowUserInfo">
                    <Icon type="ios-contact-outline" style="padding-right: .06rem" />用户名不限八个字
                    <Icon v-if="isShowUserInfo" type="md-arrow-dropup" style="margin: 0"/>
                    <Icon v-else type="md-arrow-dropdown" style="margin: 0;"/>
                </span>
            </div>
        </div>
        <div class="dgp-system-pages-tabs" >
            <div class="dgp-tabs-arrow-prev" @click="handleMoveLeft"><img src="../../assets/images/double-arrow-prev.png" alt="prev"></div>
            <div class="dgp-tabs-select">
                <ul class="dgp-tabs-wrap clearfix">
                    <li v-for="(item, index) in tabsSelect" :key="index" :class="{active:index===tabsSelectIndex,activeFirstPage:index===tabsSelectIndex}">
                        <span v-if="index===0" @click="handleChangeRouter(index)"><Icon type="ios-home-outline" style="font-size: .24rem;padding: 0 .1rem;    vertical-align: sub;" /><i v-if="index!==tabsSelectIndex">首页</i></span>
                        <span v-if="index>0" @click="handleChangeRouter(index)">{{item.name}}</span>
                        <span v-if="index>0" @click="handleCloseCurrentPage(index)"><Icon type="md-close" /></span>
                    </li>
                </ul>
            </div>
            <div class="dgp-tabs-arrow-next" @click="handleMoveRight"><img src="../../assets/images/double-arrow-next.png" alt="next"></div>
            <div class="dgp-tabs-dropDown" @click="isTabsDropDown=!isTabsDropDown">
                <Icon v-if="isTabsDropDown" type="ios-arrow-up" />
                <Icon v-else type="ios-arrow-down" />
                <div v-show="isTabsDropDown" class="dgp-tabs-dropDown-controls">
                    <ul class="dgp-tabs-dropDown-list">
                        <li @click.stop="handleCloseActivePage">关闭当前标签页</li>
                        <li @click.stop="handleCloseOtherPages">关闭其他标签页</li>
                        <li @click.stop="handleCloseAllPages">关闭全部标签页</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DgpSystemHeader",
        props:['propsTabsCurrent','logoSubtext'],
        data(){
            return{
                logo:require('../../assets/images/dgp-logo-icon.png'),//logo
                isShowUserInfo:false,//用户名点击
                isTabsDropDown:false,//tabs栏操作
                tabsSelectIndex:null,
                isFullScreen:false,
                itemDataExist:true,
                tabsSelect: []
            }
        },
        methods:{
            refreshMyself(){
                this.$emit('dorefreshself')
            },
            handleMeasure(){//设置tabs宽度
                let w=0;
                $(".dgp-tabs-wrap>li").each(function() {
                    w+=parseFloat($(this)[0].getBoundingClientRect().width);
                });
                $(".dgp-tabs-wrap").width(w);
                return w;
            },
            handleMoveLeft(){
                let innerLen = this.handleMeasure();
                $(".dgp-tabs-wrap").css({'left':0});
            },
            handleMoveRight(){
                const that=this;
                let innerLen = this.handleMeasure();
                console.log('handleMoveRight',innerLen);
                let outerLen = $('.dgp-tabs-select')[0].getBoundingClientRect().width;
                if(innerLen>outerLen){
                    let widthLen = $('.dgp-tabs-wrap>li.active').prev().offset().left;
                    if(widthLen<0){
                        widthLen=0
                    }else if(widthLen===0){//已经到最左侧，还点击moveright
                        return
                    }
                    $(".dgp-tabs-wrap").css({'left':-widthLen});
                }
            },
            fullScreen(){//全屏
                this.isFullScreen=true;
                let el = document.documentElement;
                let rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen || el.msRequestFullScreen;
                if(typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                } else if(typeof window.ActiveXObject != "undefined") {
                    //for IE 模拟了按下键盘的F11
                    let wscript = new ActiveXObject("WScript.Shell");
                    if(wscript != null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            },
            exitFull() {//退出全屏
                this.isFullScreen=false;
                // 判断各种浏览器，找到正确的方法
                let exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.webkitExitFullscreen;
                if (exitMethod) {
                    exitMethod.call(document);
                } else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
                    let wscript = new ActiveXObject("WScript.Shell");
                    if (wscript !== null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            },
            isFullScreenForNoScroll(){//是否全屏
                let explorer = window.navigator.userAgent.toLowerCase();
                if(explorer.indexOf('chrome')>0){//webkit
                    if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
                        this.isFullScreen=true;
                    } else {
                        this.isFullScreen=false;
                    }
                }else{//IE 9+  fireFox
                    if (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width) {
                        this.isFullScreen=true;
                    } else {
                        this.isFullScreen=false;
                    }
                }
            },
            handleChangeRouter(i){//点击跳转
                this.tabsSelectIndex=i;
                this.$router.push(this.tabsSelect[i].address);
            },
            handleCloseCurrentPage(i){//关闭tabs当前页,关闭自己，相当于点击×按钮
                if(this.tabsSelect.length===1){                 //只有一个数据
                    this.tabsSelectIndex=i;
                    this.$router.push(this.tabsSelect[0].address);
                }else if(this.tabsSelect.length-1===i){         //前面一个数据
                    this.tabsSelect.splice(i,1);
                    this.tabsSelectIndex=i-1;
                    this.$router.push(this.tabsSelect[i-1].address);
                }else{                                          //后面一个数据
                    this.tabsSelect.splice(i,1);
                    this.tabsSelectIndex=i;
                    this.$router.push(this.tabsSelect[i].address);
                    const that=this;//未加会有点击右侧，无左侧当前router标识变化，因为当前tabsSelectIndex未变化
                    this.$emit('changeRouter',that.tabsSelect[that.tabsSelectIndex]);
                }
            },
            handleCloseActivePage(){//关闭当前页,非×号关闭
                this.handleCloseCurrentPage(this.tabsSelectIndex);
                this.isTabsDropDown=false;
            },
            handleCloseOtherPages(){//关闭tabs其他页,保留本身和第一条数据
                if(this.tabsSelect.length>1){
                    let eq = this.tabsSelectIndex;
                    this.tabsSelect.splice(eq+1);
                    this.tabsSelect.splice(1,eq-1);
                    this.tabsSelectIndex=1;
                    this.$router.push(this.tabsSelect[1].address);
                }
                this.isTabsDropDown=false;
            },
            handleCloseAllPages(){//关闭tabs全部页,保留第一条数据
                if(this.tabsSelect.length>1){
                    this.tabsSelect.splice(1);
                    this.tabsSelectIndex=0;
                    this.$router.push(this.tabsSelect[0].address);
                }
                this.isTabsDropDown=false;
            }
        },
        watch:{
            $route(to,from){//变化之前
                //this.routeChange();//测量出错,变化之前的
            },
            tabsSelectIndex(){
                const that=this;
                this.$emit('changeRouter',that.tabsSelect[that.tabsSelectIndex]);
            },
            propsTabsCurrent(){
                const that = this;
                let len = that.tabsSelect.length;
                that.itemDataExist=true;//+++that.itemDataExist=true;临时写法+++
                if(len>0){
                    that.tabsSelect.forEach(function(item,index){
                        if(item.name===that.propsTabsCurrent.name){
                            that.itemDataExist=false;
                            that.tabsSelectIndex=index;
                            that.$router.push(that.tabsSelect[index].address);
                            return false;
                        }else if(that.itemDataExist && len===(index+1)){//只允许添加一次
                            that.tabsSelect.push(that.propsTabsCurrent);
                            that.tabsSelectIndex=that.tabsSelect.length-1;
                            that.$router.push(that.propsTabsCurrent.address);
                        }
                    })
                }else{
                    that.tabsSelect.push(that.propsTabsCurrent);
                    this.tabsSelectIndex=0;
                    that.$router.push(that.propsTabsCurrent.address);
                }
            }
        },
        mounted(){
            $(window).resize(()=>{
                this.isFullScreenForNoScroll();
            });
            let that=this;
            $('.dgp-tabs-dropDown,.dgp-tabs-dropDown-controls').hover(
                function (){that.isTabsDropDown=true;},
                function (){that.isTabsDropDown=false;}
            );
        }
    }
</script>
<style scoped>
    .dgp-system-header{
        width: 18.2rem;
        user-select: none;
    }
    .dgp-system-header .dgp-header-top{
        height: .68rem;
        line-height: .64rem;
        background: #FFFFFF;
        position: relative;
        z-index: 10;
        box-shadow: 0 .01rem 0 0 rgba(0,21,41,0.12);
    }
    .dgp-system-header .dgp-header-layout-left{
        float: left;
        height: .68rem;
        text-align: left;
    }
    .dgp-header-layout-left .dgp-header-logo-spot{
        display: inline-block;
        width: .08rem;
        height: .08rem;
        margin: .3rem .1rem;
        border-radius: 50%;
        background: #000;
        overflow: hidden;
        vertical-align: top;
    }
    .dgp-system-header .dgp-header-layout-left .dgp-header-logo-subtext{
        font-size: 16px;
        font-weight: bold;
        vertical-align: top;
     }
    .dgp-system-header .dgp-header-layout-left>img{
        padding-bottom: .12rem;
        height: .68rem;
        line-height: .68rem;
    }
    .dgp-system-header .dgp-header-layout-right {
        float: right;
        font-size: .14rem;
        text-align: right;
        height: .68rem;
        padding-right: .26rem;
    }
    .dgp-system-header .dgp-header-layout-right span{
        cursor: pointer;
    }
    .dgp-system-header .dgp-header-layout-right i{
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        margin-left: .24rem;
        position: relative;
        top:-0.02rem;
    }
    .dgp-system-pages-tabs{
        height: .48rem;
        width: 18.2rem;
        position: relative;
        line-height: .48rem;
    }
    .dgp-system-pages-tabs .dgp-tabs-select{
        width:16.76rem;
        position: absolute;
        left: .48rem;
        height: .48rem;
        line-height: .48rem;
        overflow: hidden;
    }
    .dgp-system-pages-tabs .dgp-tabs-select .dgp-tabs-wrap{
        position: relative;
        height: .48rem;
        width: 1000%;
        top: 0;
        left: 0;
        line-height: .48rem;
        white-space: nowrap;
        font-size: 0;
        transition: all .2s;
        -webkit-transition: all .2s;
    }
    .dgp-system-pages-tabs .dgp-tabs-select .dgp-tabs-wrap>li:first-child{
        height: .48rem;
    }
    .dgp-system-pages-tabs .dgp-tabs-arrow-prev,
    .dgp-system-pages-tabs .dgp-tabs-arrow-next{
         width: .48rem;
         height: .48rem;
         position: absolute;
        text-align: center;
        line-height: .48rem;
        cursor: pointer;
    }
    .dgp-system-pages-tabs .dgp-tabs-arrow-prev:hover,
    .dgp-system-pages-tabs .dgp-tabs-arrow-next:hover{
        background: #F7F7F7;
    }
    .dgp-system-pages-tabs .dgp-tabs-arrow-prev>img,
    .dgp-system-pages-tabs .dgp-tabs-arrow-next>img{
        width:.25rem;
        height:.25rem;
        vertical-align: middle;
    }
    .dgp-system-pages-tabs .dgp-tabs-arrow-prev{
        left:0;
        border-right: .01rem solid #F5F5F5;
    }
    .dgp-system-pages-tabs .dgp-tabs-arrow-next{
        right:.48rem;
        border-left: .01rem solid #F5F5F5;
    }
    .dgp-system-pages-tabs .dgp-tabs-dropDown{
        position: absolute;
        cursor: pointer;
        top:0;
        right: 0;
        width: .48rem;
        height: .48rem;
        font-size: .24rem;
        text-align: center;
        line-height: .48rem;
        border-left: .01rem solid #F5F5F5;
    }
    .dgp-system-pages-tabs .dgp-tabs-dropDown:hover{
        background-color: #F7F7F7;
    }
    .dgp-system-pages-tabs .dgp-tabs-dropDown .dgp-tabs-dropDown-controls{
         position: absolute;
         top:.48rem;
         right: .03rem;
         z-index: 100;
     }
    .dgp-system-pages-tabs .dgp-tabs-dropDown .dgp-tabs-dropDown-controls .dgp-tabs-dropDown-list{
        margin-top:.02rem;
        border-radius: .03rem;
        background-color: #FFF;
        box-shadow: 0 .01rem .01rem 0 rgba(0,21,41,0.12);
        overflow: hidden;
    }
    .dgp-system-pages-tabs .dgp-tabs-dropDown .dgp-tabs-dropDown-controls li{
        vertical-align: middle;
        height: .51rem;
        line-height: .51rem;
        min-width:1.6rem;
        padding: 0 .1rem;
        text-align: center;
        font-size: .14rem;
        cursor: pointer;
    }
    .dgp-system-pages-tabs .dgp-tabs-dropDown .dgp-tabs-dropDown-controls li:hover{
        background-color: #F7F7F7;
    }
    .dgp-tabs-select .dgp-tabs-wrap>li{
        display: inline-block;
        border-right: .01rem solid #F5F5F5;
        min-width: 1.41rem;
        font-size: .14rem;
        float: left;
        text-align: center;
        cursor: pointer;
        text-overflow: ellipsis;
        color:#3F3F3F;
        position: relative;
    }
    .dgp-tabs-select .dgp-tabs-wrap>li:after{
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         width: 0;
         height: .02rem;
         border-radius: 0;
         background-color: #32B3EA;
         transition: all .3s;
         -webkit-transition: all .3s;
     }
    .dgp-tabs-select .dgp-tabs-wrap>li:hover:after{
        width:100%;
    }
    .dgp-tabs-select .dgp-tabs-wrap>li:hover,
    .dgp-tabs-select .dgp-tabs-wrap>li.active{
        background: #F5F5F5;
    }
    .dgp-tabs-select .dgp-tabs-wrap>li.active:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: .02rem;
        border-radius: 0;
        background-color: #32B3EA;
    }
    .dgp-tabs-select .dgp-tabs-wrap>li.activeFirstPage{
        min-width: .6rem;
    }
    .dgp-tabs-select .dgp-tabs-wrap>li.dgp-tabs-home i{
        font-size: .24rem;
        vertical-align: sub;
        padding: 0 .15rem;
    }
    .dgp-tabs-select .dgp-tabs-wrap li:not(:first-child)>span:first-child {
        height: .48rem;
        float: left;
        line-height: .48rem;
        font-size: .16rem;
        min-width: 1.12rem;
        padding: 0 .06rem;
        color:#3F3F3F;
    }
    .dgp-tabs-select .dgp-tabs-wrap li:not(:first-child)>span:last-child {
        height: .48rem;
        float: left;
        line-height: .48rem;
        font-size: .16rem;
        width: .28rem;
        color:#3F3F3F;
    }
</style>