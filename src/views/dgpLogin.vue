<template>
    <div class="dgp-login">
        <div class="dgp-login-banner">
            <img class="dgp-login-banner-r1" src="../assets/images/sign_icon_Q2.png"/>
            <img class="dgp-login-banner-r2" src="../assets/images/sign_icon_Q1.png"/>
            <img class="dgp-login-banner-bigIcon" src="../assets/loginimg/sign_box1.png" />
            <img class="dgp-login-banner-bigIcon2" src="../assets/loginimg/icon7.png" />
            <img class="dgp-login-banner-icon1" src="../assets/loginimg/icon1.png" />
            <img class="dgp-login-banner-icon2" src="../assets/loginimg/2.png" />
            <img class="dgp-login-banner-icon3" src="../assets/loginimg/3.png" />
            <img class="dgp-login-banner-icon4" src="../assets/loginimg/4.png" />
            <img class="dgp-login-banner-icon5" src="../assets/loginimg/icon5.png" />
            <button class="dgp-login-admin" > <router-link to="/dgpAdministrator" > 管理员演示</router-link> </button>
            <div class="dgp-login-admin-c1"></div>
            <div class="dgp-login-admin-c2"></div>
        </div>
        <div class="dgp-login-content">
            <div class="dgp-login-content-title">
                <img src="../assets/loginimg/zi.png" alt="">
                <!--数据治理平台-->
            </div>
            <div class="dgp-login-EnglishTitle">
                <span>Data</span>
                <span>Governance</span>
                <span>Platform</span>
            </div>
            <div class="dgp-login-noMatch" v-if="isShow">
                <img src="../assets/images/error.png" alt="">
                用户名密码不匹配
            </div>
            <div class="dgp-login-inputBox1 dgp-inputBox" id="dgp-active1">
                <label>账号：</label>
                <input @keyup.enter="doLogin" class="dgp-login-content-name"  maxlength="6" type="text" v-model="uname"/>
            </div>
            <div class="dgp-login-inputBox2 dgp-inputBox" id="dgp-active2">
                <label>密码：</label>
                <input @keyup.enter="doLogin"  class="dgp-login-content-password" maxlength="6" type="password" v-model="upwd"/>
            </div>
            <!--<Button class="dgp-login-button test"  v-run="register('test1')" @click="doLogin" > <i class='test' v-run="register('test2')">登  录</i> </Button>-->
            <Button class="dgp-login-button "  @click="doLogin" >登  录 </Button>
        </div>
    </div>
</template>
<script>
    //引入/打包全局的静态资源文件
    import '../assets/css/login.css'
    import '../assets/css/reset.css'
    import '../assets/js/jquery-1.8.0.min.js'
    import '../assets/js/indexInit.js'
    import '../assets/js/rem.min.js'
    import "../assets/js/focus"
    import iView from 'iview';
    import {mapActions, mapMutations, mapState}       from 'vuex'
    //import axios from 'axios'



    export default {
        data:function(){
            return {
                uname:'',
                upwd:'',
                isShow:false,
                elements : {}
            }
        },
        directives : {
            run (el, binding) {
                if (typeof binding.value == 'function')
                    binding.value(el);
            }
        },
        components:{},
        methods:{
            ...mapActions(['add_Routes']),
            ...mapMutations(['set_user']),
            doLogin:function(){ //处理登录按钮单击事件
                //点击按钮切换按钮颜色
                $('.dgp-login-button').css({
                    'background':'#185093',
                    'box-shadow':'0 .11rem .08rem 0 rgba(39,97,157,1)'
                });

                //正则验证用户名和密码
                var uname=this.uname;
                var upwd=this.upwd;
                var reg1=/^[a-z]{0,6}$/;
                var reg2=/^[a-z0-9]{6}$/;
                if(!reg1.test(uname)){
                    this.isShow=true;
                    setTimeout(()=>{
                        this.isShow=false;
                    },2000);
                }else if(!reg2.test(upwd)){
                    this.isShow=true;
                    setTimeout(()=>{
                        this.isShow=false;
                    },2000);
                }else{
                    this.isShow=false;
                }
                this.postRequest({
                    url:'/DGP/j_spring_security_check',
                    data:{
                        username:this.uname,
                        password:this.upwd
                    },
                    success:(res)=>{
                        if (res.success) {
                            //登录成功后显示提示框
                            this.set_user(res);//触发vuex里面的添加token和用户信息
                            this.open(true);
                            console.log(res.obj.allMenu);
                            let allMenu = res.obj.allMenu;//返回来的嵌套数组
                            let newRoute = [];//转化成路由表的形式
                            allMenu.forEach((item,index,arr) => {
                                if(item.menuurl=='/dgpSystemAdmin'){  //先只测试系统管理部分
                                    let childrenRoute = [];
                                    if(item.children){
                                        item.children.forEach((element)=>{
                                            if(element.children){
                                                element.children.forEach((v)=>{
                                                    childrenRoute.push({
                                                        path: v.menuurl,
                                                        component: v.menuurl
                                                    })
                                                })
                                            }
                                        })
                                    }
                                    newRoute.push({
                                        path: item.menuurl,
                                        component: item.menuurl,
                                        redirect: item.menuurl,
                                        children: childrenRoute
                                    })  
                                }
                                
                            });

                            console.log(newRoute);
                            localStorage.setItem('newRoute',JSON.stringify(newRoute));
                            this.add_Routes({addrouter:newRoute,reload:0}) //触发vuex里的增加路由
                            // localStorage.setItem('allMenu',res.obj.allMenu);
                            // setTimeout(()=> {
                            //     this.$router.push('/dgpSystemAdmin');
                            // },1000)
                        }else{
                            this.$Message.info('登录失败，无法从服务器获取信息');
                        }
                    },
                    error:()=>{

                    }
                })
            },
            open (nodesc) {
                this.$Notice.open({
                    title: '欢迎进入数据治理平台'
                });
            },

            hoverInit(){
                // $('.dgp-login-admin>a').off('mouseenter').unbind('mouseleave');
                // $('.dgp-login-admin a').unbind('mouseenter').unbind('mouseleave');
                $('.dgp-login-admin>a').removeClass('hover');
            }
        } ,
        computed:{},
        watch:{
            uname:function(){
                if(this.uname!==''){
                    $('.dgp-login-button ').css('background',' #337BAF');
                }
            },
            upwd:function(){
                if(this.upwd!==''){
                    $('.dgp-login-button ').css('background',' #337BAF');
                }
            }
        },
        mounted:function(){
            //取消a标签的hover属性
            this.hoverInit();
        }
    }
</script>

<style scoped>
    .dgp-login-button{
        display: block;
        color: #fff;
        font-size: .18rem;
        text-align: center;
        position:absolute;
        top:3.6rem;
        /*background: #1B6979;*/
        background: #5589CB;
        border-radius: 1rem;
        cursor:pointer;
        font-family: PingFangSC-Regular;
        /*box-shadow: 0 .11rem .08rem 0 rgba(39,97,157,1);*/
    }
    .dgp-login .dgp-login-content .ivu-btn{
        border:none;
        /*min-width:3rem;*/
        /*height: .32rem;*/
        min-width:3.45rem;
        height: .52rem;
        box-sizing: border-box;
    }
    .dgp-login-content .ivu-btn>span{
        color:#fff;
    }
    .dgp-login-content .ivu-btn i{
        background: #1B6979;
        font-style:normal;
    }
    .dgp-login-content .ivu-btn:hover{
        /*background: #1B6979;*/
        background: #5589CB;
    }
    .dgp-login-content .ivu-btn i:hover{
        color:#fff;
        background: #1B6979;
        font-style:normal;
    }

    /*数据治理平台 英文标题*/
    .dgp-login-EnglishTitle span{
        font-family: PingFangSC-Light;
        color: #FFFFFF ;
        font-size:.26rem;
        margin-right: .13rem;
    }
</style>