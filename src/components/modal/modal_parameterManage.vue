<template>
    <div>
        <!-- 角色管理modal -->
        <!-- <Button type="primary" @click="showModalMenu" class="dgp-systemParameter-tree-title-add btn-primary">新增</Button> -->
        <Modal v-model="systemParameter" title="参数新增" @on-ok="ok" @on-cancel="cancel" class-name="dgp-modal-systemParameter" :styles="{width: '7.36rem'}">
            <div class="dgp-systemParameter-newAdd-content clearfix">
                <div>
                    <span>参数KEY：</span>
                    <input type="text" placeholder="请输入参数KEY" v-model="paramKey" class="dgp-systemParameter-newAdd-inp">
                </div>
                <div>
                    <span>参数VALUE：</span>
                    <input type="text" placeholder="请输入参数VALUE" v-model="paramValue" class="dgp-systemParameter-newAdd-inp">
                </div>
                <div>
                    <span>参数顺序：</span>
                    <input type="text" placeholder="请输入参数顺序" v-model="paramOrder" class="dgp-systemParameter-newAdd-inp">
                </div>
                <div >
                    <span>参数描述：</span>
                    <input type="text" placeholder="请输入参数描述" v-model="paramDesc" class="dgp-systemParameter-newAdd-inp" >
                </div>
            </div>
            <div slot="footer">
                <button class="dgp-userModal-footerbtn btn-default" @click="cancel">取消</button>
                <button class="dgp-userModal-footerbtn btn-primary" @click="ok">确定</button>
            </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        props:["treeData","allTreeData"],
        data () {
            return {
                systemParameter:false,//角色管理modal
                paramKey:'',
                paramValue:'',
                paramOrder:'',
                paramDesc:''

            }
        },
        methods: {
            showModalMenu(){
                setTimeout(()=>{
                    if(this.treeData.id){
                        this.systemParameter = true;
                        this.paramKey='';
                        this.paramValue='';
                        this.paramOrder='';
                        this.paramDesc='';
                    }else{
                        this.$Message.info('请选择一个节点');
                    }
                },10)
            },
            ok () {
                if(!this.paramKey){
                    this.$Message.warning('请输入参数KEY');
                    return;
                }else if(!this.paramValue){
                    this.$Message.warning('请输入参数值');
                    return;
                }else if(!this.paramOrder){
                    this.$Message.warning('请选择角色状态');
                    return;
                }
                this.postRequestJson({
                    url:'/DGP/sysParam/create',
                    data:JSON.stringify({
                        id:'',
                        parentId:this.treeData.paramKey,
                        paramPath:this.treeData.paramPath+'/'+this.paramValue,
                        paramState:'1',
                        paramKey:this.paramKey,
                        paramValue:this.paramValue,
                        paramOrder:this.paramOrder,
                        paramDesc:this.paramDesc,
                        // oldKey:'',
                        // createTime:'',
                        // createUserName:''
                    }),
                    success:(res)=>{
                        if(res.success){
                            this.$Message.info(res.msg);
                            this.systemParameter = false;
                            this.$emit('reloadTree')
                        }
                    },
                    error:()=>{

                    }
                })

            },
            cancel () {
                this.systemParameter= false;
                 this.paramKey='';
                this.paramValue='';
                this.paramOrder='';
                this.paramDesc='';
            }
        }
    }
</script>

<style>
    .dgp-systemParameter-tree-title-add{
        float: left;
        margin-left: .24rem;
        margin-top: .25rem;
        /*width: 0.48rem;*/
        /*height: .26rem;*/
        /*min-width: 30px;*/
        /*min-height: 16px;*/
        min-width: .52rem;
        height: .3rem;
        line-height:.26rem;
        min-height: .3rem;
        border-radius: 0.03rem;
        font-size: 0.14rem;
        padding: 0.03rem;
        position:relative;
    }
    .dgp-systemParameter-tree-title-add span{
        display:inline-block;
        position:absolute;
        top:10%;
        left:12%;
    }

    .dgp-systemParameter-newAdd-inp{
        width: 3.8rem;
        height: .41rem;
        border-radius: 3px;
        margin-left: 0.1rem;
        padding-left: 0.2rem;
    }
    .dgp-systemParameter-newAdd-content>div{
        float: left;
        width:5.8rem;
        height: 0.8rem;
        text-align: right;
        font-size: .14rem;
    }
    .ivu-modal-footer button{
        border-radius: 3px;
    }
    .dgp-userModal-footerbtn{
        width:0.86rem;
        height:0.38rem;
        font-size:0.14rem;
        line-height: 0.38rem;
    }
</style>