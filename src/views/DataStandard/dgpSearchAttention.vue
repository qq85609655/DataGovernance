<template>
  <div class="dgp-search-router-attention">
    <!--新建与批量操作-->
    <dgp-create-batch @doBatch="handBatch"></dgp-create-batch>
    <dgp-table-first ref="tableFirst" :word="searchWord" :columns="columnsAttention" :data="dataAttention"></dgp-table-first>
    <div class="dgp-pagenation-dialog clearfix">
      <dgp-pagenation class="dgp-pagenation-pages"></dgp-pagenation>
    </div>
  </div>
</template>
<script>
    import DgpPagenation from "../../components/DgpPagenation";
    import DgpTableFirst from "../../components/table/DgpTableFirst";
    import DgpCreateBatch from "../../components/DgpCreateBatch";
    export default {
        name:'SearchAll',
        props:['searchWord'],
        components: {
            DgpCreateBatch,
            DgpTableFirst,
            DgpPagenation
        },
        data () {
            return {
                columnsAttention: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '中文名称',
                        key: 'name',
                        ellipsis:true
                    },
                    {
                        title: '业务含义',
                        key: 'business',
                        ellipsis:true
                    },
                    {
                        title: '标准主题',
                        key: 'subject',
                        ellipsis:true
                    },
                    {
                        title: '发布时间',
                        key: 'date',
                        ellipsis:true
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('A', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#1890FF'
                                    },
                                    on: {
                                        click: () => {
                                            //this.show(params.index)
                                        }
                                    }
                                }, '取消关注'),
                                h('A', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#1890FF'
                                    },
                                    on: {
                                        click: () => {
                                            //this.remove(params.index)
                                        }
                                    }
                                }, '修订'),
                                h('A', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#1890FF'
                                    },
                                    on: {
                                        click: () => {
                                            //this.remove(params.index)
                                        }
                                    }
                                }, '废止')
                            ]);
                        }
                    }
                ],
                dataAttention: [
                    /*{
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        control: '取消关注 | 修订 | 废止'
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        control: '取消关注 | 修订 | 废止'
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        control: '取消关注 | 修订 | 废止'
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        control: '取消关注 | 修订 | 废止'
                    }*/
                ]
            }
        },
        computed: {

        },
        methods:  {
            //v-create-batch传出是否批量状态
            handBatch(){
                if(arguments[0]){
                    this.$refs.tableFirst.handleSelectAll(true);
                }else{
                    this.$refs.tableFirst.handleSelectAll(false);
                }
            }
        }
    }
</script>
<style scoped>
  /* dgp-pagenation-dialog 分页器样式 */
  .dgp-pagenation-dialog{
    height: .8rem;
    width:100%;
    border-top: .01rem solid rgba(217,227,237,0.8);
  }
  .dgp-pagenation-pages{
    float: right;
    padding-top: .24rem;
  }
</style>