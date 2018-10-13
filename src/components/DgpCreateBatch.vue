<template>
    <div class="dgp-table-controls">
        <!--新建与批量操作-->
        <Button @click="createControl" class="dgp-create-control" :class="{'dsp-active':isControl}"><Icon type="md-add" />&nbsp;新建</Button>
        <Button @click="batchControl" class="dgp-batch-control" :class="{'dsp-active':isBatch}">批量操作</Button>
    </div>
</template>

<script>
    export default {
        name: "DgpCreateBatch",
        data(){
            return{
                isControl:true,             //table 新建背景样式class
                isBatch:false,              //table 批量背景样式class

            }
        },
        methods:{
            //操作新建
            createControl(){
                if(this.isControl){
                    this.isControl=false;
                }else{
                   this.isControl=true;
                   this.isBatch=false;
                }
            },
            //操作批量
            batchControl(){
                if(this.isBatch){
                    this.isBatch=false;
                    this.$emit('doBatch',false);
                }else{
                    this.isBatch=true;
                    this.isControl=false;
                    this.$emit('doBatch',true)
                }
            }
        },
    }
</script>

<style scoped>
    .dgp-table-controls{
        padding-bottom: .2rem;
    }
    /*search table新建批量样色*/
    .dgp-router-view .dgp-table-controls>button{
        height: .36rem;
        line-height: .36rem;
        padding:0 .1rem;
        margin-right: .08rem;
        border-radius: .03rem;
        border-width:.01rem;
        border-style:solid;
        /*color:rgba(0,0,0,0.65);*/
        /*border: .01rem solid #D9D9D9;*/
    }
    /*search table新建批量active*/
    /*.dgp-router-view .dgp-table-controls>button.dsp-active{*/
        /*border-color: #6BC7BC;*/
        /*color:#FFF;*/
    /*}*/
</style>