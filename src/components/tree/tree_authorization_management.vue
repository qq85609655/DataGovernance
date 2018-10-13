<template>
<!-- 权限管理 -->
    <div class="dgp-tree-Authorization">
        <div class="dgp-jur-treeWrap">
            <div class="dgp-auth-title">{{rowData.roleName}} - 角色权限<Icon class="dgp-close-tree" @click.stop="handleCloseModal" type="ios-close" /></div>
            <ul id="treeAuthorization" class="ztree dgp-auth-management-main" style="height: auto">
            </ul>
            <Spin size="large" fix v-if="spinShow"></Spin>
            <ul class="dgp-auth-control">
                <li class="dgp-auth-save active" @click.stop="handleAuthSave">保存</li>
                <li class="dgp-auth-refresh" @click.stop="handleAuthRefresh">刷新</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import '../../assets/Ztree/demo.css'
    import '../../assets/Ztree/zTreeStyle.css';
    import '../../assets/Ztree/jquery.ztree.core.js';
    import '../../assets/Ztree/jquery.ztree.excheck.js'
    
    export default {
        name:'TreeAuthManagement',
        props:['rowData'],
        data () {
            return {
                   spinShow:true, 
            }
        },
        methods:{
            handleAuthSave(){/*保存*/
                this.spinShow = true;
                let treeObj = $.fn.zTree.getZTreeObj("treeAuthorization");
                let nodes = treeObj.getCheckedNodes(); //所有选中的（包括部分选中）
                //let checkNodes = [];
                // for(let i in nodes){
                //     if(nodes[i].check_Child_State == -1 || nodes[i].check_Child_State == 2){
                //         checkNodes.push(nodes[i]);
                //     }
                // }
                // console.log(checkNodes);
                let ids =  [];
                nodes.forEach((v,i,arr)=>{
                    ids.push(v.id);
                })
                this.postRequest({
                    url:'/DGP/sysRoleXRes/updatePermission',
                    data:{
                        roleId:this.rowData.id,
                        resIds:ids.join(',')
                    },
                    success:(res)=>{
                        if(res.success){
                            this.spinShow = false;
                            this.$Message.info(res.msg);
                            //this.$emit('handledosave');
                            //this.initTree();
                            this.$emit('handledosave')
                        }
                    },
                    error:()=>{

                    }
                })
                //code..............
                //this.$Message.info('保存成功');
                
            },
            handleAuthRefresh(){/*刷新*/
                this.spinShow = true;
                this.initTree();
                // const msg = this.$Message.loading({
                //     content: '正在刷新,请稍后...',
                //     duration: 0
                // });
                // let timer=setTimeout(msg, 1000);
                /*获取到数据清除定时器*/
            },
            handleCloseModal(){
                this.$emit('handledosave')
            },
            initTree(){
                let that = this;
                let setting = {
                    check: {
                        enable: true
                    },
                    view: {
                            showLine: false,
                            showIcon:false
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
                this.spinShow = true;
                this.postRequest({
                    url:'/DGP/sysRoleXRes/findResByRole/'+this.rowData.id,
                    success:(res)=>{
                        console.log(res);
                        //$(document).ready(function(){
                            this.spinShow = false;
                            $.fn.zTree.init($("#treeAuthorization"), setting, res.obj);
                            
                            var treeObj = $.fn.zTree.getZTreeObj("treeAuthorization");
                            var node = treeObj.getNodeByParam("id" , '1', null);
                            console.log(treeObj,node);
                            treeObj.expandNode(node);
                        //});
                        //this.$Message.info('加载成功');
                    },
                    error:()=>{

                    }
                })
            }
        },
        mounted(){
        //    let setting = {
        //         check: {
        //             enable: true,
        //             chkDisabledInherit: true
        //         },
        //        view: {
        //             showLine: false,
        //             showIcon: false
        //         },
        //         data: {
        //             simpleData: {
        //             enable: false
        //             }
		// 	    }

        //    	};

            //let zNodes =[
                // { id:1, pId:0, name:"客户主题"},
                // { id:11, pId:1, name:"存款"},
                // { id:111, pId:11, name:"存款", },
                // { id:112, pId:11, name:"存款的标准"},
                // { id:12, pId:1, name:"disabled 1-2"},
                // { id:121, pId:12, name:"disabled 1-2-1"},
                // { id:122, pId:12, name:"disabled 1-2-2"},
                // { id:2, pId:0, name:"事件主题"},
                // { id:21, pId:2, name:"随意勾选 2-1"},
                // { id:22, pId:2, name:"随意勾选 2-2"},
                // { id:221, pId:22, name:"随意勾选 2-2-1"},
                // { id:222, pId:22, name:"随意勾选 2-2-2"},
                // { id:23, pId:2, name:"随意勾选 2-3"},
                // { id:3, pId:0, name:"账户主题"},
                // { id:31, pId:3, name:"随意勾选 2-1"},
                // { id:32, pId:3, name:"随意勾选 2-2"},
                // { id:321, pId:32, name:"随意勾选 2-2-1"},
                // { id:322, pId:32, name:"随意勾选 2-2-2"},
                // { id:33, pId:3, name:"随意勾选 2-3"},
                // { id:4, pId:0, name:"账户主题"},
                // { id:5, pId:0, name:"账户主题"},

            //];
            // function disabledNode(e) {
            //     var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            //     disabled = e.data.disabled,
            //     nodes = zTree.getSelectedNodes(),
            //     inheritParent = false, inheritChildren = false;
            //     if (nodes.length == 0) {
            //         alert("请先选择一个节点");
            //     }
            //     if (disabled) {
            //         inheritParent = $("#py").attr("checked");
            //         inheritChildren = $("#sy").attr("checked");
            //     } else {
            //         inheritParent = $("#pn").attr("checked");
            //         inheritChildren = $("#sn").attr("checked");
            //     }

            //     for (var i=0, l=nodes.length; i<l; i++) {
            //         zTree.setChkDisabled(nodes[i], disabled, inheritParent, inheritChildren);
            //     }
            // }

            // $(document).ready(function(){
            //     // $.fn.zTree.init($("#treeAuthorization"), setting, zNodes);
            //     // $("#disabledTrue").bind("click", {disabled: true}, disabledNode);
			//     // $("#disabledFalse").bind("click", {disabled: false}, disabledNode);
            // });
        },
        watch:{
            rowData(){
                console.log(this.rowData.id);
                // this.postRequest({
                //     url:'/DGP/sysRoleXRes/findResByRole/'+this.rowData.id,
                //     success:(res)=>{
                //         console.log(res);
                //     },
                //     error:()=>{

                //     }
                // })
                this.spinShow = true;
                this.initTree();
            }
        }
    }
</script>
<style>
    .dgp-tree-Authorization{
        height: 100%;
        width:3.7rem;
        background-color: #fff;
        position: relative;
        box-shadow: -0.08rem .02rem .13rem 0 rgba(57,80,77,0.15);
    }
    .dgp-tree-Authorization .dgp-jur-treeWrap{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .dgp-tree-Authorization .dgp-close-tree{
        cursor: pointer;
        font-size: .3rem;
        position: relative;
        top:.24rem;
        margin-right: .1rem;
        float: right;
        color: #32B3EA;
    }
    .dgp-tree-Authorization ul.ztree{
        margin-top: 0;
    }
    .dgp-tree-Authorization .dgp-auth-control{
        position: absolute;
        left: 0;
        bottom: 0;
        height: .8rem;
        padding: .22rem .2rem;
    }
    .dgp-tree-Authorization .dgp-auth-control>li{
        display: inline-block;
        min-width: .7rem;
        height: .36rem;
        border-radius: .03rem;
        font-size: .16rem;
        text-align: center;
        line-height: .36rem;
        border: .01rem solid #32B3EA;
        margin-right: .1rem;
        cursor: pointer;
    }
    .dgp-tree-Authorization .dgp-auth-control>li.dgp-auth-refresh{
        color: #32B3EA;
    }
    .dgp-tree-Authorization .dgp-auth-control>li.dgp-auth-refresh:hover{
        border-color: #32B3EA;
    }
    .dgp-tree-Authorization .dgp-auth-control>li:hover,
    .dgp-tree-Authorization .dgp-auth-control>li.active{
        background-color: #32B3EA;
        color:#FFF;
    }
    .dgp-tree-Authorization .dgp-jur-treeWrap .dgp-auth-title{
        height:.8rem;
        color:#333;
        padding-left: .2rem;
        font-size: .14rem;
        font-weight: bold;
        line-height: .8rem;
    }
    ul.dgp-auth-management-main{
        width:2.7rem;
        padding: 0;
    }
    ul.dgp-auth-management-main>li{
        padding-left: .2rem;
    }
   .dgp-tree-Authorization .ztree li span.button.noline_close{
       background-image: url('../../assets/Ztree/img/tree_organzation_manange/close_state.png');
       background-position:center center;
       background-size: 0.2rem 0.2rem;
   }
    .dgp-tree-Authorization .ztree li span.button.noline_open{
       background-image: url('../../assets/Ztree/img/tree_organzation_manange/open-state.png');
       background-position:center center;
       background-size: 0.2rem 0.2rem;
    }
    .dgp-tree-Authorization .ztree li span.button.folder_ico_open{
        background: url("../../assets/Ztree/img/Folder.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-Authorization .ztree li span.button.folder_ico_close{
        background: url("../../assets/Ztree/img/Folder.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-Authorization .ztree li span.button.folder_ico_docu{
        background: url("../../assets/Ztree/img/Folder.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
     .dgp-tree-Authorization .ztree li span.button.ico_open{
        background: url("../../assets/Ztree/img/tree_organzation_manange/folder-open.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-Authorization .ztree li span.button.ico_close{
        background: url("../../assets/Ztree/img/tree_organzation_manange/folder-close.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-Authorization .ztree li span.button.ico_docu{
        background: url("../../assets/Ztree/img/tree_organzation_manange/folder-close.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-Authorization .ztree li span.button.app_ico_open{
        background: url("../../assets/Ztree/img/Individual-normal.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-Authorization .ztree li span.button.app_ico_close{
        background: url("../../assets/Ztree/img/Individual.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-Authorization .ztree li span.button.app_ico_docu{
        background: url("../../assets/Ztree/img/Individual.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-Authorization .ztree li span.button {
        width: 0.3rem;
        height: 0.4rem;
    }
    .dgp-tree-Authorization .ztree li span.button.switch {
        width: 0.2rem;
        height: 0.4rem;
    }
    .dgp-tree-Authorization .ztree li a {
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
    .dgp-tree-Authorization .ztree li span {
        line-height: 0.4rem;
        color: rgba(48, 48, 48, 1);
        font-size: 0.16rem;
        text-align: left;
        font-family: PingFangSC-Regular;

    }
    
    .dgp-tree-Authorization .ztree span.checkbox_true_full + a span.node_name{
        color: #32B3EA;
    }
    .dgp-tree-Authorization .ztree span.checkbox_true_full_focus + a span.node_name{
        color: #32B3EA;
    }
    .dgp-tree-Authorization .ztree li.level0{
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
    .dgp-tree-Authorization .ztree{
        width:100%;
        border-top: .01rem solid rgba(228,236,255,1);
        border-bottom: .01rem solid rgba(228,236,255,1);
        overflow-x: hidden;
    }
</style>
