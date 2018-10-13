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
                    require('../../assets/images/icon/system-mechanism.png'),
                    require('../../assets/images/icon/system-jurisdiction.png'),
                    require('../../assets/images/icon/system-configure.png'),
                    require('../../assets/images/icon/system-journal.png')
                ],
                twoMenuContent:{
                    "系统管理":{
                        "用户机构":[
                            {name:"用户管理",address: "/dgpSystemAdmin/dgpSystemUser"},
                            {name:"机构管理",address: "/dgpSystemAdmin/dgpSystemMechanism"}
                        ],
                        "角色权限":[
                            {name:"角色管理",address: "/dgpSystemAdmin/dgpSystemRole"},
                            {name:"权限管理",address: "/dgpSystemAdmin/dgpSystemJurisdiction"}
                        ],
                        "系统设置":[
                            {name:"菜单管理",address: "/dgpSystemAdmin/dgpSystemMenu"},
                            {name:"参数管理",address: "/dgpSystemAdmin/dgpSystemParameter"},
                            {name:"配置管理",address: "/dgpSystemAdmin/dgpSystemConfigure"},
                            {name:"流程管理",address: "/dgpSystemAdmin/dgpSystemProcess"}
                        ],
                        "通知日志":[
                            {name:"通知管理",address: "/dgpSystemAdmin/dgpSystemNotice"},
                            {name:"日志管理",address: "/dgpSystemAdmin/dgpSystemJournal"}
                        ]
                    }
                },
            }
        }
    }
</script>