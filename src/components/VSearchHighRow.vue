<template>
  <div class="dgp-search-high-row clearfix">
    <span>{{highKey}}:</span>
    <ul class="clearfix">
      <li v-for="(v,i) in highClass" :key="i"  @click="showMe(i)"><a :class="{'dgp-high-active':index===i}">{{v}}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VSearchHighRow',
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
  /*search 高级搜索*/
  .dgp-search-high-row>span{
    width: 1rem;
    height: .64rem;
    line-height: .64rem;
    padding-left: .1rem;
    text-align: center;
    float: left;
    font-size: .16rem;
    font-weight: bold;
    color: #222;
  }
  .dgp-search-high-row ul{
    padding-top: .18rem;
    float: left;
    width: 15.8rem;
  }
  .dgp-search-high-row ul>li{
    float: left;
    padding: 0 .3rem .1rem .3rem;
    text-align: center;
    height: .38rem;
    min-width: .78rem;
    font-size: .16rem;
  }
  .dgp-search-high-row ul>li>a{
    display: block;
    line-height: .28rem;
    padding: 0 .1rem;
    border-radius: .03rem;
    color: rgba(0,0,0,0.65);
  }
  .dgp-search-high-row ul>li>a:hover,
  .dgp-search-high-row ul>li>a.dgp-high-active{
    color: #FFF;
  }
</style>

