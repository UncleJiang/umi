<template>
  <!-- 欢迎页 -->
  <div class="helloPage">
    <BreadCrumb/>
  WELCOME!
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'

export default {
  name: 'HelloPage',
  components: {
    BreadCrumb
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
