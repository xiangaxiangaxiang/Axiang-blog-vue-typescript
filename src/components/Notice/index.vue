<template>
    <el-popover
        placement="right"
        width="400"
        trigger="click"
    >
        <div style="width: 100%;height: 100px" />
        <span
            slot="reference"
        >
            <font-awesome-icon icon="bell" />
        </span>
        <el-button slot="reference">
            click 激活
        </el-button>
    </el-popover>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        name: 'Notice'
    })
    export default class Notice extends Vue {}
</script>

<style lang="stylus" scoped>

</style>