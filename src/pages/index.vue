<template>
  <div class="container">
    <div class="canvas">
      <div class="content content--canvas"></div>
    </div>
    <nav class="nav">
      <router-link to="/" class="nav-item">首页</router-link>
      <router-link to="" class="nav-item">动态</router-link>
      <router-link to="" class="nav-item">技术</router-link>
      <router-link to="" class="nav-item">娱乐</router-link>
      <router-link to="" class="nav-item">远方</router-link>
      <router-link to="" class="nav-item">关于</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import "common/js/canvas.js";
@Component
export default class Index extends Vue {}
</script>
<style lang="stylus" scoped>
@import '../common/stylus/variables'
@import '../common/stylus/canvas'

.container
  width 100vw
  height 100vh
  position relative
  .canvas
    position absolute
    left 0
    right 0
    width 100%
    height 100%
  .nav
    position absolute
    left 0
    right 0
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
    color white
  .nav-item
    font-size $fs-l
    margin-left 40px
</style>
