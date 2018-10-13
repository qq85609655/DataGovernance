<template>
    <div class="dgp-menu">
                <div class="dgp-menu-top clearfix" @click="outMark">
                    <span>平台切换</span>
                    <button class="dgp-menu-fork">
                        <img :src="menuFork" alt="平台切换"/>
                    </button>
                </div>
                <div class="dgp-menu-content">
                    <div class="dgp-menu-content-module dgp-dataStandard" @click="clidataStandard"
                         >
                        <img :src="dataStandardChange" alt="DATA STANDARD" v-show="dataStandardGreen">
                        <img :src="dataStandard" alt="DATA STANDARD" v-show="dataStandardWhite"/>
                        <div>
                            <p>数据标准</p>
                            <p>DATA STANDARD</p>
                        </div>
                    </div>
                    <div class="dgp-menu-content-module dgp-dataQuality"  @click="clidataQuality"
                         >
                        <img :src="dataQualityChange" alt="DATA STANDARD" v-show="dataQualityGreen">
                        <img :src="dataQuality" alt="DATA QUALITY" v-show="dataQualityWhite"/>
                        <div>
                            <p>数据质量</p>
                            <p>DATA QUALITY</p>
                        </div>

                    </div>
                    <div class="dgp-menu-content-module dgp-metaData" @click="climetaData"
                         >
                        <img :src="metaDataChange" alt="DATA STANDARD" v-show="metaDataGreen">
                        <img :src="metaData" alt="METADATA" v-show="metaDataWhite"/>
                        <div>
                            <p>元数据</p>
                            <p>METADATA</p>
                        </div>
                    </div>
                    <div class="dgp-menu-content-module dgp-systemAdmin" @click="clisystemAdmin"
                         >
                        <img :src="systemAdminChange" alt="DATA STANDARD" v-show="systemAdminGreen">
                        <img :src="systemAdmin" alt="SYSTEM ADMIN" v-show="systemAdminWhite"/>
                        <div>
                            <p>系统管理</p>
                            <p>SYSTEM ADMIN</p>
                        </div>
                    </div>
                    <div class="dgp-menu-content-module dgp-screenDisplay" @click="cliscreenDisplay"
                         >
                        <img :src="screenDisplayChange" alt="DATA STANDARD" v-show="screenDisplayGreen">
                        <img :src="screenDisplay" alt="SCREEN DISPLAY"
                             v-show="screenDisplayWhite"/>
                        <div>
                            <p>大屏展示</p>
                            <p>SCREEN DISPLAY</p>
                        </div>
                    </div>
                </div>
                <div class="dgp-mask-content"></div>
            </div>
</template>

<script>
    export default {
        name: "DgpMenu",
        data(){
            return{
                menuFork:require("../../assets/images/dgp-menu-fork.png"),
                dataStandard:require("../../assets/images/dgp-dataStandard-icon1.png"),
                dataStandardChange:require("../../assets/images/dgp-dataStandard-icon2.png"),
                dataStandardWhite:true,
                dataStandardGreen:false,
                dataQuality:require("../../assets/images/dgp-dataQuality-icon1.png"),
                dataQualityChange:require("../../assets/images/dgp-dataQuality-icon2.png"),
                dataQualityWhite:true,
                dataQualityGreen:false,
                metaData:require("../../assets/images/dgp-metaData-icon1.png"),
                metaDataChange:require("../../assets/images/dgp-metaData-icon2.png"),
                metaDataWhite:true,
                metaDataGreen:false,
                systemAdmin:require("../../assets/images/dgp-system-icon1.png"),
                systemAdminChange:require("../../assets/images/dgp-system-icon2.png"),
                systemAdminWhite:true,
                systemAdminGreen:false,
                screenDisplay:require("../../assets/images/dgp-screenDisplay-icon1.png"),
                screenDisplayChange:require("../../assets/images/dgp-screenDisplay-icon2.png"),
                screenDisplayWhite:true,
                screenDisplayGreen:false,
                isMenu:true,
                flag:true,
                dataStandardActive:false,
                dataQualityActive:false,
                metaDataActive:false,
                systemAdminActive:false,
                screenDisplayActive:false
            }
        },
        methods:{
            outMark(){
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").hide(100)
            },
            clidataStandard(){
                $('.dgp-dataStandard').addClass('active').siblings().removeClass('active');
                /*this.flag=false;*/
                this.dataStandardActive=true;
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpDataStandard');
            },
            clidataQuality(){
                $('.dgp-dataQuality').addClass('active').siblings().removeClass('active');
                /*this.flag=false;*/
                this.dataQualityActive=true;
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpDataQuality')
            },
            climetaData(){
                $('.dgp-metaData').addClass('active').siblings().removeClass('active');
                /*this.flag=false;*/
                this.metaDataActive=true;
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpMetadata')
            },
            clisystemAdmin(){
                $('.dgp-systemAdmin').addClass('active').siblings().removeClass('active');
                // this.flag=false;
                this.systemAdminActive=true;
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpSystemAdmin');
            },
            cliscreenDisplay(){
                $('.dgp-screenDisplay').addClass('active').siblings().removeClass('active');
                /*this.flag=false;*/
                this.screenDisplayActive=true;
                this.isMenu=true;
                $(".dgp-mask-content").css("display","none")
                $(".dgp-menu").css("display",'none')
                this.$router.push('/dgpScreenDisplay')
            },
            outSystem(){
                this.$router.push('/')
            },
            maskOut(){
                if(this.isMenu){
                    $(".dgp-mask-content").css("display","none");
                    $(".dgp-twoMenu").hide(100)
                }

            },
            handleSystemAdmin(){
                this.systemAdminWhite=false;
                this.systemAdminGreen=true;
                let that=this;
                $('.dgp-menu-content>.dgp-systemAdmin').hover(
                    function(){
                        that.systemAdminWhite=true;
                        that.systemAdminGreen=false;
                    },
                    function(){
                        if(!that.systemAdminActive){
                            that.systemAdminWhite=false;
                            that.systemAdminGreen=true;
                        }
                    }
                );
                $('.dgp-menu-content>.dgp-systemAdmin').on('click',function(){
                    that.systemAdminWhite=true;
                    that.systemAdminGreen=false;
                })

            },
            handleDataQualty(){
                this.dataQualityWhite=false;
                this.dataQualityGreen=true;
                let that=this;
                $('.dgp-menu-content>.dgp-dataQuality').hover(
                    function(){
                        that.dataQualityWhite=true;
                        that.dataQualityGreen=false;
                    },
                    function(){
                        if(!that.dataQualityActive){
                            that.dataQualityWhite=false;
                            that.dataQualityGreen=true;
                        }
                    }
                );
                $('.dgp-menu-content>.dgp-dataQuality').on('click',function(){
                    that.systemAdminWhite=true;
                    that.systemAdminGreen=false;
                })

            },
            handleDataStandard(){/**/
                this.dataStandardWhite=false;
                this.dataStandardGreen=true;
                let that=this;
                $('.dgp-menu-content>.dgp-dataStandard').hover(
                    function(){
                        that.dataStandardWhite=true;
                        that.dataStandardGreen=false;
                    },
                    function(){
                        if(!that.dataStandardActive){
                            that.dataStandardWhite=false;
                            that.dataStandardGreen=true;
                        }
                    }
                );
                $('.dgp-menu-content>.dgp-dataStandard').on('click',function(){
                    that.dataStandardWhite=true;
                    that.dataStandardGreen=false;
                })

            },
            handleMetaData(){/**/
                this.metaDataWhite=false;
                this.metaDataGreen=true;
                let that=this;
                $('.dgp-menu-content>.dgp-metaData').hover(
                    function(){
                        that.metaDataWhite=true;
                        that.metaDataGreen=false;
                    },
                    function(){
                        if(!that.metaDataActive){
                            that.metaDataWhite=false;
                            that.metaDataGreen=true;
                        }
                    }
                );
                $('.dgp-menu-content>.dgp-metaData').on('click',function(){
                    that.metaDataWhite=true;
                    that.metaDataGreen=false;
                })

            },
            handleScreenDisplay(){/**/
                this.screenDisplayWhite=false;
                this.screenDisplayGreen=true;
                let that=this;
                $('.dgp-menu-content>.dgp-screenDisplay').hover(
                    function(){
                        that.screenDisplayWhite=true;
                        that.screenDisplayGreen=false;
                    },
                    function(){
                        if(!that.screenDisplayActive){
                            that.screenDisplayWhite=false;
                            that.screenDisplayGreen=true;
                        }
                    }
                );
                $('.dgp-menu-content>.dgp-screenDisplay').on('click',function(){
                    that.screenDisplayWhite=true;
                    that.screenDisplayGreen=false;
                })

            },
            handleIsShow(){
                $('.dgp-menu').on('mouseleave','.dgp-menu-content',function(){
                    $(this).parent().hide(200);
                    $('.dgp-mask-content').hide();
                })
            }
        },
        mounted(){
            //this.handleIsShow();
            if(this.$route.path.indexOf('dgpSystemAdmin')>-1){
                this.handleSystemAdmin();
            }else if(this.$route.path.indexOf('dgpQualtyInfo')>-1){/*数据标准*/
                this.handleDataStandard();
            }else if(this.$route.path.indexOf('dgpDataQuality')>-1){/*数据质量*/
                this.handleDataQualty();
            }else if(this.$route.path.indexOf('dgpMetadata')>-1){/*元数据*/
                this.handleMetaData();
            }else if(this.$route.path.indexOf('dgpScreenDisplay')>-1){/*大屏显示*/
                this.handleSystemAdmin();
            }
        }
    }
</script>

<style scoped>
    .dgp-menu{
        z-index:3000;
        display: none;
        width: 3.04rem;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
    }
    .dgp-menu-top {
        height: 0.68rem;
    }
    .dgp-menu-top>span{
        color:#FFF;
    }

    .dgp-menu-top span {
        float: left;
        font-size: 0.18rem;
        margin-left: 0.14rem;
        padding-right: 0.14rem;
        font-weight: bold;
        text-align: center;
        margin-top: 5%;

    }

    .dgp-menu-fork{
        float: right;
        margin-right: 7.6%;
        margin-left: 0.14rem;
        margin-top: 0.2rem;
        width: 0.19rem;

    }
    .dgp-menu-fork>img{
        width: 0.19rem;
    }
    .dgp-menu-content {
        width: 100%;
        position: absolute;
        top:.68rem;
        bottom: 0;
        left: 0;
        z-index: 3000;
    }

    .dgp-menu-content-module {
        height: 20%;
        width: 100%;
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

        font-size: 0.16rem;
    }
    .dgp-mask-content{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 1rem;
        top: 0.68rem;
        z-index: 10;
    }

</style>