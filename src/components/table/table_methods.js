
// /*创建表格函数，设置超出省略，点击全部显示*/
function createTable(){
    let tablecells = $('.ivu-table-cell-ellipsis');
    let tableicon = $("<img src='tableicon.png' class='tableicon'/>");
    setTimeout(()=>{
        tablecells.each(function(){
            if($(this).find('span').eq(0).width()>$(this).width()){
                if($(this).parent('td').find('.tableicon').length<1){
                    $(this).parent('td').append("<img src='tableicon.png' class='tableicon'/>");
                }
                //console.log($(this).find('img'))
                $(this).siblings('img').on('click',function(){

                    if($(this).siblings('.ivu-table-cell').hasClass('ivu-table-cell-ellipsis')){

                        $(this).parent('td').parent('.ivu-table-row').find('.ivu-table-cell').each(function(){
                            $(this).removeClass('ivu-table-cell-ellipsis')
                            //$(this).siblings('img').addClass('tableicon-active').removeClass('tableicon');
                            console.log($(this));
                        })
                    }else{
                        console.log(33);
                        $(this).parent('td').parent('.ivu-table-row').find('.ivu-table-cell').each(function(){
                            $(this).addClass('ivu-table-cell-ellipsis')
                            //$(this).siblings('img').removeClass('tableicon-active').addClass('tableicon');
                        })
                    }
                })
            }
        })
    },100);
}
// /*没有数据，显示默认背景图片*/
function blankTable(){
    /*表格无数据显示,初始化替换*/
    /*let html=`<tr>
            <td>
                <p>抱歉!&nbsp;&nbsp;没有找到关于“&nbsp;<span>${this.searchWord}</span>&nbsp;”的相关标准，请提交&nbsp;<a>数据标准申请</a></p>
                <div class="dgp-search-blank-submit">提交申请</div>
            </td>
          </tr>`;*/
    let html=`<tr>
                        <td>
                            <p>抱歉!&nbsp;&nbsp;没有找到相关记录</p>

                        </td>
                      </tr>`;
    $('.ivu-table-tip>table>tbody').html(html);
}
export {createTable,blankTable};