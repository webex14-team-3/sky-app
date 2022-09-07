import firebase from "firebase"
import store from "./store"

export default {
  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged((u) => {
      let user = u ? u : {}
      store.commit("onAuthStateChanged", user)
      store.commit("onUserLoginStatusChanged", user.uid ? true : false)
    })
  },
}

// ログイン状態が変化した際の処理であるonAuthStateChanged()にて処理を行います。
// ここでは、firebaseのログイン状態が変化したことを検知し、
// storeに保存しているuser, isLoggedInの情報を更新しています。

// 処理的には、
// user = user ? user : {};
// の部分でuserが存在したらuserを、そうでなければ空オブジェクトをuserに詰めています。

// store.commit('onAuthStateChanged', user);
// ではstoreのonAuthStateChangedを介してuserの情報を更新し、

// store.commit('onUserLoginStatusChanged', user.uid ? true : false);
// でログインしているかのboolの情報を更新します。
