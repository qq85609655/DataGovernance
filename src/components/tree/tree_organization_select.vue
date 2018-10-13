<template>
<!-- 机构选择 树 -->
    <div class="dgp-tree-organization" :class="{'active':state}" style="padding:0.1rem 0.1rem;">
        <Input class="dgp-tree-organization-search" :class="treeId" v-model="searchName" icon="ios-search" placeholder="搜索" style="" @on-click="searchTree" @on-enter="searchTree" @on-change="searchTree"/>
        <ul :id="treeId" class="ztree"></ul>
    </div>   
    
</template>
<script>
    import '../../assets/Ztree/demo.css'
    import '../../assets/Ztree/zTreeStyle.css';
    import '../../assets/Ztree/jquery.ztree.core.js';
    export default {
        props:['state','treeId'],
        data () {
            return {
                znodes:[],
                time:0,
                t1:false,
                searchName:''
            }
        },
        methods:{
            initTree(v,nodes){
                const that = this;
                //ztree的配置文件
                let setting = {
                    view: {
                            showLine: false
                    },
                    data: {
                        key:{
                            name:'orgName'
                        },
                        simpleData: {
                            enable: true,
                            pIdKey: "fatherOrgId",
                            idKey: "id",
                        }
                    },
                    callback: {
                        onClick: that.zTreeOnClick
                    }

                };
                if(v){
                    //$.fn.zTree.destroy();
                    $.fn.zTree.init($("#"+that.treeId), setting, nodes);
                    let treeObj = $.fn.zTree.getZTreeObj(that.treeId);
                    treeObj.expandAll(true);
                }else{
                    this.spinShow = true;
                    this.postRequestJson({
                        url:'/DGP/sysOrg/listAll',
                        data: JSON.stringify({}),
                        //methods:'json',
                        success:(response)=>{
                            that.znodes = response.obj;
                           // $(document).ready(function(){
                                $.fn.zTree.init($("#"+that.treeId), setting, response.obj);

                                let treeObj = $.fn.zTree.getZTreeObj(that.treeId);
                                let node = treeObj.getNodeByTId(that.treeId+"_1");
                                treeObj.expandNode(node, true, false, true); //默认展开第一级
                            //});
                        },
                        error:()=>{

                        }
                    })
                }
            },
            zTreeOnClick(event, treeId, treeNode, clickFlag){
                    this.$emit('changeOrgName',treeNode);
            },
            searchTree(){
                clearTimeout(this.t1);
                this.t1 = setTimeout(()=>{
                    this.initTree('BeforeSearch',this.znodes);  //每次搜索前 重载一遍树,无需请求数据
                    console.log(this.znodes);
                    let treeObj = $.fn.zTree.getZTreeObj(this.treeId);
                    let nodes = treeObj.getNodesByParamFuzzy("orgName", this.searchName, null);  //模糊匹配相应节点
                    let allNodes = [];   //搜索结果的节点（包含所有父节点和自身）
                        nodes.forEach((value,index,arr)=>{
                        allNodes = allNodes.concat(value.getPath());  //将每个匹配到的模糊节点的所有父节点和自身拼接成一个数组
                    })
                    console.log(nodes);
                    console.log(allNodes);
                    allNodes.forEach((value,index,arr)=>{
                        delete value.check_Child_State ;//去除不必要的数据，避免渲染树的时候重复
                        delete value.children;
                        delete value.isParent;
                        delete value.check_Focus;
                        delete value.checkedOld;
                        delete value.chkDisabled;
                        delete value.getCheckStatus;
                        delete value.getIndex;
                        delete value.getNextNode;
                        delete value.getParentNode;
                        delete value.getPath;
                        delete value.getPreNode;
                        delete value.halfCheck;
                        delete value.isAjaxing;
                        delete value.isFirstNode;
                        delete value.isLastNode;
                        delete value.level;
                        delete value.nocheck;
                        delete value.open;
                        delete value.parentTId;
                        delete value.tId; 
                        delete value.zAsync;
                    })
                    
                    allNodes = Array.from(new Set(allNodes));//去重重复的数据
                    console.log(allNodes);
                    this.initTree('search',allNodes);//渲染搜索结果的树
                },350)
                //clearTimeout(t1);
                
            }
        },
        mounted(){
            this.initTree();
        }
    }
</script>
<style>
    .dgp-tree-organization .ivu-input-wrapper .ivu-icon-ios-search{
        width:unset;
        height: unset;
        margin-right:0.1rem;
    }
    .dgp-tree-organization{
        /* padding:0.3rem 0.2rem; */
        background-color: #FFF;
    }
    .dgp-tree-organization .dgp-tree-organization-search .ivu-input{
        width: 100%;
        height: .41rem;
        line-height: .41rem;
        padding: .04rem .32rem .04rem .1rem;
        font-size: .12rem;
        border: .01rem solid #C6C6C6;
    }
    .dgp-tree-organization .dgp-tree-organization-search .ivu-input-icon {
        width: .32rem;
        text-align: center;
        height: .41rem;
        line-height: .41rem;
        font-size: .16rem;
        margin-right: 0;
    }
    .dgp-tree-organization .ztree li span.button.switch {
        width: 0.2rem;
        height: 0.2rem;
    }
    .dgp-tree-organization .ztree li span.button.noline_close{
       background-image: url('../../assets/Ztree/img/close.png');
       background-position:center center;
       background-size: 0.15rem 0.15rem;
       width:0.2rem;
       height:0.2rem;
   }
    .dgp-tree-organization .ztree li span.button.noline_open{
       background-image: url('../../assets/Ztree/img/open.png');
       background-position:center center;
       background-size: 0.15rem 0.15rem;
        width:0.2rem;
        height:0.2rem;
    }
    .dgp-tree-organization .ztree li span.button.pOrg_ico_docu{
        background: url("../../assets/Ztree/img/folder_colse.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.pOrg_ico_open{
        background: url("../../assets/Ztree/img/folder_open.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.pOrg_ico_close{
        background: url("../../assets/Ztree/img/folder_colse.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.org_ico_docu{
        background: url("../../assets/Ztree/img/file.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.org_ico_open{
        background: url("../../assets/Ztree/img/file.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.org_ico_close{
        background: url("../../assets/Ztree/img/file.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.app_ico_open{
        background: url("../../assets/Ztree/img/Individual-normal.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.15rem 0.15rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.app_ico_close{
        background: url("../../assets/Ztree/img/Individual.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.15rem 0.15rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.app_ico_docu{
        background: url("../../assets/Ztree/img/Individual.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.15rem 0.15rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button {
        width: 0.2rem;
        height: 0.2rem;
    }
    .dgp-tree-organization .ztree li a {
        padding: 1px 3px 0 0;
        margin: 0;
        cursor: pointer;
        height: 0.2rem;
        /*color: #333;*/
        /*background-color: transparent;*/
        text-decoration: none;
        vertical-align: top;
        display: inline-block;
    }
    .dgp-tree-organization .ztree li span.node_name {
        line-height: 0.2rem;
        /*color: rgba(48, 48, 48, 1);*/
        font-size: 0.16rem;
        text-align: left;
        font-family: PingFangSC-Regular;
        /* margin-left: 0.04rem; */
        font-family: PingFangSC-Regular;
        /*color: #595959;*/
    }
    .dgp-tree-organization{
        position: absolute;
        z-index: 900;
        top: 0.7rem;
        /* right: 0.14rem; */
        /* width: 1.74rem; */
        /*box-shadow: 0 1px 10px 0 rgba(0,21,41,0.13);*/
        border-radius: 3px;
        margin-top: 0;
        display: none;
    }
    .dgp-tree-organization.active{
       display: block;
    }
    .dgp-tree-organization .ztree{
        width: 1.74rem;
        padding: 0.05rem 0rem;
        margin:0;
    }
    .dgp-tree-organization .ztree li{
        margin-top: 0.05rem;
    }
    #org1{
        width: 3rem;
        /* padding:0.1rem 0.2rem; */
        height: 5rem;
        overflow: auto;
    }
    #org2{
        height:200px;
        overflow: auto;
        width:1.90rem;
        padding-left:0.1rem;
    }
    .dgp-tree-organization .org2{
        width:1.9rem;
    }
    
</style>
