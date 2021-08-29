    <template>

      <div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
            <div class="info-desc clear-fix">
                <div class="start"></div>
                <div class="desc">{{detailInfo.desc}}</div>
                <div class="end"></div>
            </div>
            <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
            <div class="info-list">
                <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index"
                    :src="item" @load="imageLoad" alt="">
            </div>
        </div>
    </template>
    
    <script>
    export default {
        name:"detailGoodsInfo",
        props:{
            detailInfo:{
                type:Object
            }
        },
        data(){
            return{
                counter:0,
                imagesLength:0
            }
        },
        methods:{
            imageLoad(){
                //.判断，所有图片都加载完了，那么进行一次回调就行了
                if(++this.counter === this.imagesLength){
                    this.$emit('imageLoad')
                }
            }
        },
        watch:{
            detailInfo(){
                this.imagesLength = this.detailInfo.detailImage[0].list.length
            }
        }
    }
    </script>
    
    <style>
        .info-list img{
            width:100%;
             height:auto
        }
    </style>