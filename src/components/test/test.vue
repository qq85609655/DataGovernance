<template>
    <div>
        <Tree :state="true"/>
    </div>
</template>
<script>
    import  Tree from '../tree/tree_organization_select'
export default {
    components:{
        Tree
    },
    mounted(){
        // this.postRequest({
        //     url:'/api/DGP/j_spring_security_check',
        //     data:{username:'test',password:'111111'},
        //     success:(response)=>{
        //             console.log(response);
        //     },
        //     error:()=>{

        //     }
        // })
    }
}
</script>
<style>

</style>
