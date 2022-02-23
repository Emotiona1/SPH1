<template>
  <div id="app">
    <Header></Header>
    <!-- 路由出口的地方 -->
    <router-view></router-view>
    <!-- 在Home Search显示 在登录、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  // 根组件App.vue只会执行一次
  mounted() {
    // 派发一个 action |获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
