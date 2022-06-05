<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo nav__link">Geeksalon</router-link>
    <div class="nav__items">
      <router-link to="/about" class="nav__item nav__link"
        >アカウント</router-link
      >
      <router-link to="/my-page" class="nav__item nav__link">
        ログイン
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.nav__bar {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #b23b61;
}
.nav__link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #eee;
  text-decoration: none;
}
.nav__link:visited {
  color: #eee;
}
.nav__link:hover {
  font-weight: bold;
  color: #fff;
}
.nav__logo {
  width: 130px;
}
.nav__items {
  display: flex;
}
.nav__item {
  width: 100px;
}
</style>
