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
          <van-cell title="不感兴趣"  icon="bill-o" @click="handle('dislike')"/>
          <van-cell title="反馈垃圾内容" icon="warning-o" is-link @click="isReportShow=!isReportShow"/>
          <van-cell title="拉黑作者"  icon="delete"  @click="handle('blacklist')"/>
        </van-cell-group>

        <van-cell-group v-show="isReportShow">
          <!-- 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权' -->
          <van-cell icon="arrow-left" @click="isReportShow =!isReportShow"/>
          <van-cell title="标题夸张" @click="handle('report', 1)"/>
          <van-cell title="低俗色情" @click="handle('report', 2)"/>
          <van-cell title="错别字多" @click="handle('report', 3)"/>
        </van-cell-group>

        </van-dialog>
</template>

<script>
import { disLikeArticle, reportArticle } from '@/api/article'
import { blackUserList } from '@/api/user'
export default {
  name: 'MoreAction',
  props: ['value', 'currentArticle'],
  data () {
    return {
      // 控制反馈垃圾内容的cell是否显示
      isReportShow: false
    }
  },
  methods: {
    // 点击cell的时候统一处理行为
    handle (type, reportType) {
      switch (type) {
        case 'dislike':
          this.disLike()
          break
        case 'blacklist':
          this.blacklist()
          break
        case 'report':
          this.report(reportType)
          break
      }
    },
    // 不敢兴趣
    async disLike () {
      try {
        // 获取文章的id
        const id = this.currentArticle.art_id
        // console.log(this.currentArticle)
        // 发送请求
        await disLikeArticle(id)
        // 成功失败的提示
        this.$toast.success('操作成功')
        // 成功 通知home组件,关闭MoreAction ,删除数据
        this.$emit('handleSuccess')
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
    },
    // 拉黑作者
    async  blacklist () {
      try {
        // 获取到作者的id
        const id = this.currentArticle.aut_id
        // 发送请求
        await blackUserList(id)
        // 成功失败的提示
        this.$toast.success('操作成功')
        // 成功 通知home组件,隐藏MoreAction ,删除数据
        this.$emit('handleSuccess')
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
    },
    // 举报文章
    async report (reportType) {
      try {
        const id = this.currentArticle.art_id
        await reportArticle({
          id: id,
          type: reportType
        })

        this.$toast.success('操作成功')
        // 成功 通知home组件,隐藏MoreAction
        this.$emit('input', false)
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
    }

  }

}
</script>

<style>

</style>
