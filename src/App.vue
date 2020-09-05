<template>
    <div id="app">
        <router-view :key="reload" />
    </div>
</template>

<script>
    import { touristApi } from '@/api/front/user'
    import { UserModule } from '@/store/modules/user'
    export default {
        name: 'App',
        computed: {
            reload() {
                return UserModule.reload
            }
        },
        async mounted() {
            const firstLoad = sessionStorage.getItem('firstLoad')
            if (!firstLoad) {
                const res = await touristApi()
                if (res && res.status === 0) {
                    sessionStorage.setItem('firstLoad', 1)
                }
            }
        }
    }
</script>

<style lang="stylus">
    @import './common/stylus/index.styl';
    #app
        width 100%
        height 100vh
</style>
