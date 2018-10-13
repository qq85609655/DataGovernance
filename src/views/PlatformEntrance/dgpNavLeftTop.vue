<template>
    <div class="dgp-home-wrap">
        <!--左侧导航部分-->
        <div class="dgp-home-icon">
            <div class="dgp-whiteArrow-icon" @click="enterMark">
                <img :src="whiteArrow"/>
            </div>
            <!--左侧二级菜单-->
            <div class="dgp-home-icons">
                <div v-for="(val, key, index) in Object.values(twoMenuContent)[0]" :key="index" :class="{active:index===leftSelectBar}" @mouseenter="handleEnterNavigation(val,index)" @mouseleave="handleLeaveNavigationSub"   @click="handleLeftNavBar(index)">
                    <img :src="iconList[index]" />
                    <p>{{key}}</p>
                </div>
            </div>
            <!-- 二级菜单，子目录 -->
            <div class="dgp-twoMenu-wrap" :style="{top:twoMenuTopPosition+'px'}"  @mouseenter="handleEnterNavigationSub">
                <ul class="dgp-twoMenu"  @mouseleave="handleLeaveNavigationSub">
                    <li  v-for="(item,index) in twoMenuContentItems" :key="index" class="dgp-twoMenu-content" :class="{active:item===currentTabsPage}" @click="handleClickTwoMenu(index)">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <div class="dgp-homeContent">
            <dgp-system-header @changeRouter="handleChangeIconFlag" @dorefreshself="handleRefreshSelf" :logoSubtext="Object.keys(twoMenuContent)[0]" :propsTabsCurrent="currentTabsPage" ></dgp-system-header>
            <div class="dgp-homeContent-view">
                <router-view  :key="activeDate"></router-view>
            </div>
        </div>
        <!--系统切换蒙版部分-->
        <div class="dgp-mask">
            <dgp-menu></dgp-menu>
        </div>
    </div>
</template>

<script>
    import "../../assets/css/dgpSystemColor.css"

    import DgpSystemHeader from "./dgpSystemHeader";
    import DgpMenu from "./dgpMenu";
    export default {
        name: "DgpNavLeftTop",
        components: {DgpMenu, DgpSystemHeader},
        props:['iconLists','twoMenuContents'],
        data(){
            return{
                whiteArrow:require('../../assets/images/dgp-whiteArraw-icon.png'),
                logo:require('../../assets/images/dgp-logo-icon.png'),
                isCloseTwoMenu:false,
                twoMenuMouseSelect:null,
                twoMenuTopPosition:null,//二次菜单子目录top值
                twoMenuContentItems:null,//鼠标滑过,赋值
                leftSelectBar:0,    //左侧导航,默认选中第一条
                currentTabsPage:null,//当前选中页...默认第一条数据
                activeDate:null,
                iconList:[],
                twoMenuContent:{}
            }
        },
        methods:{
            handleRefreshSelf(){//刷新当前页
                this.activeDate = new Date().getTime();
            },
            handleClickTwoMenu(i){//传值
                this.leftSelectBar=this.twoMenuMouseSelect;
                this.currentTabsPage=this.twoMenuContentItems[i];
            },
            enterMark(){
                $(".dgp-mask-content").show();
                $(".dgp-menu").show(200)
                $(".dgp-twoMenu-wrap").hide();
            },
            handleEnterNavigation(v,i){
                this.twoMenuMouseSelect=i;
                this.twoMenuTopPosition=$(`.dgp-home-icons>div:eq(${i})`).offset().top;
                this.twoMenuContentItems=v;
                $(".dgp-mask-content").show();
                $(".dgp-twoMenu-wrap").show();
            },
            handleLeaveNavigationSub(){
                $(".dgp-twoMenu-wrap").hide();
            },
            handleEnterNavigationSub(){
                $(".dgp-twoMenu-wrap").show();
            },
            handleLeftNavBar(i){
                this.currentTabsPage=this.twoMenuContentItems[0];
                this.leftSelectBar=i;       //点击active
                $(".dgp-twoMenu-wrap").hide(100);
                $(".dgp-mask-content").show();
            },
            routerInit(){
                let v1 = Object.values(this.twoMenuContent)[0];
                let v2 = Object.values(v1)[0][0];
                this.currentTabsPage=v2;
            },
            handleChangeIconFlag(data){
                const that=this;
                let i = 0;
                $.each( Object.values(that.twoMenuContent)[0], function(key, arr){
                    arr.forEach(function(item,index){
                        if(item===data){
                            that.leftSelectBar=i;
                            that.currentTabsPage=item;//有待考究//应修改
                        }
                    })
                    i++;
                });
            }
        },
        watch:{
            iconLists(){
                this.iconList=this.iconLists;
            },
            twoMenuContents(){
                this.twoMenuContent=this.twoMenuContents;
                this.routerInit();
            }
        },
        mounted(){
            this.iconList=this.iconLists;
            this.twoMenuContent=this.twoMenuContents;
            this.routerInit();
        }
    }
</script>
<style>
    .dgp-homeContent-view>div{
        position: relative;
        height: 100%;
        user-select: none;
    }
</style>
<style scoped>
    .dgp-home-wrap{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-size: 0;
    }
    .clearfix:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden;
    }
    .dgp-home-icon{
        display: inline-block;
        width: 1rem;
        height: 100%;
        font-size: .16rem;
        vertical-align: top;
    }
    .dgp-whiteArrow-icon{
        height: 0.68rem;
        line-height: 0.68rem;
        width: 100%;
        text-align: center;
    }
    .dgp-whiteArrow-icon img{
        width: 35.93%;
        margin-top: 0.16rem;

    }
    .dgp-home-icons{
        width: 100%;
        padding-top: .48rem;
        text-align: center;
        user-select: none;
    }
    .dgp-home-icons>div{
        height: 1rem;
        width: 100%;
        text-align: center;
        vertical-align: middle;
    }
    .dgp-home-icons>div>p{
        font-size: 0.16rem;
    }
    .dgp-home-icons>div>img{
        margin-top: 20%;
        width: 25%;
    }
    .dgp-homeContent{
        display: inline-block;
        font-size: .16rem;
        height: 100%;
        width: 18.2rem;
        position: relative;
        vertical-align: top;
    }
    .dgp-logo{
        height: 0.64rem;
        line-height: 0.64rem;
        position: relative;
        z-index: 50;
        box-shadow: 0 .01rem .04rem 0 rgba(0,21,41,0.12);
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
        position: relative;
        z-index: -1;
    }
    .dgp-logo-spot{
        border: 0.04rem solid black;
        border-radius: 50%;
        margin-top: 0.3rem;
        margin-left: 0.2rem;
    }
    .dgp-logo-text{
        font-size: 0.2rem;
        height: 0.28rem;
        margin-left: 0.2rem;
        font-weight: bold;
        margin-top: 0.03rem;
    }
    .dgp-exitSystem{
        position: absolute;
        left: 16.04rem;
    }
    .dgp-exitSystem>span {
        display: block;
        float: left;
        font-size: 0.18rem;
    }
    .dgp-exitSystem>img{
        margin-left: 0.14rem;
        vertical-align: middle;
    }
    /*主页子路由内容部分*/
    .dgp-homeContent-view{
        position: absolute;
        width:18.2rem;
        padding:  0.3rem 0.3rem 0.3rem 0.3rem;
        background: #f0f2f5;
        top: 1.16rem;
        bottom: 0;
        left: 0;
    }
    /*系统切换蒙版*/
    .dgp-mask{
        /*display: none;*/
        z-index: 100;
    }
    .dgp-mask-content{
        display: none;
        z-index: 2000;
    }

    /*-------------------------二级菜单----------------*/
    .dgp-twoMenu-wrap{
        position: fixed;
        display: none;
        padding-left: .05rem;
        left: 1rem;
        top: 1.16rem;
        z-index: 3000;
    }
    .dgp-twoMenu{
        border-radius: .03rem;
        width: 2.4rem;
        background: #32B3EA;
        padding: .12rem 0;
        user-select: none;
        box-shadow: 0 .03rem .1rem 0 rgba(136,126,126,0.50);
    }
    .dgp-twoMenu-content{
        height: .4rem;
        padding-left: .14rem;
        border-radius: .03rem;
        margin: .08rem .1rem;
        font-size: .16rem;
        line-height: 0.4rem;
        cursor: pointer;
        position: relative;
    }
    .dgp-twoMenu-content.active:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: .07rem;
        height: .4rem;
        border-radius: .03rem;
        background-color: #1A99CF;
    }
    .dgp-system-subpage{
        width: 100%;
        height: 0.48rem;
        position: relative;
        z-index: 40;
        box-shadow: 0 .03rem .11rem 0 rgba(0,21,41,0.12);
    }
    .dgp-system-subpage-content{
        display: block;
        float: left;
        height: 0.48rem;
        text-align: center;
        line-height: 0.48rem;
        font-size: 0.16rem;
        cursor: pointer;
    }

</style>