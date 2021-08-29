<template>
  <div class="cart">
      <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

      <!-- 商品的列表 -->
      <cart-list/>

      <!-- 底部汇总 -->
      <cart-list-item v-show="isChecked"/>
      <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'
import CartListItem from './childComps/CartListItem.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import {mapGetters} from 'vuex'



  export default {
  components: { 
    NavBar,
    CartList,
    CartListItem,
    CartBottomBar,
    },
    name: "Cart",
    props:{
      isChecked:{
      type:Boolean,
      default:false}
    },
    computed:{
        //...mapGetters(['cartLength'])
        //两种语法
        // ...mapGetters(['cartLength','cartList'])
        ...mapGetters({
          length:'cartLength',
          list:'cartList'
         })
      },
    created(){
        if(length>0)    this.isChecked=true}

  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
