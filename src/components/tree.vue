<template>
    <div class="dgp-tree">
        <ul id="treeDemo" class="ztree"></ul>
    </div>   
    
</template>
<script>
    import '../assets/Ztree/demo.css'
    import '../assets/Ztree/zTreeStyle.css';
    //import '../lib/jquery-1.8.0.min.js';
    import '../assets/Ztree/jquery.ztree.core.js';
    export default {
        
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
                { name:"父节点1 - 展开", open:true,iconSkin:"folder",
                    children: [
                        { name:"父节点11 - 折叠",iconSkin:"folder",
                            children: [
                                { name:"叶子节点111",iconSkin:"app"},
                                { name:"叶子节点112",iconSkin:"app"},
                                { name:"叶子节点113",iconSkin:"app"},
                                { name:"叶子节点114",iconSkin:"app"}
                            ]},
                        { name:"父节点12 - 折叠",iconSkin:"folder",
                            children: [
                                { name:"叶子节点121",iconSkin:"app"},
                                { name:"叶子节点122",iconSkin:"app"},
                                { name:"叶子节点123",iconSkin:"app"},
                                { name:"叶子节点124",iconSkin:"app"}
                            ]},
                        { name:"父节点13 - 没有子节点.......", isParent:true,iconSkin:"app"}
                    ]},
                { name:"父节点2 - 折叠",iconSkin:"folder",
                    children: [
                        { name:"父节点21 - 展开", open:true,iconSkin:"app",
                            children: [
                                { name:"叶子节点211",iconSkin:"app"},
                                { name:"叶子节点212",iconSkin:"app"},
                                { name:"叶子节点213",iconSkin:"app"},
                                { name:"叶子节点214",iconSkin:"app"}
                            ]},
                        { name:"父节点22 - 折叠",iconSkin:"folder",
                            children: [
                                { name:"叶子节点221",iconSkin:"app"},
                                { name:"叶子节点222",iconSkin:"app"},
                                { name:"叶子节点223",iconSkin:"app"},
                                { name:"叶子节点224",iconSkin:"app"}
                            ]},
                        { name:"父节点23 - 折叠",iconSkin:"folder",
                            children: [
                                { name:"叶子节点231",iconSkin:"app"},
                                { name:"叶子节点232",iconSkin:"app"},
                                { name:"叶子节点233",iconSkin:"app"},
                                { name:"叶子节点234",iconSkin:"app"}
                            ]}
                    ]},
                { name:"父节点3 - 没有子节点", isParent:true,iconSkin:"folder"}

            ];

            $(document).ready(function(){
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            });
        }
    }
</script>
<style>
    [treeId] ul{
        width:2.1rem;!important;
    }
    .dgp-tree .ztree li span.button.noline_close{
       background-image: url('../assets/Ztree/img/close.png');
       background-position:center center;
       background-size: 0.2rem 0.2rem;
   }
    .dgp-tree .ztree li span.button.noline_open{
       background-image: url('../assets/Ztree/img/open.png');
       background-position:center center;
       background-size: 0.2rem 0.2rem;
    }
    .dgp-tree .ztree li span.button.folder_ico_open{
        background: url("../assets/Ztree/img/Folder.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.folder_ico_close{
        background: url("../assets/Ztree/img/Folder.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.app_ico_open{
        background: url("../assets/Ztree/img/Individual-normal.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.app_ico_close{
        background: url("../assets/Ztree/img/Individual.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button.app_ico_docu{
        background: url("../assets/Ztree/img/Individual.png") no-repeat scroll 0 0 transparent;
        background-position:center center;
        background-size: 0.2rem 0.2rem;
        vertical-align:top;
        *vertical-align:middle
    }
    .dgp-tree .ztree li span.button {
        width: 0.4rem;
        height: 0.4rem;
    }
    .dgp-tree .ztree li span.button.switch {
        width: 0.4rem;
        height: 0.4rem;
    }
    .dgp-tree .ztree li a {
        padding: 1px 3px 0 0;
        margin: 0;
        cursor: pointer;
        height: 0.4rem;
        /*color: #333;*/
        /*background-color: transparent;*/
        text-decoration: none;
        vertical-align: top;
        display: inline-block;
    }
    .dgp-tree .ztree li span {
        line-height: 0.4rem;
        /*color: rgba(48, 48, 48, 1);*/
        font-size: 0.16rem;
        text-align: left;
        font-family: PingFangSC-Regular;

    }

</style>
