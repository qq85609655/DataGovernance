<template>
    <div class="dgp-journalSystem">
        <div class="dgp-queryArea">
            <ul class="dgp-leftTitle clearfix" :class="{'dgp-leftTitle-toggle':queryIsShow}">
                <li class="dgp-topQuery-title">查询区</li>
                <li>
                    <span>日志类型：</span>
                    <input type="text" @keyup.enter="initTable" placeholder="请输入日志类型" v-model="logType">
                </li>
                <li>
                    <span>事件对象：</span>
                    <input type="text" @keyup.enter="initTable" placeholder="请输入时间对象"  v-model="eventTarget">
                </li>
                <li v-show="queryIsShow">
                    <span>操作用户：</span>
                    <input type="text" @keyup.enter="initTable" placeholder="请输入操作用户"  v-model="username">
                </li>
                <li v-show="queryIsShow" class="dgp-search-datePicker" >
                    <span>开始时间：</span>
                    <div class="dgp-journal-date">
                        <Row>
                            <Col span="12">
                                <DatePicker @keyup.enter="initTable" v-model="duringTime" format="yyyy/MM/dd" type="daterange"  placeholder="请选择开始和结束时间..." style="width:3.2rem" @on-change="dateChange"></DatePicker>
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
            <div class="dgp-deleteBtn">
                <button class="btn-default" @click="handleShowDeleteData">删除</button>
                <modal-del-none :systemDelNoneNotice="systemDelNoneNoticeModal" @systemDelNoneNoticeFun="systemDelNoneNoticeModalFun"></modal-del-none>
                <modal-del-data  :systemDelDataNotice="systemDelDataNoticeModal" @systemDelDataNoticeFun="systemDelDataNoticeModalFun"></modal-del-data>
            </div>
            <div class="dgp-tableBody">
                <!--表格组件-->
                <div class="home-table">
                    <Table :loading="loading" :height="tableHeight" @on-selection-change="handleToggleTotal" ref="selection" :columns="columnsAll" :data="dataAll"></Table>
                </div>
            </div>
            <!--分页-->
            <div v-show="pages"  class="dgp-pagenation-dialog clearfix">
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
    import DgpPagenation from "../../components/DgpPagenation";
    import ModalDelData from "../../components/modal/modal_delData";
    import ModalDelNone from "../../components/modal/modal_delNone";
    import "../../assets/css/pagenation.css";
    export default {
        name: "dgp-system-journal",
        data:function(){
            return {
                loading: true,
                pageNumber:1,
                pageSize:10,
                sortOrder:'asc',
                total:0,
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
                logType:'',
                eventTarget:'',
                username:'',
                duringTime:['',''],
                startTime:null,
                endTime:null,
                //日历部分
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
                        title: '操作用户',
                        key: 'username',
                        width:100,
                        ellipsis:true
                    },
                    {
                        title: '日志内容',
                        key: 'description',
                        ellipsis:true
                    },
                    {
                        title: '日志类型',
                        key: 'logType',
                        width:100,
                        ellipsis:true
                    },
                    {
                        title: '操作时间',
                        key: 'opertime',
                        width:180,
                        ellipsis:true
                    }
                ],
                /*表格body数据*/
                dataAll: []
            }
        },
        components:{ModalDelNone, ModalDelData, DgpPagenation},
        methods:{
            dateChange(v1,v2){
                console.log(v1,v2);
                this.startTime = v1[0].replace(/\//g,'-')+' 00:00:00';
                this.endTime = v1[1].replace(/\//g,'-')+' 23:59:59';
                console.log(this.endTime,this.endTime)
            },
            queryBlock(){
                //console.log($('.dgp-leftTitle').find('li').length);
                this.queryShow = !this.queryShow;
                if($('.dgp-leftTitle').find('li').length>4){
                    this.queryIsShow = !this.queryIsShow;
                }
            },
            spreadFunc(){
                $('.dgp-journal-leftTitle span').html(this.addCode);
            },
            journalReadFunc(){ //日历设置只读
                $('.dgp-journalSystem  .dgp-journal-date .ivu-input').attr('readonly',true);
            },
            doEmpty(){ //重置按钮清空内容
                this.journalType='';
                this.eventObject='';
                this.operateUser='';
                this.startJournalTimer='';
                this.endJournalTimer='';
                this.duringTime = ['','']
                this.endTime= null;
                this.startTime = null;
            },
            checkDataAll(){
                if(this.dataAll.length){
                    this.pages=true;
                }else{
                    this.pages=false;
                }
            },
            journalInit(){
                $('.dgp-journal-date .ivu-picker-panel-body .ivu-picker-confirm>button:first-child>span').html('今天');
            },
            handleShowDeleteData(){/*显示需要删除的数据集合*/
                if(this.selectionDate.length){
                    this.systemDelDataNoticeModal=true;
                    //console.log('确定删除数据');
                }else{
                    this.systemDelNoneNoticeModal=true;
                    //console.log('提示请选中一条');
                }
            },
            systemDelNoneNoticeModalFun(){/*无数据删除*/
                this.systemDelNoneNoticeModal=false;
            },
            systemDelDataNoticeModalFun(v){/*有数据删除*/
                if(v=='ok'){
                    let json = {};
                    json.list = this.selectionDate;
                    this.postRequestJson({
                        url:'/DGP/sysLog/deleteAll',
                        data: json,
                        success:(res)=>{
                             if(res.success){
                                this.initTable();
                                 this.systemDelDataNoticeModal=false;
                            }
                            this.$Message.info(res.msg);
                        }
                    })
                }else{
                    this.systemDelDataNoticeModal=false;
                }
                
            },
            handleToggleTotal(selection){/*table全选*/
                this.selectionDate=selection;
                //console.log(this.selectionDate);
            },
            initTable(){//请求接口调用树的数据
                this.postRequestJson({
                    url:'/DGP/sysLog/listByPage',
                    data:JSON.stringify({
                        pagination:{
                            pageNumber:this.pageNumber,
                            pageSize:this.pageSize,
                            sortOrder:this.sortOrder
                        },
                        search:{
                            logType:this.logType,
                            eventTarget:this.eventTarget,
                            username:this.username,
                            startTime:this.startTime,
                            endTime:this.endTime
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
                let tBody = tHeight-$('.dgp-tableArea>.dgp-deleteBtn').innerHeight()-$('.dgp-tableArea>.dgp-pagenation-dialog').height();
                this.tableHeight=tBody;
            },
            queryInit(){
                if($('.dgp-leftTitle').find('li').length<=4){
                    this.queryToggleShow=!this.queryToggleShow;
                }
            }
        },
        computed:{},
        watch:{
            // duringTime(newDate){
            //     console.log(newDate[0],newDate[1]);
            //     this.startTime = newDate[0];
            //     this.endTime = newDate[1];
            // }
        },
        mounted(){
            /*创建表格*/
            //createTable();
            /*显示空白页面初始化*/
            blankTable.apply(this);
            //this.checkDataAll();
            /*初始化日历按钮文字*/
            this.journalInit();
            //头部切换按钮初始化函数
            this.spreadFunc();
            //日历input设置只读属性
            this.journalReadFunc();

            this.initTable();
            this.handleTableAreaInit();
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
    .dgp-journal-queryArea{
        /*width:16.8rem;*/
        border-radius: .03rem;
        margin-bottom:.28rem;
        position:relative;
    }
    .dgp-journal-leftTitle{
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
    .dgp-queryArea .dgp-journal-date{
        display:inline-block;
        vertical-align: bottom;
    }
    .ivu-date-picker{
        margin-right:.16rem;
    }
    .dgp-journal-middleContent{
        padding-top:.37rem;
        font-size: .14rem;
        clear:both;
        font-family: PingFangSC-Regular;
    }
    .dgp-journal-middleContent div{
        float:left;
    }
    .journal-type{
        padding-left:.31rem;
    }
    .dgp-journal-middleContent label{
        min-width:.7rem;
        height:.2rem;
    }
    .dgp-journal-middleContent label:not(.journal-type){
        margin-left:.31rem;
    }
    .dgp-journal-middleContent input{
        width:2.14rem;
        height:.3rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        padding-left:.15rem;
    }

    .dgp-journal-button{
        margin:.3rem 0 .28rem 15.41rem;
    }
    .dgp-journal-button button{
        min-width:.64rem;
        height:.3rem;
        cursor:pointer;
        font-family: PingFangSC-Regular;
        font-size: .14rem;
    }
    .dgp-journal-button button:first-child{
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
    }
    .dgp-journal-button button:last-child{
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
    .dgp-deleteBtn{
        padding:.22rem 0 .22rem .28rem;
    }
    .dgp-deleteBtn button{
        width:.88rem;
        height:.36rem;
        line-height:.36rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        font-size: .16rem;
        text-align: center;
        font-family: PingFangSC-Regular;
        cursor:pointer;
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