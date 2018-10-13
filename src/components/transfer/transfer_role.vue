<template>
    <!--:styles="{width: '8.22rem'}-->
    <Modal  v-model="roleModal" :title="userTitle" @on-ok="ok" @on-cancel="cancel" class-name="dgp-transferRoleModal" :styles="{width: '12rem'}">
        <!-- <div class="dgp-transfer-table dgp-transfer-tableleft">
            <div class="dgp-transfer-table-searchAccount">
                
                <Input v-model="userName"  suffix="ios-search" placeholder="用户账户" style="width: 2.8125rem;height:0.7125rem;margin-left:0.24rem;" />
                <Input v-model="orgName"  icon="ios-arrow-down" placeholder="机构选择" style="width: 2.8125rem;height:0.7125rem;margin-left:0.24rem;" readonly  @on-click.stop="showTree"/>
                <Tree :state="treeState" treeId="org3" @changeOrgName="changeOrgName"/>
            </div>
            <div class="table3">
                <Table :columns="columns" :data="data" ref="leftselection" @on-selection-change="tableleftChange"></Table>
            </div>
        </div>
        <div class="dgp-transfer-buttongroup">
            <button class="dgp-transfer-button dgp-transfer-button2right" @click="left2right">&gt;</button>
            <button class="dgp-transfer-button dgp-transfer-button2left" @click="right2left">&lt;</button>
        </div>
        <div class="dgp-transfer-table dgp-transfer-tableright">
            <div class="dgp-transfer-table-operation">
                <button class="dgp-transfer-table-operation-button">设置主角色</button>
                <button class="dgp-transfer-table-operation-button">移除主角色</button>
            </div>
            <div class="table3">
                <Table :columns="columns" :data="data2" ref="rightselection" @on-selection-change="tablerightChange"></Table>
            </div>
        </div> -->
            <Transfer
                :data="data3"
                :target-keys="targetKeys3"
                :list-style="listStyle"
                :render-format="render3"
                :operations="['加入左侧','加入右侧']"
                filterable
                @on-change="handleChange3">
                <!-- <div :style="{float: 'right', margin: '5px'}">
                    <Button size="small" >Refresh</Button>
                </div> -->
            </Transfer>


    </Modal>
</template>

<script>
    import Tree from '../../components/tree/tree_organization_select.vue'
    import '../../assets/css/dgpSwitch.css'
    import {eq} from '../../assets/js/eq.js'
    import   '../table/table_styles.css'
    import { createTable,blankTable } from '../table/table_methods.js'
    export default {
        name:'TransferRole',
        components:{
            Tree
        },
        props:['transferModal','transferData'],
        data () {
            return {
                userTitle:'关联用户',
                orgName:'',
                userName:'',
                orgId:'',
                treeState: false,
                roleModal: false,//穿梭框modal
                columns:[
                     {
                        type: 'selection',
                        width:35,
                        align: 'left'
                    },
                    {
                        title: '账户',
                        key: 'userName',
                        
                    },
                    {
                        title: '名称',
                        key: 'realName',
                        
                    },
                    {
                        title: '机构',
                        key: 'orgName',
                        width:120,
                    }
                ],
                data: [
                        
                ],
                selectData:[],
                data2: [
                        
                ],
                selectData2:[],
                data3: [],
                targetKeys3: [],
                listStyle: {
                    width: '4.3rem',
                    height: '5.0rem'
                }
            }
        },
        methods: {
             handleChange3 (newTargetKeys,derection,keys) {
                //this.targetKeys3 = newTargetKeys;
                console.log(newTargetKeys,derection,keys);
                if(derection == 'right'){
                    this.left2right(keys);
                }else{
                    this.right2left(keys);
                }
            },
            render3 (item) {
                return item.label ;
            },
            ok () {
                this.$emit('transferrole')
            },
            cancel () {
                this.$emit('transferrole')
            },
            tableleftChange(selection){
                this.selectData = selection;
            },
            tablerightChange(selection){
                this.selectData2 = selection;
            },
            left2right(keys){
                let users = [];
                for(let i=0;i<keys.length;i++){
                    users.push(keys[i]);
                }
                this.postRequest({
                    url:'/DGP/sysRole/insertRoleUser',
                    data:{
                        roleId : this.transferData.id,
                        userIds : users.join(',')
                    },
                    success:(res)=>{
                        if(res.success){
                            this.$Message.info('分配成功');
                            this.initTransfer();
                        }
                    },
                    error:()=>{

                    }
                })
            },
            right2left(keys){
                let users = [];
                for(let i=0;i<keys.length;i++){
                    users.push(keys[i]);
                }
                this.postRequest({
                    url:'/DGP/sysRole/deleteRoleUser',
                    data:{
                        roleId : this.transferData.id,
                        userIds : users.join(',')
                    },
                    success:(res)=>{
                        if(res.success){
                            this.$Message.info('取消成功');
                            this.initTransfer();
                        }
                    },
                    error:()=>{

                    }
                })
            },
            showTree(){
                this.treeState =!this.treeState;
            },
            initTransfer(){   //初始化穿梭框左右两边的数据
                this.postRequest({
                    url:'/DGP/sysRole/loadUnLinkedUser',
                    data:{
                        //sortOrder:'asc',
                        roleId:this.transferData.id
                    },
                    success:(res)=>{
                        this.data = [];
                        for(let i=0;i<res.obj.length;i++){
                            this.data.push({
                                key: res.obj[i].id,
                                label: res.obj[i].userName+' -- '+res.obj[i].realName+' -- '+res.obj[i].orgName,
                            })
                        }
                        this.postRequest({
                            url:'/DGP/sysRole/loadLinkedUser',
                            data:{
                                sortOrder:'asc',
                                roleId:this.transferData.id
                            },
                            success:(res)=>{
                                this.data2 = [];
                                this.targetKeys3 = [];
                                for(let j=0;j<res.obj.length;j++){
                                    this.data2.push({
                                        key: res.obj[j].id,
                                        label: res.obj[j].userName+' -- '+res.obj[j].realName+' -- '+res.obj[j].orgName,
                                    })
                                    this.targetKeys3.push(res.obj[j].id);
                                }
                                this.data3 = this.data.concat(this.data2);
                            },
                            error:()=>{

                            }
                        })
                    },
                    error:()=>{

                    }
                })
                
            },
            // search(){
            //     this.postRequest({
            //         url:'/DGP/sysRole/loadUnLinkedUser',
            //         data:{
            //             //sortOrder:'asc',
            //             roleId:this.transferData.id,
            //             orgId: this.orgId,
            //             userName:this.userName
            //         },
            //         success:(res)=>{
            //             this.data = res.obj;
            //         },
            //         error:()=>{

            //         }
            //     })
            // },
            changeOrgName(treeNode){
                this.orgName = treeNode.orgName;
                this.orgId = treeNode.id;
                this.treeState = false;
            },
        },
        watch:{
            transferModal(){
                this.roleModal=this.transferModal
            },
            transferData(newvalue,oldValue){
                this.userTitle=this.transferData.roleName+"-关联用户";
                console.log(newvalue);
                this.initTransfer();
            },
            orgId(){
                 this.search();
            },
            userName(){
                this.search();
            }
        },
        mounted(){
            createTable();
            blankTable.apply(this);
            
            let that = this;//转换下this指向
            $('body').click(function(e) { 
                that.treeState = false;
            })
            $('.dgp-tree-organization').bind('click',function(e){ 
                if (e.stopPropagation) {
                    e.stopPropagation(); 
                }
                else {
                    e.cancelBubble = true; 
                }
            }); 
        },
        updated(){
            createTable();
            blankTable.apply(this);
        }
    }
</script>

<style scoped>
    div.ivu-table-cell{
        /*padding-left: 5px;*/
        /*padding-right: 0;*/
        padding-left:0.09375rem;
        padding-right:0;
    }
    .dgp-transferRoleModal .ivu-modal-body{
        overflow:visible;
        /*height: 4.84rem;*/
        height:9.075rem;
        padding:0;
    }
    .dgp-transfer-buttongroup{
        float: left;
        /*width:0.72rem;*/
        /*height: 4.07rem;*/
        width:1.35rem;
        height:5.63125rem;
        /*margin-top:0.16rem;*/
        margin-top:0.3rem;
    }
    .dgp-transfer-button{
        display: block;
        /*width: 0.24rem;*/
        /*height:0.24rem;*/
        width:0.45rem;
        height:0.45rem;
        /*background: #6BC7BC;*/
        /*border-radius: 4px;*/
        border-radius:0.075rem;
        margin: 0 auto;
        /*color:#fff;*/
    }
    .dgp-transfer-button2left{
        /*margin-top:0.34rem;*/
        margin-top:0.6375rem ;
    }
    .dgp-transfer-button2right{
        /*margin-top:1.25rem;*/
        margin-top: 2.34375rem;
    }
    .dgp-transfer-table{
        /*width: 3.44rem;*/
        /*height:3.33rem;*/
        width:6.45rem;
        height:6.24rem;
        overflow-y:auto;
        float: left;
        /*border-width:.01rem;*/
        border-width:.01875rem;
        border-style:solid;
        /*border: 1px solid #E2E2E2;*/
        /*border-radius: 3px;*/
        border-radius: 0.05625rem;
    }
    .dgp-transfer-tableleft{
        /*margin:0.36rem 0 0.36rem 0.38rem;*/
        /*margin:0.13rem 0 0.13rem 0.2rem;*/
        margin:0.24375rem 0 0.24375rem 0.375rem;
    }
    .dgp-transfer-table-searchAccount{
        /*padding: 0.18rem 0;*/
        padding:0.3375rem 0 0;
        position: relative;
    }
    .dgp-transfer-table-searchAccount .dgp-tree-organization{
        /*top:0.5rem;*/
        width:2.74rem;
        top:0.715rem;
        right:.32rem;
    }
    .dgp-transfer-tableright{
        /*margin:0.36rem 0 0 0.01rem;*/
        margin:0.3rem 0 0 0.01875rem;
    }
    /*表格滚动条*/
    .dgp-transfer-table::-webkit-scrollbar{
        width: .04rem;     /*高宽分别对应横竖滚动条的尺寸*/
        height: .04rem;
    }
    .dgp-transfer-table::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: .05rem;
        -webkit-box-shadow: inset 0 0 .05rem #f4f7f6;
        background: rgba(0,0,0,0.2);
    }
    .dgp-transfer-table::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 .05rem #f4f7f6;
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }


    .dgp-transferRoleModal .ivu-table-body{
        /*height: 2.75rem;*/
        height:5.15625rem;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .dgp-transferRoleModal .ivu-input-prefix, .ivu-input-suffix{
        /*width:.32rem;*/
        /*line-height: .38rem;*/
        width:0.6rem;
        line-height:0.7125rem;
    }
    .dgp-transferRoleModal .ivu-input-prefix i, .dgp-transferModal .ivu-input-suffix i{
        /*line-height: .38rem;*/
        line-height:0.7125rem;
    }
    .dgp-transferRoleModal .ivu-input-prefix i, .ivu-input-suffix i{
        position:absolute;
        /*right:.05rem;*/
        /*bottom:.02rem;*/
        right:0.09375rem;
        bottom:0.0385rem;
    }

    .dgp-transfer-table-operation{
        /*padding: 0.22rem 0;*/
        padding:0.4125rem 0;
    }
    .dgp-transfer-table-operation-button{
        /*border-width:.01rem;*/
        border-width:0.01875rem;
        border-style:solid;
        /*border: 1px solid #6BC7BC;*/
        /*border-radius: 3px;*/
        border-radius:0.05625rem;
        /*min-width: 0.86rem;*/
        min-width:1.6125rem;
        /*height: 0.29rem;*/
        height:0.54375rem;
        font-family: PingFangSC-Regular;
        /*font-size: 0.14rem;*/
        font-size:0.2625rem;
        /*color: #6BC7BC;*/
        text-align: center;
        /*line-height: 0.29rem;*/
        line-height:0.54375rem;
        /*margin-left: 0.14rem;*/
        margin-left: 0.2625rem;
    }
    /*表格隔行换色*/
    .dgp-transferRoleModal .table3 .ivu-table-tbody .ivu-table-row:hover{
        background: #f4f7f6;
    }


    /*.dgp-transferModal .ivu-btn-primary {*/
        /*background-color: #6BC7BC;*/
        /*border-color: #6BC7BC;*/
    /*}*/
    /*.dgp-transferModal .ivu-btn-primary:hover {*/
        /*color: #fff;*/
        /*background-color: #6BC7BC;*/
        /*border-color: #6BC7BC;*/
    /*}*/
    /*.dgp-transferModal .ivu-btn-text:hover {*/
        /*color: #6BC7BC;*/
    /*}*/
</style>
<style>
    /*分配权限模态框*/
    .dgp-transferRoleModal .ivu-modal-content{
        margin-top: 1.5rem;
    }
    .dgp-transferRoleModal .ivu-modal{
        overflow-y: hidden;
        width: auto;
        margin: auto;
        position: absolute;
        outline: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .dgp-transferRoleModal .ivu-modal-body{
        overflow: hidden;
    }
    .ivu-table-body{
        height:4.5rem;
        overflow:auto;
    }
    #org3{
        height:4.5rem;
    }
    .ivu-input-suffix{
        top:0.03rem;
    }
    .dgp-transferRoleModal .ivu-transfer{
        text-align:center;
    }
    .dgp-transferRoleModal .ivu-transfer .ivu-transfer-list{
        text-align:left;
    }
    .dgp-transferRoleModal .ivu-transfer .ivu-transfer-operation .ivu-btn {
        border:0;
    }
    /*修改树的样式*/
    .dgp-transferRoleModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-body-search-wrapper{
        padding: .08rem;
        margin: 0 auto;
    }
    .dgp-transferRoleModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-body-with-search{
        padding-top: .57rem;
    }
    .dgp-transferRoleModal  .ivu-transfer-list-body-with-search .ivu-input-wrapper-small .ivu-input-icon{
        height: .41rem;
        line-height: .41rem;
        font-size: .14rem;
    }
    .dgp-transferRoleModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-header{
        border-radius: .03rem .03rem 0 0;
    }
    .dgp-transferRoleModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-body{
        border-radius: 0 0 .03rem .03rem;
    }
    .dgp-transferRoleModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-search input{
        border-radius: .03rem;
        height: .41rem;
        line-height: .41rem;
    }
    .dgp-transferRoleModal .ivu-input:hover{
        border-color: #C6C6C6;
    }
    .dgp-transferRoleModal .ivu-input:focus{
        border-color: #C6C6C6;
        box-shadow: none;
    }
    .dgp-transferRoleModal .ivu-transfer-operation>button{
        padding: .05rem .15rem .06rem;
        border-radius: .03rem;
    }
    .dgp-transferRoleModal .ivu-transfer-operation .ivu-btn>span{
        vertical-align: baseline;
    }
</style>