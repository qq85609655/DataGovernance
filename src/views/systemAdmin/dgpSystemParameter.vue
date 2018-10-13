<template>
    <div class="dgp-systemParameter-wrap clearfix">
        <div class="dgp-systemParameter-content">
            <div class="dgp-systemParameter-tree">
                <Input placeholder="参数搜索" icon="ios-search" style="width: 100%;padding:.24rem; height:.8rem;" v-model="searchName" @on-enter="searchTree" @on-click="searchTree" />
                <div class="dgp-systemParameter-tree-title">
                    <button :class="{'btn-primary': !isSearching,'btn-default': isSearching}" @click="reloadTree">目录</button>
                    <button class="btn-default" @click="expandNode">展开</button>
                    <button class="btn-default" @click="unExpandNode">收缩</button>
                    <button :class="{'btn-primary': isSearching,'btn-default': !isSearching}" @click="searchTree">结果</button>
                </div>
                <modalSystemParameter ref="parameterModal" @reloadTree="reloadTree" :treeData="treeData" :allTreeData="allTreeData"></modalSystemParameter>
                <modal-del-none :systemDelNoneNotice="systemDelNoneNoticeModal" @systemDelNoneNoticeFun="systemDelNoneNoticeModalFun"></modal-del-none>
                <modal-del-data  :systemDelDataNotice="systemDelDataNoticeModal" @systemDelDataNoticeFun="systemDelDataNoticeModalFun"></modal-del-data>
                <treeParameter @getTreeData="getTreeData" ref="tree" @showModalMenu="showModalMenu"></treeParameter>
            </div>
            <div class="dgp-systemParameter-info">
                <div class="dgp-systemParameter-info-detailed">
                    详细信息
                </div>
                <div class="dgp-systemParameter-info-line"></div>
                <div class="dgp-systemParameter-info-content clearfix">
                    <div>
                        <span>参数key：</span>
                        <input disabled="disabled" v-model="treeData.paramKey" type="text" class="dgp-systemParameter-inp">
                    </div>
                    <div>
                        <span>菜单value：</span>
                        <input  disabled="disabled" v-model="treeData.paramValue" type="text" class="dgp-systemParameter-inp">
                    </div>
                    <div>
                        <span>参数顺序：</span>
                        <input disabled="disabled" v-model="treeData.paramOrder" type="text" class="dgp-systemParameter-inp">
                    </div>
                    <div>
                        <span >参数描述：</span>
                        <input type="text" v-model="treeData.paramDesc" disabled="disabled" class="dgp-systemParameter-inp">
                    </div>
                </div>
                <div class="dgp-systemParameter-info-line" style="margin-top: .5rem"></div>
                <div class="dgp-systemParameter-list" v-show="ParameterChangebol">
                    <button class="btn-default" @click="ParameterCancel">取消</button>
                    <template v-for='item in serverUsed'>
                        <button v-for="(v,key) in item" :key="key" v-if="treeData.paramState != key"  class="btn-default" @click="changeOpenOrClose">{{ v }}</button>
                    </template>
                    <button @click="ParameterChange" class="btn-primary">保存</button>
                </div>
                <div class="dgp-systemParameter-list" v-show="ParameterModifybol">
                    <button @click="ParameterModify" class="btn-primary">修改</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import treeParameter from "../../components/tree/tree_parameter_management.vue"
    import modalSystemParameter from "../../components/modal/modal_parameterManage"
    import ModalDelData from "../../components/modal/modal_delData";
    import ModalDelNone from "../../components/modal/modal_delNone";
    export default {
        name: "dgp-system-menu",
        components:{
            modalSystemParameter,treeParameter,ModalDelNone, ModalDelData,
        },
        data(){
           return{
               allTreeData:{},
               treeData:{},
               ParameterChangebol:false,
               ParameterModifybol:true,
               selectionDate:[],                    //删除数据的集合
               systemDelNoneNoticeModal:false,      //删除无数据时提示框
               systemDelDataNoticeModal:false,      //有数据时提示框
               searchName:'',                       //树搜索的关键词
               isSearching: false,                  //搜索状态,控制按钮样式
               serverUsed:[],                       //启用停用状态 数据字典
           }
        },
        methods:{
            showModalMenu(){
                this.$refs.parameterModal.showModalMenu();
            },
            ParameterModify(){
                if(!this.treeData.id){
                    this.$Message.info('请选择一个节点');
                    return;
                }
                $(".dgp-systemParameter-inp").css("background","#fff")
                $(".dgp-systemParameter-info-content input").attr("disabled",false);
                $(".dgp-systemParameter-info-content input").css("cursor",'text');
                this.ParameterChangebol=true;
                this.ParameterModifybol=false;
            },
            ParameterChange(){
                if(!this.treeData.paramKey){
                    this.$Message.warning('请输入参数KEY');
                    return;
                }else if(!this.treeData.paramValue){
                    this.$Message.warning('请输入参数值');
                    return;
                }else if(!this.treeData.paramOrder){
                    this.$Message.warning('请选择角色状态');
                    return;
                }
                let that = this;
                this.postRequestJson({
                    url:'/DGP/sysParam/update',
                    data:JSON.stringify({
                        id:this.treeData.id,
                        parentId:this.treeData.parentId,
                        paramPath:this.treeData.paramPath,
                        paramState:this.treeData.paramState,
                        oldKey:this.treeData.oldKey,
                        createTime:this.treeData.createTime,
                        createUserName:this.treeData.createUserName,
                        paramKey:this.treeData.paramKey,
                        paramValue:this.treeData.paramValue,
                        paramOrder:this.treeData.paramOrder,
                        paramDesc:this.treeData.paramDesc
                    }),
                    success:(res)=>{
                        that.$Message.info(res.msg);

                        if(res.success){
                            this.$refs.tree.initTree();
                            //成功的css
                            $(".dgp-systemParameter-inp").css("background","#F5F7F6")
                            $(".dgp-systemParameter-info-content input").attr("disabled",true);
                            this.ParameterChangebol=false;
                            this.ParameterModifybol=true;

                        }
                    },
                    error:()=>{

                    }
                })

            },
            ParameterReset(){
                $(".dgp-systemParameter-info-content input").val(" ");
            },
            ParameterCancel(){
                $(".dgp-systemParameter-inp").css("background","#F5F7F6")
                $(".dgp-systemParameter-info-content input").attr("disabled",true);
                $(".dgp-systemParameter-info-content input").css("cursor",'not-allowed');
                this.ParameterChangebol=false;
                this.ParameterModifybol=true;

            },
            systemDelNoneNoticeModalFun(){
                this.systemDelNoneNoticeModal=false;
            },
            systemDelDataNoticeModalFun(v){
                if(v=='ok'){
                    this.systemDelDataNoticeModal=false;
                    let that = this;
                    this.postRequestJson({
                        url:'/DGP/sysParam/deleteById/'+this.treeData.id,
                        //data: JSON.stringify(this.selectionDate),
                        success:(res)=>{
                            that.reloadTree();
                            this.treeData={},
                            this.$Message.info(res.msg);
                        },
                        error:(res)=>{
                        }
                    })
                }else{
                    this.systemDelDataNoticeModal=false;
                }
                
            },
            handleShowDeleteData(){/*显示需要删除的数据集合*/
                if(this.treeData.id){
                    this.systemDelDataNoticeModal=true;

                    //code
                    //console.log('确定删除数据');
                }else{
                    this.systemDelNoneNoticeModal=true;
                    //code
                    //console.log('提示请选中一条');
                }
            },
            getTreeData(treeData,allTreeData){
                this.treeData = treeData;
                this.allTreeData = allTreeData;
                //console.log(this.treeData);
            },
            reloadTree(){
                this.isSearching = false;
                this.$refs.tree.initTree();
            },
            buildParam(){
                this.postRequest({
                    url:'/DGP/sysParam/build',
                    success:(res)=>{
                        if(res.success){
                            this.$Message.info(res.msg);
                        }
                    },
                    error:(res)=>{
                    }
                })
            },
            changeOpenOrClose(){
                if(this.treeData.id == null){
                    this.$Message.info("请选择菜单！");
                    return;
                }else if(this.treeData.parentId==null){
                    // this.$Message.info("根节点不能修改！");
                    // return;
                }
                if(this.treeData.paramState == '1'){
                    
                    this.postRequestJson({
                        url:'/DGP/sysParam/update',
                        data: JSON.stringify({
                            id:this.treeData.id,
                            parentId:this.treeData.parentId,
                            paramPath:this.treeData.paramPath,
                            paramState:'2',
                            oldKey:this.treeData.oldKey,
                            createTime:this.treeData.createTime,
                            createUserName:this.treeData.createUserName,
                            paramKey:this.treeData.paramKey,
                            paramValue:this.treeData.paramValue,
                            paramOrder:this.treeData.paramOrder,
                            paramDesc:this.treeData.paramDesc
                        }),
                        success:(res)=>{
                            if(res.success){
                                this.treeData.paramState=='2';
                                this.$refs.tree.initTree();
                                this.$Message.info("停用成功！");
                            }else{
                                this.$Message.info("停用失败！");
                            }
                        },
                        error:()=>{

                        }
                    })
                }else{
                    //this.treeData.paramState=='1';
                    this.postRequestJson({
                        url:'/DGP/sysParam/update',
                        data: JSON.stringify({
                            id:this.treeData.id,
                            parentId:this.treeData.parentId,
                            paramPath:this.treeData.paramPath,
                            paramState:'1',
                            oldKey:this.treeData.oldKey,
                            createTime:this.treeData.createTime,
                            createUserName:this.treeData.createUserName,
                            paramKey:this.treeData.paramKey,
                            paramValue:this.treeData.paramValue,
                            paramOrder:this.treeData.paramOrder,
                            paramDesc:this.treeData.paramDesc
                        }),
                        success:(res)=>{
                            if(res.success){
                                this.treeData.paramState == '1';
                                this.$refs.tree.initTree();
                                this.$Message.info("启用成功！");
                            }else{
                                this.$Message.info("启用失败！");
                            }
                        },
                        error:()=>{

                        }
                    })

                }


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
            let common = ['serverUsed'];   //菜单类型,是否启用  
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
        }
    }
</script>

<style scoped>
    .dgp-systemParameter-wrap{
        width: 17.6rem;
    }
    .dgp-systemParameter-content{
        width:100%;
        height: 100%;
    }
    .dgp-systemParameter-tree{
        position: relative;
        float: left;
        width: 4rem;
        height: 100%;
        z-index: 60;
    }
    .dgp-systemParameter-tree .dgp-tree{
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    .dgp-systemParameter-tree-title{
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
    .dgp-systemParameter-tree-title button{
        width: 0.7rem;
        height: .3rem;
        padding: 0;
        text-align: center;
        line-height: .3rem;
        border-radius: 0.03rem;
        font-size: 0.14rem;
    }
    .dgp-systemParameter-info{
        float: left;
        width: 13.6rem;
        height: 100%;
    }
    .dgp-systemParameter-info-detailed{
        font-family: PingFangSC-Regular;
        font-size: 0.18rem;
        margin-left: .8rem;
        margin-top: .3rem;
    }
    .dgp-systemParameter-info-line{
        width: 13rem;
        height:1px ;
        /*background: #D8D8D8;*/
        margin-left: .5rem;
        margin-top: .3rem;
    }
    .dgp-systemParameter-info-content{
        margin-top: 0.7rem;
        width: 13rem;
        margin-left: .5rem;
    }
    .dgp-systemParameter-info-content>div{
        float: left;
        width: 10rem;
        height: 0.7rem;
        text-align: right;
        font-size: .14rem;
    }
    .dgp-systemParameter-inp{
        width: 5.43rem;
        height: .41rem;
        border-radius: 3px;
        margin-left: 0.1rem;
        padding-left: 0.2rem;
        cursor:not-allowed;
    }
    .dgp-systemParameter-list{
        margin-top: .1rem;
        width: 100%;
        text-align: center;
    }
    .dgp-systemParameter-list>button{
        display: inline-block;
        width: .88rem;
        height: .36rem;
        line-height: .36rem;
        margin: 0 .1rem;
        border-radius: 3px;
        font-size: .16rem;
        margin-bottom: 0.3rem;
    }
    .dgp-systemParameter-wrap button{
        cursor: pointer;
    }
</style>
<style>
    .dgp-systemParameter-tree ul.ztree>li{
        padding-left: .2rem;
    }
    .dgp-systemParameter-tree ul.ztree {
        margin-top: 0;
        padding: 0;
        height: 100%;
    }
    .dgp-systemParameter-tree ul.ztree {
        margin-top: 0;
        padding: 0;
        height: 100%;
    }
    .dgp-systemParameter-tree .ivu-input-wrapper .ivu-icon{
        width: .32rem;
        height: .41rem;
        line-height: .41rem;
        font-size: .16rem;
        right: .24rem;
    }
    .dgp-systemParameter-tree .ivu-input-wrapper .ivu-input{
        height: .41rem;
        padding: 0 .32rem 0 .15rem;
        line-height: .41rem;
        font-size: .16rem;
    }
    .dgp-systemParameter-tree .dgp-tree{
        position: absolute;
        top: 1.25rem;
        left: 0;
        bottom: 0;
    }
    .dgp-systemParameter-tree .dgp-tree{
        box-shadow: none;
    }
</style>