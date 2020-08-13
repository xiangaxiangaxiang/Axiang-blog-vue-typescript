<template>
    <div class="comment-container">
        <div
            v-for="item in 30"
            :key="item"
            class="list"
        >
            {{ item }}
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component({
        name: 'Comments'
    })
    export default class Comments extends Vue {
    }
</script>
<style lang="stylus" scoped>
    .list
        width 100%
        height 3rem
        line-height 3rem
</style>