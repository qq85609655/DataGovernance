<template>
    <div class="dgp-roleSystem">
        <div class="dgp-queryArea">
            <ul class="dgp-leftTitle clearfix" :class="{'dgp-leftTitle-toggle':queryIsShow}">
                <li class="dgp-topQuery-title">查询区</li>
                <li>
                    <span>角色编码：</span>
                    <input  @keyup.enter="initTable"  placeholder="请输入角色编码" type="text" v-model="roleCode">
                </li>
                <li>
                    <span>角色名称：</span>
                    <input  @keyup.enter="initTable"  placeholder="请输入角色名称" type="text" v-model="roleName">
                </li>
                <li class="dgp-btnQuery-title" :class="{'dgp-btnQuery-toggle':queryIsShow}">
                    <button class="btn-primary" @click="initTable">查询</button>
                    <button class="btn-default" @click="doEmpty">重置</button>
                    <button v-if="queryToggleShow" class="dgp-query-arrow" @click="queryBlock">
                        <span v-if="queryIsShow" >收起<Icon type="ios-arrow-up" /></span>
                        <span v-else>展开<Icon  type="ios-arrow-down" /></span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="dgp-tableArea">
            <div class="dgp-role-operateButton">
                <button @click="showRoleModal" class="dgp-role-increaseBtn btn-primary"><Icon class="dgp-showModal-addIcon" type="md-add" />新增</button>
                <!-- 角色管理modal -->
                <Modal v-model="roleModal" title="角色管理" @on-cancel="handleCancelRole" class-name="dgp-modal-usermanager-formbox" :styles="{width: '7rem'}">
                    <div class="usercode dgp-modal-usermanager-item">
                        <span>角色编码：</span><Input v-model="modalData.roleCode" placeholder="请输入角色编码" clearable style="width: 2.52rem;min-height:0.38rem" />
                    </div>
                    <div class="username dgp-modal-usermanager-item">
                        <span>角色名称：</span><Input v-model="modalData.roleName" placeholder="请输入角色名称" clearable style="width: 2.52rem;min-height:0.38rem" />
                    </div>
                    <div class="userstate dgp-modal-usermanager-item">
                        <span>角色状态：</span>
                        <template v-for='item in serverUsed'>
                            <button v-for="(v,key) in item" :key="key" @click="changeRoleState(key)" :class="{active:modalData.state==key}"  style="margin-right:0.2rem">{{v}}</button>
                         </template>
                    </div>
                    <div class="userdescription dgp-modal-usermanager-item">
                        <span>角色描述：</span><Input v-model="modalData.roleDesc"  type="textarea"  :rows="4" style="width: 4.89rem; resize: none;"/>
                    </div>
                     <div slot="footer">
                        <button class="dgp-roleManageModal-footerbtn btn-default" @click="handleCancelRole">取消</button>
                        <button class="dgp-roleManageModal-footerbtn btn-primary" @click="handleDoRole">确定</button>
                    </div>

                </Modal>
                <button class="dgp-role-powerBtn btn-default" @click="handleShowDeleteData">删除</button>
                <modal-del-none :systemDelNoneNotice="systemDelNoneNoticeModal" @systemDelNoneNoticeFun="systemDelNoneNoticeModalFun"></modal-del-none>
                <modal-del-data  :systemDelDataNotice="systemDelDataNoticeModal" @systemDelDataNoticeFun="systemDelDataNoticeModalFun"></modal-del-data>
            </div>
            <!--穿梭框-->
            <transfer-role :transferData="transferData" :transferModal="roleTransferModal" @transferrole="transferModalFun"></transfer-role>
            <div class="dgp-tableBody">
                <!--表格组件-->
                <div class="home-table">
                    <Table :loading="loading" :height="tableHeight"  @on-selection-change="handleToggleTotal" :columns="columnsAll" :data="dataAll"></Table>
                </div>
            </div>
            <!--分页-->
            <div v-show="pages" class="dgp-pagenation-dialog clearfix">
                <!--分页器-->
                <Page  v-if="total" :total="total" show-elevator show-sizer class-name="dgp-page-active dgp-pagenation-pages" @on-change="changePageNumber" @on-page-size-change="changePageSize"/>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/css/dgpSystemColor.css'
    import '../../assets/css/dgpSwitch.css'
    import {createTable,blankTable} from '../../components/table/table_methods'
    //import DgpPagenation from "../../components/DgpPagenation";
    import ModalDelData from "../../components/modal/modal_delData";
    import ModalDelNone from "../../components/modal/modal_delNone";
    import TransferRole from "../../components/transfer/transfer_role";
    import "../../assets/css/pagenation.css";
    export default {
        name: "dgp-system-role",
        data:function(){
            return {
                loading: true,
                serverUsed:[],//角色状态 数据字典
                transferData:{},
                modalData:{state:'1'},
                roleName:'',
                roleCode:'',
                pageNumber:1,
                pageSize:10,
                sortOrder:'asc',
                total:0,
                roleTransferModal:false,             //穿梭框
                systemDelNoneNoticeModal:false,      //删除无数据时提示框
                systemDelDataNoticeModal:false,      //有数据时提示框
                selectionDate:[],               //表格选中项数据集合,[]初始化数据为[]
                addOrModify:null,           //true is add false is modify
                roleModal:false,            //角色管理模态框
                pages:null,
                searchWord:'我是不存在的值',  //表格无数据背景显示默认值
                queryIsShow:false,
                queryShow:false,
                listShow:false,
                queryToggleShow:true,
                tableHeight:null,
                //头部切换按钮
                addCode:`<i class="dgp-rightSwitch">+<i>`,
                reduceCode:`<i class="dgp-rightSwitch">-<i>`,
                /*表格表头数据*/
                columnsAll: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '角色编码',
                        key: 'roleCode',
                        ellipsis:true
                    },
                    {
                        title: '角色名称',
                        key: 'roleName',
                        ellipsis:true
                    },
                    {
                        title: '角色状态',
                        key: 'state',
                        width:150,
                        ellipsis:true,
                        render:(h,params)=>{
                            const row = params.row;
                            //const text = row.state == '1' ? '启用' : '停用';
                            let text = '';
                            this.serverUsed.forEach((v,index) => {
                                if(v.hasOwnProperty(row.state)){
                                    text = v[row.state];
                                }
                            });
                            return h('span', {}, text);
                        }
                    },
                    {
                        title: '角色描述',
                        width:150,
                        key: 'roleDesc',
                        ellipsis:true
                    },
                    {
                        title: '操作',
                        key: 'control',
                        width: 200,
                        align: 'left',
                        render: (h, params) => {
                            return h('div', [
                                h('Poptip', {
                                    props: {
                                        confirm:true,
                                        title:"是否进行修改",
                                        placement:params.index>2?'top-end':'bottom-end'
                                    },
                                    style: {
                                        color:'#1890FF',
                                        marginRight:'2px',
                                        cursor:'pointer'
                                    },
                                    on: {
                                        'on-ok':() =>{
                                            this.handleDoModification(params.index);
                                        },
                                        'on-cancel':() =>{
                                            this.handleCancelModification();
                                        }
                                    }
                                }, '修改'),
                                h('A', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#1890FF',
                                        cursor:'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.roleTransferModal=true;
                                            this.transferData = this.dataAll[params.index]
                                        }
                                    }
                                }, '关联用户')
                            ]);
                        }
                    }
                ],
                /*表格body数据*/
                dataAll: []
            }
        },
        components:{TransferRole, ModalDelNone, ModalDelData},
        methods:{
            queryBlock(){
                this.queryShow = !this.queryShow;
                let len=$('.dgp-leftTitle').find('li').length;
                if(len>4){
                    this.queryIsShow=!this.queryIsShow;
                }
            },
            spreadFunc(){
                $('.dgp-role-leftTitle span').html(this.addCode);
            },
            checkDataAll(){
                if(this.dataAll.length){
                    this.pages=true;
                }else{
                    this.pages=false;
                }
            },
            updateInformation(){
                if(!this.modalData.roleCode){
                    this.$Message.warning('请输入角色编码');
                    return;
                }else if(!this.modalData.roleName){
                    this.$Message.warning('请输入角色名称');
                    return;
                }else if(!this.modalData.state){
                    this.$Message.warning('请选择角色状态');
                    return;
                }
                let that = this;
                this.postRequestJson({
                    url:'/DGP/sysRole/update',
                    data:JSON.stringify({
                        roleCode:this.modalData.roleCode,
                        roleName:this.modalData.roleName,
                        state:this.modalData.state,
                        roleDesc:this.modalData.roleDesc,
                        id:this.modalData.id,
                        createTime:this.modalData.createTime,
                        createUserName:this.modalData.createUserName
                    }),
                    success:(res)=>{
                        that.initTable();
                        that.showMessage(res.msg);
                        if(res.success){
                            this.roleModal = false;
                        }
                    },
                    error:(res)=>{
                    }
                })
            },
            addInformation(){
                if(!this.modalData.roleCode){
                    this.$Message.warning('请输入角色编码');
                    return;
                }else if(!this.modalData.roleName){
                    this.$Message.warning('请输入角色名称');
                    return;
                }else if(!this.modalData.state){
                    this.$Message.warning('请选择角色状态');
                    return;
                }
                let that = this;
                this.postRequestJson({
                    url:'/DGP/sysRole/create',
                    data:JSON.stringify({
                        roleCode:this.modalData.roleCode,
                        roleName:this.modalData.roleName,
                        state:this.modalData.state,
                        roleDesc:this.modalData.roleDesc?this.modalData.roleDesc:'',
                    }),
                    success:function(res){
                        that.initTable();
                        that.showMessage(res.msg);
                        if(res.success){
                            that.roleModal = false;
                        }
                    },
                    error:()=>{
                    }
                })
            },
            showMessage(msg){
                //console.log(this.$Message);
                this.$Message.info(msg);

            },
            handleDoRole(){/*角色管理确定*/
                if(this.addOrModify){
                    //console.log('我是新增操作');
                    this.addInformation();
                }else{
                    //console.log('我是修改操作');
                    this.updateInformation();
                }
            },
            handleCancelRole(){/*角色管理取消*/
                //console.log('cancel-role');
                this.roleModal = false;
                this.initTable();
            },
            showRoleModal(){/*新增显示模态框*/
                this.addOrModify=true;//新增操作

                this.roleModal=true;
                this.modalData.roleCode='';
                this.modalData.roleName='';
                this.modalData.state='1';
                this.modalData.roleDesc='';
            },
            handleDoModification(i){/*role确认开始修改*/
                this.addOrModify=false;//模态框进行修改操作
                this.modalData = this.dataAll[i];
                this.roleModal=true;/*显示模态框*/
            },
            handleCancelModification(){/*role确认取消修改*/
                this.roleModal=false;
            },
            handleShowDeleteData(){/*显示需要删除的数据集合*/
                if(this.selectionDate.length){
                    this.systemDelDataNoticeModal=true;
                    //code...........................................................
                    //console.log(this.selectionDate);
                    //console.log('确定删除数据');
                }else{
                    this.systemDelNoneNoticeModal=true;
                    //code...........................................................
                    //console.log('提示请选中一条');
                }
            },
            systemDelNoneNoticeModalFun(){/*无数据删除*/
                this.systemDelNoneNoticeModal=false;
            },
            systemDelDataNoticeModalFun(v){/*有数据删除*/
                if(v=='ok'){
                    let that = this;
                    let json = {};
                    json.list = this.selectionDate;
                    this.postRequestJson({
                        url:'/DGP/sysRole/deleteAll',
                        data: json,
                        success:(res)=>{
                            that.initTable();
                            that.showMessage(res.msg);
                        },
                        error:(res)=>{
                        }
                    })
                }
                
                this.systemDelDataNoticeModal=false;

            },
            handleToggleTotal(selection){/*table全选*/
                this.selectionDate=selection;
                //console.log(this.selectionDate);
            },
            changeRoleState(s){
                this.modalData.state= s;
                //console.log(this.modalData.state)
                this.$forceUpdate();
            },
            transferModalFun(){
                this.roleTransferModal=false;
            },
            initTable(){//请求接口调用树的数据
                this.postRequestJson({
                    url:'/DGP/sysRole/listByPage',
                    data:JSON.stringify({
                        pagination:{
                             pageNumber:this.pageNumber,
                            pageSize:this.pageSize,
                            sortOrder:this.sortOrder
                        },
                        search:{
                            roleCode:this.roleCode,
                            roleName:this.roleName
                        }
                        
                    }),
                    success:(res)=>{
                        this.loading = false;
                        this.dataAll = res.obj.rows;
                        this.total = res.obj.total;
                        this.checkDataAll();
                        setTimeout(()=>{  //异步加载表格内小图标的方法//必须再表格渲染结束后再执行此方法,否则找不到dom
                            createTable();
                        },300)
                    },
                    error:()=>{

                    }
                })
            },
            doEmpty:function(){ //重置清空input框的值
                this.roleCode='';
                this.roleName='';
                this.initTable();
            },
            changePageNumber(pageNumber){//改变页码触发的方法
                //console.log(pageNumber);
                this.pageNumber = pageNumber;
                this.initTable();
            },
            changePageSize(pageSize){//改变每页条数触发的方法
                //console.log(pageSize);
                this.pageSize = pageSize;
                this.initTable();
            },
            pagesInit(){
                if($('.dgp-page-active .ivu-page-options-elevator').find('.pagesEnter').length===0){
                    $('.dgp-page-active .ivu-page-options-elevator').append('<span class="pagesEnter">确定</span>')
                }
                let that = this;
                $('.pagesEnter').on('click',function(){
                    that.pageNumber = parseInt($(".ivu-page-options-elevator input").val());//模拟页码框按下回车
                    //console.log(that.pageNumber);
                    that.changePageNumber(that.pageNumber);
                })
            },
            handleTableAreaInit(){
                let tHeight = $('.dgp-tableArea').parent().height()-$('.dgp-queryArea').height()-parseFloat($('.dgp-queryArea').css('margin-bottom'));
                $('.dgp-tableArea').css("height",tHeight);
                let tBody = tHeight-$('.dgp-tableArea>.dgp-role-operateButton').innerHeight()-$('.dgp-tableArea>.dgp-pagenation-dialog').height();
                this.tableHeight=tBody;
            },
            queryInit(){
                if($('.dgp-leftTitle').find('li').length<=4){
                    this.queryToggleShow=!this.queryToggleShow;
                }
            }
        },

        computed:{},
        watch:{},
        mounted(){
            let common = ['serverUsed'];   //角色状态
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
            /*创建表格*/
            //createTable();
            /*显示空白页面初始化*/
            blankTable.apply(this);
            //this.checkDataAll();
            //头部切换按钮初始化函数
            this.spreadFunc();
            this.initTable();
            this.handleTableAreaInit();
            this.queryInit();
            $(window).resize(()=>{
                this.handleTableAreaInit();
            });

        },
        updated(){
            //createTable();
            //this.checkDataAll();
            this.pagesInit();
            this.handleTableAreaInit();
        }
    }
</script>

<style scoped>
    .dgp-roleSystem{
        /* padding-top:.31rem;
        padding-left:.7rem; */
    }
    .dgp-role-queryArea{
        border-radius: .03rem;
        margin-bottom:.28rem;
        position:relative;
    }
    .dgp-role-leftTitle{
        width:100%;
        height:.5rem;
        line-height:.5rem;
        padding-left:.31rem;
        font-size: .16rem;
        border-bottom-width:.01rem;
        border-bottom-style:solid;
        font-family: PingFangSC-Regular;
        color: #000000;
        background-color: #FFF;
        border-bottom-color: #E5E5E5;
    }
    .dgp-role-leftTitle label{
        width:.7rem;
        height:.2rem;
    }
    .dgp-roleAccount{
        padding-left:.31rem;
    }
    .dgp-roleName{
        padding-left:.7rem;
    }
    .dgp-role-middleContent{
        padding-top:.37rem;
        background-color: #FFF;
    }
    .dgp-role-middleContent input{
        width:2.14rem;
        height:.3rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        padding-left:.15rem;
        color: #000000;
        border-color: #E5E5E5;
    }
    .dgp-role-middleContent label{
        font-family: PingFangSC-Regular;
        font-size: .14rem;
        color: #000000;
    }
    .dgp-role-middleContent button{
        width:.64rem;
        height:.3rem;
        line-height:.3rem;
        border-radius: .03rem;
        margin-left:.19rem;
        margin-bottom:.42rem;
        font-family: PingFangSC-Regular;
        font-size: .14rem;
    }


    /*表格内容部分*/
    .dgp-tableArea{
        /* width:16.80rem; */
        position: relative;
        border-radius: .03rem;
    }
    .dgp-tableBody{
        width: 100%;
        margin: 0 auto;
        padding: 0 .28rem;
    }
    .dgp-role-operateButton{
        padding:.22rem .28rem;
        background-color: #fff;
    }
    .dgp-tableArea .dgp-showModal-addIcon{
        position: relative;
        top:-0.02rem;
    }
    .dgp-role-increaseBtn,.dgp-role-powerBtn{
        min-width:.82rem;
        height:.36rem;
        line-height: .36rem;
        border-radius: .03rem;
        font-family: PingFangSC-Regular;
        font-size: .16rem;
        cursor:pointer;
        margin-right:.1rem;
    }
    .dgp-role-powerBtn{
        border-width:.01rem;
        border-style:solid;
    }
    .dgp-role-increaseBtn img{
        width:.14rem;
        height:.14rem;
        vertical-align: middle;
    }


    /* dgp-pagenation-dialog 分页器样式 */
    .dgp-pagenation-dialog{
        height: .8rem;
        width:100%;
    }
    .dgp-pagenation-pages{
        padding-top: .24rem;
    }

    /* 角色管理modal样式 */
    /*.ivu-input:focus, .ivu-input:hover {*/
    /*border-color: #6BC7BC;*/
    /*}*/
    .dgp-modal-usermanager-formbox .ivu-modal-body{
        padding:0 0 0.35rem 0.638rem;
    }
    /*.dgp-modal-usermanager-formbox .ivu-btn-primary {*/
    /*background-color: #6BC7BC;*/
    /*border-color: #6BC7BC;*/
    /*}*/
    /*.dgp-modal-usermanager-formbox .ivu-btn-primary:hover {*/
    /*color: #fff;*/
    /*background-color: #6BC7BC;*/
    /*border-color: #6BC7BC;*/
    /*}*/
    /*.dgp-modal-usermanager-formbox .ivu-btn-text:hover {*/
    /*color: #6BC7BC;*/
    /*}*/
    .dgp-roleManageModal-footerbtn{
        width:0.86rem;
        height:0.38rem;
        font-size:0.14rem;
        line-height: 0.38rem;
    }
</style>
<style>
    .dgp-modal-usermanager-formbox .dgp-modal-usermanager-item{
        margin-top: 0.24rem;
    }
    .dgp-modal-usermanager-formbox .dgp-modal-usermanager-item .ivu-input{
        border-radius: .03rem;
        outline: none;
    }
    .dgp-modal-usermanager-formbox .dgp-modal-usermanager-item .ivu-input:hover{
        border-color: #C6C6C6;
    }
    .dgp-modal-usermanager-formbox .dgp-modal-usermanager-item .ivu-input:focus{
        border-color: #C6C6C6;
        box-shadow: none;
    }
    .dgp-modal-usermanager-formbox .dgp-modal-usermanager-item button{
        cursor: pointer;
    }
    .dgp-modal-usermanager-formbox .dgp-modal-usermanager-item span{
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        /*color: rgba(0,0,0,0.85);*/
        margin-right: 0.162rem;
        line-height: 0.38rem;
        vertical-align: top;
    }
    .dgp-modal-usermanager-formbox .dgp-modal-usermanager-item button{
        width:0.8rem;
        height: 0.38rem;
        border-width:.01rem;
        border-style:solid;
        /*border: 1px solid #E8E8E8;*/
        border-radius: .03rem;
    }
    .dgp-modal-usermanager-formbox .dgp-modal-usermanager-item button.active{
        width:0.8rem;
        height: 0.38rem;
        /*color:#fff;*/
        /*background: #6BC7BC;*/
        border-width:.01rem;
        border-style:solid;
        /*border: 1px solid #6BC7BC;*/
        border-radius: .03rem;
    }
    .dgp-modal-usermanager-formbox .dgp-modal-usermanager-item textarea{
        resize:none;
    }
</style>