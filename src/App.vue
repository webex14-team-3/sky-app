<template>
  <div class="header">
    <HeaderSpace />
  </div>
  <div class="contents">
    <router-view />
  </div>
</template>

<script>
import HeaderSpace from "@/components/HeaderSpace.vue"
export default {
  components: {
    HeaderSpace,
  },
}
</script>

<style scoped>
.contents {
  margin-top: 10px;
}
.header {
  margin: 0px;
  padding: 0px;
}
.allContainer {
  /* border: 2px solid red; */
  height: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #c7887fdd;
  display: flex;
  justify-content: flex-end;
  margin: -9px;
}

.baseContainer {
  /* border: 2px solid blue; */
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.navLogo {
  /* border: 2px solid yellow; */
  background-color: rgba(255, 235, 205, 0.747);
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}

.topPage {
  color: black;
  font-weight: bold;
  font-size: 20px;
  user-select: none;
}

.navItems {
  /* border: 2px solid black; */
  display: flex;
  align-items: center;
  min-width: 40%;
}

.navItem {
  /* border: 2px solid black; */
  width: 100%;
  background-color: rgba(255, 235, 205, 0.747);
  display: flex;
  align-content: center;
  justify-content: center;
}

.container {
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: bold;
  font-size: 20px;
  user-select: none;
  padding: 0px 5px;
  text-decoration-line: none;
}

.navLink {
  /* border: 2px solid green; */
  height: 100%;
  border-right: 5px solid #df5f5f;
}

.navLink:hover {
  cursor: pointer;
  background-color: #fccb90;
}

.loginButton {
  border: none;
  background-color: rgba(255, 235, 205, 0.747);
  width: 20%;
}

.loginButton:hover {
  cursor: pointer;
  background-color: #fccb90;
}
</style>
