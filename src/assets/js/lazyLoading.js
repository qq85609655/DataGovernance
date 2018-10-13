// 懒加载组件
function lazy(name) {
    switch(name){
        //系统管理
        case '/dgpSystemAdmin': return () => import('@/views/PlatformEntrance/dgpSystemAdmin.vue');
        break;
        case '/dgpSystemAdmin_redirect': return '/dgpSystemAdmin/dgpSystemUser';
        break;
        case 'dgpSystemUser': return () => import('@/views/systemAdmin/dgpSystemUser.vue');
        break;
        case 'dgpSystemRole': return () => import('@/views/systemAdmin/dgpSystemRole.vue');
        break;
        case 'dgpSystemJurisdiction': return () => import('@/views/systemAdmin/dgpSystemJurisdiction.vue');
        break;
        case 'dgpSystemMechanism': return () => import('@/views/systemAdmin/dgpSystemMechanism.vue');
        break;
        case 'dgpSystemMenu': return () => import('@/views/systemAdmin/dgpSystemMenu.vue');
        break;
        case 'dgpSystemParameter': return () => import('@/views/systemAdmin/dgpSystemParameter.vue');
        break;
        case 'dgpSystemConfigure': return () => import('@/views/systemAdmin/dgpSystemConfigure.vue');
        break;
        case 'dgpSystemNotice': return () => import('@/views/systemAdmin/dgpSystemNotice.vue');
        break;
        case 'dgpSystemJournal': return () => import('@/views/systemAdmin/dgpSystemJournal.vue');
        break;
        case 'dgpSystemProcess': return () => import('@/views/systemAdmin/dgpSystemProcess.vue');
        break;
    }

  }
  export {lazy}
  
  