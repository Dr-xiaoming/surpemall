    <template>
      <div id="detail" >
          <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
          <scroll class="content" ref="scroll"
                  :probe-type="3" @scroll="contentScroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="goodslist" :goods="recommendInfo"/>
            </scroll>    
            <detail-bottom-bar @addToCart="addToCart"/>
            <back-top @click.native="backClick" v-show="isShowBackTop"/>
      </div>
    </template>
    
    <script>
        import detailNavBar from './detailNavBar'
        import detailSwiper from './detailSwiper'
        import detailBaseInfo from './detailBaseInfo'
        import detailShopInfo from './detailShopInfo.vue'
        import detailGoodsInfo from './detailGoodsInfo.vue'
        import detailParamInfo from './detailParamInfo.vue'
        import detailCommentInfo from './detailCommentInfo.vue'
        import detailBottomBar from './detailBottomBar.vue'

        import Scroll from 'components/common/scroll/Scroll'
        import GoodsList from 'components/content/goods/GoodsList'
        import BackTop from 'components/content/backTop/BackTop'


        import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
        import {itemListenerMiXin,backTopMixin} from 'common/mixin'
        import {debounce} from 'common/utils'


    export default {
        name:"detail",
        components:{
         detailNavBar,
         detailSwiper,
         detailBaseInfo,
         detailGoodsInfo,
         detailShopInfo,
         detailParamInfo,
         detailCommentInfo,
         detailBottomBar,
         Scroll,
         GoodsList,
         BackTop
        },
        mixins:{itemListenerMiXin,backTopMixin},
        data(){
            return{
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommendInfo:{},
                themeTopYs:[],
                getThemeTopY:null,
                isShowBackTop:false
            }
        },
        created(){
            //1.保存传入的iid
            this.iid = this.$route.params.iid

            //2.根据iid请求详细数据
            getDetail(this.iid).then(res => {
                //1.获取顶部的图片轮播数据
                const data = res.result
               // console.log(data)
                this.topImages = res.result.itemInfo.topImages

                //2.创建商品的对象
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

                //3.取出店铺的信息
                this.shop = new Shop(data.shopInfo)

                //4.取出商品的详情数据
                this.detailInfo = data.detailInfo

                //5.获取参数的信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

                //6.取出评论的信息
                if(data.rate.cRate !==0){
                    this.commentInfo = data.rate.list[0];}

             })

            //3.请求推荐数据
            getRecommend().then(res =>{
                    //console.log(res)
                this.recommendInfo = res.data.list
            })

            //4.给getThemeTopY赋值
            this.getThemeTopY = debounce(() =>{
                this.themeTopYs = []

                    this.themeTopYs.push(0)
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.goodslist.$el.offsetTop)

                    //console.log(this.themeTopYs)    
            },100)

        },

        destroyed(){
            this.$bus.$off('itemImageLoad',this.itemImgListener)
        },
           
        methods:{
            imageLoad(){
                this.$refs.scroll.refresh()
                //this.newRefresh()
                this.getThemeTopY()
            },
            titleClick(index){
                //console.log('1')
               this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
            },
            contentScroll(position) {
                //1.判断BackTop是否显示
               this.isShowBackTop = (-position.y) > 1000
            },
            backClick() {
            this.$refs.scroll.scrollTo(0, 0,300)
            },
            addToCart(){
                //获取购物车需要展示的信息
                const product = {}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.realPrice
                product.iid = this.iid
                product.checked = false

                //将商品添加到购物车
                //this.$store.commit('addCart',product)
                 this.$store.dispatch('addCart',product)
            }
        }
    }
    </script>       
    //srcoll滚动不了
        <!-- .content{
            height: calc(100%-44px);
        } -->
    
    <style scoped>
        #detail{
            position: relative;
            z-index: 9;
            background-color:#fff;
            height: calc(100%-44px-45px);
        }


        .content {
            overflow: hidden;
            height: 95vh;

        }

        .detail-nav{
            position: relative;
            z-index: 99;
            background-color: #fff;
        }
    </style>