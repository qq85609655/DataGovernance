<template>
    <div class="dgp-wrap">
        <div class="dgp-homepage">
            <!-- <Input placeholder="请输入标准名称" style="width: auto" search enter-button="Search" suffix="ios-search" /> -->
            <div class="dgp-homepage-search">
                <div class="dgp-homepage-search-inputbutton">
                    <input type="text" class="dgp-homepage-search-input" placeholder="请输入标准名称"/>
                    <button class="dgp-homepage-search-button" @click="search">查询</button>
                </div>

                <div class="dgp-homepage-search-history">
                    <Select v-model="model1" style="width:0.2rem" placeholder="历史记录">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="dgp-homepage-title">
                <div class="dgp-homepage-title-icon">

                </div>
                <div class="dgp-homepage-title-name">
                    主题分类
                </div>
            </div>
            <div class="dgp-homepage-theme">
                <div class="dgp-homepage-theme-item">
                    <img class="dgp-homepage-theme-item-img" :src="publicTheme" />
                    <span class="dgp-homepage-theme-item-span">公共主题</span>
                </div>
                <div class="dgp-homepage-theme-item">
                    <img class="dgp-homepage-theme-item-img" :src="customerTheme" />
                    <span class="dgp-homepage-theme-item-span">客户主题</span>
                </div>
                <div class="dgp-homepage-theme-item">
                    <img class="dgp-homepage-theme-item-img" :src="productTheme" />
                    <span class="dgp-homepage-theme-item-span">产品主题</span>
                </div>
                <div class="dgp-homepage-theme-item">
                    <img class="dgp-homepage-theme-item-img" :src="agreementTheme" />
                    <span class="dgp-homepage-theme-item-span">合约主题</span>
                </div>
                <div class="dgp-homepage-theme-item">
                    <img class="dgp-homepage-theme-item-img" :src="accountTheme" />
                    <span class="dgp-homepage-theme-item-span">账户主题</span>
                </div>
                <div class="dgp-homepage-theme-item">
                    <img class="dgp-homepage-theme-item-img" :src="eventTheme" />
                    <span class="dgp-homepage-theme-item-span">事件主题</span>
                </div>
                <div class="dgp-homepage-theme-item">
                    <img class="dgp-homepage-theme-item-img" :src="targetTheme" />
                    <span class="dgp-homepage-theme-item-span">指标主题</span>
                </div>
                <div class="dgp-homepage-theme-item">
                    <img class="dgp-homepage-theme-item-img" :src="textTheme" />
                    <span class="dgp-homepage-theme-item-span">测试主题</span>
                </div>
                <div class="dgp-homepage-theme-item">
                    <img class="dgp-homepage-theme-item-img" :src="newTheme" />
                    <span class="dgp-homepage-theme-item-span">新主题</span>
                </div>
                <div class="dgp-homepage-theme-line dgp-homepage-theme-line1"></div>
                <div class="dgp-homepage-theme-line dgp-homepage-theme-line2"></div>
                <div class="dgp-homepage-theme-line dgp-homepage-theme-line3"></div>
                <div class="dgp-homepage-theme-line dgp-homepage-theme-line4"></div>
            </div>
            <div class="dgp-homepage-title">
                <div class="dgp-homepage-title-icon">

                </div>
                <div class="dgp-homepage-title-name">
                    我的关注
                </div>
                <div class="dgp-homepage-title-button">
                    查看所有
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
    components:{
    },
    data () {
            return {
                publicTheme:require("../assets/images/subject_public.png"),
                customerTheme:require("../assets/images/subject_customer.png"),
                productTheme:require("../assets/images/subject_product.png"),
                agreementTheme:require("../assets/images/subject_agreement.png"),
                accountTheme:require("../assets/images/subject_account.png"),
                eventTheme:require("../assets/images/subject_event.png"),
                targetTheme:require("../assets/images/subject_target.png"),
                textTheme:require("../assets/images/subject_test.png"),
                newTheme:require("../assets/images/subject_newTheme.png"),
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '历史记录',

            }
        },
    methods:{
        search(){
            this.$router.push('/dgpQualtySearch/search/all');
        }
    }
}
</script>
<style>
.dgp-homepage{
    width: 100%;
    padding:0.7rem;
    background: #f0f2f5;
}
.dgp-homepage-search{
    overflow: hidden;
}
.dgp-homepage-search-inputbutton{
    width:13.38rem;
    height: 0.64rem;
    float: left;
    box-sizing: border-box;
}
.dgp-homepage-search-input,.dgp-homepage-search-button{
    height: 0.64rem;
    background:none;  
	outline:none;  
	border:0px;
    text-align: center;
}
.dgp-homepage-search-input{
    width: 11.97rem;
    left: 0.685rem;
    color: rgba(117, 117, 117, 1);
    font-size: 0.16rem;
    font-family: PingFangSC-Regular;
    height: 0.64rem;
    line-height: 0.64rem;
    background: #fff;

}
.dgp-homepage-search-button{
    width: 1.41rem;
    height: 0.64rem;
    border-radius: 0.03rem;
    background-color: rgba(107, 199, 188, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 0.16rem;
    line-height: 0.64rem;
    font-family: PingFangSC-Regular;
}
.dgp-homepage-search-history{
    width:2.92rem;
    float: right;
}
.dgp-homepage-search-history>.ivu-select{
    width: 100% !important;
    height: 0.64rem;
}
.dgp-homepage-search-history .ivu-select-selection{
    height: 0.64rem !important;
    border-radius: 0.03rem;
    border: 0;
}
.dgp-homepage-search-history .ivu-select-visible .ivu-select-selection {
    border:0;
    outline: 0;
    box-shadow: 0 0 0 0;
}
.dgp-homepage-search-history .ivu-select-item-selected,.ivu-select-item-selected:hover {
    color: #81c5bc;
}
.dgp-homepage-search-history .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .dgp-homepage-search-history .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
    height: 0.64rem;
    line-height: 0.64rem;
} 
.dgp-homepage-search-history .ivu-select-placeholder,.dgp-homepage-search-history .ivu-select-selected-value{
    text-align: center;
   
    color: #2C303B !important;
    font-size: 0.16rem;
    font-family: PingFangSC-Regular;

}
.dgp-homepage-title{
    margin-top: 0.58rem;
    overflow: hidden;
}
.dgp-homepage-title-icon{
    float: left;
    width: 0.06rem;
    height: 0.16rem;
    border-radius: 0.02rem;
    background-color: rgba(216, 216, 216, 1);
    margin-top: 0.04rem;

}
.dgp-homepage-title-name{
    float: left;
    line-height: 0.25rem;
    color: rgba(34, 34, 34, 1);
    font-size: 0.18rem;
    font-family: PingFangSC-Semibold;
    margin-left: 0.09rem;
}
.dgp-homepage-title-button{
    float: right;
    width: 0.9rem;
    height: 0.38rem;
    border-radius: 0.03rem;
    background-color: rgba(107, 199, 188, 1);
    line-height: 0.38rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.14rem;
    text-align: center;
    font-family: PingFangSC-Regular;


}
.dgp-homepage-theme{
    width: 100%;
    margin-top: 0.2rem;
    overflow: hidden;
    background: #fff;
    position: relative;
}
.dgp-homepage-theme-item{
    height: 1.44rem;
    width: 20%;
    float: left;
    
}
.dgp-homepage-theme-item-img{
    width:0.6rem;
    height:0.6rem;
    margin: 0 0 0 0.83rem;
    vertical-align: middle;
}
.dgp-homepage-theme-item-span{
    line-height:1.44rem;
    color: rgba(0, 0, 0, 1);
    font-size: 0.16rem;
    font-family: PingFangSC-Regular;
    vertical-align: middle;
    margin-left: 0.24rem;

}
.dgp-homepage-theme-line{
    width:0.02rem;
    height:2.38rem;
    position: absolute;
    top: 0.25rem;
    
    border: 1px solid rgba(219, 227, 234, 1);
}
.dgp-homepage-theme-line1{
    left:3.34rem;
}

.dgp-homepage-theme-line2{
    left:6.70rem;
}
.dgp-homepage-theme-line3{
    left:10.07rem;
}
.dgp-homepage-theme-line4{
    left:13.43rem;
}
.dgp-homepage-theme-item:hover{
   background: #81c5bc;
    
}
.dgp-homepage-theme-item:hover .dgp-homepage-theme-item-span{
    color:#ffffff;

}

</style>

