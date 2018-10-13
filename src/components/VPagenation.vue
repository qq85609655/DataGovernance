<template>
    <Page :total="100" show-elevator show-sizer class-name="dgp-page-active"/>
</template>
<script>
    export default {
        name:'VPagenation',
        // props:["columns","data"],
        data () {
            return {
           
            }
        }
    }
</script>
<style>
   .dgp-page-active .ivu-page-item-active{
        border: 1px solid #dcdee2;
        color:#fff;
        background: #81c5bc;
   }
   .dgp-page-active .ivu-page-item-active a{
        color:#fff;
   }
   .dgp-page-active .ivu-page-item-jump-next a{
       color: #515a6e;
   }
   .dgp-page-active .ivu-page-item-jump-prev a{
       color: #515a6e;
   }
   .dgp-page-active .ivu-page-item:hover a {
        color: #515a6e;
    }   
   .ivu-page-next:hover, .ivu-page-prev:hover {
        border-color: #dcdee2;
    }
    .ivu-page-next:hover a, .ivu-page-prev:hover a{
        border-color: #515a6e;
    }
   .dgp-page-active .ivu-page-item:hover {
        border-color: #dcdee2;
    }
    .dgp-page-active .ivu-page-next:hover a, .ivu-page-prev:hover a {
        color: #515a6e;
    }
    .dgp-page-active .ivu-select-selection-focused, .ivu-select-selection:hover {
        border-color: #81c5bc;
    }
    .dgp-page-active .ivu-select-item-selected,.ivu-select-item-selected:hover {
        color: #515a6e;
    }
    .dgp-page-active .ivu-select-visible .ivu-select-selection {
        border-color: #dcdee2;
        outline: 0;
        box-shadow: 0 0 0 0;
    }
    .dgp-page-active .ivu-page-options-elevator input:hover {
        border-color: #dcdee2;
    }
    .dgp-page-active .ivu-page-options-elevator input:focus {
        border-color: #dcdee2;
        outline: 0;
        box-shadow: 0 0 0 0;
    }








</style>
