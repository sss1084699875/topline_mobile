<template>
   <div class="more-action">
        <van-button
        @click="handleLike"
        :icon="isLike ?  'star' : 'star-o' "
        round
        :loading="likeLoading"
        type="default"
        >{{ isLike ? '取消' : ''}}点赞</van-button>

        <van-button
        @click="handleDislike"
        :icon="isDisLike ? 'clear' : 'close'"
        round
        :loading="disLikeLoading"
        type="default"
        >{{ isDisLike ? '取消' : ''}}不喜欢</van-button>
  </div>
</template>

<script>
import {
  dislikesArticle,
  likesArticle,
  unDislikesArticle,
  unLikesArticle
} from '@/api/article'

export default {
  methods: {
    // 点赞
    async  handleLike () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }
      this.likeLoading = true
      // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
      // 判断当前的状态是否是点赞
      try {
        if (this.isLike) {
          // 如果是点赞,取消点赞
          await unLikesArticle(this.article.art_id)
          this.article.attitude = -1
        } else {
          await likesArticle(this.article.art_id)
          this.article.attitude = 1
        }
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
      this.likeLoading = false
    },
    // 不喜欢
    async handleDislike () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }
      this.disLikeLoading = true
      // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
      // 判断当前的状态是否是点赞
      try {
        if (this.isDisLike) {
          // 如果是不喜欢,取消不喜欢
          await unDislikesArticle(this.article.art_id)
          this.article.attitude = -1
        } else {
          // 不喜欢
          await dislikesArticle(this.article.art_id)
          this.article.attitude = 0
        }
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
      this.disLikeLoading = false
    }
  },
  name: 'MoreAction',
  props: ['article'],
  data () {
    return {
      likeLoading: false,
      disLikeLoading: false
    }
  },
  computed: {
    // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
    // 是否点赞
    isLike () {
      return this.article.attitude === 1
    },
    // 是否不喜欢
    isDisLike () {
      return this.article.attitude === 0
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
