<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="黑马头条" fixed
    @click.native="$router.push('/search')"
     />
     <!-- 下拉加载最新数据 -->
     <van-pull-refresh  :success-text="successText" v-model="isLoading" @refresh="onRefresh">
    <!-- 频道列表 -->
    <van-tabs v-model="activeTabIndex">
      <div slot="nav-right">
        <van-icon name="wap-nav" class="wap-nav" @click="showChannel =true"/>
      </div>
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
            @click="$router.push({name : 'article', params : { id : item.art_id.toString() }})"
            v-for="item in channel.articles"
            :key="item.art_id.toString()"
            :title="item.title"
        >
        <!-- 图文列表展示 -->
        <div slot="label">
          <template v-if="item.cover.type">
            <van-grid :border="false" :column-num="3">
              <van-grid-item v-for="(img,index) in item.cover.images"
              :key='index'>
                <van-image lazy-load :src="img" />
              </van-grid-item>
            </van-grid>
          </template>
          <p>
            <span>{{ item.aut_name }}</span>&nbsp;
            <span>{{ item.comm_count }}评论</span>&nbsp;
            <span>{{ item.pubdate | fmtDate }}</span>&nbsp;

            <van-icon name="close" class="close" @click.stop="handleShowAction(item)"/>
          </p>
        </div>
        </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
    </van-pull-refresh>
  <!--  MoreAction  -->
    <!-- v-model="showAction" ====>
    :value="showAction"
    @input="showAction = $event"
    -->
    <more-action @handleSuccess="handleSuccess" :currentArticle='currentArticle' v-model="showAction"></more-action>
    <!-- 频道管理 -->
    <home-channel @handleMy="handleMy" :channels="channels" :activeIndex="activeTabIndex" v-model="showChannel"></home-channel>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import MoreAction from './components/MoreAction'
import HomeChannel from './components/HomeChannel'
export default {
  components: {
    MoreAction,
    HomeChannel
  },
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
      activeTabIndex: 0,
      //   // 时间戳
      //   timestamp: Date.now()
      // 控制MoreAction的显示和隐藏
      showAction: false,
      // 记录点击x的时候的文章对象
      currentArticle: {},
      // 控制频道管理弹出页面的隐藏显示
      showChannel: false,
      // 下拉成功后提示的文字
      successText: ''
    }
  },
  // activated () {
  //   console.log('activated')
  // },
  // deactivated () {
  //   console.log('deactivated')
  // },
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
        this.channels = data.channels
      } else {
        // 2. 如果用户没有登录，从本地缓存中获取数据
        this.channels = JSON.parse(window.localStorage.getItem('channels')) || []
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
      // console.log(this.channels)
      this.channels.forEach((item) => {
        // item.articles = []
        this.$set(item, 'articles', [])
        // 给每个频道增加一个时间戳的属性
        item.timestamp = Date.now()
      })
    },
    // list组件
    async onLoad () {
      // 只写一行代码,暂停800毫秒再去执行
      await this.$sleep(500)
      // 1 找到当前频道 和id
      const currentChannel = this.channels[this.activeTabIndex]
      // console.log(this.channels)
      // console.log(currentChannel)
      const id = currentChannel.id
      // 2 给所有的频道对象添加articles属性 (在获取完频道列表 实现)
      // 3 发送请求,获取数据,处理时间戳
      const data = await getArticles({
        channelId: id,
        timestamp: currentChannel.timestamp
      })

      // currentChannel.articles = data.results
      // [{} ,{},[{},{}]]
      // currentChannel.articles.push(data.results)
      // [{} ,{},{},{}]
      currentChannel.articles.push(...data.results)
      // console.log(this.channels)

      // 记录时间戳
      currentChannel.timestamp = data.pre_timestamp
      // 本次数据加载完毕
      this.loading = false

      if (data.results.length === 0) {
        this.finished = true
      }
      // console.log(data.results)
      // console.log(data)
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
    async onRefresh () {
      // 1 找到当前频道 和id
      const currentChannel = this.channels[this.activeTabIndex]

      const id = currentChannel.id
      // 2 发送请求,获取数据,处理时间戳
      const data = await getArticles({
        channelId: id,
        timestamp: Date.now()
      })
      currentChannel.articles.unshift(...data.results)
      this.isLoading = false
      this.successText = `${data.results.length}条数据被加载了`
      // setTimeout(() => {
      //   this.$toast.success('刷新成功')
      //   this.isLoading = false
      //   this.count++
      // }, 500)
    },
    // 点击按钮的时候
    // 显示MoreAction
    // 把当前点击X对应的文章对象 , 保存到currentArticle中
    handleShowAction (article) {
      this.showAction = true
      this.currentArticle = article
    },
    // MoreAction 中处理成功,执行的方法
    handleSuccess () {
      // 关闭MoreAction ,删除数据
      this.showAction = false
      // 找到当前频道的文章列表
      const channel = this.channels[this.activeTabIndex]

      console.log(channel)
      const articles = channel.articles
      // 当前文章
      // this.currentArticle
      // 找当前文章在article的索引

      // 找满足条件的索引
      const index = articles.findIndex((item) => {
        // 条件
        return item.art_id === this.currentArticle.art_id
      })

      articles.splice(index, 1)
    },
    // 当在频道管理中点击我的频道的时候,会触发该方法
    handleMy (index) {
      // 隐藏对话框,激活对应索引的频道
      this.showChannel = false
      this.activeTabIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
    margin-bottom: 100px;
    margin-top: 92px;
}
.close {
   float : right;
   font-size: 30px;
}
.wap-nav {
  position: fixed;
  right : 0;
  line-height: 88px;
  padding: 5px;
}
</style>
