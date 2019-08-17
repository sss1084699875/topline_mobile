<template>
    <div>
        搜索
    </div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: ['q'],
  created () {
    // route 路由数据  //params 动态路由参数
    // console.log(this.$route.params.q)
    console.log(this.q)
  }
}
</script>

<style>

</style>
