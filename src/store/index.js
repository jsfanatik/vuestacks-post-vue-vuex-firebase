import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { db } from '@/main'

Vue.use(VueRouter)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, posts) => {
      state.posts = posts
    }
  },
  actions: {
    loadPosts: async context => {
      let snapshot = await db.collection('posts').get()
      const posts = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        posts.push(appData)
      })
      context.commit('setPosts', posts)
    }
  },
})
