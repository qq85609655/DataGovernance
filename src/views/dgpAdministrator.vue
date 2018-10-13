<template>
    <div class="dgp-administrator">
        <div class="dgp-admin-pageNav">
            <span>管理员演示</span>
            <span @click.stop="logoutSystem">退出登录页 <img src="../assets/images/logout.png" ></span>
        </div>
        <div class="dgp-admin-chartContent">
            <div class="dgp-organization-chart">
                <div class="dgp-chart-topLevel">
                    <div class="dgp-chart-top-Title">数据治理</div>
                    <div class="dgp-chart-top-Line">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="dgp-chart-top-commission">
                        <img src="../assets/images/adminicon/commission.png" alt="">
                        <span>数据治理委员会</span>
                    </div>
                    <div class="dgp-chart-top-Line">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div></div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data:function(){
            return {

            }
        },
        components:{},
        methods:{
            logoutSystem(){
                this.$router.push('/');
            }
        },
        mounted:function(){}
    }
</script>
<style scoped>

.dgp-admin-pageNav{
    width:100%;
    height:.64rem;
    line-height:.64rem;
    background: #fff;
    box-shadow: 0 .01rem .04rem 0 rgba(0,21,41,0.12);
    font-family: PingFangSC-Medium;
    position:relative;
}
.dgp-admin-pageNav span:first-child{
    display:inline-block;
    padding-left:.33rem;
    font-size: .16rem;
    color: rgba(0,0,0,0.72);
    letter-spacing: .0114rem;
}
.dgp-admin-pageNav span:last-child{
    display:inline-block;
    cursor:pointer;
    font-size: .18rem;
    color: #70737B;
    position:absolute;
    right:.33rem;
}
.dgp-admin-pageNav span:last-child img{
    width:.2rem;
    height:.2rem;
    position:relative;
    top:.03rem;
}
.dgp-admin-chartContent{
    background: #f0f0f0;
    height:100%;
}
.dgp-organization-chart{
    text-align:center;
    margin:0 auto;
    padding-top:.64rem;
}
.dgp-chart-top-Title{
    width:3.22rem;
    height:.48rem;
    line-height:.48rem;
    background-image: linear-gradient(-90deg, #3DCDBB 0%, #31A2BD 100%);
    box-shadow: 0 .02rem .08rem 0 rgba(92,92,92,0.15), inset 0 -.02rem .01rem 0 rgba(148,137,137,0.07), inset 0 .02rem .01rem 0 rgba(255,255,255,0.50);
    border-radius: 1rem;
    margin:0 auto;
    font-family: PingFangSC-Medium;
    font-size: .2rem;
    color: #FFFFFF;
    letter-spacing: .0143rem;
}
.dgp-chart-top-Line span:first-child{
    display:block;
    width:.07rem;
    height:.02rem;
    background:#6BC7BC;
    margin:.05rem auto 0;
}
.dgp-chart-top-Line span:nth-child(2){
    display:block;
    width:.03rem;
    height:.48rem;
    background:#6BC7BC;
    margin:0 auto;
}
.dgp-chart-top-Line span:last-child{
    display:block;
    width:.07rem;
    height:.02rem;
    background:#6BC7BC;
    margin:0 auto;
}
.dgp-chart-top-commission{
    position:relative;
}
.dgp-chart-top-commission img{
    min-width:2rem;
    height:.48rem;
}
.dgp-chart-top-commission span{
    /*min-width:1.21rem;*/
    /*height:.22rem;*/
    position:absolute;
    left:47.5%;
    top:11%;
    font-family: PingFangSC-Regular;
    font-size: .16rem;
    color: #515151;
    letter-spacing: .0114rem;
}


</style>