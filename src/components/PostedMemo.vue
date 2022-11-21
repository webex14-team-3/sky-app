<template>
  <div class="all_Container" :class="{ hidden: hiddenDisplay }">
    <section class="header_Area">
      <!-- <router-link to="myAcount"> -->
      <img class="icon" :src="memo.userImg" />
      <!-- </router-link> -->
      <div class="user_container">
        <div class="userName userTitle">
          <p>{{ memo.userName }}</p>
        </div>
        <div class="userCourse userTitle">
          <p>{{ memo.userCourse }}</p>
        </div>
      </div>
      <div class="memoTitle">
        <p>{{ memo.title }}</p>
      </div>
    </section>
    <section class="bottom_Area">
      <div class="favorite_Container">
        <font-awesome-icon
          icon="fa-heart"
          class="fa-beat"
          style="--fa-animation-duration: 0.5s"
        />
        <div class="DetailcreateMemoTime">
          <p>{{ memo.DetailcreateMemoTime }}</p>
        </div>
      </div>
      <div class="memoContainer">
        <p>{{ memo.memo }}</p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "PostedMemoContainer",
  props: {
    memo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      change: false,
    }
  },
  computed: {
    hiddenDisplay() {
      if (this.change === true) {
        return "hidden"
      } else {
        return ""
      }
    },
  },
  methods: {
    favoriteChange() {
      if (this.change === false) {
        console.log("test")
      } else {
        console.log("123")
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_reset.scss";

%userInfoUnder {
  text-decoration: underline;
  text-decoration-color: rgb(218, 142, 30);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

// .hidden {
//   display: none;
// }

.all_Container {
  // border: 2px solid red;
  width: 90%;
  margin: 40px auto;
  background-color: white;
  border-radius: 10px;
  filter: drop-shadow(2px 6px 8px #dddddd);

  .header_Area {
    // border: 2px solid blue;
    border-bottom: 2px solid black;
    display: flex;
    height: 70px;

    .icon {
      margin: 5px;
      width: 60px;
      height: 60px;
      border-radius: 50% 50%;
      user-select: none;
    }

    .user_container {
      // border: 2px solid red;
      min-width: 25%;
      max-width: 30%;
      // border-right: 2px solid black;

      .userName {
        // border: 2px solid blue;
        font-weight: 900;
        padding: 5px 10px 0;
        @extend %userInfoUnder;
      }

      .userCourse {
        // border: 2px solid blue;
        padding: 10px 10px 0;
        font-weight: bold;
        @extend %userInfoUnder;
      }
    }

    .memoTitle {
      // border: 2px solid blue;
      width: 100%;
      display: flex;
      align-items: center;

      p {
        font-size: 22px;
        font-weight: bold;
        // border: 2px solid red;
      }
    }
  }

  .bottom_Area {
    // border: 2px solid blue;
    word-break: break-word;
    white-space: pre-wrap;
    max-width: 100%;
    max-height: 250px;
    height: 100%;
    overflow: auto;

    .favorite_Container {
      // border: 2px solid red;
      display: flex;

      label {
        display: flex;
        text-decoration: underline;
        text-decoration-color: black;
        text-decoration-thickness: 2px;
        text-underline-offset: 3px;
        user-select: none;

        input {
          margin-left: 5px;
        }
        p {
          margin-left: 5px;
          margin-top: 3px;
          color: red;
          font-weight: bold;
        }
      }

      .DetailcreateMemoTime {
        position: absolute;
        right: 20px;
        top: -23px;
      }
    }

    .memoContainer {
      // border: 2px solid red;
      margin-top: 10px;
      margin-left: 10px;
      margin-bottom: 5px;
      text-align: left;
      user-select: contain;
      font-weight: bold;
    }
  }
}

// ----------------------------
// スマホ版
// ------------------------------

@media screen and (max-width: 690px) {
  .memoTitle {
    // border: 2px solid blue;
    width: 100%;
    display: flex;
    align-items: center;

    p {
      font-size: 15px;
      font-weight: bold;
      // border: 2px solid red;
    }
  }
  .userTitle {
    font-size: 15px;
  }
}
</style>
