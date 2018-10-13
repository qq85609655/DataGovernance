<template>
    <div class="dgp-processSystem">
        <div class="dgp-queryArea">
            <ul class="dgp-leftTitle clearfix" :class="{'dgp-leftTitle-toggle':queryIsShow}">
                <li class="dgp-topQuery-title">查询区</li>
                <!--<span class="dgp-queryToggle-button" @click.stop="queryUserBlock" ></span>-->

                <li>
                    <span>流程key：</span>
                    <input type="text"  @keyup.enter="initTable"  placeholder="请输入流程key"  v-model="key">
                </li>
                <li>
                    <span>部署名称：</span>
                    <input type="text"  @keyup.enter="initTable"  placeholder="请输入部署名称" v-model="deployName">
                </li>
                <li v-show="queryIsShow">
                    <span>所属业务：</span>
                    <input type="text"  @keyup.enter="initTable"   placeholder="请输入所属业务" v-model="deployTenantId">
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
            <div class="dgp-topBtn">
                <button  @click="showProcessModal" class="btn-primary"><Icon class="dgp-showModal-addIcon" type="md-add" />新增</button>
                <button class="btn-default" @click="handleShowDeleteData" style="border: none">删除</button>
                <modal-del-none :systemDelNoneNotice="systemDelNoneNoticeModal" @systemDelNoneNoticeFun="systemDelNoneNoticeModalFun"></modal-del-none>
                <modal-del-data  :systemDelDataNotice="systemDelDataNoticeModal"  @systemDelDataNoticeFun="systemDelDataNoticeModalFun"></modal-del-data>
                <!--配置模态框-->
                <Modal
                        title="流程定义"
                        v-model="processModal"
                        @on-ok="handleDoProcess"
                        @on-cancel="handleCancelProcess"
                        class-name="vertical-center-modal dgp-system-process-modal" style="width:6rem">
                    <div class="dgp-process-modal-item">
                        <span class="dgp-process-title">部署名称:</span>
                        <Input placeholder="请输入部署名称" type="text" v-model="deployNameModal"/>
                    </div>
                    <div class="dgp-process-modal-item">
                        <span class="dgp-process-title">所属业务:</span>
                        <Input placeholder="请输入部署业务" type="text" v-model="deployTenantIdModal"/>
                    </div>
                    <div class="dgp-process-modal-item dgp-process-upload">
                        <span class="dgp-process-title">部署文件:</span>
                        <!--<Upload action="../api/DGP/workFlowDeploy/deploy">
                            <Button icon="ios-cloud-upload-outline" type="file" v-model="filename">上传文件</Button>
                        </Upload>-->
                        <input icon="ios-cloud-upload-outline"  type="file" @change="getFile($event)">
                    </div>
                </Modal>
            </div>
            <div class="dgp-tableBody">
                <!--表格组件-->
                <div class="home-table">
                    <Table :loading="loading" :height="tableHeight" @on-selection-change="handleToggleTotal"  ref="selection" :columns="columnsAll" :data="dataAll"></Table>
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
    import ModalDelNone from "../../components/modal/modal_delNone";
    import ModalDelData from "../../components/modal/modal_delData";
    import "../../assets/css/pagenation.css";
    export default {
        name: "dgp-system-process",
        data:function(){
            return {
                loading: true,
                total:'',
                cascade:true,//是否练级删除
                deployNameModal:'',
                deployTenantIdModal:'',
                fileName:'',
                key:'',
                deployName:'',
                deployTenantId:'',
                sortOrder:'asc',
                pageSize:10,
                pageNumber:1,
                systemDelNoneNoticeModal:false,      //删除无数据时提示框
                systemDelDataNoticeModal:false,      //有数据时提示框
                selectionDate:[],               //表格选中项数据集合,[]初始化数据为[]
                processModal:false,             //是否显示配置模态框
                processName:'',                 //部署名称
                processBusiness:'',             //所属业务
                processFile:'',                 //部署文件
                pages:null,
                searchWord:'我是不存在的值',      //表格无数据背景显示默认值
                queryIsShow:false,
                queryShow:false,
                queryToggleShow:true,
                tableHeight:null,
                //头部切换按钮
                addCode:`<i class="dgp-rightSwitch">+<i>`,
                reduceCode:`<i class="dgp-rightSwitch">-<i>`,
                keyValue:'',
                deployValue:'',
                workValue:'',
                /*表格表头数据*/
                columnsAll: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '部署名称',
                        key: 'deployName',
                        ellipsis:true
                    },
                    {
                        title: '部署时间',
                        key: 'deployTime',
                        ellipsis:true
                    },
                    {
                        title: '流程key',
                        key: 'key',
                        ellipsis:true
                    },
                    {
                        title: '流程名称',
                        key: 'name',
                        width:100,
                        ellipsis:true
                    },
                    {
                        title: '描述信息',
                        key: 'description',
                        ellipsis:true
                    },
                    {
                        title: '所属业务',
                        key: 'deployTenantId',
                        ellipsis:true
                    },
                    {
                        title: '版本',
                        key: 'version',
                        width:80,
                        ellipsis:true
                    },
                    {
                        title: '操作',
                        key: 'control',
                        width: 150,
                        align: 'left',
                        render: (h, params) => {
                        return h('div', [
                            h('A', {
                                props: {
                                    type: 'default',
                                    size: 'small'
                                },
                                style: {
                                    color:'#1890FF',
                                    marginRight:'2px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                    //this.remove(params.index);
                                    ////console.log(h,params.row.suspensionState);
                                    this.postRequest({
                                        url:'/DGP/workFlowDeploy/'+params.row.id+'/'+!params.row.suspensionState,
                                        success:(res)=>{
                                            if(res.success){
                                                this.$Message.info(res.msg);
                                                this.initTable();
                                            }
                                        },
                                        errro:()=>{

                                        }
                                    })
                                }
                            }
                            }, params.row.suspensionState ? '激活':'中止'),
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
                                        let url = '/DGP/workFlowDeploy/viewPic/'+params.row.deploymentId+'/'+params.row.dgrmResourceame;
                                        var xhr = new XMLHttpRequest();
                                        xhr.open('GET', url, true);
                                        //xhr.responseType = "blob";
                                        xhr.setRequestHeader('Authorization',window.localStorage.getItem('token'));
                                        //xhr.setRequestHeader("client_type", "DESKTOP_WEB");
                                        xhr.onload = function () {
                                            if (this.status == 200) {
                                                var blob = this.response;
                                                ////console.log(blob);
                                                var img = document.createElement("img");
                                                img.src = window.URL.createObjectURL(blob);
                                                img.onload = function(e) {
                                                    window.URL.revokeObjectURL(img.src);
                                                };
                                                
                                                ////console.log(img.src);
                                                $("body").html(img);
                                            }
                                        }
                                        xhr.send();


                                        //window.open('/DGP/workFlowDeploy/viewPic/'+params.row.deploymentId+'/'+params.row.dgrmResourceame);   

                                        // this.postRequest({
                                        //     url:'/DGP/workFlowDeploy/viewPic/'+params.row.deploymentId+'/'+params.row.dgrmResourceame,
                                        //     success:(res)=>{
                                        //         //window.open(res);
                                        //         //console.log(res);
                                        //         // //console.log(new Uint8Array(res));
                                        //         // //console.log('data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte),'')))
                                        //     }
                                        // })
                                }
                            }
                            }, '查看流程图')
                        ]);
                    }
                    }
                ],
                /*表格body数据*/
                dataAll: []
        }
        },
        components:{ModalDelData, ModalDelNone},
        methods:{
            queryBlock(){
                this.queryShow = !this.queryShow;
                let len=$('.dgp-leftTitle').find('li').length;
                if(len>4){
                    this.queryIsShow=!this.queryIsShow;
                }
            },
            spreadFunc(){
                $('.dgp-process-leftTitle span').html(this.addCode);
            },
            doEmpty(){//重置按钮清空内容
                this.key='';
                this.deployName='';
                this.deployTenantId='';
                this.initTable();
            },
            checkDataAll(){/*检测表格数据是否为空*/
                if(this.dataAll.length){
                    this.pages=true;
                }else{
                    this.pages=false;
                }
            },
            getFile(event) {
                this.fileName = event.target.files[0];
                ////console.log(this.file);
            },
            handleDoProcess(){/*确定流程定义*/
                //console.log('ok---process');
                let formData = new FormData();
                formData.append('deployName', this.deployNameModal);
                formData.append('deployTenantId', this.deployTenantIdModal);
                formData.append('fileName', this.fileName);
                let that = this;
                this.postRequest({
                    url: '/DGP/workFlowDeploy/deploy',
                    data: {
                        //id:this.showData.id,
                        deployName: this.showData.deployName,
                        deployTenantId: this.showData.deployTenantId,
                        fileName: this.showData.fileName
                    }
                })

            },
            showMessage(msg){
                //console.log(this.$Message);
                this.$Message.info(msg);

            },
            handleCancelProcess(){/*取消流程定义*/
                //console.log('cancel---process');
            },
            processModalInit(){/*初始化关闭，保存*/
                $('.dgp-system-process-modal .ivu-modal').width('6.5rem');
                $('.dgp-system-process-modal .ivu-modal-footer>button:first-child>span').html('关闭');
                $('.dgp-system-process-modal .ivu-modal-footer>button:last-child>span').html('保存');
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
                    let that = this;
                    let json = {};
                    json.list = this.selectionDate;
                    this.postRequestJson({
                        url:'/api/DGP/workFlowDeploy/deleteAll/'+this.cascade,
                        data: json,
                        success:(res)=>{
                            that.initTable();
                            that.showMessage(res.msg);
                        },
                        error:(res)=>{
                        }
                    })
                }
            },
            showProcessModal(){
                this.processModal = true;
                this.deployNameModal='';
                this.deployTenantIdModal='';
                $("input[type=file]").val('');
            },
            handleToggleTotal(selection){/*table全选*/
                this.selectionDate=selection;
                //console.log(this.selectionDate);
            },
            initTable(){//请求接口调用树的数据
                this.postRequestJson({
                    url:'/DGP/workFlowDeploy/getDeployList',
                    data:JSON.stringify({
                        pagination:{
                            sortOrder:this.sortOrder,
                            pageSize:this.pageSize,
                            pageNumber:this.pageNumber
                        },
                        search:{
                            key:this.key,
                            deployName:this.deployName,
                            deployTenantId:this.deployTenantId
                        }
                    }),
                    success:(res)=>{
                        this.loading = false;
                        this.dataAll = res.obj.rows;
                        // for(let i=0;i< res.rows.length;i++){
                        //     this.dataAll.push(res.row[i]);
                        // }
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
        watch:{

        },
        mounted(){
            /*显示空白页面初始化*/
            blankTable.apply(this);
            //this.checkDataAll();
            /*初始化按钮文字*/
            this.processModalInit();
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
            //this.checkDataAll();
            this.pagesInit();
            this.handleTableAreaInit();
        }
    }
</script>
<style scoped>
    .dgp-processSystem{
        /* padding-top:.31rem;
        padding-left:.7rem; */
    }
    .dgp-process-queryArea{
        /*width:16.8rem;*/
        border-radius: .03rem;
        margin-bottom:.28rem;
        position:relative;
    }
    .dgp-process-leftTitle{
        width:100%;
        height:.5rem;
        line-height:.5rem;
        padding-left:.31rem;
        font-size: .16rem;
        border-bottom-width:.01rem;
        border-bottom-style:solid;
        font-family: PingFangSC-Regular;
    }
    .dgp-process-middleContent{
        /*height:1.54rem;*/
        padding-top:.37rem;
        font-size: .14rem;
        font-family: PingFangSC-Regular;
        clear:both;
    }
    .dgp-process-middleContent div{
        float:left;
    }
    .process-key{
        padding-left:.31rem;
    }
    .dgp-process-middleContent label{
        min-width:.7rem;
        height:.2rem;
    }
    .dgp-process-middleContent label:not(.process-key){
        margin-left:.7rem;
    }
    .dgp-process-middleContent input{
        width:2.14rem;
        height:.3rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        padding-left:.15rem;
    }
    .dgp-process-middleContent .dgp-timeEnd{
        margin-left:.28rem;
    }
    .dgp-process-button{
        margin:.3rem 0 .28rem 15.29rem;
    }
    .dgp-process-button button{
        min-width:.64rem;
        height:.3rem;
        cursor:pointer;
        font-family: PingFangSC-Regular;
        font-size: .14rem;
    }
    .dgp-process-button button:first-child{
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
    }
    .dgp-process-button button:last-child{
        border-radius: .03rem;
        margin-left:.13rem;
    }

    /*表格内容部分*/
    .dgp-tableArea{
        /* width:16.80rem; */
        border-radius: .03rem;
        position: relative;
    }
    .dgp-tableBody{
        width: 100%;
        margin: 0 auto;
        padding: 0 .28rem;
    }
    .dgp-topBtn{
        padding:.22rem .28rem;
        height: .8rem;
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
        vertical-align: middle;
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
    /*-------------------------------------------------------*/

    /*systemProcess modal样式初始化*/
    .dgp-system-config-modal{
        font-size: .14rem;
    }
    .dgp-system-process-modal .ivu-modal-content{
        border-radius: .03rem;
    }
    .dgp-system-process-modal .ivu-modal-close{
        top:.13rem;
        font-size: .12rem;
    }
    .dgp-system-process-modal .ivu-modal-close .ivu-icon-ios-close{
        font-size: .32rem;
    }
    .dgp-system-process-modal .ivu-modal-header{
        height: .58rem;
        font-weight: bold;
        padding: 0;
    }
    .dgp-system-process-modal .ivu-modal-body{
        font-size: .14rem;
        padding: .1rem .35rem;
        /*margin-left: .15rem;*/
    }
    .dgp-system-process-modal .ivu-modal-header>.ivu-modal-header-inner{
        padding-left: .24rem;
        height:.58rem;
        font-size: .14rem;
        line-height: .58rem;
    }
    .dgp-process-modal-item{
        padding: .17rem 0 ;
    }
    .dgp-process-modal-item:not(:last-child) input{
        height: .42rem;
        line-height: .42rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        font-size: .14rem;
        padding: .04rem;
    }
    .dgp-process-modal-item>.dgp-process-title{
        display: inline-block;
        text-align: right;
        font-size: .14rem;
        padding-right: .16rem;
        min-width: 1.2rem;
        max-width:1.4rem;
    }
    .dgp-process-modal-item.dgp-process-upload{
        display: table-cell;
    }
    .dgp-process-modal-item.dgp-process-upload>.dgp-process-title{
        vertical-align: top;
    }
    .dgp-process-modal-item>.ivu-upload .ivu-btn{
        min-width:.8rem;
        border-radius: .03rem;
        font-size: .12rem;
        padding: .03rem;
    }
    .dgp-process-modal-item>.ivu-upload .ivu-btn>.ivu-icon{
        line-height: .22rem;
    }
    .dgp-process-modal-item>.ivu-upload{
        width:3.65rem;
        display: inline-block;
    }
    .dgp-process-modal-item>.ivu-upload .ivu-upload-list span{
        border-radius: .03rem;
        overflow: hidden;
    }
    .dgp-process-modal-item>span>i{
        font-size: .2rem;
        padding: 0 .05rem;
    }
    .dgp-process-modal-item>.ivu-input-wrapper{
        display: inline-block;
        height: .42rem;
        width: 4.3rem;
    }
    .dgp-process-modal-item .ivu-radio-group-button>.ivu-radio-wrapper{
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
    .dgp-process-modal-item .ivu-radio-group-button>.ivu-radio-wrapper:first-child{
        margin-right: .2rem;
    }
    .dgp-system-process-modal .ivu-modal-footer button{
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
    .dgp-tableArea .dgp-showModal-addIcon{
        position: relative;
        top:-0.02rem;
    }
    /*--------------------------------------------------------------*/
</style>