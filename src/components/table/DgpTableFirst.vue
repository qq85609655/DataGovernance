<template>
    <div class="home-table">
        <Table stripe :columns="columns" :data="data" ref="selection"></Table>
    </div>
</template>
<script>
    export default {
        props:[
            "columns",
            "data",
            "word"       //搜索关键字
        ],
        data () {
            return {

            }
        },
        methods:{
            /*封装设置表单是否全选*/
            handleSelectAll (stauts) {
                this.$refs.selection.selectAll(stauts);
            },
            /*创建表格函数，设置超出省略，点击全部显示*/
            createTable(){
                let tablecells = $('.home-table .ivu-table-cell-ellipsis');
                let tableicon = $("<img src='tableicon.png' class='tableicon'/>");
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
                },100);
            },
            /*没有数据，显示默认背景图片*/
            blankTable(){
                /*表格无数据显示,初始化替换*/
                /*let html=`<tr>
                        <td>
                            <p>抱歉!&nbsp;&nbsp;没有找到关于“&nbsp;<span>${this.word}</span>&nbsp;”的相关标准，请提交&nbsp;<a>数据标准申请</a></p>
                            <div class="dgp-search-blank-submit">提交申请</div>
                        </td>
                      </tr>`;*/
                let html=`<tr>
                        <td>
                            <p>抱歉!&nbsp;&nbsp;没有找到关于“&nbsp;<span>${this.word}</span>&nbsp;”的相关记录</p>

                        </td>
                      </tr>`;
                $('.ivu-table-tip>table>tbody').html(html);
            }
        },
        mounted(){
            this.createTable();
            this.blankTable();

        },
        updated(){
            this.createTable();
        }
    }
</script>
<style scoped>
    .home-table{
        min-height: 6.18rem;
    }
    .home-table .ivu-table thead>tr{
        border-radius: .03rem;
        overflow: hidden;
    }
    .home-table .ivu-table th{
       background: #E7EEEB ;
       font-weight: bold;
   }
   .home-table .ivu-table tr{
       height:.56rem;
   }
   .home-table .ivu-table-wrapper{
       border: none;
   }
   .home-table .ivu-table td, .ivu-table th{
       border: none;
   } 
   .home-table .ivu-table-default::before{
    display: none;

   }
   .home-table .ivu-table-default::after{
    display: none;
    
   }
   .home-table .ivu-table-header{
       border-bottom: 1px solid #dbe3ec;
   }
   .home-table tbody tr:nth-child(2n)>td{
        background: #f8faf9;
   }
   .home-table .ivu-table-row-hover td{
       background:  none;
   }
   .home-table .tableicon{
       position:absolute;
       right:0;
       top: 50%;
       margin-top: -0.07rem;
       cursor: pointer;
   }
   .home-table .tableicon-active{
       position:absolute;
       right:0;
       bottom:0;
       cursor: pointer;
   }
   .home-table .ivu-table-row td{
       position: relative;
       
   }

    /*zh search有数据 css*/
    .home-table .ivu-table-body table>tbody>tr:hover>td{
        background-color: #c1e6e2;
    }
    .home-table .ivu-table-body table>tbody>tr>td:last-child>div>div>a:not(:last-child):after{
        content: "|";
        padding-left: .02rem;
        color:#595959!important;
    }
    .home-table .ivu-table-body table>tbody>tr>td:last-child>div>div>a:not(:last-child){
        margin-right: .03rem;
    }
    .home-table  table>tbody>tr>td a{
        text-decoration: none;
        background-color: transparent;
    }
    /*zh search无数据 css*/
    .home-table .ivu-table-tip table>tbody>tr:first-child{
        height: 5.6rem;
    }
    .home-table .ivu-table-tip>table>tbody>tr:first-child>td{
        background: url("../../assets/images/tableBlank.png") center 1rem no-repeat;
        background-size: 2.15rem 1.26rem;
        font-size: .16rem;
        text-align: center;
    }
    .home-table .ivu-table-tip>table>tbody>tr:first-child>td>p{
        height: 1.2rem;
        width: 100%;
        padding: .42rem 0 .54rem 0;
    }
    .home-table .ivu-table-tip>table>tbody>tr:first-child>td>p>span{
        color:#1890FF;
        cursor: pointer;
    }
    .home-table .ivu-table-tip>table>tbody>tr:first-child>td>p>a{
        color:#1890FF;
        text-decoration: none;
    }
    .home-table .ivu-table-tip>table>tbody>tr:first-child>td>div{
        width:1.4rem;
        height:.34rem;
        line-height: .34rem;
        font-size: .16rem;
        color:#FFF;
        background-color: #6BC7BC;
        border-radius: .03rem;
        display: inline-block;
        overflow: hidden;
        cursor: pointer;
    }
    /*去除overflow*/
    .home-table>.ivu-table-wrapper>.ivu-table{
        overflow: visible;
    }
    /*废止*/
    /*.home-table .ivu-table-body table>tbody>tr>td:last-child>div>div>div .ivu-poptip-body>.ivu-icon-ios-help-circle{*/
        /*display: none;*/
    /*}*/
</style>