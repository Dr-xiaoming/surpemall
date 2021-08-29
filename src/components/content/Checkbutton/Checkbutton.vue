    <template>
        <div class="check-button" :class="{check: isChecked}">
            <img src="~assets/img/cart/tick.svg" alt="">
        </div>
    </template>
    
    <script>
    export default {
        name:"Checkbutton",
        props:{
            isChecked:{
                type:Boolean,
                default:true
            }
        }
    }
    </script>
    
    <style>
        .check-button{
            border-radius: 50%;
            border: 2px solid #aaa;
        }

        .check{
            border-color: #fff;
            background-color: red;
        }
    </style>