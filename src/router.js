import Vue from 'vue'
import Router from 'vue-router'
import dgpDataStandard from './views/PlatformEntrance/dgpDataStandard.vue'
import dgpLogin from '@/views/dgpLogin.vue'
import dgpAdministrator from './views/dgpAdministrator.vue';
import dgpDataQuality from './views/PlatformEntrance/dgpDataQuality.vue'
import dgpMetadata from './views/PlatformEntrance/dgpMetadata.vue'
import dgpSystemAdmin from './views/PlatformEntrance/dgpSystemAdmin.vue'
import dgpScreenDisplay from './views/PlatformEntrance/dgpScreenDisplay.vue'
import dgpDataInfo from './views/DataStandard/dgpOrganizationInfo.vue'
import dgpDatastandard from './views/DataStandard/dgpDatastandard.vue'
import dgpDataSearch from './views/DataStandard/dgpDataSearch.vue'
import dgpDataMapping from './views/DataStandard/dgpDataMapping.vue'
import dgpDataQuery from './views/DataStandard/dgpDataQuery.vue'
import dgpDataPlan from './views/DataStandard/dgpDataPlan.vue'
import dgpSystemUser from './views/systemAdmin/dgpSystemUser.vue'
import dgpSystemRole from './views/systemAdmin/dgpSystemRole.vue'
import dgpSystemJurisdiction from './views/systemAdmin/dgpSystemJurisdiction.vue'
import dgpSystemMechanism from './views/systemAdmin/dgpSystemMechanism.vue'
import dgpSystemMenu from './views/systemAdmin/dgpSystemMenu.vue'
import dgpSystemParameter from './views/systemAdmin/dgpSystemParameter.vue'
import dgpSystemConfigure from './views/systemAdmin/dgpSystemConfigure.vue'
import dgpSystemNotice from './views/systemAdmin/dgpSystemNotice.vue'
import dgpSystemJournal from './views/systemAdmin/dgpSystemJournal.vue'
import dgpSystemProcess from './views/systemAdmin/dgpSystemProcess.vue'
import metaDataChange from './views/metaData/metaDataChange.vue'
import metaDataIndex from './views/metaData/metaDataIndex.vue'
import dataQualtyIndex from './views/DataQualtyIndex/dataQualtyIndex.vue'
import dataQualtyDispatch from './views/DataQualtyIndex/dataQualtyDispatch.vue'
import dataQualtyAnalysis from './views/DataQualtyIndex/dataQualtyAnalysis.vue'
import dataQualtyProblem from './views/DataQualtyIndex/dataQualtyProblem.vue'
import dataQualtyAssessment from './views/DataQualtyIndex/dataQualtyAssessment.vue'
import dataQualtyDepartment from './views/DataQualtyIndex/dataQualtyDepartment.vue'
import  dgpSearchAttention from "./views/DataStandard/dgpSearchAttention"
import  dgpSearchAll from "./views/DataStandard/dgpSearchAll"
import  dgpSearchTree from "./views/DataStandard/dgpSearchTree"
import Test from './components/test/test'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/',component: dgpLogin},
    //     { path:'/dgpAdministrator',component:dgpAdministrator},
        {
            path: '/dgpDataStandard',redirect: '/dgpDataStandard/dgpDataInfo', component: dgpDataStandard,
            children:[
                {path:'dgpDataInfo', component:dgpDataInfo},
                {path:'dgpDatastandard', component:dgpDatastandard},
                {path:'dgpDataSearch',redirect: 'dgpDataSearch/all', component:dgpDataSearch,
                    children:[
                        { path: 'all',component: dgpSearchAll },
                        { path: 'attention',component: dgpSearchAttention },
                        { path: 'tree',component: dgpSearchTree }
                    ]
                },
                {path:'dgpDataMapping', component:dgpDataMapping},
                {path:'dgpDataQuery', component:dgpDataQuery},
                {path:'dgpDataPlan', component:dgpDataPlan},
            ],
        },
    //     { path:'/dgpDataQuality',redirect: '/dgpDataQuality/dataQualtyIndex', component:dgpDataQuality,
    //         children:[
    //             { path: 'dataQualtyIndex', component: dataQualtyIndex },
    //             { path: 'dataQualtyDispatch', component: dataQualtyDispatch },
    //             { path: 'dataQualtyAnalysis', component: dataQualtyAnalysis },
    //             { path: 'dataQualtyProblem', component: dataQualtyProblem },
    //             { path: 'dataQualtyAssessment', component: dataQualtyAssessment },
    //             { path: 'dataQualtyDepartment', component: dataQualtyDepartment },
    //         ]
    //     },
    //     { path:'/dgpMetadata', component:dgpMetadata,
    //         children:[
    //             { path: '/dgpMetadata/metaDataChange', component: metaDataChange },
    //             { path: '/dgpMetadata/metaDataIndex', component: metaDataIndex },
    //         ]
    //     },
    //   { path:'/dgpSystemAdmin', redirect: '/dgpSystemAdmin/dgpSystemUser',component:dgpSystemAdmin,
    //       children:[
    //           { path: 'dgpSystemUser', component: dgpSystemUser },
    //           { path: 'dgpSystemRole', component: dgpSystemRole },
    //           { path: 'dgpSystemJurisdiction', component: dgpSystemJurisdiction },
    //           { path: 'dgpSystemMechanism', component: dgpSystemMechanism },
    //           { path: 'dgpSystemMenu', component: dgpSystemMenu },
    //           { path: 'dgpSystemParameter', component: dgpSystemParameter },
    //           { path: 'dgpSystemConfigure', component: dgpSystemConfigure },
    //           { path: 'dgpSystemNotice', component: dgpSystemNotice },
    //           { path: 'dgpSystemJournal', component:  dgpSystemJournal },
    //           { path: 'dgpSystemProcess', component: dgpSystemProcess }
    //       ]
    //   },
    //   { path:'/dgpScreenDisplay', component:dgpScreenDisplay }
  ]
})
