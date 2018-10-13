<template>
    <div class="table2">
        <Table :columns="columns" :data="data" ref="selection"></Table>
    </div>   
    
</template>
<script>
    export default {
        props:["columns","data"],
        data () {
            return {
            columns:[
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                },
            ],
            data: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
            ]
            }
        },
        mounted(){
            let tablecells = $('.table2 .ivu-table-cell-ellipsis');
            let tableicon = $("<img src='tableicon.png' class='tableicon'/>")
            setTimeout(()=>{
                tablecells.each(function(){
                    if($(this).find('span').eq(0).width()>$(this).width()){
                        $(this).parent('td').append("<img src='tableicon.png' class='tableicon'/>");
                        //console.log($(this).find('img'))
                        $(this).siblings('img').on('click',function(){

                            if($(this).siblings('.ivu-table-cell').hasClass('ivu-table-cell-ellipsis')){
                                
                                $(this).parent('td').parent('.ivu-table-row').find('.ivu-table-cell').each(function(){
                                    $(this).removeClass('ivu-table-cell-ellipsis')
                                    $(this).siblings('img').addClass('tableicon-active').removeClass('tableicon');
                                    console.log($(this));
                                })
                            }else{
                                console.log(33);
                                $(this).parent('td').parent('.ivu-table-row').find('.ivu-table-cell').each(function(){
                                    $(this).addClass('ivu-table-cell-ellipsis')
                                     $(this).siblings('img').removeClass('tableicon-active').addClass('tableicon');
                                })
                            }
                        })
                    }
                })
            },100)
        },
        methods:{
            handleSelectAll (stauts) {
                this.$refs.selection.selectAll(stauts);
            }
        }
    }
</script>
<style>
    .table2 .ivu-table th{
        background: #f4f7f6;
   }
   .table2 .ivu-table-wrapper{
       border-color: #e1e8f0;
   }
   .table2 .ivu-table td, .ivu-table th{
       border-color: #e1e8f0;
   } 
   .table2 .ivu-table-default::before{
      background-color: #e1e8f0;

   }
   .table2 .ivu-table-default::after{
       background-color: #e1e8f0;
    
   }
   .table2 .ivu-table-header{
       border-color: #e1e8f0;
   } 
    .table2 thead tr th:nth-child(n+2){
        border-left: 1px solid #e1e8f0;
    }
    .table2 tbody tr td:nth-child(n+2){
        border-left: 1px solid #e1e8f0;
    }
    .table2 .tableicon{
       position:absolute;
       right:0;
       top: 50%;
       margin-top: -0.07rem;
       cursor: pointer;
   }
   .table2 .tableicon-active{
       position:absolute;
       right:0;
       bottom:0;
       cursor: pointer;
   }
   .table2 .ivu-table-row td{
       position: relative;
       
   }
</style>
