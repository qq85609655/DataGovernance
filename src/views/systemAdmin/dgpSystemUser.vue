<template>
    <div class="dgp-userSystem">
        <div class="dgp-queryArea">
            <ul class="dgp-leftTitle clearfix" :class="{'dgp-leftTitle-toggle':queryIsShow}">
                <li class="dgp-topQuery-title">查询区</li>
                <!--<span class="dgp-queryToggle-button" @click.stop="queryUserBlock" ></span>-->

                <li>
                    <span  class="dgp-userAccount">用户账号：</span>
                    <input type="text" @keyup.enter="initTable"  v-model="userName" placeholder="请输入用户账号">
                </li>
                <li>
                    <span  class="dgp-userName">用户名称：</span>
                    <input type="text" @keyup.enter="initTable"  v-model="realName" placeholder="请输入用户名称">
                </li>
                <li v-show="queryIsShow" class="dgp-userType" @keyup.enter="initTable">
                    <span  >用户类型：</span>
                     <Select v-model="type"  style="width:3.2rem;position: relative;text-align: left;vertical-align: top;">
                        <template v-for='item in userType'  >
                            <Option style="width: 100%"  v-for="(v,key) in item" :key="key"  :value="key">{{ v }}</Option>
                        </template>
                    </Select>
                </li>
                <li v-show="queryIsShow">
                    <span  class="dgp-userIdCode">证件号：</span>
                    <input type="text" @keyup.enter="initTable"  v-model="idCard" placeholder="请输入证件号">
                </li>
                <li v-show="queryIsShow" style="position:relative;">
                    <span  class="dgp-userOrganization">机构：</span>
                    <input placeholder="请选择机构"   class="dgp-organizeInput-detail" readonly type="text" v-model="organizationValue"  @click.stop="showOrgTree" style="cursor: pointer;">
                    <orgTree ref="tree"  treeId="org1"  :state="orgState" @changeOrgName="changeOrgName" />
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
            <div class="dgp-operateButton">
                <button class="dgp-increaseBtn btn-primary" @click="showUserModal()"><Icon class="dgp-showModal-addIcon" type="md-add" />新增</button>
                <modal-user-manage :title="userModalTitle" :userModal="userModal" :userShowData="userModifyData" @userManage="userManageModal" @reloadTable="initTable" @showMessage="showMessage" :postType="postType" :empSts="empSts" :userType="userType"></modal-user-manage>
                <button class="dgp-powerBtn btn-default" @click="handleShowDeleteData">删除</button>
                <modal-del-none :systemDelNoneNotice="systemDelNoneNoticeModal" @systemDelNoneNoticeFun="systemDelNoneNoticeModalFun"></modal-del-none>
                <modal-del-data  :systemDelDataNotice="systemDelDataNoticeModal" @systemDelDataNoticeFun="systemDelDataNoticeModalFun"></modal-del-data>
                <span class="dgp-power-password">
                    <button @click="showRestPswModal" class="dgp-powerBtn btn-default">重置密码</button>
                        <Modal
                            v-model="resetPswModal"
                            title="操作提示"
                            @on-ok="resetPassword"
                            >
                            <p>默认密码为111111， 确定要重置选中数据的密码吗？</p>
                        </Modal>
                </span>
            </div>
            <div class="dgp-tableBody">
                <!--表格组件-->
                <div class="home-table">
                    <Table :height="tableHeight" :loading="loading" @on-selection-change="handleToggleTotal" :columns="columnsAll" :data="dataAll"></Table>
                </div>
            </div>
            <!--分页-->
            <div v-show="pages" class="dgp-pagenation-dialog">
                <Page  :current="pageNumber" v-if="total" :total="total" show-elevator show-sizer class-name="dgp-page-active dgp-pagenation-pages" @on-change="changePageNumber" @on-page-size-change="changePageSize"/>
            </div>
            <!--穿梭框-->
            <transfer-authorization :userData="transformData" :userModal="userTransfer" @changestate="handleTransferState"></transfer-authorization>
        </div>
    </div>
</template>
<script>
    import '../../assets/css/dgpSystemColor.css'
    import '../../assets/css/dgpSwitch.css'
    import {createTable,blankTable} from '../../components/table/table_methods'
    import "../../assets/css/pagenation.css";
    import TransferAuthorization from "../../components/transfer/transfer_authorization";
    import ModalDelData from "../../components/modal/modal_delData";
    import ModalDelNone from "../../components/modal/modal_delNone";
    import ModalUserManage from "../../components/modal/modal_userManage";
    import orgTree from '../../components/tree/tree_organization_select.vue';
    export default {
        name: "dgp-system-user",
        data:function(){
            return {
                loading: true,
                resetPswModal:false,//重置密码确认框
                userType:[],//请求过来的 用户类型数据字典
                empSts:[],//岗位数据字典
                postType:[],//在职状态数据字典
                userModalTitle:'',//增加更新modal框的标题
                userName:'',
                realName:'',
                type:'',
                idCard:'',
                orgId:"",
                pageNumber:1,
                pageSize:10,
                sortOrder:'acs',//默认排序方式acs，还有一种desc
                total:0,//总条数
                userModal:false,                   //用户增加修改
                systemDelNoneNoticeModal:false,      //删除无数据时提示框
                systemDelDataNoticeModal:false,      //有数据时提示框
                selectionDate:[],               //表格选中项数据集合,[]初始化数据为[]
                userModifyData:{state:'1'},              //用户需要修改的值呈现
                transformData:{},               //穿梭框传下去的数据
                userTransfer:false,
                pages:null,
                searchWord:'我是不存在的值',  //表格无数据背景显示默认值
                addCode:`<i class="dgp-rightSwitch">+</i>`,
                reduceCode:`<i class="dgp-rightSwitch">-</i>`,
                queryIsShow:false,
                queryShow:false,
                queryToggleShow:true,
                listShow:false,
                organizationValue:'',
                /*表格表头数据*/
                columnsAll: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户账号',
                        key: 'userName',
                        ellipsis:true
                    },
                    {
                        title: '用户名称',
                        key: 'realName',
                        ellipsis:true
                    },
                    {
                        title: '用户类型',
                        key: 'type',
                        ellipsis:true,
                        render:(h,params)=>{
                            const row = params.row;
                            let text = '';
                            this.userType.forEach((v,index) => {
                                if(v.hasOwnProperty(row.type)){
                                    text = v[row.type];
                                }
                            });
                            return h('span', {}, text);
                        }
                    },
                    {
                        title: '证件号',
                        key: 'idCard',
                        ellipsis:true
                    },
                    {
                        title: '在职状态',
                        key: 'state',
                        width:100,
                        ellipsis:true,
                        render:(h,params)=>{
                            const row = params.row;
                            let text = '';
                            //this.empSts [{1:'在职'},{2:'离职'},{3:'退休'}]
                            //const text = row.state == 1 ? '在职' : '离职';
                            this.empSts.forEach((v,index) => {
                                if(v.hasOwnProperty(row.state)){
                                    text = v[row.state];
                                }
                            });
                            const color = row.state == 1? '#43EDC5':'#D2D2D2';
                            return h('div', [
                                 h('div', {
                                    style: {
                                        display:'inline-block',
                                        width:'0.08rem',
                                        height:'0.08rem',
                                        background:color,
                                        borderRadius:'50%',
                                        margin:'0 5px 0 5px'
                                    }
                                    
                                }),
                                h('span', {
                                    
                                    
                                }, text)
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'control',
                        width: 150,
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
                                            this.userTransfer=true;
                                            this.transformData = this.dataAll[params.index];
                                            //console.log(this.transformData);
                                        }
                                    }
                                }, '分配权限')
                            ]);
                        }
                    }
                ],
                /*表格body数据*/
                dataAll: [],
                orgState:false,//控制树的显示隐藏
                tableHeight:null
            }
        },
        components:{ModalUserManage, ModalDelNone, ModalDelData, TransferAuthorization,orgTree},
        methods:{
            queryBlock(){
                this.queryShow = !this.queryShow;
                if($('.dgp-leftTitle').find('li').length>4){
                    this.queryIsShow = !this.queryIsShow;
                }
            },
            spreadFunc(){
                $('.dgp-leftTitle span.dgp-queryToggle-button').html(this.addCode);

            },

            doEmpty:function(){ //重置清空input框的值
                    this.userName='';
                    this.realName='';
                    this.userValue='';
                    this.type = '';
                    this.idCard='';
                    this.organizationValue = '';
                    this.orgId = '';
                    this.type='';
                    this.initTable();
            },
            checkDataAll(){/*检测数据长度*/
                if(this.dataAll.length){
                    this.pages=true;
                }else{
                    this.pages=false;
                }
            },
            handleTransferState(){/*穿梭框组件更改穿梭框状态*/
                this.userTransfer=false;
            },
            handleShowDeleteData(){/*显示需要删除的数据集合*/
                if(this.selectionDate.length){
                    this.systemDelDataNoticeModal=true;
                    //code
                    //console.log('确定删除数据');
                }else{
                    this.systemDelNoneNoticeModal=true;
                    //code
                    //console.log('提示请选中一条');
                }
            },
            systemDelNoneNoticeModalFun(){/*无数据删除*/
                this.systemDelNoneNoticeModal=false;
            },
            systemDelDataNoticeModalFun(v){/*有数据删除*/
                this.systemDelDataNoticeModal=false;
                if(v=='ok'){
                    const that = this;
                    let json = {};
                    json.list = this.selectionDate;
                    this.postRequestJson({
                        url:'/DGP/sysUser/deleteAll',
                        data:json,
                        success:(res)=>{
                            if(res.success==true){  
                                this.$Message.info(res.msg); 
                                that.initTable();      
                            }
                        },
                        error:()=>{

                        }
                    })
                }
            },
            handleToggleTotal(selection){/*select选择触发*/
                this.selectionDate=selection;
            },
            showUserModal(){
                this.userModal=true;
                this.userModifyData={};
                this.userModalTitle = '用户新增';
            },
            userManageModal(){
                this.userModal=false;
            },
            handleDoModification(i){/*userConfig确认开始修改*/
                this.userModalTitle = '用户修改';
                this.userModal=true;
                this.userModifyData=this.dataAll[i];
                
            },
            handleCancelModification(){/*userConfig确认取消修改*/
                this.userModal=false;
            },
            initTable(){//请求接口调用树的数据
                this.postRequestJson({
                    url:'/DGP/sysUser/listByPage',
                    data:JSON.stringify({
                        pagination:{
                            pageNumber:this.pageNumber,
                            pageSize:this.pageSize,
                            sortOrder:this.sortOrder
                        },
                        search:{
                            userName:this.userName,
                            realName:this.realName,
                            type:this.type,
                            idCard:this.idCard,
                            orgId:this.orgId
                        }
                    }),
                    success:(res)=>{
                        this.loading = false;
                        this.dataAll = res.obj.rows;
                        // this.dataAll = [];
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
            showOrgTree(){
                this.orgState = !this.orgState;
            },
            showMessage(){
                //console.log(this.$Message);
                this.$Message.info('保存成功');
                
            },
            changeOrgName(treeNode){
                this.organizationValue = treeNode.orgShortName;
                this.orgId = treeNode.id;
                this.orgState = false;
            },
            showRestPswModal(){//显示重置密码的modal
                if(this.selectionDate.length){
                    this.resetPswModal = true;
                }else{
                    this.systemDelNoneNoticeModal=true;
                }

            },
            resetPassword(){//重置密码
                    //this.systemDelDataNoticeModal=true;
                    let ids = [];
                    for(let i in this.selectionDate){
                        ids.push(this.selectionDate[i].id);
                    }
                    const that = this;
                    this.postRequest({
                        url:'/DGP/sysUser/resetPassWord',
                        data:{
                            ids:ids.join(',')
                        },
                        success:(res)=>{
                            if(res.success==true){
                                //that.initTable();
                                //console.log(res);
                                this.$Message.info(res.msg);
                            }
                        },
                        error:()=>{

                        }
                    })
                    //console.log('确定重置密码');
            },
            pagesInit(){
                if($('.dgp-page-active .ivu-page-options-elevator').find('.pagesEnter').length===0){
                    $('.dgp-page-active .ivu-page-options-elevator').append('<span class="pagesEnter">确定</span>')
                }
                let that = this;
                $('.pagesEnter').on('click',function(){
                    that.pageNumber = parseInt($(".ivu-page-options-elevator input").val());//模拟页码框按下回车
                    console.log(that.pageNumber);
                    that.changePageNumber(that.pageNumber);
                })
            },
            handleTableAreaInit(){
                let tHeight = $('.dgp-tableArea').parent().height()-$('.dgp-queryArea').height()-parseFloat($('.dgp-queryArea').css('margin-bottom'));
                $('.dgp-tableArea').css("height",tHeight);
                let tBody = tHeight-$('.dgp-tableArea>.dgp-operateButton').innerHeight()-$('.dgp-tableArea>.dgp-pagenation-dialog').height();
                this.tableHeight=tBody;
            },
            queryInit(){
                if($('.dgp-leftTitle').find('li').length<=4){
                    this.queryToggleShow=!this.queryToggleShow;
                }
            }
        },
        created:function(){
            //查询区input框enter事件
            // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
            var lett=this;
            document.onkeydown=function(e){
                var key=window.event.keyCode;
                if(key==13){
                    lett.initTable();
                }
            }
        },
        computed:{

        },
        watch:{},
        mounted(){
            let common = ['userType','postType','empSts'];   //用户类型，岗位，在职状态
            let json = {};
            json.list = common;
            this.postRequestJson({   //请求一些公共参数
                url:'/DGP/dgpCommon/getSomeParamCache',
                data:json,
                success:(res)=>{
                    //console.log(res.obj);
                    this.userType = res.obj.userType;
                    //console.log(this.userType);
                    this.postType = res.obj.postType;
                    this.empSts = res.obj.empSts;
                },
                error:()=>{

                }
            })
            /*创建表格*/
            //createTable();
            /*显示空白页面初始化*/
            blankTable.apply(this);
            //this.checkDataAll();
            this.spreadFunc();
            this.initTable();
            this.handleTableAreaInit();
            this.queryInit();

            let that = this;
            $(window).resize(()=>{
                this.handleTableAreaInit();
            });
            $('body').click(function(e) { 
                that.orgState = false;
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
            //createTable();
            //this.checkDataAll();
            this.pagesInit();
            this.handleTableAreaInit();
        }
    }
</script>

<style scoped>
    .dgp-userIdCode{
        width:.56rem;
        height:.2rem;
    }
    .dgp-userOrganization{
        width:.42rem;
        height:.2rem;
    }





    /*机构管理树样式*/
    .dgp-userSystem .dgp-tree-organization{
        position:absolute;
         width:3.2rem;
        top:0.41rem;
        /* padding:0.3rem 0.2rem; */
        /* padding: 0.1rem 0.1rem; */
    }

    /*表格内容部分*/
    .dgp-tableArea{
        border-radius: .03rem;
        position: relative;
    }
    .dgp-operateButton{
        padding:.22rem .28rem;
        height: .8rem;
    }
    .dgp-increaseBtn{
        min-width:.82rem;
        height:.36rem;
        line-height: .36rem;
        border-radius: .03rem;
        font-family: PingFangSC-Regular;
        font-size: .16rem;
        cursor:pointer;
    }
    .dgp-increaseBtn img{
        vertical-align: middle;
        width:.14rem;
        height:.14rem;
    }
    .dgp-powerBtn{
        min-width:.88rem;
        height:.36rem;
        line-height: .36px;
        border-width:.01rem;
        border-style:solid;
        border-top-left-radius:.03rem;
        border-bottom-left-radius:.03rem;
        font-family: PingFangSC-Regular;
        font-size: .16rem;
        text-align: center;
        margin-left:.1rem;
        cursor:pointer;
    }
    .dgp-power-password{
        min-width:2.74rem;
        height:.36rem;
        line-height: .36px;
    }
    .dgp-passwordBtn{
        display:inline-block;
        height:.36rem;
        line-height: .36rem;
        font-family: PingFangSC-Regular;
        font-size: .14rem;
        border-width:.01rem;
        border-style:solid;
        border-left-width:0;
        padding-left:.14rem;
        padding-right:.11rem;
        border-top-right-radius:.03rem;
        border-bottom-right-radius:.03rem;
        cursor:pointer;
    }

    /*table主体部分*/
    .dgp-tableBody{
        width: 100%;
        margin:0 auto;
        position: relative;
        z-index: 500;
        padding: 0 .28rem;
    }

    /* dgp-pagenation-dialog 分页器样式 */
    .dgp-pagenation-dialog{
        height: .8rem;
        width:100%;
    }
    .dgp-userSystem .dgp-pagenation-pages{
        padding-top: .24rem;
    }
    .dgp-userSystem .dgp-tree-organization{
        right:0.5rem;
    }
    .dgp-tableArea .dgp-showModal-addIcon{
        position: relative;
        top:-0.02rem;
    }
</style>
<style>
    .ivu-table-wrapper>.ivu-spin-fix{
        border: none; 
    }
    .dgp-queryArea{
        width:17.6rem;
        border-radius: .03rem;
        margin-bottom:.28rem;
        position:relative;
    }
    .dgp-queryArea .ivu-picker-panel-body{
        width:3.2rem;
    }
    .dgp-queryArea .dgp-search-datePicker .ivu-input{
        border-radius: .03rem;
        outline: none;
    }
    .dgp-queryArea .dgp-search-datePicker .ivu-input:hover{
        border-color: #C6C6C6;
    }
    .dgp-queryArea .dgp-search-datePicker .ivu-input:focus{
        border-color: #C6C6C6;
        box-shadow: none;
    }
    .dgp-queryArea .dgp-search-datePicker .ivu-select-dropdown{
        border-radius: .03rem;
        box-shadow: 0 0 .01rem  #C6C6C6;
    }
    .dgp-queryArea .dgp-search-datePicker .ivu-date-picker-focused input{
        box-shadow: none;
        border-color: #C6C6C6;
    }
    .dgp-leftTitle{
        width:100%;
        min-height:.98rem;
        line-height:.98rem;
        font-size: .16rem;
        padding: .29rem .25rem .28rem .25rem;
        font-family: PingFangSC-Regular;
        position: relative;
    }
    .dgp-leftTitle-toggle>li{
        margin-bottom: .28rem;
    }
    .dgp-leftTitle>li{
        float:left;
        width: 33.33333333%;
        height: .41rem;
        text-align: right;
        line-height: .41rem;
        font-size: .16rem;
    }
    .dgp-leftTitle>li.dgp-topQuery-title{
        text-align: left;
        font-weight: bold;
        position: absolute;
        width: auto !important;
        top:.3rem;
        left:.25rem;
    }
    .dgp-leftTitle>li.dgp-btnQuery-title{
        text-align: left;
        padding-left: .6rem;
    }
    .dgp-leftTitle>li.dgp-btnQuery-toggle{
        float: right;
        clear: both;
        margin-bottom: 0;
        text-align: right;
        margin-right: 0.8rem;
    }
    .dgp-leftTitle>li>input{
        margin-right: 0.5rem;
        width:3.2rem;
        height:.41rem;
        line-height: .41rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        padding:0 .1rem;
        vertical-align: baseline;
        font-size: 0.16rem;
    }
    .dgp-leftTitle>li.dgp-userType>div.ivu-select{
         margin-right: 0.8rem;
    }
    .dgp-leftTitle>li.dgp-userType>div.ivu-select .ivu-select-placeholder{
        padding-left:0.1rem;
        font-size: 0.16rem;
        /*color:#7a7a7a;*/
    }
     .dgp-leftTitle>li.dgp-userType>div.ivu-select .ivu-select-selected-value{
        padding-left:0.1rem;
        font-size: 0.16rem;
        color:#000;
    }
    .dgp-leftTitle>li.dgp-userType>div.ivu-select .ivu-select-selection{
        border: 1px solid #c6c6c6;
        border-radius: 3px;
    }
     .dgp-leftTitle>li.dgp-userType>div.ivu-select .ivu-select-arrow{
         margin-top: -0.07rem;
     }
    
    .dgp-leftTitle>li>span{
        padding-right: .14rem;
    }
    .dgp-leftTitle>li.dgp-btnQuery-title button{
        min-width:.76rem;
        height:.41rem;
        line-height: .41rem;
        cursor:pointer;
        border-radius: .03rem;
    }
    .dgp-leftTitle>li.dgp-btnQuery-title button:first-child{
        /* border-width:.01rem; */
        border-style:solid;
        margin-right:.1rem;
        overflow: hidden;
    }
    .dgp-leftTitle>li.dgp-btnQuery-title button:last-child{
        background-color: transparent;
        color:#32B3EA;
    }

    .dgp-leftTitle .ivu-select-visible .ivu-select-selection{
        border-color: #C6C6C6;
        box-shadow: none;
        border-radius: .03rem;
        border-width: .01rem;
    }
    .dgp-leftTitle li>.ivu-select{
        border-color: #C6C6C6;
    }
    .dgp-leftTitle .ivu-select-selection-focused:hover,
    .dgp-leftTitle .ivu-select-selection:hover{
        border-color: #C6C6C6;
    }
    .dgp-leftTitle .ivu-select-selection{
        border-radius: .03rem;
    }
    .dgp-leftTitle .ivu-select-single .ivu-select-selection{
        height: .34rem;
    }
    .dgp-leftTitle .ivu-select-arrow{
        font-size: .18rem;
    }
    .dgp-leftTitle li .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .dgp-leftTitle li .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
        height: .41rem;
        line-height: .41rem;
        font-size: .12rem;
        padding-left: .1rem;
        padding-right: 24px;
    }


    /*修改表头1024错误*/
    .dgp-tableBody .home-table .ivu-table th{
        height: .56rem;
        line-height: .56rem;
    }
    .dgp-tableArea .dgp-pagenation-dialog{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 510;
    }







    .dgp-home-wrap .ivu-input{
        border-radius: .03rem;
    }
    .dgp-home-wrap .ivu-input{
        border-radius: .03rem;
        outline: none;
    }
    .dgp-home-wrap .ivu-input:hover{
        border-color: #C6C6C6;
    }
    .dgp-home-wrap .ivu-input:focus{
        border-color: #C6C6C6;
        box-shadow: none;
    }
    /*pop提示框*/
    .home-table .ivu-poptip-popper{
        min-width: 200px;
    }
    .home-table .ivu-poptip-inner{
        border-radius: .03rem;
        box-shadow: 0  .01rem .06rem  #C6C6C6;
    }
    .home-table .ivu-poptip-footer button:first-child{
        border-color: #C6C6C6;
    }
    .home-table .ivu-poptip-footer button:first-child span{
        color:#333;
    }
    .home-table .ivu-poptip-footer button:first-child:hover span{
        color:#FFF;
    }
    .home-table .ivu-poptip-footer  .ivu-btn{
        transition: none;
    }
    .home-table .ivu-poptip-footer .ivu-poptip-footer .ivu-btn-text:hover, .ivu-modal-footer .ivu-btn-text:hover{

    }
    button{
        border-radius: .03rem;
    }
    .dgp-leftTitle>li.dgp-userType>div.ivu-select .ivu-select-selection{
        border-width: .01rem;
        border-radius: .03rem;
        height: .41rem;
        line-height: .41rem;
    }
    .dgp-leftTitle .ivu-select-single .ivu-select-selectio  .ivu-select-placeholder,
    .dgp-leftTitle>li.dgp-userType>div.ivu-select .ivu-select-selection .ivu-select-placeholder{
        height: .41rem;
        line-height: .41rem;
        padding-left: .1rem;
    }
    .dgp-leftTitle .ivu-select-single .ivu-select-selection{
        height: .41rem;
        line-height: .41rem;
    }
    /*时间拾取器*/
    .dgp-queryArea .dgp-search-datePicker .ivu-input{
        height: .41rem;
        line-height: .41rem;
        padding: 0 .32rem 0 .1rem;
        font-size: .12rem;
        border: .01rem solid #C6C6C6;
    }
    .dgp-queryArea .dgp-search-datePicker .ivu-icon{
        width: .32rem;
        height: .41rem;
        line-height: .41rem;
        cursor: pointer;
    }
    .dgp-queryArea .dgp-search-datePicker .ivu-date-picker{
        margin-right: .5rem;
    }
    .dgp-queryArea .dgp-search-datePicker{
        text-align: right;
    }


    /*分頁器修改*/
    .dgp-tableArea .dgp-page-active .ivu-page-options-elevator input{
        text-align:center;
        margin:0 .12rem;
    }
    .dgp-tableArea .dgp-page-active .pagesEnter{
        margin-left: .1rem;
    }

    .dgp-pagenation-pages .ivu-page-options .ivu-select {
        position: relative;
        width:80px;
        text-align: center;
    }
    .dgp-pagenation-pages .ivu-page-options .ivu-select .ivu-select-dropdown{
        position: absolute;
        top: -140px !important;
        left: 0 !important;
    }
    .ivu-modal .ivu-modal-footer button{
        cursor:pointer;
    }




    /*修改模态框头部的标题色号*/
    .ivu-modal-header p, .ivu-modal-header-inner{
        color:#333;
    }
    /*全局提醒*/
    .ivu-message .ivu-message-notice .ivu-message-info .ivu-icon,
    .ivu-message .ivu-message-notice .ivu-message-loading .ivu-icon{
        color:#1cb4e5;
    }


    /*input框placeholder字体样式统一*/
    .dgp-queryArea .dgp-leftTitle>li>input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
        color:#c6c6c6;
        border-color:#c6c6c6;
    }
    .dgp-queryArea .dgp-leftTitle>li>input:-moz-placeholder,textarea:-moz-placeholder{
        color:#c6c6c6;
        border-color:#c6c6c6;
    }
    .dgp-queryArea .dgp-leftTitle>li>input::-moz-placeholder,textarea::-moz-placeholder{
        color:#c6c6c6;
        border-color:#c6c6c6;
    }
    .dgp-queryArea .dgp-leftTitle>li>input:-ms-input-placeholder,textarea:-ms-input-placeholder{
        color:#c6c6c6;
        border-color:#c6c6c6;
    }


    /*修改穿梭框底部按钮*/
    .ivu-modal-footer button{
        height: .41rem;
        padding: 0 ;
        text-align: center;
        border-radius: .04rem;
        border: none;
        line-height: .41rem;
        width: .86rem;
        font-size: .14rem;
    }
    .ivu-btn>span{
        vertical-align: unset;
    }
    /*隐藏穿梭框取消按钮*/
    .dgp-transferRoleModal .ivu-modal-footer button:first-child,
    .dgp-transferModal  .ivu-modal-footer button:first-child{
        display: none;
    }
</style>
