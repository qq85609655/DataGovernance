<template>
    <dgp-nav-left-top :iconLists="iconList" :twoMenuContents="twoMenuContent"></dgp-nav-left-top>
</template>

<script>
    import DgpNavLeftTop from "./dgpNavLeftTop";
    export default {
        components: {DgpNavLeftTop},
        data(){
            return{
                iconList:[
                    require('../../assets/images/dgp-home-icon1.png'),
                    require('../../assets/images/dgp-home-icon2.png'),
                    require('../../assets/images/dgp-home-icon3.png'),
                    require('../../assets/images/dgp-home-icon4.png'),
                    require('../../assets/images/dgp-home-icon5.png'),
                    require('../../assets/images/dgp-home-icon6.png')
                ],
                twoMenuContent:{
                    "数据标准":{
                        "组织信息":[
                            {name:"组织信息",address: "/dgpDataStandard/dgpDataInfo"},
                        ],
                        "数据标准":[
                            {name:"数据标准",address: "/dgpDataStandard/dgpDatastandard"}
                        ],
                        "搜索":[
                            {name:"搜索",address: "/dgpDataStandard/dgpDataSearch"}
                        ],
                        "映射":[
                            {name:"映射",address: "/dgpDataStandard/dgpDataMapping"}
                        ],
                        "数据查询":[
                            {name:"数据查询",address: "/dgpDataStandard/dgpDataQuery"}
                        ],
                        "计划管理":[
                            {name:"计划管理",address: "/dgpDataStandard/dgpDataPlan"}
                        ]
                    }
                },
            }
        }
    }
</script>