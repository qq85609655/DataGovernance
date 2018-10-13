<template>
    <div>
        <!-- 操作确认modal -->
        <Button type="primary" @click="modal1 = true">显示对话框</Button>
        <Modal v-model="modal1" title="操作确认" @on-ok="ok" @on-cancel="cancel" class-name="dgp-modal">
        <p>确定要删除选中的数据吗?</p>
        </Modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                modal1: false,//操作确认modal
            }
        },
        methods: {
            ok () {
                
            },
            cancel () {
                
            }
        }
    }
</script>

<style>
    /* 确认操作modal样式 */
    /*.dgp-modal .ivu-btn-primary {*/
        /*background-color: #6BC7BC;*/
        /*border-color: #6BC7BC;*/
    /*}*/
    /*.dgp-modal .ivu-btn-primary:hover {*/
        /*color: #fff;*/
        /*background-color: #6BC7BC;*/
        /*border-color: #6BC7BC;*/
    /*}*/
    /*.dgp-modal .ivu-btn-text:hover {*/
        /*color: #6BC7BC;*/
    /*}*/
</style>