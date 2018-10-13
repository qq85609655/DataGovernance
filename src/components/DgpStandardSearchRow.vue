<template>
    <div class="dgp-standardSearch-high-row clearfix">
        <span>{{highKey}}:</span>
        <ul class="clearfix">
            <li v-for="(v,i) in highClass" :key="i"  @click="showMe(i)"><a :class="{'dgp-high-active':index===i}">{{v}}</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'StandardHighRow',
        props:['highClass','highKey'],
        data(){
            return{
                index:null
            }
        },
        methods:{
            showMe(eq){
                this.index=eq;
            }
        }
    }
</script>
<style scoped>
    .dgp-standardSearch-high-row a{
        text-decoration: none;
    }
    .dgp-standardSearch-high-row>span{
        width: 1rem;
        height: .64rem;
        line-height: .64rem;
        padding-left: .1rem;
        margin-left: .15rem;
        text-align: center;
        float: left;
        font-size: .16rem;
        font-weight: bold;
    }
    .dgp-standardSearch-high-row ul{
        padding-top: .18rem;
        float: left;
        width: 15.8rem;
    }
    .dgp-standardSearch-high-row ul>li{
        float: left;
        padding: .02rem .3rem .1rem .3rem;
        text-align: center;
        min-width: .78rem;
        height: .35rem;
        font-size: .16rem;
    }
    .dgp-standardSearch-high-row ul>li:hover{
        background: #32B3EA;
    }
    .dgp-standardSearch-high-row ul>li:hover a{
        color:#fff;
    }
    .dgp-standardSearch-high-row ul>li>a{
        display: block;
        line-height: .28rem;
        padding: 0 .1rem;
        border-radius: .03rem;
        /*color: rgba(0,0,0,0.65);*/
    }
</style>

