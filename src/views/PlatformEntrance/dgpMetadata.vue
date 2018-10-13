<template>
    <div class="dgp-home-wrap">
        <!--左侧导航部分-->
        <div class="dgp-home-icon">
            <div class="dgp-whiteArrow-icon" @click="enterMark">
                <img :src="whiteArrow"/>
            </div>
            <div class="dgp-home-icons">
                <div class="dgp-home-icon1" @mouseenter="enterNavigationOne" @mouseleave="outNavigationOne" @click="cliNavigationOne">
                    <img :src="homeIcons1" alt="元数据"/>
                    <p>元数据</p>
                </div>
                <div class="dgp-home-icon2" @mouseenter="enterNavigationTwo" @mouseleave="outNavigationTwo" @click="cliNavigationTwo">
                    <img :src="homeIcons2" alt="元数据变更"/>
                    <p>元数据变更</p>
                </div>
            </div>
        </div>
        <!--主页内容部分-->
        <div class="dgp-homeContent">
            <div class="dgp-logo clearfix">
                <img :src="logo"/>
                <div class="dgp-logo-spot"></div>
                <div class="dgp-logo-text">元数据</div>
            </div>
            <div class="dgp-exitSystem clearfix" @click="outSystem">
                <span>退出系统</span>
                <img :src="exitSystem" />
            </div>
            <!--<table2  :columns="columns" :data="data"></table2>-->
            <!---------------------------------二级菜单------------------------->
            <ul class="dgp-twoMenu dgp-twoMenuFirst" >
                <li class="dgp-twoMenu-content"  @click="cliTwoMenu">元数据</li>
                <li class="dgp-twoMenu-content" @click="cliTwoMenu">元数据采集</li>
                <li class="dgp-twoMenu-content" @click="cliTwoMenu">映射关系维护</li>
                <li class="dgp-twoMenu-content"  @click="cliTwoMenu">元数据查询</li>
                <li class="dgp-twoMenu-content"  @click="cliTwoMenu">变更核对</li>
            </ul>
            <ul class="dgp-twoMenu dgp-twoMenuSencond">
                <li class="dgp-twoMenu-content"  @click="cliTwoMenu">变更申请</li>
                <li class="dgp-twoMenu-content"  @click="cliTwoMenu">变更历史</li>
                <li class="dgp-twoMenu-content"  @click="cliTwoMenu">全链分析</li>
            </ul>
            <div class="dgp-homeContent-view">
                <router-view></router-view>
            </div>
        </div>
        <!--系统切换蒙版部分-->
        <div class="dgp-mask">
            <!--<div class="dgp-menu">
                <div class="dgp-menu-top clearfix" @click="outMark">
                    <span>平台切换</span>
                    <button class="dgp-menu-fork">
                        <img :src="menuFork" alt="平台切换"/>
                    </button>
                </div>
                <div class="dgp-menu-content">
                    <div class="dgp-menu-content-module dgp-dataStandard" @click="clidataStandard"
                         @mouseenter="enterdataStandard" @mouseleave="outdataStandard">
                        <img :src="dataStandardChange" alt="DATA STANDARD" v-show="dataStandardGreen">
                        <img :src="dataStandard" alt="DATA STANDARD" v-show="dataStandardWhite"/>
                        <div>
                            <p>数据标准</p>
                            <p>DATA STANDARD</p>
                        </div>

                    </div>
                    <div class="dgp-menu-content-module dgp-dataQuality"  @click="clidataQuality"
                         @mouseenter="enterdataQuality" @mouseleave="outdataQuality">
                        <img :src="dataQualityChange" alt="DATA STANDARD" v-show="dataQualityGreen">
                        <img :src="dataQuality" alt="DATA QUALITY" v-show="dataQualityWhite"/>
                        <div>
                            <p>数据质量</p>
                            <p>DATA QUALITY</p>
                        </div>

                    </div>
                    <div class="dgp-menu-content-module dgp-metaData" @click="climetaData"
                         @mouseenter="entermetaData" @mouseleave="outmetaData">
                        <img :src="metaDataChange" alt="DATA STANDARD" v-show="metaDataGreen">
                        <img :src="metaData" alt="METADATA" v-show="metaDataWhite"/>
                        <div>
                            <p>元数据</p>
                            <p>METADATA</p>
                        </div>
                    </div>
                    <div class="dgp-menu-content-module dgp-systemAdmin" @click="clisystemAdmin"
                         @mouseenter="entersystemAdmin" @mouseleave="outsystemAdmin">
                        <img :src="systemAdminChange" alt="DATA STANDARD" v-show="systemAdminGreen">
                        <img :src="systemAdmin" alt="SYSTEM ADMIN" v-show="systemAdminWhite"/>
                        <div>
                            <p>系统管理</p>
                            <p>SYSTEM ADMIN</p>
                        </div>
                    </div>
                    <div class="dgp-menu-content-module dgp-screenDisplay" @click="cliscreenDisplay"
                         @mouseenter="enterscreenDisplay" @mouseleave="outscreenDisplay">
                        <img :src="screenDisplayChange" alt="DATA STANDARD" v-show="screenDisplayGreen">
                        <img :src="screenDisplay" alt="SCREEN DISPLAY"
                             v-show="screenDisplayWhite"/>
                        <div>
                            <p>大屏展示</p>
                            <p>SCREEN DISPLAY</p>
                        </div>
                    </div>
                </div>
            </div>-->
            <dgp-menu></dgp-menu>
        </div>
    </div>
</template>

<script>
    // import "../assets/css/dgpIndex.css"
    import DgpMenu from "./dgpMenu";
    export default {
        name: "dgpIndex",
        components: {DgpMenu},
        data(){
            return{
                whiteArrow:require('../../assets/images/dgp-whiteArraw-icon.png'),
                logo:require('../../assets/images/dgp-logo-icon.png'),
                exitSystem:require("../../assets/images/dgp-signOut-icon.png"),
                /*menuFork:require("../assets/images/dgp-menu-fork.png"),
                dataStandard:require("../assets/images/dgp-dataStandard-icon1.png"),
                dataStandardChange:require("../assets/images/dgp-dataStandard-icon2.png"),
                dataStandardWhite:true,
                dataStandardGreen:false,
                dataQuality:require("../assets/images/dgp-dataQuality-icon1.png"),
                dataQualityChange:require("../assets/images/dgp-dataQuality-icon2.png"),
                dataQualityWhite:true,
                dataQualityGreen:false,
                metaData:require("../assets/images/dgp-metaData-icon1.png"),
                metaDataChange:require("../assets/images/dgp-metaData-icon2.png"),
                metaDataWhite:true,
                metaDataGreen:false,
                systemAdmin:require("../assets/images/dgp-system-icon1.png"),
                systemAdminChange:require("../assets/images/dgp-system-icon2.png"),
                systemAdminWhite:true,
                systemAdminGreen:false,
                screenDisplay:require("../assets/images/dgp-screenDisplay-icon1.png"),
                screenDisplayChange:require("../assets/images/dgp-screenDisplay-icon2.png"),
                screenDisplayWhite:true,
                screenDisplayGreen:false,*/
                homeIcons1:require('../../assets/images/dgp-home-icon1.png'),
                homeIcons2:require('../../assets/images/dgp-home-icon2.png'),

                isClick:true,
                isMenu:true,
                isNav:true,
            }
        },
        methods:{
            enterMark(){
                this.isMenu=false;
                $(".dgp-mask-content").css("display",'block')
                // $(".dgp-menu").css("display","block")
                $(".dgp-menu").show(400)
                $(".dgp-twoMenu").css("display","none");
            },
            /*outMark(){
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").hide(400)
            },
            clidataStandard(){
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpQualtyInfo')
            },
            enterdataStandard(){
                this.dataStandardWhite=false;
                this.dataStandardGreen=true;

            },
            outdataStandard(){
                this.dataStandardWhite=true;
                this.dataStandardGreen=false;

            },
            clidataQuality(){
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpDataQuality/dataQualtyIndex')
            },
            enterdataQuality(){
                this.dataQualityWhite=false;
                this.dataQualityGreen=true;
            },
            outdataQuality(){
                this.dataQualityWhite=true;
                this.dataQualityGreen=false;
            },
            climetaData(){
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpMetadata/metaDataIndex')
            },
            entermetaData(){
                this.metaDataWhite=false;
                this.metaDataGreen=true;
            },
            outmetaData(){
                this.metaDataWhite=true;
                this.metaDataGreen=false;
            },
            clisystemAdmin(){
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpSystemAdmin/dgpSystemUser')
            },
            entersystemAdmin(){
                this.systemAdminWhite=false;
                this.systemAdminGreen=true;
            },
            outsystemAdmin(){
                this.systemAdminWhite=true;
                this.systemAdminGreen=false;
            },
            cliscreenDisplay(){
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpScreenDisplay')
            },
            enterscreenDisplay(){
                this.screenDisplayWhite=false;
                this.screenDisplayGreen=true;

            },
            outscreenDisplay(){
                this.screenDisplayWhite=true;
                this.screenDisplayGreen=false;
            },
            */
            outSystem(){
                this.$router.push('/')
            },
            enterNavigationOne(){
                this.isNav=true;
                /*$(".dgp-home-icon2").css("backgroundColor", "rgb(0,21,41)");
                $(".dgp-home-icon3").css("backgroundColor", "rgb(0,21,41)");
                $(".dgp-home-icon4").css("backgroundColor", "rgb(0,21,41)");
                $(".dgp-home-icon5").css("backgroundColor", "rgb(0,21,41)");
                $(".dgp-home-icon6").css("backgroundColor", "rgb(0,21,41)");
                $(".dgp-home-icon1").css("backgroundColor","rgb(107,199,188)");*/
                if(this.isClick){
                    this.isClick=false;
                    $(".dgp-twoMenuSencond").css("display","none");
                    $(".dgp-twoMenuThird").css("display","none");
                    $(".dgp-twoMenuFourth").css("display","none");
                    $(".dgp-twoMenuFifth").css("display","none");
                    $(".dgp-twoMenuSixth").css("display","none");
                    if($(".dgp-twoMenuFirst").css("display")=="none"){
                        $(".dgp-twoMenuFirst").show(400)
                        $(".dgp-mask-content").css("display","block")
                    }
                    setTimeout(()=>{
                        this.isClick=true;
                    },400)
                }
            },
            outNavigationOne(){
                if(this.isNav) {
                    // $(".dgp-home-icon1").css("backgroundColor", "rgb(0,21,41)");
                }
            },
            cliNavigationOne(){
                this.isNav=false;
                $(".dgp-twoMenu").hide(400);
                $(".dgp-mask-content").css("display","none");
                this.$router.push('/dgpMetadata/metaDataIndex')
            },
            enterNavigationTwo(){
                /*$(".dgp-home-icon1").css("backgroundColor", "rgb(0,21,41)");
                $(".dgp-home-icon3").css("backgroundColor", "rgb(0,21,41)");
                $(".dgp-home-icon4").css("backgroundColor", "rgb(0,21,41)");
                $(".dgp-home-icon5").css("backgroundColor", "rgb(0,21,41)");
                $(".dgp-home-icon6").css("backgroundColor", "rgb(0,21,41)");*/
                this.isNav=true;
                // $(".dgp-home-icon2").css("backgroundColor","rgb(107,199,188)");
                if(this.isClick){
                    this.isClick=false;
                    $(".dgp-twoMenuFirst").css("display","none");
                    $(".dgp-twoMenuThird").css("display","none");
                    $(".dgp-twoMenuFourth").css("display","none");
                    $(".dgp-twoMenuFifth").css("display","none");
                    $(".dgp-twoMenuSixth").css("display","none");
                    if($(".dgp-twoMenuSencond").css("display")=="none"){
                        $(".dgp-twoMenuSencond").show(400)
                        $(".dgp-mask-content").css("display","block")
                    }
                    setTimeout(()=>{
                        this.isClick=true;
                    },400)
                }
            },
            outNavigationTwo(){
                if(this.isNav) {
                    // $(".dgp-home-icon2").css("backgroundColor", "rgb(0,21,41)");
                }
            },
            cliNavigationTwo(){
                this.isNav=false;
                $(".dgp-twoMenu").hide(400);
                $(".dgp-mask-content").css("display","none");
                this.$router.push('/dgpMetadata/metaDataChange')
            },


            cliTwoMenu(){
                $(".dgp-twoMenu").hide(500);
                $(".dgp-mask-content").css("display","none");
            },
            handleSecondMenu(){
                $('.dgp-homeContent').on('mouseleave','.dgp-twoMenu',function(){
                    $(this).hide();
                })
            }
        },
        mounted(){
            this.handleSecondMenu();
        }
    }
</script>

<style scoped>
    .dgp-home-wrap{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .clearfix:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden;
    }
    .dgp-home-icon{
        position: fixed;
        left: 0;
        top: 0;
        width: 1rem;
        height: 100%;
        /*background: -moz-linear-gradient(top, rgba(7, 50, 113, 1) 0%, rgba(21, 115, 146, 1) 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(7, 50, 113, 1)), color-stop(100%,rgba(21, 115, 146, 1)));
        background: -webkit-linear-gradient(top, rgba(7, 50, 113, 1) 0%,rgba(21, 115, 146, 1) 100%);
        background: -o-linear-gradient(top, rgba(7, 50, 113, 1) 0%,rgba(21, 115, 146, 1) 100%);
        background: -ms-linear-gradient(top, rgba(7, 50, 113, 1) 0%,rgba(21, 115, 146, 1) 100%);
        background: linear-gradient(to bottom, rgba(7, 50, 113, 1) 0%,rgba(21, 115, 146, 1) 100%);*/
    }
    .dgp-whiteArrow-icon{
        height: 0.64rem;
        line-height: 0.64rem;
        width: 100%;
        /*background-color:rgba(50, 179, 234, 1);*/
        box-shadow: 0px 0px .06rem 0px rgba(0, 21, 41, 0.35);
        text-align: center;
    }
    .dgp-whiteArrow-icon img{
        width: 35.93%;
        margin-top: 0.12rem;

    }
    .dgp-home-icons{
        width: 100%;
        text-align: center;
    }
    .dgp-home-icons>div{
        height: 1rem;
        width: 100%;
        text-align: center;
        vertical-align: middle;
    }
    .dgp-home-icons>div>p{
        font-size: 0.16rem;
        color: #fff;
    }
    .dgp-home-icon1{
        margin-top: 0.5rem;
    }
    .dgp-home-icons>div>img{
        margin-top: 20%;
        width: 25%;
    }
    .dgp-homeContent{
        position: absolute;
        left: 1rem;
        top: 0;
        width: 18.2rem;
        /*height: 100%;*/
    }
    .dgp-logo{
        height: 0.64rem;
        line-height: 0.64rem;
    }
    .dgp-logo div{
        float: left;
    }
    .dgp-logo>img{
        float: left;
        vertical-align: middle;
        margin-left: 0.13rem;
        width: 8.9%;
        margin-top: 0.1rem;
    }
    .dgp-logo-spot{
        border: 0.04rem solid black;
        border-radius: 50%;
        /*background-color: rgb(0,0,0);*/
        margin-top: 0.3rem;
        margin-left: 0.2rem;
    }
    .dgp-logo-text{
        font-size: 0.2rem;
        height: 0.28rem;
        margin-left: 0.2rem;
        margin-top: 0.03rem;
        font-weight: bold;
    }
    .dgp-exitSystem{
        position: absolute;
        top: 0.14rem;
        left: 16.64rem;
    }
    .dgp-exitSystem>span {
        display: block;
        float: left;
        /*color: rgba(112, 115, 123, 1);*/
        font-size: 0.18rem;
        font-family: PingFangSC-Regular;
    }
    .dgp-exitSystem>img{
        margin-left: 0.14rem;
    }
    /*主页子路由内容部分*/
    .dgp-homeContent-view{
        position: absolute;
        left:0;
        top: .64rem;
        width:18.2rem;
        bottom: 0;
        right:0;
        overflow-y: scroll;
        overflow-x: hidden;
        padding:  0rem 0.3rem;
        background: #f0f2f5;
    }
    /*系统切换蒙版*/

    .dgp-mask{
        /*display: none;*/
        z-index: 100;
    }
    .dgp-mask-content{
        display: none;
    }
    /*.dgp-menu{
        z-index:3000;
        display: none;
        width: 3.04rem;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: -moz-linear-gradient(top, #0C3B7F 0%, #157392 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #0C3B7F), color-stop(100%,#157392));
        background: -webkit-linear-gradient(top, #0C3B7F 0%,#157392 100%);
        background: -o-linear-gradient(top,  #0C3B7F 0%,#157392 100%);
        background: -ms-linear-gradient(top,  #0C3B7F 0%,#157392 100%);
        background: linear-gradient(to bottom,  #0C3B7F 0%,#157392 100%);
    }
    .dgp-menu-top {
        white-space: 100%;
        height: 0.64rem;
    }

    .dgp-menu-top span {
        float: left;
        font-size: 0.18rem;
        margin-left: 0.14rem;
        padding-right: 0.14rem;
        font-weight: bold;
        color: rgb(0, 0, 0);
        text-align: center;
        margin-top: 5%;
    }

    .dgp-menu-fork{
        float: right;
        margin-right: 7.6%;
        margin-left: 0.14rem;
        margin-top: 0.2rem;
        width: 0.19rem;
        background-color: #0C3B7F;
    }
    .dgp-menu-fork>img{
        width: 0.19rem;
    }
    .dgp-menu-content {
        width: 100%;
        height:100%;
        box-shadow: 10px 0px 6px 0px rgba(82, 82, 82, 0.21);
        z-index: 5;
    }

    .dgp-menu-content-module {
        height: 19.86%;
        width: 100%;
        !*border-bottom: 0.01rem solid #FFFFFF;*!
        text-align: center;
        vertical-align: middle;
    }

    .dgp-menu-content-module img {
        padding-top: 0.2rem;
        width: 0.6rem;
    }

    .dgp-menu-content-module div {
        padding-top: 0.1rem;
    }

    .dgp-menu-content-module p {
        color: rgb(255, 255, 255);
        font-size: 0.16rem;
        font-family: PingFangSC-Regular;
    }*/
    /*.dgp-mask-content{
        width: 18.2rem;
        height:100%;
        position: fixed;
        left: 1rem;
        top: 0.64rem;
        !*background:rgba(0, 0, 0,0.7) ;*!
    }*/
    /*-------------------------二级菜单----------------*/
    .dgp-twoMenu{
        position: fixed;
        left: 1rem;
        top: 0.64rem;
        width: 2.4rem;
        height: 100%;
        display: none;
        z-index: 3000;
    }
    .dgp-twoMenu-content{
        height: .44rem;
        padding-left: .1rem;
        border-radius: .03rem;
        margin: .08rem .1rem;
        font-size: .16rem;
        line-height: 0.44rem;
        cursor: pointer;
    }
    .dgp-twoMenu li{
        padding-left: 0.24rem;
        height: 0.6rem;
        font-size: .16rem;
        line-height: 0.6rem;
    }
</style>