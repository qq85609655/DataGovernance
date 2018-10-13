<template>
<!-- 用户管理下拉树选择 树-->
    <div class="dgp-tree-organization" :class="{'active':state}">
        <ul id="treeOrganization" class="ztree"></ul>
    </div>   
    
</template>
<script>
    import '../../assets/Ztree/demo.css'
    import '../../assets/Ztree/zTreeStyle.css';
    import '../../assets/Ztree/jquery.ztree.core.js';
    export default {
        props:['state'],
        data () {
            return {

            }
        },
        mounted(){
           let setting = {
               view: {
				    showLine: false
			    }

           	};

            let zNodes =[
                { name:"父节点1", open:true,iconSkin:"folder",
                    children: [
                        { name:"父节点1",iconSkin:"folder",
                            children: [
                                { name:"叶子节",iconSkin:"file"},
                                { name:"叶子节",iconSkin:"file"},
                                { name:"叶子节",iconSkin:"file"},
                                { name:"叶子节",iconSkin:"file"}
                            ]},
                        { name:"父节叠",iconSkin:"folder",
                            children: [
                                { name:"叶子1",iconSkin:"file"},
                                { name:"点122",iconSkin:"file"},
                                { name:"叶点123",iconSkin:"file"},
                                { name:"叶124",iconSkin:"file"}
                            ]},
                        { name:"父节.", isParent:true,iconSkin:"file"}
                    ]
                },
                { name:"父节叠",iconSkin:"folder",
                    children: [
                        { name:"1展开", open:true,iconSkin:"file",
                            children: [
                                { name:"叶211",iconSkin:"file"},
                                { name:"子节点12",iconSkin:"file"},
                                { name:"叶13",iconSkin:"file"},
                                { name:"叶14",iconSkin:"file"}
                            ]},
                        { name:"父节点叠",iconSkin:"folder",
                            children: [
                                { name:"叶子21",iconSkin:"file"},
                                { name:"叶子222",iconSkin:"file"},
                                { name:"叶子223",iconSkin:"file"},
                                { name:"子节24",iconSkin:"file"}
                            ]},
                        { name:"父节折叠",iconSkin:"folder",
                            children: [
                                { name:"231",iconSkin:"file"},
                                { name:"点232",iconSkin:"file"},
                                { name:"叶233",iconSkin:"file"},
                                { name:"叶234",iconSkin:"file"}
                            ]}
                    ]
                },
                { name:"父节", isParent:true,iconSkin:"folder"},
                { name:"父节叠",iconSkin:"folder",
                    children: [
                        { name:"1展开", open:true,iconSkin:"file",
                            children: [
                                { name:"叶211",iconSkin:"file"},
                                { name:"子节点12",iconSkin:"file"},
                                { name:"叶13",iconSkin:"file"},
                                { name:"叶14",iconSkin:"file"}
                            ]},
                        { name:"父节点叠",iconSkin:"folder",
                            children: [
                                { name:"叶子21",iconSkin:"file"},
                                { name:"叶子222",iconSkin:"file"},
                                { name:"叶子223",iconSkin:"file"},
                                { name:"子节24",iconSkin:"file"}
                            ]},
                        { name:"父节折叠",iconSkin:"folder",
                            children: [
                                { name:"231",iconSkin:"file"},
                                { name:"点232",iconSkin:"file"},
                                { name:"叶233",iconSkin:"file"},
                                { name:"叶234",iconSkin:"file"}
                            ]}
                    ]
                },
                { name:"父节叠",iconSkin:"folder",
                    children: [
                        { name:"1展开", open:true,iconSkin:"file",
                            children: [
                                { name:"叶211",iconSkin:"file"},
                                { name:"子节点12",iconSkin:"file"},
                                { name:"叶13",iconSkin:"file"},
                                { name:"叶14",iconSkin:"file"}
                            ]},
                        { name:"父节点叠",iconSkin:"folder",
                            children: [
                                { name:"叶子21",iconSkin:"file"},
                                { name:"叶子222",iconSkin:"file"},
                                { name:"叶子223",iconSkin:"file"},
                                { name:"子节24",iconSkin:"file"}
                            ]},
                        { name:"父节折叠",iconSkin:"folder",
                            children: [
                                { name:"231",iconSkin:"file"},
                                { name:"点232",iconSkin:"file"},
                                { name:"叶233",iconSkin:"file"},
                                { name:"叶234",iconSkin:"file"}
                            ]}
                    ]
                },
            ];

            $(document).ready(function(){
                $.fn.zTree.init($("#treeOrganization"), setting, zNodes);
            });
        }
    }
</script>
<style>
   .dgp-tree-organization .ztree li span.button.noline_close{
       background-image: url('../../assets/Ztree/img/close_state.png');
       background-position:center center;
       background-size: 0.1rem 0.1rem;
   }
    .dgp-tree-organization .ztree li span.button.noline_open{
       background-image: url('../../assets/Ztree/img/open_state.png');
       background-position:center center;
       background-size: 0.1rem 0.1rem;
    }
    .dgp-tree-organization .ztree li span.button.folder_ico_open{
        background: url("../../assets/Ztree/img/folder_open.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.15rem 0.15rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.folder_ico_close{
        background: url("../../assets/Ztree/img/folder_colse.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.15rem 0.15rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.file_ico_docu{
        background: url("../../assets/Ztree/img/file.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.15rem 0.15rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.file_ico_open{
        background: url("../../assets/Ztree/img/file.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.15rem 0.15rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree-organization .ztree li span.button.file_ico_close{
        background: url("../../assets/Ztree/img/file.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.15rem 0.15rem;
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
    .dgp-tree-organization .ztree li span.button.switch {
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
        margin-left: 0.04rem;
        font-family: PingFangSC-Regular;
        /*color: #595959;*/
    }
    .dgp-tree-organization{
        position: absolute;
        z-index: 100;
        top: 0.7rem;
        right: 0.14rem;
        width: 1.74rem;
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
        padding: 0.15rem 0.08rem;
        margin:0;
    }
    .dgp-tree-organization .ztree li{
        margin-top: 0.05rem;
    }
</style>
