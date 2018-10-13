<template>
    <Modal v-model="notice" title="操作提示" @on-cancel="cancel" class-name="dgp-modal-systemNotice" :styles="{width: '6.27rem',height:'2.8rem'}">
        <div class="dgp-systemNotice-newAdd-content clearfix">
                请选择一条数据
        </div>
        <div slot="footer">
                <!-- <button class="dgp-modalDelNone-footerbtn btn-default" @click="cancel">取消</button> -->
                <button class="dgp-modalDelNone-footerbtn btn-primary" @click="ok">确定</button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name:'ModalDelNone',
        props:['systemDelNoneNotice'],
        data () {
            return {
                notice:false
            }
        },
        methods: {
            ok () {
                this.$emit('systemDelNoneNoticeFun');
            },
            cancel () {
                this.$emit('systemDelNoneNoticeFun');
            },
            // configModalInit(){ //修改按钮字体
            //     $('.dgp-modal-systemNotice .ivu-modal-footer>button:last-child>span').html('关闭');
            // }

        },
        watch:{
          systemDelNoneNotice(){
              this.notice=this.systemDelNoneNotice;
          }
        },
        mounted(){
            /*初始化按钮文字*/
            //this.configModalInit();
        }
    }
</script>

<style scoped>
    .dgp-modal-systemNotice .ivu-modal-body {
        padding: 16px;
        font-size: 12px;
        line-height: 1.5;
    }
    .dgp-modal-systemNotice .dgp-systemNotice-title-add{
        float:left;
        margin-left: .32rem;
        margin-top: .24rem;
        min-width:.82rem;
        min-height: .36rem;
        border-radius: .03rem;
        font-size: .16rem;
        border:none;
        position:relative;
    }
    .dgp-modal-systemNotice .dgp-systemNotice-title-add span{
        display:inline-block;
        position:absolute;
        left:27%;
        top:18%;
    }
    .dgp-modal-systemNotice .dgp-systemNotice-newAdd-content{
        text-align:left;
        font-size : 0.18rem;
        /*padding: 0.2rem 0 0.2rem;*/
    }

    .dgp-modal-systemNotice .ivu-modal-footer .ivu-btn-text{
        display:none;
    }
    .dgp-modal-systemNotice .ivu-modal-footer button{
        display:inline-block;
        width:.86rem;
        height:.38rem;
        font-family: PingFangSC-Regular;
        border-radius: .04rem;
        border:none;
    }
    .dgp-modal-systemNotice .ivu-modal-footer .ivu-btn-large>span{
        display:inline-block;
        margin-top:-.1rem;
    }
    .dgp-modalDelNone-footerbtn{
       
        width:0.86rem;
        height:0.38rem;
        font-size:0.14rem;
        line-height: 0.38rem;
    
    }
</style>