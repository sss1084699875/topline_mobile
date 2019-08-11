<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="黑马头条" fixed
     />
     <!-- 下拉加载最新数据 -->
     <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- 频道列表 -->
    <van-tabs v-model="activeTabIndex">
      <van-tab
      v-for="channel in channels"
      :title="channel.name"
      :key="channel.id">
      <!-- 内容 {{ index }} -->
      <!-- 文章列表 不同的频道有不同的文章列表 -->
       <!-- 当lsit没有到达页面底部的时候,会触发load事件,并吧loading设置为true -->
        <!-- loading 为true 会显示正在加载 当数据加载完毕应该吧loading设置为false -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell
            v-for="item in list"
            :key="item"
            :title="item"
        />
        </van-list>
      </van-tab>
    </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
export default {
  data () {
    return {
      // list 文章列表的数据
      list: [],
      loading: false,
      finished: false,
      //   下拉更新组件
      isLoading: false,
      // 存储频道列表
      channels: [],
      // 激活的tab的索引
      activeTabIndex: 0
    }
  },
  created () {
    // 获取频道数据
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      // 测试
      // const data = await getChannels()
      // console.log(data)

      // 1. 判断用户是否登录，如果用户登录，直接获取数据
      if (this.$store.state.user) {
        const data = await getChannels()
        // console.log(data)
        this.channels = data.Channels
      } else {
        // 2. 如果用户没有登录，从本地缓存中获取数据
        // this.channels = JSON.parse(window.localStorage.getItem('channels')) || []
        console.log(this.channels.length)
        // 3. 如果本地缓存没有数据，发送请求获取数据，存储到本地存储中
        if (this.channels.length === 0) {
          const data = await getChannels()
          // console.log(data)
          this.channels = data.channels
          // 存储到本地存储中
          window.localStorage.setItem('channels', JSON.stringify(this.channels))
        }
      }
      // 给所有的频道对象, 添加一个articles属性
      this.channels.forEach((item) => {
        item.articles = []
      })
    },
    // list组件
    onLoad () {
      // 1 找到当前频道 和id
      const currentChannel = this.channels[this.activeTabIndex]
      const id = currentChannel.id
      // 2 给所有的频道对象添加articles属性 (在获取完频道列表 实现)

      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    },
    // 下载加载更多组件
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
    margin-bottom: 100px;
    margin-top: 92px;
}
</style>
