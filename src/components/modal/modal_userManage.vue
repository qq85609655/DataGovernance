<template>
    <Modal v-model="modalMenu" @on-cancel="cancel" :title="title"  class-name="dgp-modal-systemUser" :styles="{width: '9.7rem'}">
            <div class="dgp-systemUser-newAdd-content clearfix">
                <div style="position:relative;">
                    <!-- <span class="dgp-systemUser-asterisk">*</span> -->
                    <span>用户账号：</span>
                    <input v-model="showData.userName" placeholder="请输入用户账号" type="text" class="dgp-systemUser-newAdd-inp" :class="{'form-waring':inputTip[0]}" @input="checkInput(showData.userName,0)" @blur="checkInput(showData.userName,0)">
                    <span class="form-waring-notActive" :class="{'form-waring':inputTip[0]}">请输入正确的账户名</span>
                </div>
                <div>
                    <!-- <span class="dgp-systemUser-asterisk">*</span> -->
                    <span>用户名称：</span>
                    <input v-model="showData.realName" placeholder="请输入用户名称" type="text"  class="dgp-systemUser-newAdd-inp"  :class="{'form-waring':inputTip[1]}" @input="checkInput(showData.realName,1)" @blur="checkInput(showData.realName,1)">
                    <span class="form-waring-notActive" :class="{'form-waring':inputTip[1]}">请输入正确的用户名</span>
                </div>
                <div>
                    <span>证件号：</span>
                    <input v-model="showData.idCard" placeholder="请输入证件号" type="text"  class="dgp-systemUser-newAdd-inp" :class="{'form-waring':inputTip[2]}" @input="checkInput(showData.idCard,2)" @blur="checkInput(showData.idCard,2)">
                    <span class="form-waring-notActive" :class="{'form-waring':inputTip[2]}">请输入正确的证件号</span>
                </div>
                <div class="dgp-increseModal-userType">
                    <span>用户类型：</span>
                    <!-- <input v-model="typeList[showData.type]" type="text"  class="dgp-systemUser-newAdd-inp"> -->
                     <Select placeholder="请选择用户类型" v-model="showData.type" style="width:2.1rem;">
                        <template v-for='item in userType'>
                            <Option v-for="(v,key) in item" :value="key" :key="key">{{ v }}</Option>
                        </template>
                    </Select>
                    <span class="form-waring-notActive" :class="{'form-waring':inputTip[3]}">请选择用户类型</span>
                </div>
                <div class="dgp-postStation-post">
                    <span>岗位：</span>
                    <!--<input  v-model="showData.positionId" type="text"  class="dgp-systemUser-newAdd-inp">-->
                    <Select v-model="showData.positionId" style="width:2.1rem;" placeholder="请选择岗位">
                        <template v-for='item in postType'>
                            <Option v-for="(v,key) in item" :value="key" :key="key">{{ v }}</Option>
                        </template>
                    </Select>
                    <span class="form-waring-notActive" :class="{'form-waring':inputTip[4]}">请选择岗位</span>
                </div>
                <div style="position:relative;">
                    <!-- <span class="dgp-systemUser-asterisk">*</span> -->
                    <span>机构：</span>
                    <input placeholder="请选择机构" readonly v-model="showData.orgName" type="text"  style="cursor: pointer;" class="dgp-systemUser-newAdd-inp" @click.stop="showOrgTree">
                    <orgTree2 treeId="org2" :state="orgState" @changeOrgName="changeOrgName" ref="orgTree2"/>
                    <span class="form-waring-notActive" :class="{'form-waring':inputTip[5]}">请选择机构</span>
                </div>
                <div>
                    <span >联系方式</span>
                    <span style="color:#dddddd;"> (选填)</span>
                    <Tooltip content="Here is the prompt text" placement="top" theme="light">
                        <Icon size="14" color="#dddddd" type="ios-information-circle-outline" />
                    </Tooltip>
                    <span>：</span>
                    <input  style="margin-left: .13rem" placeholder="请输入联系方式" v-model="showData.contact" type="text"  class="dgp-systemUser-newAdd-inp " :class="{'form-waring':inputTip[6]}" @input="checkInput(showData.contact,6)" @blur="checkInput(showData.contact,6)">
                    <span class="form-waring-notActive" :class="{'form-waring':inputTip[6]}">请输入正确的联系方式</span>
                </div>
                <div>
                    <span>邮箱地址：</span>
                    <input placeholder="请输入邮箱地址" v-model="showData.email" type="text"  class="dgp-systemUser-newAdd-inp" :class="{'form-waring':inputTip[7]}" @input="checkInput(showData.email,7)" @blur="checkInput(showData.email,7)">
                    <span class="form-waring-notActive" :class="{'form-waring':inputTip[7]}">请输入正确的邮箱地址</span>
                </div>
                <div style="width: 4.9rem;margin-left:.25rem" class="dgp-onJob">
                    <span>在职状态：</span>
                    <template v-for='item in empSts'>
                        <button v-for="(v,key) in item" :key="key" @click="changeState(key)" class="dgp-systemUser-state btn-default" :class="{'btn-primary':showData.state== key}">{{v}}</button>
                    </template>
                    <!-- <button @click="changeState('1')" class="dgp-systemUser-state btn-default" :class="{'btn-primary':showData.state=='1'}">在职</button>
                    <button @click="changeState('2')" class="dgp-systemUser-state btn-default" :class="{'btn-primary':showData.state=='2'}">离职</button>
                    <button @click="changeState('3')" class="dgp-systemUser-state btn-default" :class="{'btn-primary':showData.state=='3'}">退休</button> -->
                </div>
            </div>
            <div slot="footer">
                <button class="dgp-userModal-footerbtn btn-default" @click="cancel">取消</button>
                <button class="dgp-userModal-footerbtn btn-primary" @click="ok">确定</button>
            </div>
    </Modal>
</template>

<script>
    import orgTree2 from '../../components/tree/tree_organization_select.vue';
    export default {
        name:'ModalUserManage',
        props:['userModal','userShowData','title','userType','empSts','postType'],
        components:{orgTree2},
        data () {
            return {
                inputTip:[false,false,false,false,false,false,false,false],//控制显示输入错误的提示
                orgState:false,//控制org树的显示隐藏
                modalMenu:false,
                showData:{
                    orgName:''
                },
                typeList:[
                    {
                        value:'1',
                        label:'普通用户'
                    },
                    {
                        value:'2',
                        label:'金融用户'
                    }
                ],
                postList :[
                    {
                        value: '1',
                        label: '董事长'
                    },
                    {
                        value: '2',
                        label: '监事长'
                    },
                    {
                        value: '3',
                        label: '行长'
                    },
                    {
                        value: '4',
                        label: '副行长'
                    },
                    {
                        value: '5',
                        label: '首席信息官'
                    },
                    {
                        value: '6',
                        label: '总经理'
                    },
                    {
                        value: '7',
                        label: '副总经理'
                    },
                    {
                        value: '8',
                        label: '科室主任'
                    },
                    {
                        value: '9',
                        label: '科室副主任'
                    },
                    {
                        value: '10',
                        label: '经理级科员'
                    },
                    {
                        value: '11',
                        label: '副经理级科员'
                    },
                    {
                        value: '12',
                        label: '科员'
                    },
                    {
                        value: '13',
                        label: '文秘'
                    },
                    {
                        value: '14',
                        label: '支行行长'
                    },
                    {
                        value: '15',
                        label: '支行副行长'
                    },
                    {
                        value: '16',
                        label: '分理处主任'
                    },
                    {
                        value: '17',
                        label: '行长助理'
                    },
                    {
                        value: '18',
                        label: '会计主管'
                    },
                    {
                        value: '19',
                        label: '客户经理'
                    },
                    {
                        value: '20',
                        label: '柜员'
                    },
                    {
                        value: '21',
                        label: '综合岗'
                    },
                    {
                        value: 22,
                        label: '大堂引导员'
                    },
                    {

                        value: 23,
                        label: '党办主任'
                    },
                    {
                        value: 24,
                        label: '审计员'
                    },
                    {
                        value: 25,
                        label: '调研员'
                    },
                    {
                        value: 26,
                        label: '驾驶员'
                    }

                    ],
                selectValue:2,
                // orgNameList:[null,'董事长','监事长','行长','副行长']
            }
        },
        methods: {
            checkInput( v,i ){//失焦或者input的时候验证
                console.log(v);
                if(!v){
                    console.log(this.inputTip[i]);
                    this.$set(this.inputTip, i, true);
                }else{
                    this.inputTip[i] = false;
                }
            },
            updateInformation(){
                if(!this.showData.userName){
                    this.$Message.warning('请输入用户账户');
                    return;
                }else if(!this.showData.realName){
                    this.$Message.warning('请输入用户名称');
                    return;
                }else if(!this.showData.orgId){
                    this.$Message.warning('请选择机构');
                    return;
                }
                if(this.showData.email){
                    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                    let result = reg.test(this.showData.email);
                    if (!result){
                        this.$Message.warning('邮箱格式错误请重新输入');
                        return;
                    }
                }
                let that = this;
                this.postRequestJson({
                    url:'/DGP/sysUser/update',
                    data:JSON.stringify({
                        id:this.showData.id,
                        userName:this.showData.userName,
                        realName:this.showData.realName,
                        type:this.showData.type? this.showData.type:'',
                        state:this.showData.state,
                        idCard:this.showData.idCard? this.showData.idCard:'',
                        orgId:this.showData.orgId,
                        orgName:this.showData.orgName,
                        email:this.showData.email? this.showData.email:'',
                        contact:this.showData.contact? this.showData.contact:'',
                        positionId:this.showData.positionId? this.showData.positionId:'',
                        passWord:this.showData.passWord? this.showData.passWord:'',
                        wrongNum:this.showData.wrongNum==null? 0:this.showData.wrongNum
                    }),
                    success:(res)=>{
                        // if(res.success){
                            that.$Message.info(res.msg);
                        // }
                        if(res.success){
                            that.$emit('reloadTable');
                            that.$emit('userManage')
                        }
                    },
                    error:()=>{

                    }
                })
            },
            addInformation(){
                if(!this.showData.userName){
                    this.$Message.warning('请输入用户账户');
                    return;
                }else if(!this.showData.realName){
                    this.$Message.warning('请输入用户名称');
                    return;
                }else if(!this.showData.orgId){
                    this.$Message.warning('请选择机构');
                    return;
                }
                if(this.showData.email){
                    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                    let result = reg.test(this.showData.email);
                    if (!result){
                        this.$Message.warning('邮箱格式错误请重新输入');
                        return;
                    }
                }
                //console.log(this.showData.id);
                console.log(this.showData.userName);
                console.log(this.showData.realName);
                console.log(this.showData.type);
                console.log(this.showData.state);
                console.log(this.showData.idCard);
                console.log(this.showData.orgId);
                console.log(this.showData.orgName);
                console.log(this.showData.email);
                console.log(this.showData.contact);
                console.log(this.showData.positionId);
                // console.log(this.showData.passWord);
                // console.log(this.showData.wrongNum);
                let that = this;
                this.postRequestJson({
                    url:'/DGP/sysUser/create',
                    data:JSON.stringify({
                        //id:this.showData.id,
                        userName:this.showData.userName,
                        realName:this.showData.realName,
                        type:this.showData.type ? this.showData.type:'',
                        state:this.showData.state,
                        idCard:this.showData.idCard ? this.showData.idCard:'',
                        orgId:this.showData.orgId,
                        orgName:this.showData.orgName,
                        email:this.showData.email ? this.showData.email:'',
                        contact:this.showData.contact ? this.showData.contact:'',
                        positionId:this.showData.positionId ? this.showData.positionId:'' ,
                        // passWord:this.showData.passWord,
                        // wrongNum:this.showData.wrongNum
                    }),
                    success:function(res){
                        // if(res.success){
                            that.$Message.info(res.msg);
                        // }
                        if(res.success){
                            that.$emit('reloadTable');
                            that.$emit('userManage')
                        }
                    },
                    error:()=>{
                    }
                })
            },
            ok () {
                this.checkInput(this.showData.userName,0);
                this.checkInput(this.showData.realName,1);
                this.checkInput(this.showData.idCard,2);
                this.checkInput(this.showData.contact,6);
                this.checkInput(this.showData.email,7);
                // return;
                if(this.title=="用户修改"){
                    this.updateInformation();
                }else if(this.title == "用户新增"){
                    this.addInformation();
                }
                
            },
            cancel () {
                this.$emit('userManage');
                this.$emit('reloadTable');

            },
            changeState(state){
                this.showData.state=state;
                //this.$set(this.showData,'state',state);
                //console.log(this.showData.state);
                this.$forceUpdate();
            },
            changeOrgName(treeNode){
                this.showData.orgName = treeNode.orgName;
                this.showData.orgId = treeNode.id;
                //console.log(this.showData.orgName);
                this.$set(this.showData,'orgName',treeNode.orgName);
                this.$set(this.showData,'orgId',treeNode.id);

                this.orgState = false;
            },
            showOrgTree(){
                this.orgState = !this.orgState;
            },
        },
        mounted(){
            let that = this;//转换下this指向
            $('body').click(function(e) { 
                that.orgState = false;
            })
            $('.dgp-tree-organization').bind('click',function(e){ 
                if (e.stopPropagation) {
                    e.stopPropagation(); 
                }
                else {
                    e.cancelBubble = true; 
                }
            }); 
        },
        watch:{
            userModal(){
                this.modalMenu=this.userModal;
            },
            userShowData(){
                let len = Object.keys(this.userShowData).length;
                if(len>0){
                    this.showData=this.userShowData;
                }else{
                    this.showData={state:'1'};
                    this.inputTip = [false,false,false,false,false,false,false,false];
                }

            },
            // modalMenu(newValue,old){
            //     if(newValue == true){
            //         this.$refs.orgTree2.initTree();
            //     }
            // }
        }
    }
</script>

<style scoped>
    .dgp-modal-systemUser button{
        cursor: pointer;
    }
    .dgp-systemUser-tree-title-add{
        float: left;
        margin-left: .24rem;
        margin-top: .25rem;
        width: 0.48rem;
        height: .26rem;
        min-width: 30px;
        min-height: 16px;
        border-radius: 0.03rem;
        font-size: 0.14rem;
        padding: 0.03rem;
    }
    .ivu-modal-footer button{
        border-radius: .03rem;
    }

    .dgp-systemUser-newAdd-inp{
        width: 2.1rem;
        height: .41rem;
        border-radius: 3px;
        margin-left: 0.1rem;
        padding-left: 0.1rem;
    }
    .dgp-systemUser-newAdd-inp.form-waring{
        border-color:#D77F7F;
    }
    .dgp-systemUser-newAdd-content{
        padding-bottom: 0.2rem;
        margin-top: 0.3rem;
    }
    .dgp-systemUser-newAdd-content>div{
        float: left;
        width: 4.36rem;
        height: 0.70rem;
        text-align: right;
        font-size: .14rem;
        margin-left: 0.1rem;
        position: relative;
    }
    .dgp-modal-systemUser .ivu-modal-body{
        padding:0;
    }
    
    .dgp-systemUser-newAdd-content>div span.form-waring-notActive{
        display: none;
    }
    .dgp-systemUser-newAdd-content>div span.form-waring{
        position:absolute;
        left:2.37rem;
        top:0.45rem;
        color:#D77F7F;
        display: block;
    }
    .dgp-systemUser-newAdd-list>button{
        text-align: center;
        display: inline-block;
        min-width:.88rem;
        height: .36rem;
        line-height: .6rem;
        margin-right: .3rem;
        border-radius: .03rem;
        font-size: .16rem;
    }

    .dgp-systemUser-state{
        display: inline-block;
        margin-left: 0.2rem;
        width: .8rem;
        height: .38rem;
        border-radius: 3px;
        text-align: center;
        line-height: .38rem;
    }
    .dgp-tree-organization{
        top:0.4rem;
        right:0;
    }
    .dgp-modal-systemUser .ivu-modal-footer button:first-child:hover{
        background: #32B3EA;
        color:#fff;
    }

    /*.dgp-userPhone-type{*/
        /*display:inline-block;*/
        /*margin-right:3rem;*/
    /*}*/

    .dgp-onJob span{
        margin-right:-.08rem;
    }


    /*!*用户类型下拉框样式*!*/
    .dgp-increseModal-userType span,.dgp-postStation-post span{
        margin-right:.13rem;
    }
    .dgp-userModal-footerbtn{
        width:0.86rem;
        height:0.38rem;
        font-size:0.14rem;
        line-height: 0.38rem;
    }

</style>

