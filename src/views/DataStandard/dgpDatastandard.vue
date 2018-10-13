<template>
    <div class="dgp-standard-page">
        <!--顶部查询与筛选-->
        <div class="dgp-standard-searchAll">
            <div class="dgp-search-default">
                <Select v-model="defLabel">
                    <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div class="dgp-standard-search-group">
                    <div class="dgp-standard-search-icon"><Icon type="ios-search" /></div>
                    <input type="text" class="dgp-standard-search-input" placeholder="请输入标准的名称">
                    <span class="dgp-standard-search-seen">查询</span>
                    <span @click="showFlag" class="dgp-standard-highSearch">高级筛选</span>
                </div>
                <div class="dgp-highSearch-wrap ">
                    <div class="dgp-wrap-high">
                        <!--高级搜索下拉内容-->
                        <dgp-standard-search-row v-for="(value,key,index) in searchHigh" :key="index" :high-class="value" :high-key="key"></dgp-standard-search-row>
                        <div class="dgp-wrap-high-details">
                            <span>标准细类:</span>
                            <select v-model="typeLabel">
                                <option v-for="item in typeLabelList" :value="item.value" :key="item.value">{{ item.label }}</option>
                            </select>
                        </div>
                        <div class="dgp-wrap-application">
                            <span>申请人:</span>
                            <!--添加申请人模态框-->
                            <Button type="primary" @click="modal1 = true"> <Icon type="ios-add" /> 添加申请人</Button>
                            <Modal
                                    v-model="modal1"
                                    title="Common Modal dialog box title"
                                    @on-ok="ok"
                                    @on-cancel="cancel">
                                <p>Content of dialog</p>
                                <p>Content of dialog</p>
                                <p>Content of dialog</p>
                            </Modal>
                            <span @click="showFlagAgain"  class="dgp-wrap-retract">收起</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dgp-standard-content">
            <div class="dgp-standard-content-first">
                <button class="dgp-import-button">批量导入</button>
                <div class="dgp-first-details">
                    <div class="dgp-first-details-title">
                        <div class="dgp-standard-mainTitle-picture">
                            <img src="../../assets/images/standard/index.png" alt="">
                            <span class="dgp-standard-mainTitle">{{publicAccountTitle}}</span>
                        </div>
                        <div class="dgp-business-meaning">{{businessMeaning}}</div>
                        <div class="dgp-count-formula">{{formulaMeaning}}</div>
                        <div class="dgp-standard-increase">
                            <button>标准新增</button>
                            <button>发布审核中</button>
                        </div>
                        <div class="dgp-application-person">
                            <span>申请人：{{}}</span>
                            <span>申请时间：{{}}</span>
                        </div>
                        <div class="dgp-standard-edit">
                            <img src="../../assets/images/standard/edit.png" alt="">
                            <span>编辑</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dgp-standard-content-second">
                <button class="dgp-import-button">批量导入</button>
                <div class="dgp-first-details">
                    <div class="dgp-first-details-title">
                        <div class="dgp-standard-mainTitle-picture">
                            <img src="../../assets/images/standard/index.png" alt="">
                            <span class="dgp-standard-mainTitle">{{publicAccountTitle}}</span>
                        </div>
                        <div class="dgp-business-meaning">{{businessMeaning}}</div>
                        <div class="dgp-count-formula">{{formulaMeaning}}</div>
                        <div class="dgp-standard-increase">
                            <button>标准新增</button>
                            <button>发布审核中</button>
                        </div>
                        <div class="dgp-application-person">
                            <span>申请人：{{}}</span>
                            <span>申请时间：{{}}</span>
                        </div>
                        <div class="dgp-standard-edit">
                            <img src="../../assets/images/standard/edit.png" alt="">
                            <span>编辑</span>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div v-show="pages" class="dgp-pagenation-dialog">-->
                <!--<Page  :current="pageNumber" v-if="total" :total="total" show-elevator show-sizer class-name="dgp-page-active dgp-pagenation-pages" @on-change="changePageNumber" @on-page-size-change="changePageSize"/>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import DgpStandardSearchRow from '../../components/DgpStandardSearchRow.vue';

    export default {
        name: "dgp-qualty-standard",
        data () {
            return {
                defLabel: '',
                typeLabel:'',
                modal1: false,
                stateList: [
                    {
                        value: '1',
                        label: '制定中'
                    },
                    {
                        value: '2',
                        label: '已发布'
                    }
                ],
                typeLabelList:[
                    {
                        value: '1',
                        label: '不限'
                    },
                    {
                        value: '2',
                        label: '不限'
                    }
                ],
                searchHigh:{           //高级搜索分类
                    '标准体系':['全部','主题一','主题一','主题一','主题一','主题一','主题一']
                },
                publicAccountTitle:'对公活期存款余额(考核)',
                businessMeaning:'业务含义：表示银行一定时期内的贷款利息收回情况' +
                '表示银行一定时期内的贷款利息收回情况表示银行一定时期内的贷款利息收回情况' +
                '表示银行一定时期内的贷款利息收回情况表示银行一定时期内的贷款利息收回情况',
                formulaMeaning:'计算公式：利息回收率=实收利息/应收利息*100%'
            }
        },
        components:{DgpStandardSearchRow},
        methods:{
            showFlag(){
                $(".dgp-wrap-high").slideToggle(500);
            },
            showFlagAgain(){
                $(".dgp-wrap-high").slideToggle(500);
            },

            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        }


    }
</script>

<style scoped>
    .dgp-standard-page{

    }
    .dgp-standard-search-group{
        display:inline-block;
        height:.56rem;
        line-height:.56rem;
        text-align:center;
        border-radius:.03rem;
        float:right;
    }
    .dgp-standard-search-icon{
        display:inline-block;
        width:1rem;
        background: #32B3EA;
        color:#fff;
        font-size:.26rem;
        margin-left: .2rem;
        vertical-align:middle;

    }
    .dgp-standard-search-input{
        width:11.59rem;
        outline:none;
        padding: 0 .1rem 0 .2rem;
        font-family: PingFangSC-Regular;
        vertical-align:middle;
    }
    .dgp-standard-search-seen{
        display:inline-block;
        width:1rem;
        font-size:.16rem;
        color:#fff;
        background: #32B3EA;
        cursor:pointer;
        vertical-align:middle;
    }
    .dgp-standard-highSearch{
        display:inline-block;
        width:1.41rem;
        color:#FFF;
        cursor: pointer;
        background: #1E6685;
        vertical-align:middle;
    }
    .dgp-highSearch-wrap{
        background: #fff;
        box-sizing:border-box;
    }
    .dgp-wrap-high{
        width:100%;
        display: none;
    }
    .dgp-wrap-high-details{
        width:96%;
        padding-bottom:.15rem;
        margin-left: .15rem;
        border-top: .01rem dotted rgba(212,212,212,1);
        border-bottom: .01rem dotted rgba(212,212,212,1);
    }
    .dgp-wrap-high-details>span{
        width: 1rem;
        height: .64rem;
        line-height: .64rem;
        padding-left: .1rem;
        text-align: center;
        float: left;
        font-size: .16rem;
        font-weight: bold;
    }
    .dgp-wrap-high-details select{
        width:2.66rem;
        height:.33rem;
        margin-top: .15rem;
    }
    .dgp-wrap-application{
        padding-bottom:.1rem;
        position:relative;
    }
    .dgp-wrap-application span{
        display:inline-block;
        margin-left:-.82rem;
        padding-top: .1rem;
    }
    .dgp-wrap-retract{
        position:absolute;
        right:.35rem;
        color:#32B3EA;
        cursor:pointer;
    }

    /*页面具体内容*/
    .dgp-standard-content{
        width:100%;
        margin-top: .2rem;
        overflow:scroll;
    }
    .dgp-standard-content-first,.dgp-standard-content-second{
        width:100%;
        /*height:4.39rem;*/
        background: #fff;
    }
    .dgp-import-button{
        min-width:.89rem;
        height:.32rem;
        background: #fff;
        border: .01rem solid rgba(50,179,234,1);
        color:#32B3EA;
        border-radius: .03rem;
        margin:.14rem 0 .2rem .21rem;
        cursor:pointer;
    }
    .dgp-first-details-title{
        margin-left: .2rem;
    }
    .dgp-standard-mainTitle-picture img{
        width:.57rem;
        height:.21rem;
        vertical-align: middle;
    }
    .dgp-standard-mainTitle{
        display:inline-block;
        font-family: PingFangSC-Semibold;
        color: #3B6DDF;
        letter-spacing: .011rem;
        font-size:.18rem;
        margin-left: .1rem;

    }
    .dgp-business-meaning{
        width:12.63rem;
    }
    .dgp-standard-increase button:first-child{
        display:inline-block;
        min-width:.8rem;
        height:.3rem;
        background: #FAFAFA;
        border: .01rem solid rgba(217,217,217,1);
        border-radius: .03rem;
        margin-right: .1rem;
        cursor:pointer;
        margin-top: .14rem;
    }
    .dgp-standard-increase button:last-child{
        display:inline-block;
        min-width:1rem;
        height:.3rem;
        line-height:.3rem;
        background: #FAFAFA;
        border: .01rem solid rgba(217,217,217,1);
        border-radius: .03rem;
        cursor:pointer;
    }
    .dgp-application-person{
        margin-top: .17rem;
    }
    .dgp-standard-edit{
        margin-top: .12rem;
        margin-bottom: .16rem;
        cursor:pointer;
    }
    .dgp-standard-edit span{
        display:inline-block;
        font-family: PingFangSC-Regular;
        color: #3B6DDF;
        font-size:.18rem;
        vertical-align: top;
    }

</style>
<style>
    .dgp-standard-page .dgp-standard-searchAll .ivu-select{
        width:2.34rem;
    }
    .dgp-standard-page .dgp-standard-searchAll .dgp-search-default .ivu-select-selection{
        border-radius:.04rem;
        width:2.34rem;
        height:.54rem;
        border: .01rem solid #dcdee2;
    }
    .dgp-standard-page .dgp-highSearch-wrap .dgp-wrap-application .ivu-btn{
        width:1.5rem;
        height:.32rem;
        margin-left: .26rem;
        padding:0;
        background: #fff;
    }
    .dgp-standard-page .dgp-highSearch-wrap .dgp-wrap-application .ivu-btn-primary{
        border: .01rem solid rgba(233,233,233,1);
        border-radius: .04rem;
        color:#000;
    }
    .dgp-standard-page .dgp-highSearch-wrap .dgp-wrap-application .ivu-btn-primary:hover{
        color:#fff;
    }
</style>