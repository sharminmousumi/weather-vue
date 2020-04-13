<template >
<div  >
     <form >
        <input  type="text" v-model ="newCity">
        
        <button  type="button" @click="addCity" class="button">Add City</button>
    </form> 
    
    <div  >

    <ul>
        <li v-for="(city,index) in citys"   v-bind:key="city" >

            {{city}} <button  type="button" @click="deleteCity(index)"> x </button>  
        </li>
        
     </ul>
    </div>
    

</div>
</template>


<script>

export default {
  
    data() {
        return {
        
       citys:['Goteborg','London','Paris'],
       newCity:''
       }
        
    },
    methods: {
          addCity(){
           
            this.citys.push(this.newCity);
             this.newCity='' ;    

        },

        deleteCity:function(index){
            this.citys.splice(index,1);
        //kjkjskjskj
        }
       
    }
}
</script>
<style scoped>
li{
    list-style: none;

}
</style>