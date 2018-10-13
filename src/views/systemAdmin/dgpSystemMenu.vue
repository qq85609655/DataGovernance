<template>
    <div class="dgp-systemMenu-wrap clearfix">
       <div class="dgp-systemMenu-content">
         <div class="dgp-systemMenu-tree">
             <Input placeholder="菜单搜索" icon="ios-search" style="width: 100%;padding:.24rem; height:.8rem;" v-model="searchName" @on-enter="searchTree" @on-click="searchTree" />
           <div class="dgp-systemMenu-tree-title">
               <!-- <button class="btn-primary" @click="showModalMenu">新增</button> -->
               <button :class="{'btn-primary': !isSearching,'btn-default': isSearching}" @click="reloadTree">目录</button>
               <button class="btn-default" @click="expandNode">展开</button>
               <button class="btn-default" @click="unExpandNode">收缩</button>
               <button :class="{'btn-primary': isSearching,'btn-default': !isSearching}" @click="searchTree">结果</button>
           </div>
             <modalSystemMenu  :resourceType="resourceType" :serverUsed="serverUsed" ref="menuModal" @reloadTree="reloadTree" :treeData="treeData" :allTreeData="allTreeData"></modalSystemMenu>
             <!-- <button class="btn-default" @click="handleShowDeleteData">删除</button> -->
             <modal-del-none :systemDelNoneNotice="systemDelNoneNoticeModal" @systemDelNoneNoticeFun="systemDelNoneNoticeModalFun"></modal-del-none>
             <modal-del-data :systemDelDataNotice="systemDelDataNoticeModal" @systemDelDataNoticeFun="systemDelDataNoticeModalFun"></modal-del-data>
             <treeMenu @getTreeData="getTreeData" @showModalMenu="showModalMenu" ref="tree"></treeMenu>
         </div>
           <div class="dgp-systemMenu-info">
            <div class="dgp-systemMenu-info-detailed">
                详细信息
            </div>
               <div class="dgp-systemMenu-info-line"></div>
               <div class="dgp-systemMenu-info-content clearfix">
                   <div>
                       <span>菜单名称：</span>
                       <input v-model="treeData.menuname" type="text" disabled="disabled" class="dgp-systemMenu-inp">
                   </div>
                   <div>
                       <span style="margin-right:0.1rem;">菜单类型：</span>
                       <Select :disabled="!modifyState" v-model="treeData.menutype" style="width:2.78rem" placeholder="菜单类型">
                           <template v-for='item in resourceType'>
                               <Option v-for="(v,key) in item" :value="key" :key="key">{{ v }}</Option>
                           </template> 
                       </Select>
                   </div>

                   <div class="menuState">
                       <span style="margin-right: .1rem">是否启用：</span>
                       <template v-for='item in serverUsed'>
                            <button v-for="(v,key) in item" :key="key" class="dgp-systemMenu-state" disabled="disabled" :class="{'btn-primary':treeData.menuenable == key,'btn-default':treeData.menuenable!=key,'notAllow':!modifyState}"  @click="stateChange(key)"  style="">{{v}}</button>
                       </template>
                       <!-- <button class="dgp-systemMenu-state dgp-systemMenu-state-run active" disabled="disabled" @click="stateRun" style="">启用</button>
                       <button class="dgp-systemMenu-state dgp-systemMenu-state-stop" disabled="disabled" @click="stateStop" style="margin-right:0.45rem">停用</button> -->
                   </div>
                   <div>
                       <span>排序：</span>
                       <input v-model="treeData.menuorder" type="text" disabled="disabled" class="dgp-systemMenu-inp">
                   </div>
                   <div style="width:11rem;">
                       <span >菜单url：</span>
                       <input v-model="treeData.menuurl" type="text" disabled="disabled" class="dgp-systemMenu-inp" style="width:8.3rem;">
                   </div>
                   <div style="width:11rem;">
                       <span>菜单图标：</span>
                       <input v-model="treeData.iconurl" type="text" disabled="disabled" class="dgp-systemMenu-inp" style="width:8.3rem;">
                   </div>
                   <div style="width:11rem;height: 1.64rem;position: relative">
                       <span style="vertical-align: top;">菜单描述：</span>
                       <textarea v-model="treeData.menudesc" disabled="disabled" name="" id="" cols="20" rows="3" class="dgp-systemMenu-describe"></textarea>
                   </div>
               </div>
               <div class="dgp-systemMenu-info-line" style="margin-top: .5rem"></div>
               <div class="dgp-systemMenu-list" v-show="MenuChangebol">
                   <button @click="MenuPreservation " class="btn-primary" >保存</button>
                   <!--<button @click="MenuReset " class="btn-default">重置</button>-->
                   <button @click="MenuCancel " class="btn-default">取消</button>
               </div>
               <div class="dgp-systemMenu-list" v-show="MenuModifybol">
                   <button @click="MenuModify"  class="btn-primary">修改</button>
               </div>
           </div>

       </div>

    </div>
</template>

<script>
    import treeMenu from "../../components/tree/tree_menu_management"
    import modalSystemMenu from "../../components/modal/modal_menuManage"
    import ModalDelData from "../../components/modal/modal_delData";
    import ModalDelNone from "../../components/modal/modal_delNone";

    export default {
        name: "dgp-system-menu",
        components:{modalSystemMenu,treeMenu,ModalDelNone, ModalDelData,},
        data(){
            return{
                menutypeList:[
                    {
                    label:'系统菜单',
                    value: "1"
                    },
                    {
                        label:'权限',
                        value: "0"
                    },
                    {
                        label:'报表菜单',
                        value: "4"
                    }],
                allTreeData:{},
                treeData:{},
                dgpSystemDel:require("../../assets/images/dgp-system-del.png"),
                MenuModifybol:true,
                MenuChangebol:false,
                selectionDate:[],                    //删除数据的集合
                systemDelNoneNoticeModal:false,
                systemDelDataNoticeModal:false,
                delArrs:[],
                searchName:'',//树搜索关键词
                isSearching: false,//动态判断按钮样式
                modifyState:false, //修改的状态

                serverUsed:[{1: "启用"}, {2: "停用"}],//是否启用
                resourceType:[],//菜单类型
            }
        },
        methods:{
            showModalMenu(){
                this.$refs.menuModal.showModalMenu();
            },
            MenuModify(){//点击修改
                $(".dgp-systemMenu-info-content .ivu-select-selection").css("background","#ffffff")
                $('.dgp-systemMenu-info-content .ivu-select-selection').css("cursor",'pointer');
                $(".dgp-systemMenu-info-content .ivu-select-selection").attr("disabled",false);

                this.modifyState = true;
                $(".dgp-systemMenu-sel").css("background","#fff")
                $(".dgp-systemMenu-state").attr("disabled",false)
                $(".dgp-systemMenu-info-content input").attr("disabled",false);
                $(".dgp-systemMenu-info-content .dgp-systemMenu-inp").css("cursor",'text');
                $(".dgp-systemMenu-info-content select").attr("disabled",false);
                $(".dgp-systemMenu-info-content textarea").attr("disabled",false);
                $(".dgp-systemMenu-info-content textarea").css("cursor",'text');
                $('.dgp-systemMenu-state').css("cursor",'pointer');
                $(".dgp-systemMenu-info-content input").css("background","#fff")
                $(".dgp-systemMenu-info-content textarea").css("background","#fff")
                this.MenuModifybol=false;
                 this.MenuChangebol=true;
            },
            MenuPreservation(){//保存
                this.MenuCancel();
                // $(".dgp-systemMenu-sel").css("background","#F5F7F6")
                // $(".dgp-systemMenu-state").attr("disabled",true)
                // $(".dgp-systemMenu-info-content input").attr("disabled",true);
                // $(".dgp-systemMenu-info-content select").attr("disabled",true);
                // $(".dgp-systemMenu-info-content textarea").attr("disabled",true);
                // this.MenuModifybol=true;
                // this.MenuChangebol=false;

                let that = this;
                this.postRequestJson({
                    url:'/DGP/sysResources/update',
                    data:JSON.stringify({
                        id: this.treeData.id,
                        parentid:this.treeData.parentid,
                        menucode:this.treeData.menucode,
                        menuenable:this.treeData.menuenable,
                        menuorder:this.treeData.menuorder,
                        menutype:this.treeData.menutype,
                        menudesc:this.treeData.menudesc,
                        menuname:this.treeData.menuname,
                        menuurl:this.treeData.menuurl,
                        iconurl:this.treeData.iconurl
                    }),

                    success:(res)=>{
                        that.$Message.info(res.msg);
                        
                        if(res.success){
                            //成功的css
                            $(".dgp-systemMenu-inp").css("background","#F5F7F6")
                            $(".dgp-systemMenu-info-content .dgp-systemMenu-state").attr("disabled",true);
                            $(".dgp-systemMenu-info-content input").attr("disabled",true);
                            this.MenuModifybol=true;
                            this.MenuChangebol=false;
                            this.modifyState = false;
                            $(".dgp-systemMenu-info-content input").css("background","#F5F7F6")
                            $(".dgp-systemMenu-info-content textarea").css("background","#F5F7F6")
                            
                            $(".dgp-systemMenu-info-content .ivu-select-selection").css("background","#F5F7F6")
                            $('.dgp-systemMenu-info-content .ivu-select-selection').css("cursor",'not-allowed');
                            $(".dgp-systemMenu-info-content .ivu-select-selection").attr("disabled",true);

                            $(".dgp-systemMenu-sel").css("background","#F5F7F6");
                            $(".dgp-systemMenu-state").attr("disabled",true);
                            $(".dgp-systemMenu-info-content select").attr("disabled",true);
                            $(".dgp-systemMenu-info-content input").attr("disabled",true);
                            $(".dgp-systemMenu-info-content .dgp-systemMenu-inp").css("cursor",'not-allowed');
                            $(".dgp-systemMenu-info-content textarea").attr("disabled",true);
                            $(".dgp-systemMenu-info-content textarea").css("cursor",'not-allowed');
                            $('.dgp-systemMenu-state').css("cursor",'not-allowed');
                            this.MenuModifybol=true;
                            this.MenuChangebol=false;
                        }
                    },
                    error:()=>{
                    }
                })
            },
            MenuReset(){//重置
                $(".dgp-systemMenu-info-content input").val("");
                $(".dgp-systemMenu-info-content textarea").val("");
            },
            MenuCancel(){//取消修改
                this.modifyState = false;
                $(".dgp-systemMenu-info-content input").css("background","#F5F7F6")
                $(".dgp-systemMenu-info-content textarea").css("background","#F5F7F6")
                
                $(".dgp-systemMenu-info-content .ivu-select-selection").css("background","#F5F7F6")
                $('.dgp-systemMenu-info-content .ivu-select-selection').css("cursor",'not-allowed');
                $(".dgp-systemMenu-info-content .ivu-select-selection").attr("disabled",true);

                $(".dgp-systemMenu-sel").css("background","#F5F7F6");
                $(".dgp-systemMenu-state").attr("disabled",true);
                $(".dgp-systemMenu-info-content select").attr("disabled",true);
                $(".dgp-systemMenu-info-content input").attr("disabled",true);
                $(".dgp-systemMenu-info-content .dgp-systemMenu-inp").css("cursor",'not-allowed');
                $(".dgp-systemMenu-info-content textarea").attr("disabled",true);
                $(".dgp-systemMenu-info-content textarea").css("cursor",'not-allowed');
                $('.dgp-systemMenu-state').css("cursor",'not-allowed');
                this.MenuModifybol=true;
                this.MenuChangebol=false;
            },
            stateChange(k){
                this.treeData.menuenable = k;
            },
            systemDelNoneNoticeModalFun(){
                this.systemDelNoneNoticeModal=false;
            },
            systemDelDataNoticeModalFun(){
                this.systemDelDataNoticeModal=false;
            },
            handleShowDeleteData(){/*显示需要删除的数据集合*/
                let id = this.treeData.id;
                if(!id){
                     this.$Message.info('请选择一个节点进行删除');
                     return;
                }
                let arr = [];
                for(let i in this.allTreeData){
                    if(this.allTreeData[i].parentid == id){
                        arr.push(1);
                    }
                }
                if(arr.length==0){
                    this.postRequest({
                        url:'/DGP/sysResources/checkMenuIsUsed/'+this.treeData.id,
                        success:(res)=>{
                            this.$Message.info('删除成功');
                            this.$refs.tree.initTree();
                        }
                    })
                }else{
                    this.$Message.info('请选择根节点删除');
                }
            },
            handleMenuState(){
                $('.menuState').on('click','button',function(){
                    $(this).addClass('active').siblings().removeClass('active')
                })
            },
            getTreeData(treeData,allTreeData){
                this.treeData = treeData;
                this.allTreeData = allTreeData;
                //console.log(this.treeData);
                // if(this.treeData.menuenable==1){
                //     this.stateRun();
                // }else{
                //     this.stateStop();
                // }
            },
            reloadTree(){
                this.isSearching = false;
                //this.$refs.spinShow = true;
                this.$refs.tree.initTree();
            },
            expandNode(){//展开树的节点
                this.$refs.tree.expandNode();
            },
            unExpandNode(){//收缩树节点
                this.$refs.tree.unExpandNode();
            },
            searchTree(){
                this.isSearching = true;
                this.$refs.tree.searchTree(this.searchName);
            }
        },
        mounted(){
            let common = ['resourceType','serverUsed'];   //菜单类型,是否启用 
            let json = {};
            json.list = common; 
            this.postRequestJson({   //请求一些公共参数
                url:'/DGP/dgpCommon/getSomeParamCache',
                data:json,
                success:(res)=>{
                    this.resourceType = res.obj.resourceType;
                    this.serverUsed = res.obj.serverUsed;
                    //console.log(this.resourceType,this.serverUsed);
                },
                error:()=>{

                }
            })
           
        },
    }
</script>

<style>
    .dgp-systemMenu-content{
        width: 17.6rem;
    }
    .dgp-systemMenu-tree{
        position: relative;
        float: left;
        width: 3.8rem;
        height: 100%;
        z-index: 60;
    }
    .dgp-systemMenu-tree .dgp-tree{
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    .dgp-systemMenu-tree-title{
        /* height: 0.8rem; */
        width: 100%;
        line-height: 0.8rem;
        text-align: center;
        padding:0 .24rem .15rem .24rem;
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        align-items: center;
        justify-content: space-between;
    }
    .dgp-systemMenu-tree-title button{
        width: 0.7rem;
        height: .3rem;
        padding: 0;
        text-align: center;
        line-height: .3rem;
        border-radius: 0.03rem;
        font-size: 0.14rem;
        cursor:pointer;
    }
    .dgp-systemMenu-wrap .dgp-systemMenu-content{
        height: 100%;
    }
    .dgp-systemMenu-info{
        float: left;
        width: 13.8rem;
        height: 100%;
    }
    .dgp-systemMenu-info-detailed{
        font-family: PingFangSC-Regular;
        font-size: 0.18rem;
        margin-left: .8rem;
        margin-top: .3rem;
    }
    .dgp-systemMenu-info-line{
        width: 13rem;
        height:1px ;
        margin-left: .5rem;
        margin-top: .3rem;
    }
    .dgp-systemMenu-info-content{
        margin-top: 0.7rem;
        width: 13rem;
        margin-left: .5rem;
    }
    .dgp-systemMenu-info-content input{
        background: #F5F7F6;
    }
    .dgp-systemMenu-info-content textarea{
        background: #F5F7F6;
    }
    /* $(".dgp-systemMenu-info-content .ivu-select-selection").css("background","#ffffff")
                $('.dgp-systemMenu-info-content .ivu-select-selection').css("cursor",'pointer');
                $(".dgp-systemMenu-info-content .ivu-select-selection").attr("disabled",false); */
    .dgp-systemMenu-info-content .ivu-select-selection{
        background: #F5F7F6;
        cursor: not-allowed;
    }
    .dgp-systemMenu-info-content>div{
        float: left;
        width: 5.5rem;
        height: 0.7rem;
        text-align: right;
        font-size: .14rem;
    }
    .dgp-systemMenu-inp{
        width: 2.78rem;
        height: .41rem;
        border-radius: 3px;
        margin-left: 0.1rem;
        padding-left: 0.2rem;
        cursor:not-allowed;
    }
    .dgp-systemMenu-state{
        display: inline-block;
        /* margin-right: 0.45rem; */
        width: .8rem;
        height: .38rem;
        border-radius: 3px;
        text-align: center;
        line-height: .38rem;
        cursor:not-allowed;
    }
    .dgp-systemMenu-info button.dgp-systemMenu-state:nth-child(2){
       margin-right: 0.25rem;
    }
    .dgp-systemMenu-info button.dgp-systemMenu-state:nth-child(3){
       margin-right: 0.95rem;
    }
    .dgp-systemMenu-state.btn-primary.notAllow{
        border: 1px solid #E8E8E8;
        background: #fff!important;
        color:#000!important;
    }
    .dgp-systemMenu-state.btn-default.notAllow{
        background: #F5F7F6!important;
        border: 0!important;
        color:#000!important;
    }
    .dgp-systemMenu-describe{
        /*display: inline-block;*/
        width: 8.3rem;
        height: 1.64rem;
        border-radius: 3px;
        margin-left: 0.1rem;
        padding-left: 0.2rem;
        cursor:not-allowed;
    }
    .dgp-systemMenu-list{
        margin-top: .1rem;
        margin-bottom: .2rem;
        width: 100%;
        text-align: center;
    }
    .dgp-systemMenu-list>button{
        display: inline-block;
        width: .88rem;
        height: .36rem;
        line-height: .36rem;
        margin: 0 .1rem;
        border-radius: 3px;
        font-size: .16rem;
    }
    /*.dgp-systemMenu-wrap button{*/
        /*cursor: pointer;*/
    /*}*/
    .dgp-systemMenu-list button{
        cursor: pointer;
    }
    .dgp-systemMenu-info-content .ivu-select-disabled .ivu-select-selection {
        color:#545454;
    }
    /* .ivu-select-disabled .ivu-select-selection */
    .dgp-systemMenu-info-content input{
        font-size: 0.14rem;
    }
    .dgp-systemMenu-info-content .ivu-select-selected-value{
        font-size: 0.14rem!important;
    }

    .dgp-systemMenu-tree ul.ztree>li{
        padding-left: .2rem;
    }
    .dgp-systemMenu-tree .ivu-input-wrapper .ivu-icon{
        width: .32rem;
        height: .41rem;
        line-height: .41rem;
        font-size: .16rem;
        right:.24rem;
    }
    .dgp-systemMenu-tree .ivu-input-wrapper .ivu-input{
        height: .41rem;
        padding: 0 .32rem 0 .15rem;
        line-height: .41rem;
        font-size: .16rem;
    }
    .dgp-systemMenu-tree .dgp-tree{
        position: absolute;
        top: 1.25rem;
        left: 0;
        bottom: 0;
    }
    .dgp-systemMenu-tree .dgp-tree{
        box-shadow: none;
    }
    .dgp-systemMenu-tree ul.ztree {
        margin-top: 0;
        padding: 0;
        height: 100%;
    }
</style>