import { createStore } from "vuex"

export default createStore({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    stateの中にある値を更新するコードを書く
    updateUserInfo(state, user) {
      state.user = user
    },
  },
  actions: {},
  modules: {},
})

// vueXを使うと、コードに書いたデータはどこでもアクセスできるようになる。
// コード(state内などの関数は,他のコンポーネントで使えるようになる,)
// ファイヤーベースはメソッド()を持ってくる,ex)
// vueXは具体的なデータをもって他のところで使える ex)図書館という存在(中にいろいろな情報がある,好きなデータを持ってこれる機能)
