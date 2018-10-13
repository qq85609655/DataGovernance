<template>
  <div class="dgp-search-router-all">
    <!--新建与批量操作-->
    <dgp-create-batch @doBatch="handBatch"></dgp-create-batch>
    <dgp-table-first ref="tableFirst" :word="searchWord" :columns="columnsAll" :data="dataAll"></dgp-table-first>
    <Modal
            v-model="attentionModal"
            title="是否进行以下操作"
            @on-ok="ok"
            @on-cancel="cancel">
      <p>{{attentionTitle}}</p>
    </Modal>

    <div class="dgp-pagenation-dialog clearfix">
      <!--分页器-->
      <dgp-pagenation class="dgp-pagenation-pages"></dgp-pagenation>
    </div>
  </div>
</template>
<script>
    /*pages分页组件*/
    import DgpPagenation from "../../components/DgpPagenation";
    /*第一套表格*/
    import DgpTableFirst from "../../components/table/DgpTableFirst";
    /*新建与批量操作*/
    import DgpCreateBatch from "../../components/DgpCreateBatch";
    export default {
        name:'SearchAll',
        props:['searchWord'],
        data () {
            return {
                /*attention check 关注确认*/
                attentionCheck:false,
                /*attention Modal 显示关注提醒模态框*/
                attentionModal:false,
                /*attention title 关注提醒模态框标题*/
                attentionTitle:null,
                columnsAll: [
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
                        key: 'control',
                        width: 150,
                        align: 'left',
                        render: (h, params) => {
                            if(this.dataAll[params.index].attention){
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
                                            click: () => {
                                                this.unfollow(params.index);
                                            }
                                        }
                                    }, '取消关注'),
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
                                                this.revise(params.index)
                                            }
                                        }
                                    }, '修订'),
                                    h('Poptip', {
                                        props: {
                                            confirm:true,
                                            title:"是否废止"
                                        },
                                        style: {
                                            color:'#1890FF',
                                            cursor:'pointer'
                                        },
                                        on: {
                                            'on-ok':() =>{
                                                this.remove(params.index);
                                                this.$Message.info('选择项已经被删除！');
                                            },
                                            'on-cancel':() =>{
                                                this.$Message.info('你取消了删除！');
                                            }
                                        }
                                    }, '废止')
                                ]);
                            }else{
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
                                            click: () => {
                                                this.follow(params.index);
                                            }
                                        }
                                    }, '关注'),
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
                                                this.revise(params.index)
                                            }
                                        }
                                    }, '修订'),
                                    h('Poptip', {
                                        props: {
                                            confirm:true,
                                            title:"是否废止"
                                        },
                                        style: {
                                            color:'#1890FF',
                                            cursor:'pointer'
                                        },
                                        on: {
                                            'on-ok':() =>{
                                                this.remove(params.index);
                                                this.$Message.info('选择项已经被删除！');
                                            },
                                            'on-cancel':() =>{
                                                this.$Message.info('你取消了删除！');
                                            }
                                        }
                                    }, '废止')
                                ]);
                            }


                        }
                    }
                ],
                dataAll: [
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定定的专属服务归属银行，如，很长的喵银行为该客户所指定定的专属服务归属银行，如，很长的喵银行为该客户所指定定的专属服务归属银行，如，很长的喵银行为该客户所指定定的专属服务归属银行，如，很长的喵银行为该客户所指定定的专属服务归属银行，如，很长的喵',
                        subject: '公共主题/往来信息/归属信息/公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:1
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:1
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:1
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:0
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:1
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:0
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:1
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:0
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:1
                    },
                    {
                        name: '管户机构',
                        business: '银行为该客户所指定的专属服务归属银行，如指定的专属服务，很长的喵',
                        subject: '公共主题/往来信息/归属信息',
                        date: '208-08-20',
                        attention:1
                    }
                ]
            }
        },
        components: {
            DgpCreateBatch,
            DgpTableFirst,
            DgpPagenation
        },
        watch:{

        },
        methods:{
            //v-create-batch传出是否批量状态
            handBatch(){
                if(arguments[0]){
                    this.$refs.tableFirst.handleSelectAll(true);
                }else{
                    this.$refs.tableFirst.handleSelectAll(false);
                }
            },
            //关注提醒模态框提醒----确认
            ok () {
                this.attentionCheck=true;
            },
            //关注提醒模态框提醒----取消
            cancel () {
                this.attentionCheck=false;
            },
            //取消关注unfollow
            unfollow (index){
                this.attentionModal=true;
                this.attentionTitle='取消关注当前列表项';
                if(this.attentionCheck){
                    this.dataAll[index].attention=0;
                    this.attentionCheck=false;
                }
            },
            //关注follow
            follow (index){
                this.attentionModal=true;
                this.attentionTitle='关注当前列表项';
                if(this.attentionCheck){
                    this.dataAll[index].attention=0;
                    this.attentionCheck=false;
                }
            },
            //修订
            revise (index){
                console.log('修订'+index);
            },
            //操作----废止
            remove (index) {
                this.dataAll.splice(index, 1);
            }
        },
        computed: {

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