<template>
    <div>
       <p class="one_page app">One page --{{ name }}</p>
    </div>
</template>

<script>
    require("../css/common.css");
    require("../css/index.css");
    export default {
        data(){
            return {
                name : 'name3'
               
            }
        }
    }
</script>

<style>
    .one_page{
        font-size:15px;
        font-color:#red;
    }
</style>
