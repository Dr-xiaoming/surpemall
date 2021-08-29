import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMiXin ={
    data(){
        return{
            itemImgListener:null
        }
    },
    mounted(){
        let newRefresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListen = () =>{
            newRefresh()
        }
        this.$bus.$on('itemImagLoad',this.itemImgListen)
    }
}

export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop: false,
        }
    },
    methods:{
        backClick() {
            this.$refs.scroll.scrollTo(0, 0,300)
          },
    }
}