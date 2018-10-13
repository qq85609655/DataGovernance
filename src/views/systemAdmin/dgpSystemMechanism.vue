<template>
    <div class="dgp-systemMechanism-wrap clearfix">
        <div class="dgp-systemMechanism-content">
            <div class="dgp-systemMechanism-tree">
                <Input icon="ios-search" placeholder="机构搜索" style="width: 100%;padding: .24rem;height: .8rem" v-model="searchName" @on-enter="searchTree" @on-click="searchTree"/>
                <div class="dgp-systemMechanism-tree-title">
                    <button  :class="{'btn-primary': !isSearching,'btn-default': isSearching}" @click="reloadTree">目录</button>
                    <button class="btn-default" @click="expandNode">展开</button>
                    <button class="btn-default" @click="unExpandNode">收缩</button>
                    <button :class="{'btn-primary': isSearching,'btn-default': !isSearching}" @click="searchTree">结果</button>
                </div>
                <modalMmechanismmanage ref="modalMmechanismmanage" @reloadTree="reloadTree" :treeData="treeData" :allTreeData="allTreeData" :serverUsed="serverUsed"></modalMmechanismmanage>
                <modal-del-none :systemDelNoneNotice="systemDelNoneNoticeModal" @systemDelNoneNoticeFun="systemDelNoneNoticeModalFun"></modal-del-none>
                <modal-del-data  :systemDelDataNotice="systemDelDataNoticeModal" @systemDelDataNoticeFun="systemDelDataNoticeModalFun"></modal-del-data>
                <treeMechanism @getTreeData="getTreeData" @showModal="showModal" ref="tree"></treeMechanism>
            </div>
            <div class="dgp-systemMechanism-info">
                <div class="dgp-systemMechanism-info-detailed">
                    详细信息
                </div>
                <div class="dgp-systemMechanism-info-line"></div>
                <div class="dgp-systemMechanism-info-content clearfix">
                    <div>
                        <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                        <span>机构编码：</span>
                        <input v-model="treeData.orgCode" disabled="disabled" type="text" class="dgp-systemMechanism-inp">
                    </div>
                    <div>
                        <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                        <span>父机构编码：</span>
                        <input  readonly v-model="treeData.fatherOrgId" disabled="disabled" type="text"  class="dgp-systemMechanism-inp">
                    </div>
                    <div>
                        <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                        <span>机构名称：</span>
                        <input  v-model="treeData.orgName" disabled="disabled" type="text"  class="dgp-systemMechanism-inp">
                    </div>
                    <div>
                        <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                        <span>父机构名称：</span>
                        <input readonly  v-model="treeData.fatherOrgName" disabled="disabled" type="text"  class="dgp-systemMechanism-inp">
                    </div>
                    <div>
                        <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                        <span>机构简称：</span>
                        <input  v-model="treeData.orgShortName" disabled="disabled" type="text"  class="dgp-systemMechanism-inp">
                    </div>
                    <div>
                        <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                        <span>机构层级：</span >
                        <input readonly v-model="treeData.orgLevel" disabled="disabled" type="text"  class="dgp-systemMechanism-inp">
                    </div>
                    <div>
                        <span>负责人：</span>
                        <input  v-model="treeData.manageUserId" disabled="disabled" type="text"  class="dgp-systemMechanism-inp">
                    </div>
                    <div>
                        <span>排序号：</span>
                        <input readonly  v-model="treeData.orgOrder" disabled="disabled" type="text"  class="dgp-systemMechanism-inp">
                    </div>
                    <div class="emechState">
                        <span style="margin-right:0.1rem">状态：</span>
                        <template v-for='item in serverUsed'>
                            <button v-for="(v,key) in item" :key="key" @click="stateChange(key)" class="dgp-systemMechanism-state" :class="{'dgp-systemMechanism-active':treeData.state== key,'dgp-systemMechanism-noactive':treeData.state!= key,'notAllow':!modifyState}"  disabled="disabled" style="">{{v}}</button>
                        </template>
                    </div>
                    <div>
                        <span>机构类别：</span>
                        <input  v-model="treeData.orgType" disabled="disabled" type="text"  class="dgp-systemMechanism-inp">
                    </div>
                    <div>
                        <span>机构等级：</span>
                        <input  v-model="treeData.orgGrade" disabled="disabled" type="text"  class="dgp-systemMechanism-inp">
                    </div>
                </div>
                <div class="dgp-systemMechanism-info-line" style="margin-top: .5rem"></div>
                <div class="dgp-systemMechanism-list" v-show="mechanismChangebol">

                    <button @click="mechanismChange" class="btn-primary">保存</button>
                    <!-- <button class="btn-default" @click="mechanismReset">重置</button> -->
                    <button class="btn-default" @click="mechanismCancel">取消</button>
                </div>
                <div class="dgp-systemMechanism-list" v-show="mechanismModifybol">
                    <button @click="mechanismModify" class="btn-primary">修改</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import treeMechanism from "../../components/tree/tree_organization_management"
    import modalMmechanismmanage from "../../components/modal/modal_mechanismmanage"
    import ModalDelData from "../../components/modal/modal_delData";
    import ModalDelNone from "../../components/modal/modal_delNone";

    export default {
        name: "dgp-system-mechanism",
        components:{
            modalMmechanismmanage,treeMechanism,ModalDelNone, ModalDelData,
        },
        data(){
            return{
                modifyState:false,//修改状态
                serverUsed:[],//状态数据字典
                searchName:'',//树搜索
                isSearching: false,//动态改变按钮样式
                allTreeData:{},
                treeData:{},
                mechanismChangebol:false,
                mechanismModifybol:true,
                selectionDate:[],                    //删除数据的集合
                systemDelNoneNoticeModal:false,
                systemDelDataNoticeModal:false,
            }
        },
        methods:{
            showModal(){
                setTimeout(()=>{
                    this.$refs.modalMmechanismmanage.showModalMenu();
                },10)
            },
            mechanismModify(){
                this.modifyState = true;
                if(!this.treeData.id){
                    this.$Message.info('请选择一个节点');
                    return;
                }
                // $(".dgp-systemMechanism-state-run").css({
                //     backgroundColor: "rgba(50, 179, 234, 1)",
                //     color:"#FFFFFF" ,

                // });
                // $(".dgp-systemMechanism-state-stop").css({
                //     backgroundColor:"#FFFFFF",
                //     border: ".01rem solid rgba(50, 179, 234, 1)",
                //     color: "rgba(50, 179, 234, 1)"
                // });
              $(".dgp-systemMechanism-inp").css("background","#fff");
               // $(".dgp-systemMechanism-info-content .dgp-systemMechanism-state").hover(
               //     function(){
               //         if(!$(this).hasClass('active')){
               //             $(this).css({
               //                 "background":"#32B3EA",
               //                 "color":"#FFF"
               //             })
               //         }
               //     },
               //     function(){
               //         if(!$(this).hasClass('active')) {
               //             $(this).css({
               //                 "background": "#fff",
               //                 "color": "#32B3EA"
               //             })
               //         }
               //     }
               // );
                $(".dgp-systemMechanism-state").attr("disabled",false);
                $(".dgp-systemMechanism-info-content input").attr("disabled",false);
                $(".dgp-systemMechanism-info-content .dgp-systemMechanism-inp").css("cursor",'text');
                $('.dgp-systemMechanism-state').css('cursor','pointer');
                this.mechanismModifybol=false;
                this.mechanismChangebol=true;
            },
            mechanismChange(){
                if(!this.treeData.orgCode){
                    this.$Message.warning('请输入机构编码');
                    return;
                }else if(!this.treeData.orgName){
                    this.$Message.warning('请输入机构名称');
                    return;
                }else if(!this.treeData.orgShortName){
                    this.$Message.warning('请输入机构简称');
                    return;
                }

                let that = this;
                this.postRequestJson({
                    url:'/DGP/sysOrg/update',
                    data:JSON.stringify({
                        id: this.treeData.id,
                        orgCode:this.treeData.orgCode,
                        fatherOrgId:this.treeData.fatherOrgId,
                        orgName:this.treeData.orgName,
                        fatherOrgName:this.treeData.fatherOrgName,
                        orgShortName:this.treeData.orgShortName,
                        orgLevel:this.treeData.orgLevel,
                        manageUserId:this.treeData.manageUserId?this.treeData.manageUserId:'',
                        orgOrder:this.treeData.orgOrder,
                        state:this.treeData.state,
                        orgType:this.treeData.orgType?this.treeData.orgType:'',
                        orgGrade:this.treeData.orgGrade
                    }),
                    success:(res)=>{
                        that.$Message.info(res.msg);

                        if(res.success){
                            this.modifyState = false;
                            //成功的css
                            $(".dgp-systemMechanism-inp").css("background","#F5F7F6")
                            $(".dgp-systemMechanism-info-content .dgp-systemMechanism-state").attr("disabled",true);
                            $(".dgp-systemMechanism-info-content input").attr("disabled",true);
                            this.mechanismModifybol=true;
                            this.mechanismChangebol=false;
                        }
                    },
                    error:()=>{
                        //console.log(22222);
                    }
                })
                
            },
            mechanismReset(){
                $(".dgp-systemMechanism-info-content input").val(" ");
            },
            mechanismCancel(){
                this.modifyState = false;
                // $(".dgp-systemMechanism-state-run").css({

                //     backgroundColor:"#F5F7F6",
                //     border: ".01rem solid #F5F7F6",
                //     color: "#000"
                // });
                // $(".dgp-systemMechanism-state-stop").css({
                //     backgroundColor: "#ffffff",
                //     border: "1px solid rgba(232,232,232,1)",
                //     color:"#000" ,
                // });
                $(".dgp-systemMechanism-inp").css("background","#F5F7F6")
                $(".dgp-systemMechanism-info-content .dgp-systemMechanism-state").attr("disabled",true);
                $(".dgp-systemMechanism-info-content input").attr("disabled",true);
                $(".dgp-systemMechanism-info-content .dgp-systemMechanism-inp").css("cursor",'not-allowed');
                $('.dgp-systemMechanism-info .dgp-systemMechanism-state').css('cursor','not-allowed');
                this.mechanismModifybol=true;
                this.mechanismChangebol=false;
            },
            stateChange(k){
                this.treeData.state = k;
                //console.log(this.treeData.state);
            },
            // stateRun(){
            //     this.treeData.state = "1";
            //     // $(".dgp-systemMechanism-state-run").css({
            //     //     backgroundColor: "rgba(50, 179, 234, 1)",
            //     //     color:"#FFFFFF" ,
            //     // });
            //     // $(".dgp-systemMechanism-state-stop").css({
            //     //     backgroundColor:"#FFFFFF",
            //     //     border: ".01rem solid rgba(50, 179, 234, 1)",
            //     //     color: "rgba(50, 179, 234, 1)"
            //     // });
            // },
            // stateStop(){
            //     this.treeData.state = "2";
            //     // $(".dgp-systemMechanism-state-run").css({

            //     //     backgroundColor:"#FFFFFF",
            //     //     border: ".01rem solid rgba(50, 179, 234, 1)",
            //     //     color: "rgba(50, 179, 234, 1)"
            //     // });
            //     // $(".dgp-systemMechanism-state-stop").css({
            //     //     backgroundColor: "rgba(50, 179, 234, 1)",
            //     //     color:"#FFFFFF" ,
            //     // });
            // },
            systemDelNoneNoticeModalFun(){
                this.systemDelNoneNoticeModal=false;
            },
            systemDelDataNoticeModalFun(){
                this.systemDelDataNoticeModal=false;
            },
            handleShowDeleteData(){/*显示需要删除的数据集合*/

                let id = this.treeData.id;
                //console.log(id);
                if(!id){
                    this.$Message.info('请选择一个节点删除');
                    return;
                }
                let arr = [];
                for(let i in this.allTreeData){
                    if(this.allTreeData[i].fatherOrgId == id){
                        arr.push(1);
                    }
                }
                if(arr.length==0){
                    this.postRequest({
                        url:'/DGP/sysOrg/deleteById/'+this.treeData.id,
                        success:(res)=>{
                            this.$Message.info('删除成功');
                            this.$refs.tree.initTree();
                        }
                    })
                }else{
                    this.$Message.info('请选择根节点删除');
                }
                
                // DGP/sysOrg/deleteById/机构id
                // if(this.selectionDate.length){
                //     this.systemDelDataNoticeModal=true;
                    
                //     //code...........................................................
                //     console.log('确定删除数据');
                // }else{
                //     this.systemDelNoneNoticeModal=true;
                //     //code...........................................................
                //     console.log('提示请选中一条');
                // }
            },
            // handleeMechState(){
            //     $('.emechState').on('click','button',function(){
            //         $(this).addClass('active').siblings().removeClass('active')
            //     })
            // },
            getTreeData(treeData,allTreeData){
                this.treeData = treeData;
                this.allTreeData = allTreeData;
                //console.log(this.treeData);
                // if(this.treeData.state==1){
                //     this.stateRun();
                // }else{
                //     this.stateStop();
                // }
            },
            reloadTree(){
                this.isSearching = false;
                this.$refs.tree.initTree();
            },
            expandNode(){
                this.$refs.tree.expandNode();
            },
            unExpandNode(){
                this.$refs.tree.unExpandNode();
            },
            searchTree(){
                this.isSearching = true;
                this.$refs.tree.searchTree(this.searchName);
            }
        },
        mounted(){
            let common = ['serverUsed'];   //状态数据字典
            let json = {};
            json.list = common;
            this.postRequestJson({   //请求一些公共参数
                url:'/DGP/dgpCommon/getSomeParamCache',
                data:json,
                success:(res)=>{
                    this.serverUsed = res.obj.serverUsed;
                },
                error:()=>{

                }
            })
            //this.mechanismCancel();
            //this.handleeMechState();
        }
    }
</script>

<style scoped>
    .dgp-systemMechanism-wrap{
        width: 17.6rem;
    }
    .dgp-systemMechanism-content{
        width: 100%;
        height: 100%;
    }
    .dgp-systemMechanism-tree{
        position: relative;
        float: left;
        width: 3.8rem;
        height: 100%;
        z-index: 60;
    }
    .dgp-systemMechanism-wrap .dgp-systemMechanism-tree .dgp-tree{
        /*padding-bottom:.38rem;*/
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    .dgp-systemMechanism-tree-title{
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
    .dgp-systemMechanism-tree-title button{
        width: 0.7rem;
        height: .3rem;
        padding: 0;
        text-align: center;
        line-height: .3rem;
        border-radius: 0.03rem;
        font-size: 0.14rem;
        cursor:pointer;
    }
    .dgp-systemMechanism-tree-title button:last-child{

    }
    .dgp-systemMechanism-info{
        float: left;
        width: 13.8rem;
        height: 100%;
    }
    .dgp-systemMechanism-info-detailed{
        font-family: PingFangSC-Regular;
        font-size: 0.18rem;
        margin-left: .8rem;
        margin-top: .3rem;
    }
    .dgp-systemMechanism-info-line{
        width: 13rem;
        height:.01rem ;
        margin-left: .5rem;
        margin-top: .3rem;
    }
    .dgp-systemMechanism-info-content{
        margin-top: 0.7rem;
        width: 13rem;
        margin-left: .5rem;
    }
    .dgp-systemMechanism-info-content>div{
        float: left;
        width: 5.5rem;
        height: 0.7rem;
        text-align: right;
        font-size: .14rem;
    }
    .dgp-systemMechanism-inp{
        width: 2.78rem;
        height: .41rem;
        border-radius: .03rem;
        margin-left: 0.1rem;
        padding-left: .1rem;
        cursor:not-allowed;
    }
    .dgp-systemMechanism-info-content .dgp-systemMechanism-state{
        display: inline-block;
        margin-right: 0.59rem;
        width: .8rem;
        height: .38rem;
        border-radius: .03rem;
        text-align: center;
        line-height: .38rem;
        cursor:not-allowed;
    }
    .dgp-systemMechanism-info-content .dgp-systemMechanism-state:hover{
        background: #32B3EA;
        color:#fff;
    }
    .dgp-systemMechanism-info-content .dgp-systemMechanism-state:nth-child(2){
        margin-right: 0.4rem;
    }
    .dgp-systemMechanism-info-content .dgp-systemMechanism-state:nth-child(3){
        margin-right: 0.78rem;
    }
    .dgp-systemMechanism-info-content .dgp-systemMechanism-active{
        background: rgba(50, 179, 234, 1);
        color: #FFFFFF
    }
    .dgp-systemMechanism-info-content .dgp-systemMechanism-noactive{
         background:#FFFFFF;
        border: .01rem solid rgba(50, 179, 234, 1);
        color: rgba(50, 179, 234, 1);
    }
    .dgp-systemMechanism-info-content .dgp-systemMechanism-active.notAllow{
        border: 1px solid #E8E8E8;
        background: #fff;
        color:#000;
    }
    .dgp-systemMechanism-info-content .dgp-systemMechanism-noactive.notAllow{
        background: #F5F7F6;
        border: 0;
        color:#000;
    }
    .dgp-systemMechanism-list{
        margin-top: .3rem;
        margin-bottom: .3rem;
        width: 100%;
        text-align: center;
    }
    .dgp-systemMechanism-list>button{
        display: inline-block;
        width: .88rem;
        height: .36rem;
        line-height: .36rem;
        margin: 0 .1rem;
        border-radius: .03rem;
        font-size: .16rem;
    }
    /*.dgp-systemMechanism-wrap button{*/
        /*cursor: pointer;*/
    /*}*/
    .dgp-systemMechanism-list button{
        cursor: pointer;
    }

</style>
<style>
    .dgp-systemMechanism-tree ul.ztree{
        margin-top:0;
        padding: 0;
        height: 100%;
    }
    .dgp-systemMechanism-tree ul.ztree>li{
        padding-left: .2rem;
    }
    .dgp-systemMechanism-tree .ivu-input-wrapper .ivu-icon{
        width: .32rem;
        height: .41rem;
        line-height: .41rem;
        font-size: .16rem;
        right:.24rem;
    }
    .dgp-systemMechanism-tree .ivu-input-wrapper .ivu-input{
        height: .41rem;
        padding: 0 .32rem 0 .15rem;
        line-height: .41rem;
        font-size: .16rem;
    }
    .dgp-systemMechanism-tree .dgp-tree{
        position: absolute;
        top: 1.25rem;
        left: 0;
        bottom: 0;
    }
</style>