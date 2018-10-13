<template>
    <div class="dgp-jurisdictionSystem">
        <div class="dgp-tableArea">
            <div class="dgp-operateButton dgp-query-inTable clearfix">
                <button class="btn-primary fr" @click="initTable"><Icon type="ios-search-outline" /></button>
                <Input type="text" class="fr"  clearable  placeholder="请输入角色名称" v-model="roleName" />
            </div>
            <tree-auth-management class="dgp-auth-management" @handledosave="handleHideAuthTree" :rowData="rowData"></tree-auth-management>
            <div class="dgp-tableBody">
                <div class="home-table">
                    <Table :loading="loading" :height="tableHeight" :columns="columnsAll" :data="dataAll"></Table>
                </div>
            </div>
            <div v-show="pages" class="dgp-pagenation-dialog clearfix">
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
    import "../../assets/css/pagenation.css";
    import TreeAuthManagement from "../../components/tree/tree_authorization_management";
    export default {
        name: "dgp-system-jurisdiction",
        data:function(){
            return {
                loading: true,
                rowData:{},
                roleCode:'',
                roleName:'',
                roleDesc:'',
                searchWord:'我是不存在的值',  //表格无数据背景显示默认值
                queryIsShow:false,
                queryShow:false,
                queryToggleShow:true,
                pageNumber:1,
                pages:false,
                pageSize:10,
                jurisdictionTreeHeight:0,
                tableHeight:null,
                sortOrder:'acs',//默认排序方式acs，还有一种desc
                total:0,//总条数
                //头部切换按钮
                addCode:`<i class="dgp-rightSwitch">+<i>`,
                reduceCode:`<i class="dgp-rightSwitch">-<i>`,
                /*表格表头数据*/
                columnsAll: [
                    /*{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },*/
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
                        title: '角色描述',
                        key: 'roleDesc',
                        ellipsis:true
                    },
                    {
                        title: '操作',
                        key: 'control',
                        width: 100,
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
                                        cursor:'pointer'
                                    },
                                    on: {
                                        click: (e) => {
                                            if (e.stopPropagation) {
                                                e.stopPropagation(); 
                                            }
                                            else {
                                                e.cancelBubble = true; 
                                            }
                                            this.handleToggleManagement(params.index);
                                            this.rowData = params.row;
                                        }

                                    }
                                }, '分配权限')
                            ]);
                        }
                    }
                ],
                /*表格body数据*/
                dataAll: [
                ]
            }
        },
        components:{TreeAuthManagement},
        methods:{
            queryBlock(){
                this.queryShow = !this.queryShow;
                let len=$('.dgp-leftTitle').find('li').length;
                if(len>4){
                    this.queryIsShow=!this.queryIsShow;
                }
            },
            spreadFunc(){
                $('.dgp-jurisdiction-leftTitle span').html(this.addCode);
            },
            checkDataAll(){
                if(this.dataAll.length){
                    this.pages=true;
                }else{
                    this.pages=false;
                }
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
                            roleName:this.roleName,
                            roleDesc:this.roleDesc,
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
            doEmpty(){
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
            handleToggleManagement(index){/*index索引号*/
                $('.dgp-auth-management').animate({'margin-right':'0'},100).show();
                //code
            },
            handleHideAuthTree(){
                //console.log('outTree');
                $('.dgp-auth-management').animate({'margin-right':'-4rem'},100).hide();
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
                this.jurisdictionTreeHeight=tHeight;
                let tBody = tHeight-$('.dgp-tableArea>.dgp-operateButton').innerHeight()-$('.dgp-tableArea>.dgp-pagenation-dialog').height();
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
            //头部切换按钮初始化函数
            this.spreadFunc();
            this.initTable();
            this.handleTableAreaInit();
            this.queryInit();

            let that = this;//转换下this指向
            $('body').click(function(e) { 
                that.handleHideAuthTree();
            })
            $('.dgp-auth-management').bind('click',function(e){ 
                if (e.stopPropagation) {
                    e.stopPropagation(); 
                }
                else {
                    e.cancelBubble = true; 
                }
            });
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
            $(window).resize(()=>{
                this.handleTableAreaInit();
            });
        },
        updated(){
            //createTable();
            //this.checkDataAll();
            this.pagesInit();
        }
    }
</script>

<style scoped>
    .dgp-jurisdictionSystem{
        /* padding-top:.31rem;
        padding-left:.7rem; */
    }
    .dgp-jurisdictionSystem .dgp-operateButton{
        text-align: right;
        padding: .22rem .3rem;
        height: .8rem;
    }
    .dgp-jurisdiction-queryArea{
        border-radius: .03rem;
        margin-bottom:.28rem;
        position:relative;
    }
    .dgp-jurisdiction-leftTitle{
        width:100%;
        height:.5rem;
        line-height:.5rem;
        padding-left:.31rem;
        font-size: .16rem;
        border-bottom-width:.01rem;
        border-bottom-style:solid;
        font-family: PingFangSC-Regular;
    }
    .dgp-jurisdiction-middleContent{
        /*height:1.09rem;*/
        padding-top:.37rem;
        font-size: .14rem;
        font-family: PingFangSC-Regular;
    }
    .dgp-jurisdiction-middleContent label{
        min-width:.7rem;
        height:.2rem;
        padding-left:.31rem;
    }
    .dgp-jurisdiction-middleContent input{
        width:2.14rem;
        height:.3rem;
        border-width:.01rem;
        border-style:solid;
        border-radius: .03rem;
        padding-left:.15rem;
    }
    .dgp-jurisdiction-middleContent button{
        width:.64rem;
        height:.3rem;
        margin-left:.2rem;
        margin-bottom: .42rem;
        cursor:pointer;

    }

    /*表格内容部分*/
    .dgp-jurisdictionSystem .dgp-tableArea{
        /*padding-top: .28rem;*/
    }
    .dgp-tableArea{
        /*width:17.02rem;*/
        border-radius: .03rem;
        position: relative;
    }
    .dgp-tableArea .dgp-auth-management{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1000;
        margin-right: -100%;
    }
    /*table主体部分*/
    .dgp-tableBody{
        width: 100%;
        margin:0 auto;
        padding: 0 .28rem;
    }

    /* dgp-pagenation-dialog 分页器样式 */
    .dgp-pagenation-dialog{
        height: .8rem;
        width:100%;
    }
    .dgp-pagenation-pages{
        padding-top: .24rem;
    }


    .dgp-tableArea .dgp-operateButton.dgp-query-inTable>button{
        width:.42rem;
        height:.36rem;
        line-height: .36rem;
        text-align: center;
        border-radius:0 .03rem .03rem 0;
        vertical-align: baseline;
        font-size: 0.16rem;
        background-color: #32B3EA;
        cursor: pointer;
    }
</style>
<style>
    .dgp-jurisdictionSystem .dgp-tree-Authorization .ztree{
        position: absolute;
        top:.8rem;
        left: 0;
        bottom: .8rem;
    }
    .dgp-tableArea .dgp-operateButton.dgp-query-inTable .ivu-input-wrapper{
        width: 3.3rem;
        vertical-align: baseline;
    }
    .dgp-tableArea .dgp-operateButton.dgp-query-inTable .ivu-input-wrapper .ivu-input-icon{
        width: .36rem;
        height: .36rem;
        line-height: .36rem;
        font-size: .16rem;
        cursor: pointer;
    }
    .dgp-tableArea .dgp-operateButton.dgp-query-inTable .ivu-input-wrapper input{
        width:3.3rem;
        height:.36rem;
        line-height: .36rem;
        border:.01rem solid #D9D9D9;
        border-right: none;
        border-radius: .03rem 0  0  .03rem;
        padding:0 .1rem;
        vertical-align: baseline;
        font-size: 0.16rem;
    }
</style>