<template>
  <div class="container">
    <router-link to="/" class="nav-item">首页</router-link>
    <router-link to="" class="nav-item">动态</router-link>
    <router-link to="" class="nav-item">技术</router-link>
    <router-link to="" class="nav-item">娱乐</router-link>
    <router-link to="" class="nav-item">远方</router-link>
    <router-link to="" class="nav-item">关于</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component
export default class Index extends Vue {}
</script>
<style lang="stylus" scoped>
@import '../common/stylus/variables'

.container
  width 100vw
  height 100vh
  display flex
  justify-content center
  align-items center
  .nav-item
    font-size $fs-l
    margin-left 30px
</style>
