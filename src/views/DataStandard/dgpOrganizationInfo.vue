<template>
    <div class="dgp-standard-info">
        <div class="dgp-standard-info-list clearfix">
            <div class="dgp-standard-info-form">
                <div class="dgp-info-list-title">
                    <span>申请单</span>
                    <Icon type="ios-arrow-forward" />
                    <Icon type="ios-arrow-back" />
                </div>
                <ul class="dgp-info-appList clearfix">
                    <li><img :src="require('../../assets/images/dataStandard/dgpStandardInfoAdd.png')">
                        <p>指标标准(部门)新增</p>
                    </li>
                    <li><img :src="require('../../assets/images/dataStandard/dgpStandardInfoTechRevise.png')">
                        <p>指标标准技术修订</p>
                    </li>
                    <li><img :src="require('../../assets/images/dataStandard/dgpStandardInfoBusinessRevise.png')">
                        <p>指标标准业务修订</p>
                    </li>
                    <li><img :src="require('../../assets/images/dataStandard/dgpStandardInfoAbolish.png')">
                        <p>指标标准废止</p>
                    </li>
                    <li><img :src="require('../../assets/images/dataStandard/dgpStandardInfoAdd.png')">
                        <p>指标标准(科技)新增</p>
                    </li>
                    <li><img :src="require('../../assets/images/dataStandard/dgpStandardInfoIssue.png')">
                        <p>指标标准发布</p>
                    </li>
                </ul>
            </div>
            <div class="dgp-standard-info-approval">
                <div class="dgp-info-list-title">
                    <span>待我审批</span>
                    <Icon type="ios-arrow-forward" />
                    <Icon type="ios-arrow-back" />
                </div>
                <!--表格组件-->
                <div class="home-table">
                    <Table  :loading="loading"  :columns="columnsAllApply" :data="dataAllApply" style="height: 2.36rem"></Table>
                </div>
            </div>
        </div>
        <div class="dgp-standard-info-sponsor">
            <div class="dgp-info-sponsor-wrap">
                <div class="dgp-info-sponsor-title">
                    <span class="dgp-sponsor-table-title">我发起的</span>
                    <div class="dgp-query-inTable clearfix">
                        <Dropdown class="dgp-sponsor-dropdown fl">
                            <Button type="default">
                                我发起的
                                <Icon type="md-arrow-dropdown" />
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem>我发起的</DropdownItem>
                                <DropdownItem>我发起的</DropdownItem>
                                <DropdownItem disabled>我发起的</DropdownItem>
                                <DropdownItem>我发起的</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Input type="text" class="fl"  clearable  placeholder="请输入关键词" />
                        <button class="btn-primary fr" ><Icon type="ios-search-outline" /></button>
                    </div>
                </div>
                <div class="home-table">
                    <Table :height="tableHeight"  :loading="!loading"  :columns="columnsAllSubmit" :data="dataAllSubmit"></Table>
                </div>
                <div class="dgp-pagenation-dialog">
                    <Page  :current="1"  :total="100" show-elevator show-sizer class-name="dgp-page-active dgp-pagenation-pages"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {createTable,blankTable} from '../../components/table/table_methods'
    export default {
        name: "dgp-qualty-info",
        data(){
            return{
                tableHeight:0,
                loading:true,
                /*表格表头数据*/
                columnsAllApply: [
                    /*{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },*/
                    {
                        title: '申请内容',
                        key: 'applyContent',
                        ellipsis:true,
                        render:(h,params)=>{
                            return h('A',  {
                                style: {
                                    color:'#3B6DDF',
                                    cursor:'pointer'
                                }
                            },params.row.applyContent)
                        }
                    },
                    {
                        title: '申请类别',
                        key: 'applyCategory',
                        ellipsis:true
                    },
                    {
                        title: '申请人',
                        key: 'applyUser',
                        ellipsis:true
                    },
                    {
                        title: '申请时间',
                        key: 'applyDate',
                        ellipsis:true
                    },
                    {
                        title: '状态',
                        key: 'applyState',
                        width:100,
                        ellipsis:true
                    }
                ],
                dataAllApply:[
                    {
                        applyContent:'国家地区修订申请',
                        applyCategory:'基础类标准',
                        applyUser:'吴建华',
                        applyDate:'2017-08-09',
                        applyState:'审核中'
                    },
                    {
                        applyContent:'国家地区修订申请',
                        applyCategory:'基础类标准',
                        applyUser:'吴建华',
                        applyDate:'2017-08-09',
                        applyState:'审核中'
                    },
                    {
                        applyContent:'国家地区修订申请',
                        applyCategory:'基础类标准',
                        applyUser:'吴建华',
                        applyDate:'2017-08-09',
                        applyState:'审核中'
                    }
                    ,
                    {
                        applyContent:'国家地区修订申请',
                        applyCategory:'基础类标准',
                        applyUser:'吴建华',
                        applyDate:'2017-08-09',
                        applyState:'审核中'
                    },
                    {
                        applyContent:'国家地区修订申请',
                        applyCategory:'基础类标准',
                        applyUser:'吴建华',
                        applyDate:'2017-08-09',
                        applyState:'审核中'
                    }
                ],
                columnsAllSubmit: [
                    /*{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },*/
                    {
                        title: '申请单',
                        key: 'applyUser',
                        ellipsis:true
                    },
                    {
                        title: '申请内容',
                        key: 'applyContent',
                        ellipsis:true
                    },
                    {
                        title: '申请内容',
                        key: 'applyContent',
                        ellipsis:true
                    },
                    {
                        title: '提交时间',
                        key: 'submitTime',
                        ellipsis:true
                    }
                ],
                dataAllSubmit:[
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    },
                    {
                        applyUser:'数据新增申请',
                        applyContent:'公共主题/往来信息/归属信息',
                        applyContent:'公共主题/往来信息/归属信息',
                        submitTime:'2017-08-09 08:00'
                    }
                ]
            }
        },
        methods:{
            handleTableAreaInit(){
                let tHeight = $('.dgp-standard-info').height() - $('.dgp-standard-info-list').height() - parseFloat($('.dgp-standard-info-list').css('margin-bottom'));
                let tBody = tHeight - $('.dgp-standard-info-sponsor .dgp-info-sponsor-title').innerHeight()-$('.dgp-standard-info-sponsor .dgp-pagenation-dialog').height();
                this.tableHeight=tBody;
            }
        },
        mounted(){
            /*显示空白页面初始化*/
            blankTable.apply(this);
            this.handleTableAreaInit();
            $(window).resize(()=>{
                this.handleTableAreaInit();
            });
        },
        updated(){
            this.handleTableAreaInit();
        }
    }
</script>

<style scoped>
    .dgp-standard-info{
        width: 17.6rem;
        height: 100%;
        position: relative;
    }
    .dgp-standard-info-list{
        margin-bottom: .2rem;
    }
    .dgp-standard-info-list>div{
        width: 8.7rem;
        height: 2.8rem;
        border-radius: .03rem;
        background-color: #FFF;
    }
    .dgp-standard-info-list .dgp-standard-info-form{
        float: left;
        overflow: hidden;
    }
    .dgp-standard-info-form .dgp-info-appList{
        width: 100%;
        height: 2.36rem;
    }
    .dgp-standard-info-form .dgp-info-appList>li{
        padding-top: .1rem;
        width: 25%;
        height: 1.18rem;
        float: left;
        color:#333;
        cursor: pointer;
        text-align: center;
        position: relative;
    }
    .dgp-standard-info-form .dgp-info-appList>li:after{
        position: absolute;
        top:.25rem;
        right: -2px;
        content: '';
        display: block;
        height: .5rem;
        width: 2px;
        background-color: #D8D8D8;
    }
    .dgp-standard-info-form .dgp-info-appList>li>img{
        width: .5rem;
        height: .54rem;
    }
    .dgp-standard-info-list .dgp-info-list-title{
        height: .44rem;
        line-height: .44rem;
        padding-left: .3rem;
        padding-right: .12rem;
        font-size: .14rem;
        font-weight: bold;
        position: relative;
        border-bottom: .01rem solid #F5F5F5;
    }
    .dgp-standard-info-list .dgp-info-list-title>.ivu-icon{
        float: right;
        margin-top: .12rem;
        cursor: pointer;
        width: .22rem;
        height: .22rem;
        border: .01rem solid #B8DBEA;
        line-height: .22rem;
        text-align: center;
        font-weight: normal;
        color: #B8DBEA;
        background-color: #FFF;
    }
    .dgp-standard-info-list .dgp-info-list-title>.ivu-icon:hover{
        color: #FFF;
        background-color: #32B3EA;
        border-color: #32B3EA;
    }
    .dgp-standard-info-list .dgp-standard-info-approval{
        float: right;
    }
    .dgp-standard-info-sponsor{
        top:3rem;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #FFF;
        border-radius: .03rem;
    }
    .dgp-standard-info-sponsor .dgp-info-sponsor-wrap{
        position: relative;
        height: 100%;
    }
    .dgp-info-sponsor-wrap .dgp-pagenation-dialog{
        position: absolute;
        left: 0;
        bottom: 0;
        height: .8rem;
        width: 100%;
    }
    .dgp-info-sponsor-wrap .dgp-pagenation-dialog .dgp-pagenation-pages{
        padding-top: .24rem;
    }
    .dgp-info-sponsor-wrap .home-table{
        position: absolute;
        top: 1rem;
        bottom: .8rem;
        width: 100%;
        left: 0;
        padding: 0 .28rem;
        height: unset;
    }
    .dgp-info-sponsor-wrap  .home-table .ivu-table-wrapper{
        height: 100%;
    }
    .dgp-standard-info-sponsor .dgp-info-sponsor-title{
        height: 1rem;
        position: relative;
        padding: .3rem 0.28rem;
        font-size: .3rem;
        font-weight: bold;
    }
    .dgp-standard-info-sponsor .dgp-info-sponsor-title .dgp-sponsor-dropdown{
        width: 1.42rem;
        z-index: 10;
        left: .01rem;
        position: relative;
        font-size: .18rem;
        padding: 0;
        height: .4rem;
        line-height: .4rem;
        border-radius: .03rem;
    }
    .dgp-standard-info-sponsor .dgp-info-sponsor-title .dgp-query-inTable{
        width: 3.92rem;
        height: .4rem;
        position: absolute;
        top:.3rem;
        right: 0.28rem;
    }
    .dgp-standard-info-sponsor .dgp-info-sponsor-title .dgp-query-inTable>.ivu-input-wrapper{
        width: 1.9rem;
        display: inline-block;
        height: .4rem;
        line-height: .4rem;
        font-size: .16rem;
       /* vertical-align: baseline;*/
    }
    .dgp-standard-info-sponsor .dgp-info-sponsor-title .dgp-query-inTable>button {
        width: .6rem;
        float: left;
        line-height: .4rem;
        height: .4rem;
        text-align: center;
        border-radius: 0 .03rem .03rem 0;
        vertical-align: bottom;
        padding: 0;
        font-size: .16rem;
        background-color: #32B3EA;
        cursor: pointer;
    }
    .dgp-standard-info-sponsor  .dgp-sponsor-table-title{
        position: relative;
        padding-left: .2rem;
        height: .4rem;
        line-height: .4rem;
    }
    .dgp-standard-info-sponsor  .dgp-sponsor-table-title:after{
        content: '';
        position: absolute;
        top: .07rem;
        left: 0;
        width: .07rem;
        height: .26rem;
        display: block;
        border-radius: .03rem;
        background-color: #D8D8D8;
    }
    .dgp-standard-info-approval .home-table{
        height: 2.36rem;
        overflow: hidden;
    }

</style>
<style>
    .dgp-standard-info-approval .home-table .ivu-table tr,
    .dgp-standard-info-approval .home-table .ivu-table td,
    .dgp-standard-info-approval .home-table .ivu-table th{
        height: .4rem;
    }
    .dgp-standard-info-approval .home-table .ivu-table tr{
        border-radius: .03rem;
        overflow: hidden;
    }
    .dgp-standard-info-sponsor  .dgp-query-inTable>.ivu-input-wrapper input {
        width: 1.9rem;
        height: .4rem;
        line-height: .4rem;
        border: .01rem solid #D9D9D9;
        border-right: none;
        border-radius: 0;
        padding: 0 .1rem;
        vertical-align: baseline;
        font-size: 0.16rem;
        border-left: none;
        border-right: none;
    }
    .dgp-standard-info-sponsor  .dgp-query-inTable>.ivu-input-wrapper .ivu-input-icon{
        width: .4rem;
        height: .4rem;
        line-height: .4rem;
        font-size: .16rem;
        cursor: pointer;
    }
    .dgp-standard-info-sponsor  .dgp-sponsor-dropdown .ivu-select-dropdown{
        border-radius: .03rem;
        box-shadow: 0 .01rem .01rem rgba(0,0,0,.2);
    }
    .dgp-standard-info-sponsor  .dgp-sponsor-dropdown .ivu-dropdown-rel{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .dgp-standard-info-sponsor  .dgp-sponsor-dropdown .ivu-dropdown-rel>button{
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: none;
        width: 1.42rem;
        font-size: .18rem;
        padding: 0;
        height: .4rem;
        text-align: center;
        line-height: .4rem;
        border-radius: .03rem;
        border:.01rem solid #DCDCDC;
    }
    .dgp-standard-info-sponsor  .dgp-sponsor-dropdown .ivu-dropdown-rel>button>span{
         color: #333;
     }
    .dgp-standard-info-sponsor  .dgp-sponsor-dropdown .ivu-dropdown-rel>button>span>i{
        color: #D8D8D8;
        font-size: .2rem;
    }
</style>