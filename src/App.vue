<template>
<div>
  
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
     
    <main>
      
      <div class="search-box">
        <div id="clock">
          <digital-clock :blink="true" />
        </div>
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search..."
          v-model="query"
          @keypress="fetchWeather"
        />
        <button id="fav-button" :disabled="!query" v-on:click="addCity" >Add To <br>Favorite</button>
      </div>
      
       

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <section v-if="errored">
          <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>
        <div class="location-box">
          <div class="location">{{ weather.name }},{{ weather.sys.country }}</div>
           <div class="date"><b>Date: </b>{{ dateBuilder() }}</div>
          <div class="date"><b>Humidity:</b> {{ weather.main.humidity}},<b>Air Presure:</b>{{ weather.wind.speed }}</div>
         
        </div>

        <div class="weather-box">
        <div class="temp">
          <div >{{ Math.round(weather.main.temp) }}°c</div>
          </div>
          <div class="weather">{{ weather.weather[0].main }}</div>

        </div>

      </div>
      <div class="fav-list">
        <ul>
          
            <li v-for="(city,index) in citys"  v-bind:key="city.id"
      v-bind:title="city.name"
      v-on:remove="citys.splice(index, 1)"><button id="cityButton"  v-bind:value="city.name" v-bind:key="city.id"  @click="myFunction()">
          <button  type="button" @click="deleteCity(index)"> x </button> {{city.name}}   
          </button></li>
        </ul>
      </div>
      
    </main>
  
  </div>
  </div>
</template>

<script>
import DigitalClock from "vue-digital-clock";

export default {
  
 components: {
    DigitalClock //npm install --save vue-digital-clock
  },

  data () {
    return {
      api_key: '53bee1e53ac16c4ff2ba8b750883ab6e',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
      citys:[
        {
        id: 1 ,
        name: "Göteborg"
        },
        {
         id: 2 ,
        name: "Dhaka" 
        },
        {
         id: 3 ,
        name: "Tehran"  
        },
        {
         id: 4 ,
        name: "Khartoum" 
        }

      ],
      newCityId: 5,
      newCity:'',
      errored: false,
    }
  },
  methods: {
    fetchWeather (e) {
      if (e.key == "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          })/*.catch(error => {
            this.errored = true
            console.log(error)
            
          })*/.then(this.setResults);
          //console.log(this.results);
      }
    },
    addCity(){        
    this.citys.push({
      id: this.newCityId++,
      name: (this.query.substring(0, 1).toUpperCase() + this.query.substring(1)),
    });
    this.newCity= "";
    this.query= '';
   },

   myFunction() {
        var x = document.getElementById("cityButton").value;
        this.query=x;
        console.log(x);
},
    deleteCity:function(index){
        this.citys.splice(index,1);
    },

    setResults (results) {
      this.weather = results;
    },


    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;
}

#app {
  background-image: url('./assets/sunset.jpg');
  background-size:cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.warm {
  background-image: url('./assets/warm-bg.jpg');
}

main {
  min-height: 100vh;
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(3,30%);
  justify-content: center;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}
#clock{
  color: red;
  font-size: 30px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
  grid-column: 1 / 5;
}

.search-box .search-bar {
  display: block;
  padding: 14px;
  color: #313131;
  font-size: 21px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 7px rgba(41, 6, 6, 0.25);
  background-color: rgb(224, 180, 180);
  border-radius: 10px 10px 10px 10px;
  transition: 0.4s;
  width: 100%;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px red;
  background-color: rgb(224, 180, 180);
  border-radius: 10px 10px 10px 10px;
}

.location-box .location {
  color: red;
  text-align: center;
  text-shadow: 1px 3px red;
  font-size: 31px;
  font-weight: 490;
}

.location-box .date {
  color: red;
  font-weight: 298;
  font-family: 'Times New Roman', Times, serif;
  font-size: 22px;
  text-align: center;
}

.weather-wrap{
  grid-column: 1 / 4;
  grid-row: 2 / 4;
}
.weather-box {
  text-align:center;
}

.weather-box .temp {
  box-shadow: 4px 5px black;
  display: inline-block;
  padding: 10px 25px;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 4px 7px black;
  background-color:cyan;
  margin: 31px 0px;
  color: red;
  border-radius: 26px;
  
}

.weather-box .weather {
  font-weight: 700;
  font-family: 'Times New Roman', Times, serif;
  text-shadow: 3px 6px rgba(145, 89, 89, 0.25);
  color:red;
  font-size: 38px;
}

.fav-list{
  bottom: 11px;
  color:red;
  text-shadow: 2px 4px black;
  background-color:rgba(105, 61, 61, 0.25);
  border-radius: 15px;
  list-style: none;
	padding: 20px;
  width: 100%;
  grid-column: 4 / 5;
  grid-row: 2 / 4;
}

.fav-list li{
  font-size: 20px;
  font-family: 'Times New Roman', Times, serif; 
   margin: 7px;
  flex-direction: row-reverse;
  list-style: none;
}
button {
 background-color: rgb(243, 212, 212); 
  color: rgb(167, 60, 60); 
  border: 3px solid cadetblue;
  text-decoration: none;
  display: inline-block;
  font-size: 17px;
  margin: 5px 3px;
  transition-duration: 0.4s;
  cursor: pointer;
  padding: 9px 15px;
  border-radius: 10px;
  text-align: center;
}

button:hover {
  background-color:red;
  color:yellowgreen;
}
.fav-list li button{
  padding: 2px 3px;
  border-radius: 30%;
}
#fav-button{
  justify-content: right;
}
@media only screen and (max-width: 740px) {
  .fav-list li{
  list-style: none;
  margin: 5px;
  font-family:'Times New Roman', Times, serif;
  text-align: center;
  font-size: 15px;
  } 
  .fav-list li button{
  padding: 2px 2px;
  width: 100%;
  border-radius: 8%;
}
.fav-list{
  flex-direction: column-reverse;
}
}

</style>
