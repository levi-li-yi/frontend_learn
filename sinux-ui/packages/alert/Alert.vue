<template>
<transition name="el-alert-fade">
  <div class="el-alert" :class="[typeClass, center ? 'is-center': '', 'is-' + effect]" v-show="visible" role="alert">
    <i class="el-alert__icon" :class="[iconClass, isBigIcon]"></i>\
    <div class="el-alert__content">
      <span class="el-alert__title" :class="[is]"></span>
    </div>
  </div>
</transition>
</template>

<script>
export default {}
</script>

<style>
</style>
