<template>
    <div class="dgp-home-wrap">
        <!--左侧导航部分-->
        <div class="dgp-home-icon">
            <div class="dgp-whiteArrow-icon" @click="enterMark">
                <img :src="whiteArrow" alt="系统切换"/>
            </div>
            <div class="dgp-home-icons-blank"></div>
            <ul v-for="(item,index) in metaDataIcons" @mouseenter="enterMetaDataIcons" @mouseleave="outMetaDataIcons" @click="cliMetaDataIcons" class="dgp-home-icons">
                <li>
                    <img :src="item.src" alt="稍等">
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <!--主页内容部分-->
        <div class="dgp-homeContent">
            <div class="dgp-logo clearfix">
                <img :src="logo" alt="logo"/>
                <div class="dgp-logo-spot"></div>
                <div class="dgp-logo-text">元数据</div>
            </div>
            <div class="dgp-exitSystem clearfix" >
                <span>退出系统</span>
                <img :src="signOut"  @click="outSystem"/>
            </div>
            <!---------------------------------二级菜单------------------------->
            <div class="dgp-secondMenu">
                <div class="dgp-secondMenu-title">元数据管理</div>
                <ul v-for="(item,index) in secondMenuNav">
                    <li @click="cliSecondMenuNav" @mouseenter="enterSecondMenuNav" @mouseleave="leaveSecondMenuNav">{{item.metadataManagement}}</li>
                </ul>
            </div>
            <div  class="dgp-secondMenu">
                <div class="dgp-secondMenu-title">元数据变更</div>
                <ul v-for="(item,index) in secondMenuChange">
                    <li @click="cliSecondMenuChange" @mouseenter="enterSecondMenuChange" @mouseleave="leaveSecondMenuChange">{{item.metadataChange}}</li>
                </ul>
            </div>
            <div class="dgp-homeContent-view">
                <router-view></router-view>
            </div>
        </div>
        <!--系统切换蒙版部分-->
        <div class="dgp-mask-enterFork"></div>
        <div class="dgp-mask">
            <div class="dgp-menu">
                <div class="dgp-menu-top clearfix" @click="outMark">
                    <span>平台切换</span>
                    <button class="dgp-menu-fork" >
                        <img :src="systemChange" alt="平台切换"/>
                    </button>
                </div>
                <div class="dgp-menu-content">
                    <ul v-for=" item in systemMaskMenu" class="dgp-menu-content-module">
                        <li  @mouseenter="enterSystemMaskMenu($event)"
                             @mouseleave="leaveSystemMaskMenu($event)" @click="cliSystemMaskMenu">
                            <img :src="item.src" :alt="item.alt">
                            <div>
                                <p>{{item.name}}</p>
                                <p>{{item.nameEnglish}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dgp-mask-content">

            </div>
        </div>
    </div>
</template>

<script>
    import "../assets/css/dgpHome.css"
    export default {
        name: "dgp-metadata",
        data(){
            return{
                logo:require("../assets/images/dgp-logo-icon.png"),
                whiteArrow:require("../assets/images/dgp-whiteArraw-icon.png"),
                systemChange:require("../assets/images/dgp-menu-fork.png"),
                signOut:require("../assets/images/dgp-signOut-icon.png"),
                isClick:true,
                isMenu:true,
                secondMenuNav:[
                    {metadataManagement:"元数据"},
                    {metadataManagement:"元数据采集"},
                    {metadataManagement:"映射关系维护"},
                    {metadataManagement:"元数据查询"},
                    {metadataManagement:"变更核对"},

                ],
                secondMenuChange:[
                    {metadataChange:"变更申请"},
                    {metadataChange:"变更历史"},
                    {metadataChange:"全链分析"},
                ],
                metaDataIcons:[
                    {
                        src:require("../assets/images/dgp-home-icon1.png"),
                        name:"元数据管理",
                    } ,
                    {
                        src:require("../assets/images/dgp-home-icon1.png"),
                        name:"元数据变更",
                    }
                ],
                systemMaskMenu:[
                    {
                        src:require("../assets/images/dgp-dataStandard-icon1.png"),
                        alt:"DATA STANDARD",
                        name:"数据标准",
                        nameEnglish:"DATA STANDARD",
                    },
                    {
                        src:require("../assets/images/dgp-dataQuality-icon1.png"),
                        alt:"DATA QUALITY",
                        name:"数据质量",
                        nameEnglish:"DATA QUALITY",
                    },
                    {
                        src:require("../assets/images/dgp-metaData-icon1.png"),
                        alt:"METADATA",
                        name:"元数据",
                        nameEnglish:"METADATA",
                    },
                    {
                        src:require("../assets/images/dgp-system-icon1.png"),
                        alt:"SYSTEM ADMIN",
                        name:"系统管理",
                        nameEnglish:"SYSTEM ADMIN",
                    },

                    {
                        src:require("../assets/images/dgp-screenDisplay-icon1.png"),
                        alt:"SCREEN DISPLAY",
                        name:"大屏显示",
                        nameEnglish:"SCREEN DISPLAY",
                    },
                ]


            }
        },
        methods: {
            enterMark(){
                this.isMenu=false;
                $(".dgp-mask-content").css("display",'block');
                $(".dgp-menu").show(400);
                $(".dgp-secondMenu").css("display","none");
            },
            outMark(){
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none");
                $(".dgp-menu").hide(400);
            },
            outSystem(){
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none");
                $(".dgp-menu").hide(400);
            },

            // 导航事件
            enterMetaDataIcons(){},
            outMetaDataIcons(){},
            cliMetaDataIcons(){},
            //二级菜单
            cliSecondMenuNav(){},
            enterSecondMenuNav(){},
            leaveSecondMenuNav(){},
            cliSecondMenuChange(){},
            enterSecondMenuChange(){},
            leaveSecondMenuChange(){},

            outTwoMenu(){},
            //系统切换
            enterSystemMaskMenu(e){
                e.target.className="active";
            },
            leaveSystemMaskMenu(e){
                e.target.className="";
            },
            cliSystemMaskMenu(){}
        }
    }
</script>

<style scoped>
    .active{
        corlor:rgb(107,199,188);
    }
</style>