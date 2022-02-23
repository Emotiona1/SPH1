<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startAndEnd.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startAndEnd.start > 2">···</button>

    <span v-for="(page, index) in startAndEnd.end" :key="index">
      <button
        v-if="page >= startAndEnd.start"
        @click="$emit('getPageNo', page)"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </span>

    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="startAndEnd.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始数字和结束数字【连续页码的数字至少是5】
    startAndEnd() {
      // 解构赋值出 接下来可以省略写this
      const { continues, pageNo, totalPage } = this;
      // 先定义两个变量存储起始数字和结束数字
      let start = 0,
        end = 0;
      // 不正常现象1 如果连续页码大于总页码
      if (continues > totalPage) {
        // 起始为1 结尾为总页码
        start = 1;
        end = totalPage;
      } else {
        // 正常现象
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 不正常现象2 起始数字小于0 结尾数字大于总页数
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>