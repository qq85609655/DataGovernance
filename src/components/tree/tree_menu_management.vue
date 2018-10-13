<template>
    <!-- 菜单管理树 -->
    <div class="dgp-tree">
        <ul id="treeDemo" class="ztree"></ul>
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
    import '../../assets/Ztree/jquery.ztree.excheck.js'

    export default {

        data () {
            return {
                spinShow: true,
                modal1: false,
                znodes:[],
                delTreeNode:{},
                selectNode:{}
            }
        },
        methods:{
            ok(){
                let that = this;
                // console.log(this.delTreeNode.id);
                this.postRequest({
                    url:'/DGP/sysResources/checkMenuIsUsed/'+this.delTreeNode.id,
                    success:(res)=>{
                        if(res.success){
                            this.postRequest({
                                url:'/DGP/sysResources/deleteById/'+this.delTreeNode.id,
                                success:(res)=>{
                                   if(res.success){
                                        this.$Message.info(res.msg);
                                        this.initTree();
                                   }
                                }
                            })
                        }
                       
                    }
                })
            },
            cancel(){

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
                        console.log(treeNode);
                         that.delTreeNode = treeNode;
                         that.modal1 = true;//打开删除确认框
                    });
                    var btn = $("#diyBtn1_"+treeNode.id);
                    if (btn) btn.bind("click", function(){
                        that.$emit('showModalMenu')
                    });
                };
                let setting = {
//                    check:{
//                        enable:true,
//                    },
                    view: {
                        showLine: false,
                        showIcon: false,
                        addDiyDom: addDiyDom
                    },
                    data: {
                        key:{
                            name:'menuname'
                        },
                        simpleData: {
                            enable: false,
                            pIdKey: "parentid",
                            idKey: "id",
                        }
                    },
                    callback: {
                        onClick: that.zTreeOnClick
                    }

                };
                if(v){
                    $.fn.zTree.destroy();
                    let setting2 = {
                        view: {
                            showLine: false,
                            showIcon: false,
                            addDiyDom: addDiyDom
                        },
                        data: {
                            key:{
                                name:'menuname'
                            },
                            simpleData: {
                                enable: true,
                                pIdKey: "parentid",
                                idKey: "id",
                            }
                        },
                        callback: {
                            onClick: that.zTreeOnClick
                        }

                    }; 
                    $.fn.zTree.init($("#treeDemo"), setting2, nodes);
                    let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    treeObj.expandAll(true);
                }else{//重新加载或初次加载
                    this.spinShow = true;
                    this.postRequest({
                        url:'/DGP/sysResources/getMenuTree',
                        methods:'json',
                        success:(response)=>{
                            this.znodes = response.obj;
                            console.log(this.znodes);
                            //$(document).ready(function(){
                                this.spinShow = false;
                                $.fn.zTree.init($("#treeDemo"), setting, response.obj);
                                let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                                let node = treeObj.getNodeByTId("treeDemo_1");
                                treeObj.expandNode(node, true, false, true);
                                $('#treeDemo_1_a').click();
                            //});
                        },
                        error:()=>{

                        }
                    })
                }
            },
            zTreeOnClick(event, treeId, treeNode, clickFlag){
                console.log(treeNode);
                this.selectNode = treeNode;
                this.$emit('getTreeData',treeNode,this.znodes);
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
                let nodes = treeObj.getNodesByParamFuzzy("menuname", v, null);  //模糊匹配相应节点
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
                console.log(allNodes);
                this.initTree('search',allNodes);//渲染搜索结果的树
            }
        },
        mounted(){
            this.initTree();
        }
    }
</script>
<style>
   .dgp-tree .ztree li span.button.noline_close{
       background-image: url('../../assets/Ztree/img/tree_organzation_manange/close_state.png');
       background-position:center center;
       background-size: 0.2rem 0.2rem;
   }
    .dgp-tree .ztree li span.button.noline_open{
       background-image: url('../../assets/Ztree/img/tree_organzation_manange/open-state.png');
       background-position:center center;
       background-size: 0.2rem 0.2rem;
    }
    .dgp-tree .ztree li span.button.folder_ico_open{
        background: url("../../assets/Ztree/img/Folder.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.folder_ico_close{
        background: url("../../assets/Ztree/img/Folder.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.folder_ico_docu{
        background: url("../../assets/Ztree/img/Folder.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.app_ico_open{
        background: url("../../assets/Ztree/img/Individual-normal.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.app_ico_close{
        background: url("../../assets/Ztree/img/Individual.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.app_ico_docu{
        background: url("../../assets/Ztree/img/Individual.png") no-repeat scroll 0 0 transparent;
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
    
    .dgp-tree .ztree span.checkbox_true_full + a span.node_name{
        color: #32B3EA;
    }
    .dgp-tree .ztree span.checkbox_true_full_focus + a span.node_name{
        color: #32B3EA;
    }
    .dgp-tree .ztree li.level0{
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/1pxbackground.png');
        background-size: 100% 0.4rem;
        background-repeat: no-repeat;

    }
    .ztree li span.button.chk.checkbox_false_full {
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/no-check.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }
    .ztree li span.button.chk.checkbox_false_full_focus {
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/no-check.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }
    .ztree li span.button.chk.checkbox_false_part {
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/no-check.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }
    .ztree li span.button.chk.checkbox_false_part_focus {
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/no-check.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }
    .ztree li span.button.chk.checkbox_false_disable {
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/no-check.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }

    .ztree li span.button.chk.checkbox_true_full {
            background-image: url('../../assets/Ztree/img/tree_organzation_manange/checked.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }
    .ztree li span.button.chk.checkbox_true_full_focus {
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/checked.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }
    .ztree li span.button.chk.checkbox_true_part {
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/part-check.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }
    .ztree li span.button.chk.checkbox_true_part_focus {
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/part-check.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }
    .ztree li span.button.chk.checkbox_true_disable {
        background-image: url('../../assets/Ztree/img/tree_organzation_manange/checked.png');
        background-position:center center;
        background-size: 0.2rem 0.2rem;
    }

</style>
