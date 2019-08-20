<template>
   <div class="more-action">
        <van-button
        :icon="isLike ?  'star' : 'star-o' "
        round
        :loading="likeLoading"
        type="default"
        >{{ isLike ? '取消' : ''}}点赞</van-button>

        <van-button
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
