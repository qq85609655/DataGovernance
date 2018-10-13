<template>
    <Modal v-model="notice" title="确定操作" @on-ok="ok" @on-cancel="cancel" class-name="dgp-modal-systemMenu" :styles="{width: '7.36rem'}">
        <div class="delData-content clearfix ff-r">
             是否确认进行此操作?
        </div>
        <div slot="footer">
                <button class="dgp-delData-footerbtn btn-default" @click="cancel">取消</button>
                <button class="dgp-delData-footerbtn btn-primary" @click="ok">确定</button>
        </div>
    </Modal>
</template>

<script>

    export default {
        name:'ModalDelData',
        props:['systemDelDataNotice'],
        data () {
            return {
                notice:false//角色管理modal
            }
        },
        methods: {
            ok () {
                this.$emit('systemDelDataNoticeFun','ok');
            },
            cancel () {
                this.$emit('systemDelDataNoticeFun','cancel');
            }
        },
        watch:{
            systemDelDataNotice(){
                this.notice=this.systemDelDataNotice;
            }
        }
    }
</script>

<style>
    .dgp-modal-systemMenu .ivu-modal-body {
        padding: 16px;
        font-size: 12px;
        line-height: 1.5;
    }
    .dgp-modal-systemMenu .dgp-systemMenu-tree-title-add{
        float: left;
        margin-left: .24rem;
        margin-top: .25rem;
        width: 0.5rem;
        height: .3rem;
        min-width: .31rem;
        min-height: .3rem;
        border-radius: 0.03rem;
        font-size: 0.14rem;
        /*padding: 0.03rem;*/
    }
    .dgp-modal-systemMenu .delData-content{
        text-align: left;
        font-size : 0.18rem;
        /*padding: 0.2rem 0 0.2rem;*/
    }
    .dgp-delData-footerbtn{
        width:0.86rem;
        height:0.38rem;
        font-size:0.14rem;
        line-height: 0.38rem;
    }

</style>