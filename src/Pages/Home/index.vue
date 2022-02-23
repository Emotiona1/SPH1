<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 引入其他组件
import ListContainer from "@/Pages/Home/ListContainer/index.vue";
import Recommend from "@/Pages/Home/Recommend/index.vue";
import Rank from "@/Pages/Home/Rank/index.vue";
import Like from "@/Pages/Home/Like/index.vue";
import Floor from "@/Pages/Home/Floor/index.vue";
import Brand from "@/Pages/Home/Brand/index.vue";

import { mapState } from "vuex";
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 派发action 获取floor组件数据
    this.$store.dispatch("getFloorList");
    // 获取用户信息
    // const { token } = this.$store.state.user;
    // token && this.$store.dispatch("getUserInfo");
    // // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style scoped>
</style>