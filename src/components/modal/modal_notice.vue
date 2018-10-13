<template>
        <Modal v-model="notice" :title="showNoticeWord.title" @on-ok="ok" @on-cancel="cancel" class-name="dgp-modal-systemNotice dgp-see-info" :styles="{width: '6.27rem'}">
            <div class="dgp-systemNotice-newAdd-content clearfix">
                <div class="dgp-noticeTitle">
                    <span>级别：{{showNoticeWord.mesLevel}}</span>
                    <span style="padding-right: .1rem">来源：{{showNoticeWord.mesSource}}</span>
                    <span  style="padding-right: .1rem">发布时间：{{showNoticeWord.sendTime}}</span>
                </div>
                <div class="dgp-noticeDetails">
                </div>
                <div class="dgp-noticeContent">
                    {{showNoticeWord.content}}
                </div>
            </div>
        </Modal>
</template>

<script>

    export default {
        name:'ModalLookData',
        props:['systemLookData','noticeModel','showNoticeWord'],
        data () {
            return {
                notice:false//角色管理modal
            }
        },
        methods: {
            ok () {
                this.$emit('systemLookDataFunc');
            },
            cancel () {
                this.$emit('systemLookDataFunc');
            }
        },
        watch:{
            userModal(){
                this.notice=this.noticeModel;
            },
            systemLookData(){
                this.notice=this.systemLookData;
            }
        },
        mounted(){
            /*初始化按钮文字*/
            // this.configModalInit();
        }
    }
</script>

<style>
    .dgp-see-info .ivu-modal-close{
        display: none;
    }
    .dgp-see-info .ivu-modal-header{
        text-align: center;
        padding-top: .4rem;
        padding-bottom:0;
        border-bottom:none;
    }
    .dgp-see-info  .ivu-modal-body{
        padding-top: 0;
    }
    .dgp-see-info  .dgp-noticeTitle{
        padding-bottom: .2rem;
    }
    .dgp-see-info .ivu-modal-footer button:first-child{
        display: none;
    }
</style>
