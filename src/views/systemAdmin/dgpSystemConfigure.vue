<template>
    <div class="dgp-configureSystem">
        <div class="dgp-tableArea">
            <div class="dgp-topBtn">
                <button  @click="showConfigModal" style="border: none" class="btn-primary"><Icon class="dgp-showModal-addIcon" type="md-add" />新增</button>
                <!--<modal-user-manage :title="configureModalTitle" :userModal="configureModal" :userShowData="configureModalData" @userManage="configManageModal" @reloadTable="initTable" @showMessage="showMessage"></modal-user-manage>-->
                <button class="btn-default" @click="handleShowDeleteData" >删除</button>
                <div class="dgp-query-inTable clearfix">
                    <button class="btn-primary fr" @click="initTable"><Icon type="ios-search-outline" /></button>
                    <Input type="text" class="fr" clearable  placeholder="请输入配置名称" v-model="configName" />
                </div>
                <modal-del-none :systemDelNoneNotice="systemDelNoneNoticeModal" @systemDelNoneNoticeFun="systemDelNoneNoticeModalFun"></modal-del-none>
                <modal-del-data  :systemDelDataNotice="systemDelDataNoticeModal" @systemDelDataNoticeFun="systemDelDataNoticeModalFun"></modal-del-data>
                <!--配置模态框-->
                <Modal
                        title="配置新增"
                        v-model="configureModal"
                        @on-ok="handleDoConfig"
                        @on-cancel="handleCancelConfig"
                        class-name="vertical-center-modal dgp-system-config-modal">
                    <div class="dgp-config-modal-item">
                        <span>配置KEY：</span>
                        <Input v-model="proKey" placeholder="请输入配置KEY"/>
                    </div>
                    <div class="dgp-config-modal-item">
                        <span>配置名称：</span>
                        <Input v-model="proName" placeholder="请输入配置名称"/>
                    </div>
                    <div class="dgp-config-modal-item">
                        <span>配置值：</span>
                        <Input v-model="proValue" placeholder="请输入配置值"/>
                    </div>
                    <div class="dgp-config-modal-item">
                        <span>启用状态：</span>
                        <RadioGroup v-model="proSts" type="button">
                            <Radio label="1">启用</Radio>
                            <Radio class="btn-default" label="0">停用</Radio>
                        </RadioGroup>
                    </div>
                    <div slot="footer">
                            <button class="dgp-system-config-modal-footerbtn btn-default" @click="handleCancelConfig">取消</button>
                            <button class="dgp-system-config-modal-footerbtn btn-primary" @click="handleDoConfig">确定</button>
                    </div>
                </Modal>
            </div>
            <div class="dgp-tableBody">
                <div class="dgp-common-table home-table">
                    <Table :loading="loading" :height="tableHeight" @on-selection-change="handleToggleTotal"  :columns="columnsAll" :data="dataAll"></Table>
                </div>
            </div>
            <div  v-show="pages" class="dgp-pagenation-dialog clearfix">
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

    export default {
        name: "dgp-system-jurisdiction",
        data:function(){
            return {
                fixId:'',
                configName:'',
                loading:true,
                configureModalTitle:'',//增加更新modal框的标题
                configureModal:false,                   //用户增加修改
                configureModalData:{},              //用户需要修改的值呈现

                systemDelNoneNoticeModal:false,      //删除无数据时提示框
                systemDelDataNoticeModal:false,      //有数据时提示框
                selectionDate:[],               //表格选中项数据集合,[]初始化数据为[]
                addOrModify:null,           //true is add false is modify
                configModal:false,          //是否显示配置模态框
                proKey:'',               //配置KEY
                proName:'',              //配置名称
                proValue:'',             //配置值
                proSts:'',          //启用状态
                pageNumber:1,
                pageSize:10,
                sortOrder:'acs',//默认排序方式acs，还有一种desc
                total:0,//总条数
                pages:null,
                searchWord:'我是不存在的值',  //表格无数据背景显示默认值
                queryIsShow:false,
                queryShow:false,
                queryToggleShow:true,
                tableHeight:null,
                roleName:'',
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
                        title: '配置KEY',
                        key: 'proKey',
                        width:200,
                        ellipsis:true
                    },
                    {
                        title: '配置名称',
                        key: 'proName',
                        ellipsis:true
                    },
                    {
                        title: '配置值',
                        key: 'proValue',
                        ellipsis:true
                    },
                    {
                        title: '启用状态',
                        key: 'proSts',
                        width:100,
                        ellipsis:true,
                        render:(h,params)=>{
                            const row = params.row;
                            let text = row.proSts? '启用':'停用';
                            return h('span', {},text);
                        }
                    },
                    {
                        title: '操作',
                        key: 'control',
                        width: 100,
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
                                }, '修改')
                            ]);
                        }
                    }
                ],
                /*表格body数据*/
                dataAll: [

                ]
            }
        },
        components:{ModalDelNone, ModalDelData, DgpPagenation},
        methods:{
            queryBlock(){
                this.queryShow = !this.queryShow;
                if($('.dgp-leftTitle').find('li').length>4){
                    this.queryIsShow = !this.queryIsShow;
                }
            },
            spreadFunc(){
                $('.dgp-configure-leftTitle span').html(this.addCode);
            },
            checkDataAll(){/*检查数据是否为空*/
                if(this.dataAll.length){
                    this.pages=true;
                }else{
                    this.pages=false;
                }
            },
            handleDoConfig(){/*确定配置*/
                console.log(this.proValue);
                console.log(this.proSts);
                console.log(this.proKey);
                console.log(this.proKey);
                if(this.addOrModify){
                    console.log('我是新增操作');
                    this.postRequestJson({
                        url:'/DGP/sysConfigure/create',
                        data:JSON.stringify({
                            proValue:this.proValue,
                            proSts:this.proSts,
                            proKey:this.proKey,
                            proName:this.proName
                        }),
                        success:(res)=>{
                            if(res.success){
                                this.configureModal = false;
                                this.proKey="";
                                this.proName= "";
                                this.proSts= "";
                                this.proValue= "";
                                this.initTable();
                            }
                            this.$Message.info(res.msg);
                            console.log(res);
                        }
                    })
                }else{
                    console.log('我是修改操作');
                    this.postRequestJson({
                        url:' /DGP/sysConfigure/update',
                        data:JSON.stringify({
                            id: this.fixId,
                            proValue:this.proValue,
                            proSts:this.proSts,
                            proKey:this.proKey,
                            proName:this.proName
                        }),
                        success:(res)=>{
                            if(res.success){
                                this.configureModal = false;
                                this.proKey="";
                                this.proName= "";
                                this.proSts= "";
                                this.proValue= "";
                                this.fixId = '';
                                this.initTable();
                            }
                            this.$Message.info(res.msg);
                            console.log(res);
                        }
                    })
                }
            },
            handleCancelConfig(){/*取消配置*/
                //console.log('cancel---config');
                this.configureModal=false;
            },
            showConfigModal(){/*新增显示模态框*/
                  this.addOrModify=true;//新增操作
//                this.configModal=true;          //是否显示配置模态框
//                this.configKey='';               //配置KEY
//                this.configName='';              //配置名称
//                this.configValue='';             //配置值
//                this.configState='启用';          //启用状态
                this.proKey="";
                this.proName= "";
                this.proSts= "1";
                this.proValue= "";
                this.configureModal=true;
                this.configureModalData={};
                this.configureModalTitle = '配置新增';
            },
            configManageModal(){
                this.configureModal=false;
            },
            showMessage(){
                //console.log(this.$Message);
                this.$Message.info('保存成功');

            },
            doEmpty(){
                this.roleName='';
                this.initTable();
            },
            initTable(){//请求接口调用树的数据
                this.loading = true;
                this.postRequestJson({
                    url:'/DGP/sysConfigure/listByPage',
                    data:JSON.stringify({
                        pagination:{
                            pageNumber:this.pageNumber,
                            pageSize:this.pageSize,
                            sortOrder:this.sortOrder
                        },
                        search:{
                            proKey:this.proKey,
                            proName:this.configName ? this.configName:this.proName,
                            proValue:this.proValue,
                            proSts:this.proSts
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
            handleDoModification(i){/*config确认开始修改*/

                this.addOrModify=false;//模态框进行修改操作
                console.log(this.dataAll[i]);
                this.proKey=this.dataAll[i].proKey;
                this.proName=this.dataAll[i].proName;
                this.proValue=this.dataAll[i].proValue;
                this.proSts=this.dataAll[i].proSts;
                this.fixId = this.dataAll[i].id;
                this.configureModal=true;/*显示模态框*/
            },
            handleCancelModification(){/*config确认取消修改*/
                this.configModal=false;
            },
            configModalInit(){/*初始化关闭，保存*/
                $('.dgp-system-config-modal .ivu-modal').css('width','7.36rem');
                $('.dgp-system-config-modal .ivu-modal-footer>button:first-child>span').html('关闭');
                $('.dgp-system-config-modal .ivu-modal-footer>button:last-child>span').html('保存');
            },
            handleShowDeleteData(){/*显示需要删除的数据集合*/
                if(this.selectionDate.length){
                    this.systemDelDataNoticeModal=true;
                    console.log('确定删除数据');
                }else{
                    this.systemDelNoneNoticeModal=true;
                    console.log('提示请选中一条');
                }
            },
            systemDelNoneNoticeModalFun(){/*无数据删除*/
                this.systemDelNoneNoticeModal=false;
            },
            systemDelDataNoticeModalFun(msg){/*有数据删除*/
                if(msg=='ok'){
                    console.log('删除数据');
                    let json = {};
                    json.list = this.selectionDate;
                    this.postRequestJson({
                        url:'/DGP/sysConfigure/deleteAll',
                        data:json,
                        success:(res)=>{
                            if(res.success){
                                this.initTable();
                            }
                            this.$Message.info(res.msg);
                        }
                    })
                }else{
                    console.log('取消')
                }
                this.systemDelDataNoticeModal=false;
            },
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
                let tHeight = $('.dgp-tableArea').parent().height();
                $('.dgp-tableArea').css("height",tHeight);
                let tBody = tHeight-$('.dgp-tableArea>.dgp-topBtn').innerHeight()-$('.dgp-tableArea>.dgp-pagenation-dialog').height();
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
            //this.checkDataAll();
            /*初始化按钮文字*/
            this.configModalInit();
            //头部切换按钮初始化函数
            this.spreadFunc();
            this.initTable();
            this.handleTableAreaInit();
            this.queryInit();
            $(window).resize(()=>{
                this.handleTableAreaInit();
            });
            const that = this;
            $('.dgp-tableArea .dgp-query-inTable .ivu-input-wrapper').on('click','i.ivu-input-icon',function(){
                //添加表内搜索清除
                that.doEmpty();
            })
            $('.dgp-tableArea .dgp-query-inTable .ivu-input-wrapper').on('keyup','input',function(event){
                //添加表内搜索回车
                if(event.keyCode ==13){
                    that.initTable();
                }
            })
        },
        updated(){
            //createTable();
            //this.checkDataAll();
            this.pagesInit();
        }
    }
</script>

<style scoped>
    .dgp-configureSystem{
        /* padding-top:.31rem;
        padding-left:.7rem; */
    }
    .dgp-configure-queryArea{
        border-radius: .03rem;
        margin-bottom:.28rem;
        position:relative;
    }
    .dgp-configure-leftTitle{
        width:100%;
        height:.5rem;
        line-height:.5rem;
        padding-left:.31rem;
        font-size: .16rem;
        border-bottom-width:.01rem;
        border-bottom-style:solid;
        font-family: PingFangSC-Regular;
    }
    .dgp-configure-middleContent{
        /*height:1.09rem;*/
        padding-top:.37rem;
        font-size: .14rem;
        font-family: PingFangSC-Regular;
    }
    .dgp-configure-middleContent label{
        min-width:.7rem;
        height:.2rem;
        padding-left:.31rem;
    }
    .dgp-configure-middleContent input{
        width:2.14rem;
        height:.3rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        padding-left:.15rem;
    }
    .dgp-configure-middleContent button{
        width:.64rem;
        height:.3rem;
        margin-left:.2rem;
        cursor:pointer;
        margin-bottom: .42rem;
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
    .dgp-topBtn{
        padding:.22rem 0 .22rem .28rem;
    }
    .dgp-topBtn button{
        min-width:.82rem;
        height:.36rem;
        line-height:.36rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        font-size: .16rem;
        text-align: center;
        cursor:pointer;
        font-family: PingFangSC-Regular;
    }
    .dgp-topBtn button:first-child{
        margin-right:.1rem;
    }
    .dgp-topBtn button:first-child img{
        width:.16rem;
        height:.16rem;
        margin-right:.03rem;
    }
    .dgp-topBtn button:last-child{
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
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
<style>
    .dgp-system-config-modal-footerbtn{
        width:0.86rem;
        height:0.38rem;
        font-size:0.14rem;
        line-height: 0.38rem;
    }
    /*-------------------------------------------------------*/

    /*systemConfig modal样式初始化*/
    .dgp-system-config-modal{
        font-size: .14rem;
    }
    .dgp-system-config-modal .ivu-modal-content{
        border-radius: .03rem;
    }
    .dgp-system-config-modal .ivu-modal-close{
        top:.13rem;
        font-size: .12rem;
    }
    .dgp-system-config-modal .ivu-modal-close .ivu-icon-ios-close{
        font-size: .32rem;
    }
    .dgp-system-config-modal .ivu-modal-header{
        height: .58rem;
        font-weight: bold;
        padding: 0;
    }
    .dgp-system-config-modal .ivu-modal-body{
        font-size: .14rem;
        padding: .1rem 0;
    }
    .dgp-system-config-modal .ivu-modal-body .ivu-modal-footer .ivu-btn>span{
        vertical-align: inherit;
    }
    .dgp-system-config-modal .ivu-modal-header>.ivu-modal-header-inner{
        padding-left: .24rem;
        height:.58rem;
        font-size: .14rem;
        line-height: .58rem;
    }
    .dgp-config-modal-item{
        padding: .17rem .2rem;
    }
    .dgp-config-modal-item input[type=text]{
        height: .42rem;
        line-height: .42rem;
        border-width:.01rem;
        border-style:solid;
        padding-left: .1rem;
        border-radius: .03rem;
        font-size: .14rem;
    }
    .dgp-config-modal-item>span{
        display: inline-block;
        text-align: right;
        padding-right: .16rem;
        width: 1.35rem;
    }
    .dgp-config-modal-item>span>i{
        font-size: .2rem;
        padding: 0 .05rem;
    }
    .dgp-config-modal-item>.ivu-input-wrapper{
        display: inline-block;
        width: 5.2rem;
        height: .42rem;
    }
    .dgp-config-modal-item .ivu-radio-group-button>.ivu-radio-wrapper{
        border-radius: .03rem;
        min-width:.8rem;
        height:.38rem;
        text-align: center;
        line-height: .38rem;
        font-size: .14rem;
        border-width:.01rem;
        border-style:solid;
        overflow: hidden;
        box-shadow: none;
        outline: none;
    }
    .dgp-config-modal-item .ivu-radio-group-button>.ivu-radio-wrapper:first-child{
        margin-right: .2rem;
    }
    .dgp-system-config-modal .ivu-modal-footer button{
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        min-width: .86rem;
        height:.38rem;
        line-height: .38rem;
        font-size: .14rem;
        padding:0;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .vertical-center-modal .ivu-modal{
        top: 0;
    }
    .dgp-tableArea  .dgp-topBtn .dgp-query-inTable .ivu-input-wrapper input {
        width: 3.3rem;
        height: .36rem;
        line-height: .36rem;
        border: .01rem solid #D9D9D9;
        border-right: none;
        border-radius: .03rem 0 0 .03rem;
        padding: 0 .1rem;
        vertical-align: baseline;
        font-size: 0.16rem;
    }
    .dgp-tableArea .dgp-topBtn .dgp-query-inTable .ivu-input-wrapper {
        width: 3.3rem;
        vertical-align: baseline;
    }
    .dgp-tableArea .dgp-topBtn .dgp-query-inTable button {
        min-width: unset;
        width: .42rem;
        height: .36rem;
        line-height: .36rem;
        text-align: center;
        border-radius: 0 .03rem .03rem 0;
        vertical-align: baseline;
        font-size: 0.16rem;
        background-color: #32B3EA;
        cursor: pointer;
        border:none;
    }
    .dgp-tableArea .dgp-topBtn .dgp-query-inTable{
        float: right;
        margin-right: .3rem;
    }
    .dgp-tableArea .dgp-topBtn .dgp-query-inTable .ivu-input-wrapper .ivu-input-icon{
        width: .36rem;
        height: .36rem;
        line-height: .36rem;
        font-size: .16rem;
        cursor: pointer;
    }
</style>