<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="stylus">
    @import './common/stylus/index.styl';
    #app
        width 100%
        height 100vh
</style>
