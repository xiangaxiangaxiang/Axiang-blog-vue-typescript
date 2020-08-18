<template>
    <div class="comment-container">
        <picker
            :include="['people']"
            :show-search="false"
            :show-preview="false"
            :show-categories="false"
            @select="addEmoji"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { Picker } from 'emoji-mart-vue'
    @Component({
        name: 'Comments',
        components: {
            Picker
        }
    })
    export default class Comments extends Vue {
        addEmoji(e) {
            console.log(e.native.toString())
        }
    }
</script>
<style lang="stylus" scoped>
    .list
        width 100%
        height 3rem
        line-height 3rem
</style>