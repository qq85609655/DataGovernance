<template>
    <Modal v-model="notice" title="操作提示" @on-ok="ok" @on-cancel="cancel" class-name="dgp-modal-systemNotice" :styles="{width: '6.27rem',height:'2.8rem'}">
        <div class="dgp-systemNotice-newAdd-content clearfix">
            {{noticeWord}}
        </div>
    </Modal>
</template>

<script>
    export default {
        name:'ModalLookNone',
        props:['systemLookNone','showWord'],
        data () {
            return {
                noticeWord:'请选择一条数据',
                notice:false
            }
        },
        methods: {
            ok () {
                this.$emit('systemLookNoneFunc');
            },
            cancel () {
                this.$emit('systemLookNoneFunc');
            },
            configModalInit(){ //修改按钮字体
                $('.dgp-modal-systemNotice .ivu-modal-footer>button:last-child>span').html('关闭');
            }

        },
        watch:{
            systemLookNone(){
                this.notice=this.systemLookNone;
            },
            showWord(){
                this.noticeWord=this.showWord;
            }
        },
        mounted(){
            /*初始化按钮文字*/
            this.configModalInit();
        }
    }
</script>

<style>
    .dgp-systemNotice-title-add{
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
    .dgp-systemNotice-title-add span{
        display:inline-block;
        position:absolute;
        left:27%;
        top:18%;
    }

    .dgp-systemNotice-newAdd-content{
        text-align:left;
    }
    .dgp-modal-systemNotice .ivu-modal-content .ivu-modal-footer .ivu-btn-text{
        display:none;
    }
    .dgp-modal-systemNotice .ivu-modal-footer button{
        display:inline-block;
        font-family: PingFangSC-Regular;
        border-radius: .04rem;
        border:none;
        line-height: .38rem;
        width: .86rem;
        height: .38rem;
        font-size: .14rem;
    }
    .dgp-modal-systemNotice .ivu-modal-footer .ivu-btn-large{
        padding:0;
    }
    /*.ivu-modal-footer .ivu-btn-large>span{*/
        /*display:inline-block;*/
        /*margin-top:-.1rem;*/
    /*}*/
</style>