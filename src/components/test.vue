<template>
    <div>
        <homeTable :columns="columns" :data="data"/>

        <div class="home-table" style="padding:50px;">
            <Table :columns="columns" :data="data"></Table>
        </div>
        <table2 :columns="columns" :data="data"/>
        <table3 :columns="columns" :data="data"/>
        <Page :total="100" show-elevator show-sizer class-name="dgp-page-active"/>
        <home/>
    </div>
</template>

<script>

    import Table2 from './table/table2.vue';
    import Table3 from './table/table3.vue';
    export default {
        name:'Test',
        data(){
            return {
                columns:[
                    {
                        title: 'Name',
                        key: 'name',
                        ellipsis:true
                    },
                    {
                        title: 'Age',
                        key: 'age'

                    },
                    {
                        title: 'Address',
                        key: 'address',
                        ellipsis:true

                    }
                ],
                data: [
                    {
                        name: 'John BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                    },
                    {
                        name: 'Jim GreenwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn BrowwnJohn Brow',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Sydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 Lake',
                        age: 30,
                        address: 'Sydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 LakeSydney No. 1 Lake Park',
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
        components:{
            Table2,
            Table3,

        }
    }
</script>

<style>

</style>