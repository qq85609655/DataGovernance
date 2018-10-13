<template>
        <!--<Button type="primary" @click="modal1 = true">分配权限</Button>-->
                <!--:styles="{width: '8.22rem'}-->
        <Modal  v-model="userModalFlag" :title="userTitle"  @on-cancel="cancel"  class-name="dgp-transferModal" :styles="{width: '9.15rem'}" >
            <!-- <div class="dgp-transfer-table dgp-transfer-tableleft">
                <div class="dgp-transfer-table-searchAccount">
                    <Input v-model="searchRole" icon="ios-search" placeholder="用户账户" style="width: 6rem;height:0.7125rem;margin-left:0.15rem;" @on-click="searchRoleName" @on-enter="searchRoleName" />
                </div>
                <div class="table3">
                    <Table :columns="columnsLeft" :data="data" ref="leftselection" @on-selection-change="tableleftChange"></Table>
                </div>
            </div>
            <div class="dgp-transfer-buttongroup">
                <button class="dgp-transfer-button dgp-transfer-button2right" @click="left2right">&gt;</button>
                <button class="dgp-transfer-button dgp-transfer-button2left" @click="right2left">&lt;</button>
            </div>
            <div class="dgp-transfer-table dgp-transfer-tableright">
                <div class="dgp-transfer-table-operation">
                    <button @click="setMainRole" class="dgp-transfer-table-operation-button">设置主角色</button>
                    <button @click="removeMainRole" class="dgp-transfer-table-operation-button">移除主角色</button>
                </div>
                <div class="table3">
                    <Table :columns="columnsRight" :data="data2" ref="rightselection" @on-selection-change="tablerightChange"></Table>
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
    import {eq} from '../../assets/js/eq.js'
    export default {
        name:'TransferAuthorization',
        props:['userModal','userData'],
        components:{
           
        },
        data () {
            return {
                userTitle:'分配权限',
                searchRole:'',
                userModalFlag:false,
                columnsLeft:[
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '角色名称',
                        key: 'roleName'
                    }
                ],
                columnsRight:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户账户',
                        key: 'roleName'
                    },
                    {
                        title: '是否主角色',
                        key: 'isMainrole'
                    }
                ],
                data: [],
                selectData:[],
                data2: [],
                selectData2:[],
                data3: [],
                targetKeys3: [],
                listStyle: {
                    width: '2.94rem',
                    height: '4.03rem'
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
            // ok () {
            //     this.$emit('changestate');
            // },
            cancel () {
                this.$emit('changestate');
            },
            tableleftChange(selection){//左边表触发checkbox时触发
                this.selectData = selection;
            },
            tablerightChange(selection){//右边表触发checkbox时触发
                this.selectData2 = selection;
            },
            left2right(keys){//给用户添加角色
                let that =this;
                let datas = [];
                for(let i =0;i<keys.length;i++){
                    datas.push({id:{roleid:keys[i],userid:this.userData.id}});
                }
                let json={};
                json.list=datas;
                console.log(datas)
                this.postRequestJson({
                    url:'/DGP/sysUserXRole/createAll',
                    data:json,
                    success:(res)=>{
                        if(res.success){
                            this.$Message.info(res.msg);
                            this.initTransfer();
                        }
                    },
                    error:()=>{
                    }
                })
            },
            right2left(keys){//删除该用户的角色
                let that =this;
                let datas2 = [];
                for(let i =0;i<keys.length;i++){
                    datas2.push({id:{roleid:keys[i],userid:this.userData.id}});
                }
                let json={};
                json.list=datas2;
                console.log(datas2);
                this.postRequestJson({
                    url:'/DGP/sysUserXRole/deleteAll',
                    data:json,
                    success:(res)=>{
                        if(res.success){
                            this.$Message.info(res.msg);
                            this.initTransfer();
                        }
                    },
                    error:()=>{

                    }
                })
            },
            initTransfer(){//初始化穿梭框左右两边的数据
                this.postRequestJson({
                    url:'/DGP/sysRole/findOtherByUser',
                    data:JSON.stringify({
                        id:this.userData.id
                    }),
                    success:(res)=>{
                        //this.data = res.rows;
                        this.data= [];
                        for(let i=0;i<res.obj.length;i++){
                            this.data.push({
                                key: res.obj[i].id,
                                label: res.obj[i].roleName,
                                roleDesc: res.obj[i].roleDesc,
                            })
                        }
                        console.log(this.data);
                        this.postRequestJson({
                            url:'/DGP/sysRole/findByUser',
                            data:JSON.stringify({
                                id:this.userData.id,
                            }),
                            success:(res)=>{
                                this.data2 = res.obj;
                                this.data2 = [];
                                this.targetKeys3 = [];
                                for(let j=0;j<res.obj.length;j++){
                                    this.data2.push({
                                        key: res.obj[j].id,
                                        label: res.obj[j].roleName,
                                        roleDesc: res.obj[j].roleDesc,
                                    })
                                    this.targetKeys3.push(res.obj[j].id);
                                }
                                console.log(this.data2);
                                this.data3 = this.data.concat(this.data2);
                                //this.targetKeys3 = 
                            },
                            error:()=>{

                            }
                        })
                    },
                    error:()=>{

                    }
                })
                
            },
            searchRoleName(v){//搜索角色名称
                this.postRequest({
                    url:'/DGP/sysRole/findOtherByUser',
                    data:{
                        sortOrder:'asc',
                        id:this.userData.id,
                        roleName:this.searchRole
                    },
                    success:(res)=>{
                        this.data = res.obj;
                        // this.dataAll = [];
                        //this.total = res.total;
                    },
                    error:()=>{

                    }
                })
            },
            setMainRole(){          //设置主角色
                if(this.selectData2.length == 1){
                    let that = this;
                    this.postRequest({    //验证是否存在主角色，不存在才可以设置!!
                        url:'/DGP/sysRole/finRoledListByUser',
                        data:{
                            id:this.userData.id,
                            isMainrole:1
                        },
                        success:(res)=>{
                            if(!res.success){//存在
                                this.$Message.info(res.msg);
                                
                            }else{  //不存在，调设置主角色de接口
                                this.mainRole();
                                
                            }
                        },
                        error:()=>{

                        }
                    })
                }else{
                    this.$Message.info('请选择1个！');
                }
            },
            removeMainRole(){//移除主角色
                if(this.selectData2.length == 1){
                    let data = [{id:{roleid:this.selectData2[0].id,userid:this.userData.id},isMainrole:'0'}];
                    this.postRequestJson({    
                        url:'/DGP/sysUserXRole/updateByJson',
                        data:JSON.stringify(data),
                        success:(res)=>{
                            this.$Message.info(res.msg);
                            this.initTransfer();
                        },
                        error:()=>{
                            
                        }
                    })
                }else{
                    this.$Message.info('请选择1个！');
                }
            },
            mainRole(){
                let data = [{id:{roleid:this.selectData2[0].id,userid:this.userData.id},isMainrole:'1'}];
                this.postRequestJson({    
                    url:'/DGP/sysUserXRole/updateByJson',
                    data:JSON.stringify(data),
                    success:(res)=>{
                        this.$Message.info(res.msg);
                        this.initTransfer();
                    },
                    error:()=>{

                    }
                })
            }
        },
        mounted(){
           
        },
        updated(){
           
        },
        watch:{
            userModal(){
                this.userModalFlag=this.userModal;
            },
            userData(){
                this.userTitle=this.userData.userName+'-分配权限';
                this.initTransfer();
            }
        }
    }
</script>

<style scoped>
    /*.dgp-transferModal .ivu-modal-body{*/
        /*overflow: hidden;*/
        /*padding:0;*/
    /*}*/

    .dgp-transfer-buttongroup{
        float: left;
        /*width:0.72rem;*/
        width:1.35rem;
        /*height: 4.07rem;*/
        height:5.63125rem;
        /*margin-top:0.16rem;*/
        margin-top:0.3rem;

    }
    .dgp-transfer-button{
        cursor: pointer;
        display: block;
        /*width: 0.24rem;*/
        /*height:0.24rem;*/
        width:0.45rem;
        height:0.45rem;
        /*background: #6BC7BC;*/
        border-radius: .04rem;
        margin: 0 auto;
        /*color:#fff;*/
    }
    .dgp-transfer-button:hover{
       
    }
    .dgp-transfer-button2left{
        /*margin-top:0.34rem;*/
        margin-top: 0.6375rem;
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
        float: left;
        /*border-width:.01rem;*/
        border-width:0.01875rem;
        border-style:solid;
        /*border: 1px solid #E2E2E2;*/
        /*border-radius: .03rem;*/
        border-radius:0.05625rem;
        overflow-y:auto;
        overflow-x: hidden;
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

    .dgp-transfer-tableleft{
        /*margin:0.36rem 0 0.36rem 0.38rem;*/
        /*margin:0.13rem 0 0.13rem 0.2rem;*/
        margin:0.24375rem 0 0.24375rem 0.375rem;
    }
    .dgp-transfer-table-searchAccount{
        /*padding: 0.15rem 0;*/
        padding:0.28125rem 0 0;
    }
    .dgp-transfer-tableright{
        /*margin:0.36rem 0 0 0;*/
        /*margin:0.16rem 0 0 0;*/
        margin:0.24375rem 0 0 0;
    }
    .dgp-transferModal .ivu-table-body{
        /*height: 2.75rem;*/
        height:4.15625rem;
        overflow-y: hidden;
    }
    .dgp-transfer-table-operation{
        /*padding: 0.18rem 0;*/
        padding:0.35625rem 0;
    }
    .dgp-transfer-table-operation-button{
        /*border-width:.01rem;*/
        border-width:0.01875rem;
        border-style:solid;
        /*border: 1px solid #6BC7BC;*/
        /*border-radius: .03rem;*/
        border-radius:0.05625rem;
        /*min-width: 0.86rem;*/
        /* min-width:1.6125rem; */
        /*height: 0.29rem;*/
        height:0.54375rem;
        /*padding:0 .05rem;*/
        padding:0  0.09375rem;
        font-family: PingFangSC-Regular;
        /*font-size: 0.14rem;*/
        font-size:0.14rem;
        /*color: #6BC7BC;*/
        text-align: center;
        /*line-height: 0.29rem;*/
       line-height:0.54375rem;
        /*margin-left: 0.14rem;*/
        margin-left: 0.2625rem;
    }
    .dgp-transferModal .ivu-input-prefix i,
    .dgp-transferModal .ivu-input-suffix i{
        /*font-size: .16rem;*/
        /*line-height: .32rem;*/
        font-size:0.3rem;
        line-height:0.6rem;
    }
    .dgp-transferModal .ivu-table-header .ivu-table-cell{
        color:#999;
    }
    .dgp-transferModal .ivu-table-tbody .ivu-table-header{
        color:#333;
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
    /*.ivu-input{*/
        /*!*height:.38rem;*!*/
        /*height:0.7125rem;*/
    /*}*/




</style>
<style>
    /*分配权限模态框*/
    .dgp-transferModal .ivu-modal-content{
        margin-top: 1.5rem;
    }
    .dgp-transferModal .ivu-modal{
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
     .dgp-transferModal .ivu-modal-body{
        overflow: hidden;
    }
    .dgp-transferModal .ivu-transfer {
        padding-left: 0.5rem;
    }
    /*修改树的样式*/
    .dgp-transferModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-body-search-wrapper{
        padding: .08rem;
        margin: 0 auto;
    }
    .dgp-transferModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-body-with-search{
        padding-top: .57rem;
    }
    .dgp-transferModal  .ivu-transfer-list-body-with-search .ivu-input-wrapper-small .ivu-input-icon{
        height: .41rem;
        line-height: .41rem;
        font-size: .14rem;
    }
    .dgp-transferModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-header{
        border-radius: .03rem .03rem 0 0;
    }
    .dgp-transferModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-body{
        border-radius: 0 0 .03rem .03rem;
    }
    .dgp-transferModal .ivu-transfer .ivu-transfer-list .ivu-transfer-list-search input{
        border-radius: .03rem;
        height: .41rem;
        line-height: .41rem;
    }
    .dgp-transferModal .ivu-input:hover{
        border-color: #C6C6C6;
    }
    .dgp-transferModal .ivu-input:focus{
        border-color: #C6C6C6;
        box-shadow: none;
    }
    .dgp-transferModal .ivu-transfer-operation>button{
        padding: .05rem .15rem .06rem;
        border-radius: .03rem;
    }
    .dgp-transferModal .ivu-transfer-operation .ivu-btn>span{
        vertical-align: baseline;
    }

</style>
