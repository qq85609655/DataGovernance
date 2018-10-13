<template>
  <!-- 首页主体 -->
  <div class="dgp-search-main">
    <div class="dgp-search-link clearfix">
      <ButtonGroup class="dgp-search-router">
        <Button>
          <router-link to="/dgpDataStandard/dgpQualtySearch/all">全部</router-link>
        </Button>
        <Button>
          <router-link to="/dgpDataStandard/dgpQualtySearch/attention">已关注</router-link>
        </Button>
        <Button>
          <router-link to="/dgpDataStandard/dgpQualtySearch/tree">树形展示</router-link>
        </Button>
      </ButtonGroup>
    </div>
    <div class="dgp-search-group">
      <!--检索页面搜索栏-->
      <div class="dgp-search-group-main clearfix">
        <div class="dgp-search-icon"><Icon type="ios-search" /></div>
        <input v-model="searchContent" class="dgp-search-inputs" placeholder="请输入标准名称" />
        <span class="dgp-search-submit">查询</span>
        <span @click="showFlag" class="dgp-search-more">高级搜索&nbsp;&nbsp;<Icon type="ios-arrow-down" /></span>
      </div>
      <div class="dgp-high-wrap">
        <div class="dgp-search-high">
          <!--高级搜索选择项-->
          <dgp-search-high-row v-for="(value,key,index) in searchHigh" :key="index" :high-class="value" :high-key="key"></dgp-search-high-row>
        </div>
      </div>
    </div>
    <div class="dgp-router-view">
      <!--三个查询子路由-->
      <transition :name="tName" mode="out-in" duration="300">
        <router-view :searchWord="searchContent"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  import DgpSearchHighRow from "../../components/DgpSearchHighRow";
  export default {
    name: 'search',
    data(){
        return{
            tName: 'slide-left',
            searchContent:'',      //搜索框输入内容
            searchHigh:{           //高级搜索分类
                '1及大类':['11及分类','12及分类','13及分类','14及分类','15及分类'],
                '2及大类':['21及分类','22及分类','23及分类','24及分类','25及分类']
            }
        }
    },
    methods:{
      //是否显示高级搜索
      showFlag(){
          $(".dgp-search-high").slideToggle(500);
      }
    },
    components: {
        DgpSearchHighRow    //高级搜索分类组件
    },
    mounted(){

    }
  }
</script>
<style scoped>
  .dgp-search-main{
    width:100%;
  }
  .dgp-search-main>div{
    width:16.8rem;
    margin: 0 auto;
  }
  /*search 路由选择tabs*/
  .dgp-search-link{
    text-align: center;
    font-size: 0;
    padding:.48rem 0 .5rem;
  }
  /*重置按钮组样式*/
  /*+++++++++++++++++++++++++++++++++++++++++*/
  .dgp-search-link .dgp-search-router{
    border-radius: .03rem;
    overflow: hidden;
  }
  .dgp-search-link .dgp-search-router button{
    overflow: hidden;
  }
  .dgp-search-link .dgp-search-router span{
    display: block;
  }
  .dgp-search-link .dgp-search-router a{
    text-decoration: none;

  }
  .dgp-search-link .dgp-search-router button {
    padding: 0;
    border: none;
  }
  /*+++++++++++++++++++++++++++++++++++++++++*/
  .dgp-search-link .dgp-search-router a{
    display: inline-block;
    width:1rem;
    height:.4rem;
    border: .01rem solid #DBE3EA;
    color: #7A7A7A;
    font-size: .16rem;
    line-height: .4rem;
  }
  /*子路由router-link*/
  .dgp-search-link .dgp-search-router a.router-link-exact-active{
    color: #FFF;
  }
  .dgp-search-link .dgp-search-router a:hover{
    color: #FFF;
  }
  /*search input输入框*/
  .dgp-search-group{
    padding-bottom: .3rem;
  }
  .dgp-search-group-main{
    border-radius: .03rem;
    overflow: hidden;
  }
  .dgp-search-group-main>input,
  .dgp-search-group-main>div,
  .dgp-search-group-main>span{
    height:.56rem;
    float: left;
    line-height: .56rem;
    font-size: .16rem;
  }
  /*搜索图标样式*/
  .dgp-search-group-main>.dgp-search-icon{
    width: 1rem;
    background-color: #6BC7BC;
    text-align: center;
    font-size: .24rem;
    color: #FFF;
  }
  .dgp-search-group-main>input.dgp-search-inputs{
    padding: 0 .1rem 0 .2rem;
    width:13.4rem;
    outline: none;
  }
  /*search 搜索提交*/
  .dgp-search-group-main>.dgp-search-submit{
    width:1rem;
    color:#FFF;
    text-align: center;
    cursor: pointer;
  }
  /*search 高级搜索按钮*/
  .dgp-search-group-main>.dgp-search-more{
    width:1.4rem;
    color:#FFF;
    text-align: center;
    cursor: pointer;
  }
  /*高级搜索*/
  .dgp-high-wrap{
    border-radius: .03rem;
    overflow: hidden;
    position: relative;
  }
  .dgp-search-high{
    width:100%;
    display: none;
    border-top: 1px solid #D9E3ED;
  }
  /*子路由dgp-router-view   表格*/
  .dgp-router-view{
    width: 100%;
    background-color: #FFF;
    min-height: 7.96rem;
    padding:.24rem .32rem;
    position: relative;
    border-radius: .03rem;
  }




</style>
