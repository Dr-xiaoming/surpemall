    <template>
      <div >
        <nav-bar class="detailNavBar">
            <div slot="left" class="back">
                <img src="~assets/img/common/back.svg" alt="" @click="imgClick">
            </div>
            <div slot="center" class="title">
              <div v-for="(item,index) in titles"
               class="title-item" :class="{active:index === currentIndex}"
               @click="titleclick(index)">
               {{item}}
               </div>
            </div>
        </nav-bar>
      </div>
    </template>
    
    <script>
        import NavBar from'components/common/navbar/NavBar'
    export default {
        name:"detailItem",
        components:{
            NavBar
        },
        data(){
            return{
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            titleclick(index){
                this.currentIndex = index;
                this.$emit('titleClick',index)
            },
            imgClick(){
                this.$router.back()
            }
        }
    }
    </script>
    
    <style>
        .detailNavBar{
           height: 44px;
            position: fixed;
            background-color: #fff;
            left: 0;
            right: 0;
            top: 0;
        }
        .title{
            display: flex;
 
        }
        .title-item{
            flex: 1;
            font-size: 13px;
        }
        .active{
            color:red;
        }
        .back img{
            margin-top: 10px;
        }
    </style>