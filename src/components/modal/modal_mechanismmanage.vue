<template>
    <div>
        <!-- <Button type="primary" @click="showModalMenu" class="dgp-systemMechanism-tree-title-add">新增</Button> -->
        <Modal v-model="modalMenu" title="机构新增" @on-cancel="cancel" class-name="dgp-modal-systemMechanism" :styles="{width: '7.8rem'}">
            <div class="dgp-systemMechanism-newAdd-content clearfix">
                <div>
                    <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                    <span>机构编码：</span>
                    <input placeholder="请输入机构编码" v-model="orgCode" type="text" class="dgp-systemMechanism-newAdd-inp">
                </div>
                <div>
                    <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                    <span>父机构编码：</span>
                    <input v-model="this.treeData.orgCode"  type="text"  class="dgp-systemMechanism-newAdd-inp" disabled>
                </div>
                <div>
                    <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                    <span>机构名称：</span>
                    <input placeholder="请输入机构名称" v-model="orgName" type="text"  class="dgp-systemMechanism-newAdd-inp">
                </div>
                <div>
                    <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                    <span>父机构名称：</span>
                    <input v-model="this.treeData.orgName" type="text"  class="dgp-systemMechanism-newAdd-inp" disabled>
                </div>
                <div>
                    <!-- <span class="dgp-systemMechanism-asterisk">*</span> -->
                    <span>机构简称：</span>
                    <input placeholder="请输入机构简称" v-model="orgShortName" type="text"  class="dgp-systemMechanism-newAdd-inp">
                </div>
                <div>
                    <span>机构层级：</span>
                    <input v-model="orgLevel" type="text"  class="dgp-systemMechanism-newAdd-inp" disabled>
                </div>
                <div>
                    <span>负责人：</span>
                    <input placeholder="请输入负责人" v-model="manageUserId" type="text"  class="dgp-systemMechanism-newAdd-inp">
                </div>
                <div>
                    <span>排序号：</span>
                    <input v-model="orgOrder" type="text"  class="dgp-systemMechanism-newAdd-inp"  disabled>
                </div>
                <div>
                    <span style="padding-right: 0.1rem">状态：</span>
                        <template v-for='item in serverUsed'>
                            <!-- <button v-for="(v,key) in item" :key="key" @click="stateChange(key)" class="dgp-systemMechanism-state" :class="{'dgp-systemMechanism-active':treeData.state== key,'dgp-systemMechanism-noactive':treeData.state!= key,'notAllow':!modifyState}"  disabled="disabled" style="">{{v}}</button> -->
                            <button @click="changeState(key)" v-for="(v,key) in item" :key="key" style="cursor: pointer!important;" class="dgp-systemMechanism-state" :class="{'btn-primary':state == key,'btn-default':state!=key}">{{v}}</button>
                        </template>
                    <!-- <button style="cursor: pointer!important;" class="dgp-systemMechanism-state btn-primary dgp-systemMechanism-state-addrun" @click="stateAddrun">启用</button>
                    <button style="cursor: pointer!important;" class="dgp-systemMechanism-state btn-default dgp-systemMechanism-state-addstop" @click="stateAddstop">停用</button> -->
                </div>
                <div>
                    <span>机构类别：</span>
                    <input placeholder="请输入机构类别" v-model="orgType" type="text"  class="dgp-systemMechanism-newAdd-inp">
                </div>
                <div>
                    <span>机构等级：</span>
                    <input placeholder="请输入机构等级" v-model="orgGrade" type="text"  class="dgp-systemMechanism-newAdd-inp">
                </div>
            </div>
            <div slot="footer">
                <button class="dgp-modal-systemMechanism-btn btn-default" @click="cancel">关闭</button>
                <button class="dgp-modal-systemMechanism-btn btn-primary" @click="ok">确定</button>
            </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        props:["treeData","allTreeData",'serverUsed'],
        data () {
            return {
                modalMenu:false,//角色管理modal
                orgCode:'',
                orgName:'',
                //fatherOrgId:'',
                //fatherOrgName:'',
                orgShortName:'',
                orgLevel:'',
                manageUserId:'',
                orgOrder:'',
                state:1,
                orgType:'',
                orgGrade:'',
                treeId:'',
            }
        },
        methods: {
            showModalMenu(){
                
                if(this.treeData.id){
                    this.modalMenu = true;
                }else{
                    this.$Message.info('请选择一个节点');
                }
            },
            changeState(k){
                this.state = k;
                console.log(this.state);
            },
            // stateAddrun(){
            //     this.state = '1';
            //     console.log(11);
            //     $(".dgp-systemMechanism-state-addrun").css({
            //         backgroundColor: "rgba(50, 179, 234, 1)",
            //         color:"#FFFFFF" ,

            //     });
            //     $(".dgp-systemMechanism-state-addstop").css({
            //         backgroundColor:"#FFFFFF",
            //         border: ".01rem solid rgba(50, 179, 234, 1)",
            //         color: "rgba(50, 179, 234, 1)"
            //     });
            // },
            // stateAddstop(){
            //     console.log(2222);
            //     this.state = '2';
            //     $(".dgp-systemMechanism-state-addrun").css({

            //         backgroundColor:"#FFFFFF",
            //         border: ".01rem solid rgba(50, 179, 234, 1)",
            //         color: "rgba(50, 179, 234, 1)"
            //     });
            //     $(".dgp-systemMechanism-state-addstop").css({
            //         backgroundColor: "rgba(50, 179, 234, 1)",
            //         color:"#FFFFFF" ,
            //     });
            // },
            ok () {
                if(this.orgCode && this.orgName && this.orgShortName){
                    this.postRequestJson({
                        url:'/DGP/sysOrg/create',
                        data:JSON.stringify({
                            orgCode:this.orgCode,
                            orgName:this.orgName,
                            fatherOrgId:this.treeData.orgCode,
                            fatherOrgName:this.treeData.orgName,
                            orgShortName:this.orgShortName,
                            orgLevel:this.orgLevel,
                            manageUserId:this.manageUserId,
                            orgOrder:this.orgOrder,
                            state:this.state,
                            orgType:this.orgType,
                            orgGrade:this.orgGrade
                        }),
                        success:(res)=>{
                            if(res.success){
                                this.$Message.info(res.msg);
                                this.modalMenu = false;
                                this.$emit('reloadTree');
                            }
                        },
                        error:()=>{

                        }
                    })
                }else{
                    this.$Message.info('请填完必填项');
                }
            },
            cancel () {
                this.modalMenu=false;//角色管理modal
                this.orgCode='';
                this.orgName='';
                //fatherOrgId='';
                //fatherOrgName='';
                this.orgShortName='';
                this.orgLevel='';
                this.manageUserId='';
                this.orgOrder='';
                this.state=1;
                this.orgType='';
                this.orgGrade='';
                this.treeId='';
            }
        },
        watch:{
            treeData(){
                let arr= [];
                this.treeId = this.treeData.orgCode;
                this.orgLevel = parseInt(this.treeData.orgLevel) + 1;
                for(let i in this.allTreeData){
                    if(this.allTreeData[i].fatherOrgId == this.treeId){
                        arr.push(this.allTreeData[i].orgOrder);
                    }
                }
                if(arr.length){
                    this.orgOrder =Math.max.apply(null,arr)+1;
                }else{
                    this.orgOrder = 1;
                }
                
            }
        }
    }
</script>

<style>

    .dgp-systemMechanism-tree-title-add{
        float: left;
        margin-left: .24rem;
        margin-top: .25rem;
        width: .5rem;
        height: .3rem;
        line-height:.26rem;
        min-width: .31rem;
        min-height: .3rem;
        border-radius: 0.03rem;
        font-size: 0.14rem;
        position:relative;
    }
    .dgp-systemMechanism-tree-title-add span{
        display:inline-block;
        position:absolute;
        top:10%;
        left:13%;
    }
    .ivu-modal-footer button{
        border-radius: .03rem;
    }

    .dgp-systemMechanism-newAdd-inp{
        width: 1.9rem;
        height: .41rem;
        border-radius: .03rem;
        margin-left: 0.1rem;
        padding-left: 0.1rem;
    }
    .dgp-systemMechanism-newAdd-content{
        padding-bottom: 0.2rem;
        margin-top: 0.3rem;
    }
    .dgp-systemMechanism-newAdd-content>div{
        float: left;
        /*width: 3.23rem;*/
        width:3.5rem;
        height: 0.6rem;
        text-align: right;
        font-size: .14rem;
        margin-left: 0.1rem;
    }
    .dgp-modal-systemMechanism .ivu-modal-body{
        padding:.03rem;
    }
    .dgp-systemMechanism-newAdd-content>div span{
        color:#333;
    }
    .dgp-systemMechanism-newAdd-list>button{
        text-align: center;
        display: inline-block;
        width: .88rem;
        height: .36rem;
        line-height: .36rem;
        margin-right: .3rem;
        border-radius: 3px;
        font-size: .16rem;
    }
    .dgp-systemMechanism-newAdd-content .dgp-systemMechanism-state{
        display: inline-block;
        
        width: .8rem;
        height: .38rem;
        border-radius: 3px;
        text-align: center;
        line-height: .38rem;
        margin-right: 0.15rem;
    }
    /* .dgp-modal-systemMechanism .dgp-systemMechanism-state.active{

    } */
    /*.dgp-systemMechanism-info-content  .dgp-systemMechanism-state:hover{*/
        /*color:#fff;*/
        /*background:#32B3EA ;*/
    /*}*/
    .dgp-modal-systemMechanism-btn{
        width:0.86rem;
        height:0.38rem;
        font-size:0.14rem;
        line-height: 0.38rem;
    }

</style>