<template>
  <div>
    <div class="one" @click="open">one{{itemsa.ida}}</div>
    <div>{{item.id}}</div>
  </div>
</template>
<script>
const initFetchData = ({ store }) => {
    return store.dispatch('fetchaaa')
  };
export default {
    asyncData: initFetchData,
    computed: {
    // 从 store 的 state 对象中的获取 item。
    itemsa() {
      console.log('computed=====', this.$store.state.itemsa)
      return this.$store.state.itemsa
     },
    item() {
      console.log('computed=====', this.$store.state.itemsa)
      return this.$store.state.items || {}
     }
    },
    created(){
      console.log('one----', this.item)
    },
    methods:{
      open(){
        alert('1123')
      }
    }
}
</script>
<style lang="less" scoped>
.one{
    background: #fff;
}
</style>