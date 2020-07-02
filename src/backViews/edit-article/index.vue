<template>
    <div>
        <top-bar />
        <markdown-editor />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import TopBar from './components/TopBar.vue'
    import MarkdownEditor from './components/MarkdownEditor.vue'
    @Component({
        name: 'EditArticle',
        components: {
            TopBar,
            MarkdownEditor
        }
    })
    export default class EditArticle extends Vue {
        beforeRouteEnter (to, from, next) {
            if (from.name === 'ArticleManagement' || from.path === '/') {
                // eslint-disable-next-line
                next()
            } else {
                // eslint-disable-next-line
                next(from.path)
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>