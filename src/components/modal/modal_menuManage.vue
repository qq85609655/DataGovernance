<template>
    <div>
        <!-- 角色管理modal -->
        <!-- <Button type="primary" @click="showModalMenu" class="dgp-systemMenu-tree-title-add btn-default">新增</Button> -->
        <Modal v-model="modalMenu" title="菜单新增"  @on-cancel="cancel" class-name="dgp-modal-systemMenu" :styles="{width: '8rem'}">
            <div class="dgp-systemMenu-newAdd-content clearfix">
                <div class="dgp-menus-basic">
                    <span>菜单名称：</span>
                    <input placeholder="请输入菜单名称" style="margin-right:0.05rem;"  v-model="menuname" type="text" class="dgp-systemMenu-newAdd-inp">
                </div>
                <div class="dgp-menus-basic">
                    <span style="margin-right:0.15rem">菜单类型：</span>
                    <!--<Select v-model="menutype" style="width:1.6rem" class="dgp-systemMenu-newAdd-inp1">-->
                        <!--<Option v-for="item in menutypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                    <!--</Select>-->
                    <!-- <select class="dgp-systemMenu-newAdd-inp" name="menutype" v-model="menutype">
                        <option value="1" >系统菜单</option>
                        <option value="0">权限</option>
                        <option value="4">报表菜单</option>
                    </select> -->

                     <Select v-model="menutype" style="width:2.1rem" placeholder="菜单类型">
                           <template v-for='item in resourceType'>
                               <Option v-for="(v,key) in item" :value="key" :key="key">{{ v }}</Option>
                           </template> 
                       </Select>
                </div>
                <div class="isOperate dgp-menus-basic">
                    <span>是否启用：</span>
                    <template v-for='item in serverUsed'>
                        <button v-for="(v,key) in item" :key="key"  class="dgp-systemMenu-state" :class="{'btn-primary':menuenable==key,'btn-default':menuenable!=key}" @click="stateChange(key)" >{{ v }}</button>
                    </template>
                    <!-- <button class="dgp-systemMenu-state btn-primary dgp-systemMenu-state-addrun active" @click="stateAddrun" >启用</button>
                    <button class="dgp-systemMenu-state  btn-default dgp-systemMenu-state-addstop" @click="stateAddstop">停用</button> -->
                </div>
                <div class="dgp-menus-basic">
                    <span>排序：</span>
                    <input v-model="menuorder" type="text"  class="dgp-systemMenu-newAdd-inp" disabled>
                </div>
                <div class="dgp-menus-description">
                    <span>  菜单url：</span>
                    <input placeholder="请输入菜单url" v-model="menuurl" type="text"  class="dgp-systemMenu-newAdd-inp">
                </div>
                <div class="dgp-menus-description">
                    <span>菜单图标：</span>
                    <input placeholder="请输入菜单图标" v-model="iconurl" type="text"  class="dgp-systemMenu-newAdd-inp">
                </div>
                <div class="dgp-menus-description">
                    <span>菜单描述：</span>
                    <input placeholder="请输入菜单描述" v-model="menudesc" type="text" class="dgp-systemMenu-newAdd-inp">
                </div>
                <div>
                    <span>菜单层级：</span>
                    <input v-model="menuLevel" type="hidden"  class="dgp-systemMechanism-newAdd-inp" disabled>
                </div>
            </div>
            <div slot="footer">
                <button class="dgp-menuManage-footerbtn btn-default" @click="cancel">取消</button>
                <button class="dgp-menuManage-footerbtn btn-primary" @click="ok">确定</button>
            </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        props:["treeData","allTreeData","serverUsed","resourceType"],
        data () {
            return {
                modalMenu:false,//角色管理modal
                parentid:'',
                menuenable:1,
                menuLevel:'',
                menuorder:'',
                menutype:'',
                menudesc:'',
                menuname:'',
                menuurl:'',
                iconurl:''
            }
        },
        watch:{
            treeData(){
                var newJson = this.allTreeData.concat([]);
                var len = newJson.length;   //长度
                var parentNode = [];
                for (var i = 0; i < len; i++) {
                    var item = newJson[i];
                    if (item.children && item.children.length != 0) {
                        var child = item.children;
                        for (var j = 0; j < child.length; j++) {
                            if (item.parentNode) {
                                child[j].parentNode = item.parentNode.concat([item.id]);
                            }
                            else {
                                child[j].parentNode = [item.id]
                            }
                            newJson[len + j] = child[j];
                        }
                        len = newJson.length;
                    }
                }

                this.treeId = this.treeData.id;
                let arr= [];
                this.menuLevel = parseInt(this.treeData.menuLevel) + 1;
                for(let i in newJson){
                    if(newJson[i].parentid == this.treeId){
                        arr.push(newJson[i].menuorder);
                    }
                }
                if(arr.length){
                    this.menuorder =Math.max.apply(null,arr)+1;
                }else{
                    this.menuorder = 1;
                }

            }
        },

        methods: {
            showModalMenu(){
                setTimeout(()=>{
                    if(this.treeData.id){
                        this.modalMenu = true;
                    }else{
                        this.$Message.info('请选择一个节点');
                    }
                },10)
            },
            ok () {
                if(this.menuname && this.menutype){
                    this.postRequestJson({
                        url:'/DGP/sysResources/create',
                        data:JSON.stringify({
                            parentid:this.treeData.id,
                            menuenable:this.menuenable,
                            menuorder:this.menuorder,
                            //menulevel:this.menuLevel,
                            menutype:this.menutype,
                            menudesc:this.menudesc,
                            menuname:this.menuname,
                            menuurl:this.menuurl,
                            iconurl:this.iconurl
                        }),
                        success:(res)=>{
                            if(res.success){
                                //this.modalMenu = false;
                                this.$emit('reloadTree');
                                this.modalMenu = false;
                            }
                            this.$Message.info(res.msg);
                             this.modalMenu = false;
                             //表单初始化
                            this.parentid = '';
                            this.menuenable = 1;
                            this.menuLevel = '';
                            //this.menuorder = '';
                            this.menutype = '';
                            this.menudesc = '';
                            this.menuname = '';
                            this.menuurl = '';
                            this.iconurl = '';
                        },
                        error:()=>{

                        }
                    })
                }else{
                    this.$Message.info('请填完必填项');
                }
            },
            cancel () {
                this.modalMenu = false;
                this.parentid = '';
                this.menuenable = 1;
                this.menuLevel = '';
                //this.menuorder = '';
                this.menutype = '';
                this.menudesc = '';
                this.menuname = '';
                this.menuurl = '';
                this.iconurl = '';

            },
            stateChange(k){
                this.menuenable = k;
                console.log(this.menuenable)
            },
            stateAddrun(){
                this.treeData.menuenable = "1";
                $(".dgp-systemMenu-state-addrun").css({
                    backgroundColor: "rgba(50, 179, 234, 1)",
                    color:"#FFFFFF" ,

                });
                $(".dgp-systemMenu-state-addstop").css({
                    backgroundColor:"#FFFFFF",
                    border: ".01rem solid rgba(50, 179, 234, 1)",
                    color: "rgba(50, 179, 234, 1)"
                });

                //启用，停用，按钮滑动效果
                //处理按钮滑动效果
                $(".dgp-systemMenu-newAdd-content .dgp-systemMenu-state").hover(
                    function(){
                        if(!$(this).hasClass('active')){
                            $(this).css({
                                "background":"#32B3EA",
                                "color":"#FFF"
                            })
                        }
                    },
                    function(){
                        if(!$(this).hasClass('active')) {
                            $(this).css({
                                "background": "#fff",
                                "color": "#32B3EA"
                            })
                        }
                    }
                );
            },
            stateAddstop(){
                this.treeData.menuenable = "2";
                $(".dgp-systemMenu-state-addrun").css({
                    backgroundColor:"#FFFFFF",
                    border: ".01rem solid rgba(50, 179, 234, 1)",
                    color: "rgba(50, 179, 234, 1)"
                });
                $(".dgp-systemMenu-state-addstop").css({

                    backgroundColor: "rgba(50, 179, 234, 1)",
                    color:"#FFFFFF" ,
                });
            },
            handleMenuOperate(){
                $('.isOperate').on('click','button',function(){
                    $(this).addClass('active').siblings().removeClass('active')
                })
            }
        },
        mounted(){
            this.handleMenuOperate();
        }
    }
</script>

<style scoped>
    .dgp-systemMenu-tree-title-add{
        float: left;
        margin-left: .24rem;
        margin-top: .25rem;
        min-width: 0.5rem;
        height: .3rem;
        min-height: .3rem;
        border-radius: 0.03rem;
        font-size: 0.14rem;
        position:relative;
    }
    .dgp-systemMenu-tree-title-add span{
        position:absolute;
        display:inline-block;
        min-width:.22rem;
        min-height:.2rem;
        top:10%;
        left:16%;
    }
    .dgp-systemMenu-newAdd-inp{
        width: 2.1rem;
        height: .41rem;
        border-radius: .03rem;
        margin-left: 0.15rem;
        padding-left: 0.2rem;
        font-size: .14rem;
    }
    .dgp-systemMenu-newAdd-inp1{
        width: 2.1rem;
        height: .41rem;
        border-radius: .03rem;
        margin-left: 0.15rem;
        font-size: .14rem;
    }
    .dgp-systemMenu-newAdd-content{
        margin-top: 0.3rem;
        /*width: 6.5rem;*/
        text-align: right;
        font-size: 0;
        margin-right: .3rem;
    }
    .dgp-systemMenu-state{
        display: inline-block;
        margin-right: 0.2rem;
        width: .8rem;
        height: .38rem;
        border-radius: .03rem;
        text-align: center;
        line-height: .38rem;
        font-size: .14rem;
    }
    .dgp-menus-description{
             /*width:6.5rem;*/
                /*width:5.7rem;*/
             font-size: .14rem;
             margin-bottom: .38rem;
         }
    .dgp-menus-description>input{
        /*width:5.4rem;*/
        width:5.65rem;
    }
    .dgp-modal-systemMenu .dgp-menus-basic{
         padding-left: .05rem;
         width:3.5rem;
         display: inline-block;
         font-size: 0;
         margin-bottom: .38rem;
         /*float:left;*/

     }
    .dgp-modal-systemMenu .dgp-menus-basic>span{
        /* width: .95rem; */
        display: inline-block;
        font-size: .14rem;
        position: relative;
        top: .05rem;
    }
    .dgp-modal-systemMenu .dgp-menus-basic.isOperate{
        text-align: right;
    }
    .dgp-modal-systemMenu .dgp-menus-basic.isOperate>button{
        position: relative;
        top:.05rem
    }
    .dgp-modal-systemMenu .dgp-menus-basic.isOperate>button:nth-child(3){
        margin-right: 0.35rem;
    }
    .dgp-modal-systemMenu .dgp-menus-basic.isOperate>span{
        margin-right: .15rem;
    }
    .dgp-modal-systemMenu .dgp-menus-basic>input{
        font-size: .14rem;
    }
    .dgp-modal-systemMenu .ivu-modal-body{
        padding:0 .5rem;
        font-size: .12rem;
        width: 7.5rem;
    }
    .dgp-modal-systemMenu select{
        border-radius: .03rem;
    }
    .dgp-menuManage-footerbtn{
        width:0.86rem;
        height:0.38rem;
        font-size:0.14rem;
        line-height: 0.38rem;
    }
</style>
<style>
    .dgp-modal-systemMenu .dgp-systemMenu-newAdd-content .ivu-select-selection{
        border: 0.01rem solid #e8e8e8;
        border-radius: 0.03rem;
    }
</style>