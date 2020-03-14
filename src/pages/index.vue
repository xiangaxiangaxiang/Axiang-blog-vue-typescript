<template>
  <div class="container">
    <div class="canvas">
      <div class="content content--canvas"></div>
    </div>
    <div class="body">
      <nav class="nav">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="" class="nav-item">动态</router-link>
        <router-link to="" class="nav-item">技术</router-link>
        <router-link to="" class="nav-item">娱乐</router-link>
        <router-link to="" class="nav-item">远方</router-link>
        <router-link to="" class="nav-item">关于</router-link>
      </nav>
      <div class="avatar">
        <img src="../common/static/profile1.jpg" alt="图片加载失败" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import "common/js/canvas.js";
import { login } from "api/login";

@Component
export default class Index extends Vue {}

</script>
<style lang="stylus" scoped>
@import '../common/stylus/variables'
@import '../common/stylus/canvas'

@keyframes rotating {
  from {
    transform rotate3d(0, 0, 1, 0deg)
  }
  to {
    transform rotate3d(0, 0, 1, -360deg)
  }
}

.container
  width 100vw
  height 100vh
  position relative
  .canvas
    position absolute
    left 0
    top 0
    width 100%
    height 100%
  .body
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    .nav
      width 100%
      height 10rem
      color white
      text-align center
      margin-top 20rem
      .nav-item
        font-size $fs-l
        margin-left 5rem
    .avatar
      width 100%
      height 20rem
      display flex
      align-items center
      justify-content center
      z-index 20
      img
        width 20rem
        height 20rem
        border-radius 50%
        animation rotating 8s linear infinite
</style>
