<template>
    <div>
        <!-- 角色管理modal -->
        <Button type="primary" @click="modal2 = true">角色管理</Button>
        <Modal v-model="modal2" title="角色管理" @on-ok="ok" @on-cancel="cancel" class-name="dgp-modal-usermanager-formbox" :styles="{width: '6.59rem'}">
                <div class="usercode dgp-modal-usermanager-item">
                    <span>角色编码</span><Input  clearable style="width: 2.52rem;height:0.38rem" />
                </div>
                <div class="username dgp-modal-usermanager-item">
                    <span>角色名称</span><Input  clearable style="width: 2.52rem;height:0.38rem" />
                </div>
                <div class="userstate dgp-modal-usermanager-item">
                    <span>角色状态</span>
                    <button class="active">停用</button><button style="margin-left:0.2rem">启用</button>
                </div>
                <div class="userdescription dgp-modal-usermanager-item">
                    <span>角色描述</span><Input  type="textarea"  :rows="4" style="width: 4.89rem; resize: none;"/>
                </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                modal2:false//角色管理modal
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

<style scoped>
    /* 角色管理modal样式 */
    /*.ivu-input:focus, .ivu-input:hover {*/
        /*border-color: #6BC7BC;*/
    /*}*/
    .dgp-modal-usermanager-formbox .ivu-modal-body{
        padding:0 0 0.35rem 0.638rem;
    }
    .dgp-modal-usermanager-item{
        margin-top: 0.24rem;
    }
    .dgp-modal-usermanager-item span{
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        /*color: rgba(0,0,0,0.85);*/
        margin-right: 0.162rem;
        line-height: 0.38rem;
        vertical-align: top;
    }
    .dgp-modal-usermanager-item button{
        width:0.8rem;
        height: 0.38rem;
        border-width:.01rem;
        border-style:solid;
        /*border: 1px solid #E8E8E8;*/
        border-radius: 3px;
    }
    .dgp-modal-usermanager-item button.active{
        width:0.8rem;
        height: 0.38rem;
        /*color:#fff;*/
        /*background: #6BC7BC;*/
        border-width:.01rem;
        border-style:solid;
        /*border: 1px solid #6BC7BC;*/
        border-radius: 3px;
    }
    .dgp-modal-usermanager-item textarea{
        resize:none;
    }
    /*.dgp-modal-usermanager-formbox .ivu-btn-primary {*/
        /*background-color: #6BC7BC;*/
        /*border-color: #6BC7BC;*/
    /*}*/
    /*.dgp-modal-usermanager-formbox .ivu-btn-primary:hover {*/
        /*color: #fff;*/
        /*background-color: #6BC7BC;*/
        /*border-color: #6BC7BC;*/
    /*}*/
    /*.dgp-modal-usermanager-formbox .ivu-btn-text:hover {*/
        /*color: #6BC7BC;*/
    /*}*/
</style>