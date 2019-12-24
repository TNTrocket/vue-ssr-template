<template>
  <div>homefef {{item.id}}</div>
</template>
<script>
 const initFetchData = ({ store }) => {
    return store.dispatch('fetchItem')
  };
export default {
  asyncData: initFetchData,
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      console.log('computed=====', this.$store.state.items)
      return this.$store.state.items
    }
  },
  created() {
    console.log('created=========')
  },
  mounted() {
    console.log('mounted=========')
  }
}
</script>