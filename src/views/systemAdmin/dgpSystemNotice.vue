<template>
    <div class="dgp-noticeSystem">
        <div class="dgp-queryArea">
            <ul class="dgp-leftTitle clearfix" :class="{'dgp-leftTitle-toggle':queryIsShow}">
                <li class="dgp-topQuery-title">查询区</li>
                <li>
                    <span>标题：</span>
                    <input type="text" @keyup.enter="initTable" placeholder="请输入标题"   v-model="titleValue">
                </li>
                <li @keyup.enter="initTable">
                    <span>通知状态：</span>
                    <Select v-model="mesState"  style="width:3.2rem;vertical-align: top;text-align: left;margin-right: .8rem">
                        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li  v-show="queryIsShow" class="dgp-search-datePicker" >
                    <span>通知时间：</span>
                    <div class="dgp-notice-date" >
                        <Row>
                            <Col span="12">
                                <DatePicker  @keyup.enter="initTable"  v-model="duringTime" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择开始和结束时间..." style="width:3.2rem" @on-change="dateChange"></DatePicker>
                            </Col>
                        </Row>
                    </div>
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
            <div class="dgp-headBtn">
                <button class="btn-primary dgp-lookData" @click="handleLookData">查看</button>
                <Modal-is-look :systemLookNone="systemLookNoneModal" :showWord="showWordModal" @systemLookNoneFunc="systemLookNoneModalFunc"></Modal-is-look>
                <modal-system-notice :showNoticeWord="showNoticeWordModal"  :systemLookData="systemLookDataModal" @systemLookDataFunc="systemLookDataModalFunc"></modal-system-notice>
                <button class="btn-default" @click="readAllNotice">全部已读</button>
                <button class="btn-default" @click="handleShowDeleteData">删除</button>
                <modal-del-none :systemDelNoneNotice="systemDelNoneNoticeModal" @systemDelNoneNoticeFun="systemDelNoneNoticeModalFun"></modal-del-none>
                <modal-del-data  :systemDelDataNotice="systemDelDataNoticeModal" @systemDelDataNoticeFun="systemDelDataNoticeModalFun"></modal-del-data>
            </div>
            <div class="dgp-tableBody">
                <!--表格组件-->
                <div class="home-table">
                    <Table :loading="loading" :height="tableHeight"  @on-selection-change="handleToggleTotal"  ref="selection"  :columns="columnsAll" :data="dataAll"></Table>
                </div>
            </div>
            <!--分页-->
            <!-- <div v-show="pages"  class="dgp-pagenation-dialog clearfix"> -->
                <!--分页器-->
                <!-- <dgp-pagenation class="dgp-pagenation-pages"></dgp-pagenation> -->
            <!-- </div> -->

             <div v-show="pages" class="dgp-pagenation-dialog">
                <Page  :current="pageNumber" v-if="total" :total="total" show-elevator show-sizer class-name="dgp-page-active dgp-pagenation-pages" @on-change="changePageNumber" @on-page-size-change="changePageSize"/>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/css/dgpSystemColor.css'
    import '../../assets/css/dgpSwitch.css'
    import {createTable,blankTable} from '../../components/table/table_methods'
    import DgpPagenation from "../../components/DgpPagenation";
    //通知管理模态框
    import modalSystemNotice from "../../components/modal/modal_notice"
    import ModalDelData from "../../components/modal/modal_delData";
    import ModalDelNone from "../../components/modal/modal_delNone";
    import ModalIsLook from '../../components/modal/modal_isLook';
    export default {
        name: "dgp-system-jurisdiction",
        data:function(){
            return {
                loading:true,
                pageNumber:1,
                pageSize:10,
                sortOrder:'acs',//默认排序方式acs，还有一种desc
                total:0,//总条数
                title:'',
                mesState:'',

                showWordModal:'请输入一条数据',
                showNoticeWordModal:{},
                noticeModel:false,
                systemLookNoneModal:false,//查看表格无数据时提示框
                systemLookDataModal:false,//查看按钮有数据时提示框
                systemDelNoneNoticeModal:false,      //删除无数据时提示框
                systemDelDataNoticeModal:false,      //有数据时提示框
                selectionDate:[],               //表格选中项数据集合,[]初始化数据为[]
                pages:null,
                searchWord:'我是不存在的值',  //表格无数据背景显示默认值
                queryIsShow:false,
                queryShow:false,
                queryToggleShow:true,
                tableHeight:null,
                //头部切换按钮
                addCode:`<i class="dgp-rightSwitch">+<i>`,
                reduceCode:`<i class="dgp-rightSwitch">-<i>`,
                titleValue:'',
                noticeState:'',
                duringTime:['',''],
                startTime:null,
                endTime:null,
                type:'',
                typeList :[
                    {
                        value: 0,
                        label: '已读'
                    },
                    {
                        value: 1,
                        label: '未读'
                    }
                ],
                //日历
                options3: {
                    disabledDate (date) {
                        return false;
                    }
                },
                options4: {
                    disabledDate (date) {
                        // const disabledDay = date.getDate();
                        return false;
                    }
                },
                /*表格表头数据*/
                columnsAll: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title',
                        ellipsis:true
                    },
                    {
                        title: '接收人',
                        key: 'receiveUser',
                        ellipsis:true,
                        width:100
                    },
                    {
                        title: '接收时间',
                        key: 'receiveTime',
                        ellipsis:true,
                        width:100
                    },
                    {
                        title: '通知级别',
                        key: 'mesLevel',
                        ellipsis:true
                    },
                    {
                        title: '通知来源',
                        key: 'mesSource',
                        width:100,
                        ellipsis:true
                    },
                    {
                        title: '通知人',
                        key: 'sendUser',
                        ellipsis:true
                    },
                    {
                        title: '通知时间',
                        key: 'sendTime',
                        width:150,
                        ellipsis:true
                    },
                    {
                        title: '通知状态',
                        key: 'mesState',
                        width:100,
                        ellipsis:true
                    }
                ],
                /*表格body数据*/
                dataAll: [
                ]
            }
        },
        components:{ModalDelNone, ModalDelData, DgpPagenation,ModalIsLook,modalSystemNotice},
        methods:{
            dateChange(v1,v2){//日期选择
                console.log(v1,v2);
                this.startTime = v1[0].replace(/\//g,'-')+' 00:00:00';
                this.endTime = v1[1].replace(/\//g,'-')+' 23:59:59';
                console.log(this.endTime,this.endTime)
            },
            readAllNotice(){//全部已读
                this.postRequestJson({
                    url:'/DGP/sysMessage/allLook',
                    success:(res)=>{
                        this.$Message.info('全部已读');
                    }
                })
            },
            queryBlock(){
                this.queryShow = !this.queryShow;
                if($('.dgp-leftTitle').find('li').length>4){
                    this.queryIsShow = !this.queryIsShow;
                }
            },
            noticeReadFunc(){ //日历设置只读
                $('.dgp-noticeSystem  .dgp-notice-date .ivu-input').attr('readonly',true);
            },
            spreadFunc(){
                $('.dgp-notice-leftTitle span').html(this.addCode);
            },
            initTable(){
                //查看模态框右下角按钮字体换成 确定；
                $('.dgp-modal-systemNotice .ivu-modal-content .ivu-modal-footer .ivu-btn-primary').html('确定');
                this.loading = true;
                this.postRequestJson({
                    url:'/DGP/sysMessage/listByPage',
                    data:JSON.stringify({
                        pagination:{
                            pageNumber:this.pageNumber,
                            pageSize:this.pageSize,
                            sortOrder:this.sortOrder
                        },
                        search:{
                            title:this.title,
                            mesState:this.mesState,
                            startTime:this.startTime,
                            endTime:this.endTime
                        }
                    }),
                    success:(res)=>{
                        this.loading = false;
                        //this.loading = false;
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
                // setTimeout(()=>{  //异步加载表格内小图标的方法//必须再表格渲染结束后再执行此方法,否则找不到dom
                //     createTable();
                // },300)
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
            doEmpty(){ //重置按钮清空input框的值
                    this.duringTime= ['','']
                    this.title='';
                    this.mesState = '';
                    this.initTable();
                    this.noticeState='';
                    this.startTime=null;
                    this.endTime=null;
                    this.type='';
            },
            checkDataAll(){/*检测表格数据是否为空*/
                if(this.dataAll.length){
                    this.pages=true;
                }else{
                    this.pages=false;
                }
            },
            noticeInit(){
                $('.dgp-modal-systemNotice .ivu-modal-footer>button:last-child>span').html('关闭');
                $('.dgp-notice-date .ivu-picker-confirm>button:first-child>span').html('今天');
            },

            //查看按钮
            handleLookData(){ /*点击查看按钮，跳出提示框*/
                if(this.selectionDate.length===1){//this.selectionDate
                    this.showNoticeWordModal=this.selectionDate[0];
                    this.systemLookDataModal=true;
                    this.postRequestJson({
                        url:'/DGP/sysMessage/getSysMsgInfo',
                        data:{id:this.selectionDate[0].id},
                        success:(res)=>{
                            console.log(res);
                        }
                    })
                    //code
                    //console.log('查看数据成功');
                }else if(this.selectionDate.length>1){
                    this.showWordModal='同时只能查看一条记录!';
                    this.systemLookNoneModal=true;
                    //code
                    //console.log('只能同时修改一条记录!');
                }else{
                    this.showWordModal='请选中一条数据!';
                    this.systemLookNoneModal=true;
                    //code
                    //console.log('提示请选中一条数据');
                }
            },
            handleLookAllData(){
                //code
                this.$Message.info('编辑成功')
            },
            systemLookNoneModalFunc(){
                this.systemLookNoneModal=false;

            },
            systemLookDataModalFunc(){
                this.systemLookDataModal=false;
            },

            //点击删除按钮
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
            systemDelDataNoticeModalFun(v){//删除操作
                if(v=='ok'){//确认删除
                    let json= {};
                    json.list = this.selectionDate;
                    this.postRequestJson({
                        url:'/DGP/sysMessage/deleteAll',
                        data:json,
                        success:(res)=>{
                            if(res.success){
                                this.initTable();
                                 this.systemDelDataNoticeModal=false;
                            }
                            this.$Message.info(res.msg);

                        }
                    })
                }else{//取消删除
                    this.systemDelDataNoticeModal=false;
                }
            },
            systemDelNoneNoticeModalFun(){/*无数据删除*/
                this.systemDelNoneNoticeModal=false;
            },
            // systemDelDataNoticeModalFun(){/*有数据删除*/
            //     this.systemDelDataNoticeModal=false;
            // },
            handleToggleTotal(selection){/*table全选*/
                this.selectionDate=selection;
                //console.log(this.selectionDate);
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
                let tBody = tHeight-$('.dgp-tableArea>.dgp-headBtn').innerHeight()-$('.dgp-tableArea>.dgp-pagenation-dialog').height();
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
            /*创建表格*/
            //createTable();
            /*显示空白页面初始化*/
            blankTable.apply(this);
            this.checkDataAll();
            this.initTable();
            /*初始化日历按钮文字*/
            this.noticeInit();
            //头部切换按钮初始化函数
            this.spreadFunc();
            //日历input设置只读属性
            this. noticeReadFunc();

            this.handleTableAreaInit();
            this.queryInit();
            $(window).resize(()=>{
                this.handleTableAreaInit();
            });
        },
        updated(){
            //createTable();
            this.checkDataAll();
            this.pagesInit();
            this.handleTableAreaInit();
        }
    }
</script>

<style scoped>
    .dgp-noticeSystem{
        /* padding-top:.31rem;
        padding-left:.7rem; */
    }
    .dgp-notice-queryArea{
        /*width:16.8rem;*/
        border-radius: .03rem;
        margin-bottom:.28rem;
        position:relative;
    }
    .dgp-notice-leftTitle{
        width:100%;
        height:.5rem;
        line-height:.5rem;
        padding-left:.31rem;
        font-size: .16rem;
        border-bottom-width:.01rem;
        border-bottom-style:solid;
        font-family: PingFangSC-Regular;
    }

    /*开始时间结束时间日历部分*/
    .dgp-queryArea .dgp-search-datePicker>span{
        width:1.7rem;
        text-align: right;
        display: inline-block;
    }
    .dgp-queryArea .dgp-notice-date{
        display:inline-block;
        vertical-align: bottom;
    }


    .dgp-queryArea .dgp-notice-middleContent{
        padding-top:.37rem;
        font-size: .14rem;
        font-family: PingFangSC-Regular;
    }
    .dgp-queryArea  .notice-name{
        padding-left:.31rem;
    }
    .dgp-queryArea  .dgp-notice-middleContent label{
        min-width:.7rem;
        height:.2rem;
    }
    .dgp-queryArea  .dgp-notice-middleContent label:not( .notice-name){
        margin-left:.7rem;
    }
    .dgp-queryArea  .dgp-notice-middleContent input, .dgp-notice-middleContent select{
        width:2.14rem;
        height:.3rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        padding-left:.15rem;
    }
    .dgp-queryArea  .dgp-notice-button{
        margin:.3rem 0 .28rem 15.29rem;
    }
    .dgp-queryArea .dgp-notice-button button{
        min-width:.64rem;
        height:.3rem;
        cursor:pointer;
        font-family: PingFangSC-Regular;
        font-size: .14rem;
    }
    .dgp-notice-button button:first-child{
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
    }
    .dgp-notice-button button:last-child{
        border-radius: .03rem;
        margin-left:.13rem;
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
    .dgp-headBtn{
        width:100%;
        padding-left:.3rem;
        margin:0 auto;
        display:inline-block;
        padding-bottom:.2rem;
    }
    .dgp-headBtn button{
        height:.36rem;
        line-height:.36rem;
        margin-right:.1rem;
        font-size: .16rem;
        border-radius: .03rem;
        font-family: PingFangSC-Regular;
        cursor:pointer;
    }
    .dgp-lookData{
        min-width:.82rem;
        display:inline-block;
    }
    .dgp-headBtn button:nth-child(2),.dgp-headBtn button:nth-child(3){
        min-width:.88rem;
        margin-top:.24rem;
    }
    .dgp-headBtn button:nth-child(3){
        border-width:.01rem;
        border-style:solid;
    }

    /* dgp-pagenation-dialog 分页器样式 */
    .dgp-pagenation-dialog{
        height: .8rem;
        width:100%;
    }
    .dgp-pagenation-pages{
        padding-top: .24rem;
    }
</style>