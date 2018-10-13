<template>
  <div  class="dgp-search-router-tree">
    <v-create-batch></v-create-batch>
    <v-pagenation></v-pagenation>
  </div>
</template>
<script>
    import VPagenation from "../components/VPagenation";
    import VCreateBatch from "../components/VCreateBatch";
    export default {
        name: 'SearchTree',
        components: {
            VCreateBatch,
            VPagenation

        }
    }
</script>
<style scoped>

</style>
