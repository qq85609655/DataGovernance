<template>
<!-- 参数管理 树-->
    <div class="dgp-tree">
        <ul id="treeDemo" class="ztree"></ul>
        <!-- <Button type="primary" @click="modal1 = true">Display dialog box</Button> -->
        <Modal
            v-model="modal1"
            title="提醒"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>确定删除该节点？</p>
        </Modal>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div> 
    
</template>
<script>
    import '../../assets/Ztree/demo.css'
    import '../../assets/Ztree/zTreeStyle.css';
    import '../../assets/Ztree/jquery.ztree.core.js';
    export default {
        
        data () {
            return {
                spinShow: true,
                modal1: false,
                znodes:[],//树加载的所有数据
                delTreeNode:{}//选中即将要删除的节点
            }
        },
        methods:{
             ok () {
                this.postRequest({
                    url:'/DGP/sysOrg/deleteById/'+this.delTreeNode.id,
                    success:(res)=>{
                        this.$Message.info('删除成功');
                        this.initTree();
                    }
                })
            },
            cancel () {
            },
            initTree(v,nodes){
                let that = this;
                function addDiyDom(treeId, treeNode) {  //这里添加dom元素
                    var aObj = $("#" + treeNode.tId + "_a");
                    //if ($("#diyBtn_"+treeNode.id).length>0) return;
                    var editStr = "<button class='diyBtn1 ff-r' id='diyBtn1_" +treeNode.id+ "' ></button>"
                        + "<button type='button' class='diyBtn2 ff-r' id='diyBtn2_" + treeNode.id
                        + "' title='111111' onfocus='this.blur();'></button>";
                    aObj.append(editStr);
                    var btn2 = $("#diyBtn2_"+treeNode.id);
                    if (btn2) btn2.bind("click", function(){
                        that.delTreeNode = treeNode;
                        that.modal1 = true;//打开删除确认框
                    });
                    var btn = $("#diyBtn1_"+treeNode.id);
                    if (btn) btn.bind("click", function(){
                        that.$emit('showModal')
                    });
                };
                let setting = {
                    view: {
                            showLine: false,
                            addDiyDom: addDiyDom
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
                    $.fn.zTree.destroy();
                    $.fn.zTree.init($("#treeDemo"), setting, nodes);
                    let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    treeObj.expandAll(true);
                }else{
                    this.spinShow = true;
                    console.log('not-search');
                    this.postRequestJson({
                    url:'/DGP/sysOrg/listAll',
                    data:JSON.stringify({}),
                    //methods:'json',
                    success:(response)=>{
                        this.znodes = response.obj;
                        console.log(this.znodes);
                            setTimeout(()=>{
                                this.spinShow = false;
                            },200)
                            
                            $.fn.zTree.init($("#treeDemo"), setting, response.obj);

                            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                            let node = treeObj.getNodeByTId("treeDemo_1");
                            treeObj.expandNode(node, true, false, true); //默认展开第一级
                            $('#treeDemo_1_a').click();     //默认点击第一个
                    },
                    error:()=>{
                    }
                })
                }
            },
            zTreeOnClick(event, treeId, treeNode, clickFlag){
                console.log(event.target,treeId,treeNode,clickFlag);
                this.selectNode = treeNode;
                this.$emit('getTreeData',treeNode,this.znodes);
                console.log(treeNode,this.znodes);
                $('.diyBtn1').removeClass('active');
                $('.diyBtn2').removeClass('active');
                $('#diyBtn2_'+treeNode.id).addClass('active');
                $('#diyBtn1_'+treeNode.id).addClass('active');
                
            },
            expandNode(){
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                treeObj.expandNode(this.selectNode,true,true);
            },
            unExpandNode(){
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                treeObj.expandNode(this.selectNode,false,true);
            },
            searchTree(v){
                this.initTree('BeforeSearch',this.znodes);  //每次搜索前 重载一遍树,无需请求数据
                
                let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                let nodes = treeObj.getNodesByParamFuzzy("orgName", v, null);  //模糊匹配相应节点
                let allNodes = [];   //搜索结果的节点（包含所有父节点和自身）
                    nodes.forEach((value,index,arr)=>{
                    allNodes = allNodes.concat(value.getPath());  //将每个匹配到的模糊节点的所有父节点和自身拼接成一个数组
                })

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
                this.initTree('search',allNodes);//渲染搜索结果的树
            }
        },
        mounted(){
            this.initTree();
        }
    }
</script>
<style>
    #treeDemo{
        overflow-x:hidden;
    }
   .curSelectedNode  span.node_name{
       color:#32B3EA!important;
   }
   .dgp-tree .ztree li span.button.noline_close{
       background-image: url('../../assets/Ztree/img/close.png');
       background-position:center center;
       background-size: 0.15rem 0.15rem;
   }
    .dgp-tree .ztree li span.button.noline_open{
       background-image: url('../../assets/Ztree/img/open.png');
       background-position:center center;
       background-size: 0.15rem 0.15rem;
    }
    .dgp-tree .ztree li span.button.pOrg_ico_open{
        background: url("../../assets/Ztree/img/tree_organzation_manange/folder-open.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.pOrg_ico_close{
        background: url("../../assets/Ztree/img/tree_organzation_manange/folder-close.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.pOrg_ico_docu{
        background: url("../../assets/Ztree/img/tree_organzation_manange/folder-close.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.org_open{
        background: url("../../assets/Ztree/img/tree_organzation_manange/file.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.org_close{
        background: url("../../assets/Ztree/img/tree_organzation_manange/file.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.org_ico_docu{
        background: url("../../assets/Ztree/img/tree_organzation_manange/file.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button {
        width: 0.3rem;
        height: 0.4rem;
    }
    .dgp-tree .ztree li span.button.switch {
        width: 0.2rem;
        height: 0.4rem;
    }
    .dgp-tree .ztree li a {
        padding: 1px 3px 0 0;
        margin: 0;
        cursor: pointer;
        height: 0.4rem;
        color: #333;
        background-color: transparent;
        text-decoration: none;
        vertical-align: top;
        display: inline-block;
    }
    .dgp-tree .ztree li span {
        line-height: 0.4rem;
        color: rgba(48, 48, 48, 1);
        font-size: 0.16rem;
        text-align: left;
        font-family: PingFangSC-Regular;

    }
   ul.ztree{
       width: 2.8rem;
       height:7rem;
       overflow: auto;
   }


   .diyBtn1{
       padding-top: .04rem;
       visibility: hidden;
       margin-left: 0.05rem;
       width:0.2rem;
       height:0.2rem;
       background: url('../../assets/images/add-mr.png') no-repeat center center;
       background-size: 90% 90%;
       vertical-align: text-top;
       cursor:pointer;
   }
    .diyBtn1.active{
       visibility: visible;
   }
   .diyBtn1:hover{
       padding-top: .04rem;
       margin-left: 0.05rem;
       width:0.2rem;
       height:0.2rem;
       background: url('../../assets/images/add-hv.png') no-repeat center center;
       background-size: 90% 90%;
       vertical-align: text-top;
   }
   .diyBtn2{
       padding-top: .04rem;
       visibility: hidden;
       margin-left: 0.05rem;
       width:0.2rem;
       height:0.2rem;
       background: url('../../assets/images/reduce-mr.png') no-repeat center center;
       background-size: 90% 90%;
       vertical-align: text-top;
       cursor:pointer;
   }
    .diyBtn2.active{
       visibility: visible;
   }
   .diyBtn2:hover{
       padding-top: .04rem;
       margin-left: 0.05rem;
       width:0.2rem;
       height:0.2rem;
       background: url('../../assets/images/reduce-hv.png') no-repeat center center;
       background-size: 90% 90%;
       vertical-align: text-top;
       
   }





</style>
