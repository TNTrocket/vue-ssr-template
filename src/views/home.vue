<template>
  <div>homefef {{item.id}}
    <div @click="gotoOne">goto one</div>
  </div>
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
    console.log('created=========', this.item)
  },
  mounted() {
    console.log('mounted=========', this.item)
  },
  methods:{
    gotoOne(){
      // window.location.href="/one"
      this.$router.push('/one')
    }
  }
}
</script>