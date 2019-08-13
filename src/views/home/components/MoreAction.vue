<template>
    <!-- v-model="show"  实际上是以下代码-->
     <!-- :value="show" -->
     <!-- @input="show = $event" -->
    <van-dialog
        :value="value"
        @input="$emit('input' , $event)"
        :showConfirmButton = 'false'
        closeOnClickOverlay
        >
        <van-cell-group v-show="!isReportShow">
          <van-cell title="不感兴趣"  icon="bill-o" />
          <van-cell title="反馈垃圾内容" icon="warning-o" is-link @click="isReportShow=!isReportShow"/>
          <van-cell title="拉黑作者"  icon="delete"/>
        </van-cell-group>

        <van-cell-group v-show="isReportShow">
          <van-cell icon="arrow-left" @click="isReportShow =!isReportShow"/>
          <van-cell title="标题夸张"/>
          <van-cell title="低俗色情"/>
          <van-cell title="错别字多"/>
        </van-cell-group>

        </van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  props: ['value', 'currentArticle'],
  data () {
    return {
      // 控制反馈垃圾内容的cell是否显示
      isReportShow: false
    }
  }

}
</script>

<style>

</style>
