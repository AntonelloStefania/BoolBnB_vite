<script>
import axios from 'axios';
import { store } from '../store.js';
import Card from '../components/Card.vue';


export default {
  name: 'ApartmentList',
  components: {
    Card,

  },
  data() {
    return {
      store,
      apartments: [],
      address: this.$route.query.homeAddress ? this.$route.query.homeAddress : '',
      wc: '',
      mq: '',
      rooms: '',
      beds: '',
      suggestions: [],
      suggestionLon: this.$route.query.homeSuggestionLon ? Number(this.$route.query.homeSuggestionLon) : '',
      suggestionLat: this.$route.query.homeSuggestionLat ? Number(this.$route.query.homeSuggestionLat) : '',
      bbox: [],
      distance: 20,
      message: '',
      checkboxServices: [],
      services: [],
      errors: [],
      boolError: false,
    }
  },
  created() {
  },
  mounted() {
    this.getApartments();
    this.getServices();
    
    
  },
  methods: {
    getApartments() {
      this.message= '';
      this.$router.push({query: {}});
      this.errors = [];
      this.boolError = false;
      if(this.address === ''){
        this.suggestionLat = '';
        this.suggestionLon = '';
        this.bbox = [];
      }
      if (this.address !== '' || this.wc != '' || this.rooms != '' || this.mq != '' || this.beds != '' || this.checkboxServices != '') {
        this.filteredApartments();
        this.$route.query.homeAddress = '';
      } else{
        axios.get(`${this.store.baseUrl}/api/all-apartments`).then((response) => {
          if (response.data.success) {
            this.apartments = response.data.results;
            
  
          }
          else {
            //
          }
        })
      }
    },

    resetInput(){
      this.address = '';
      this.distance = 20;
      this.mq = '';
      this.wc = '';
      this.rooms = '';
      this.beds = '';
      this.checkboxServices = '';
      let labels = document.getElementsByClassName('form-check-label');
      for(let i=0; i<labels.length; i++){
        let label = labels[i];
        label.classList.remove('checkbox-bg');
      }
      this.$router.push({query: {}});
      this.getApartments();
    },

    getServices(){
      axios.get(this.store.baseUrl + '/api/services').then((response) => {
        if(response.data.success){
          this.services = response.data.results;
          console.log(this.services);
        } else {
          //
        }
      })
    },

    getDistance(lat1, lon1){
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(this.suggestionLat - lat1);  // deg2rad below
      var dLon = this.deg2rad(this.suggestionLon - lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(this.suggestionLat)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = (R * c).toFixed(2); // Distance in km
      return d;
    },

    deg2rad(deg) {
      return deg * (Math.PI/180);
    },

    filteredApartments() {
      
      if (this.suggestionLat !== '' && !isNaN(this.suggestionLat) && this.suggestionLon !== '' && !isNaN(this.suggestionLon)) {
          // Calcola il bounding box intorno al punto inserito
          this.bbox = [
            this.suggestionLon - (this.distance / 111.32), // Longitudine minima
            this.suggestionLat - (this.distance / 111.32),  // Latitudine minima
            this.suggestionLon + (this.distance / (111.32 * Math.cos(this.suggestionLat * (Math.PI / 180)))), // Longitudine massima
            this.suggestionLat + (this.distance / 111.32), // Latitudine massima
          ];
      }

      const params = {};

      let query = {};

      if (this.bbox !== '') {
        params.min_lat = this.bbox[1];
        params.min_lon = this.bbox[0];
        params.max_lat = this.bbox[3];
        params.max_lon = this.bbox[2];
      };
      if(this.address !== ''){
        query = Object.assign(query, { 'address': this.address });
        query = Object.assign(query, { 'distance': this.distance });
      }
      if(this.wc !== ''){
        if(this.wc < 0 || this.wc > 50){
          this.errors.push('Valore per i bagni non valido');
          this.boolError= true; 
        }
        params.wc = this.wc;
        query = Object.assign(query, { 'wc': this.wc });
      };
      if(this.rooms !== ''){
        if(this.rooms < 0 || this.rooms > 100){
          this.errors.push('Valore per le stanze non valido');
          this.boolError= true; 
        }
        params.rooms = this.rooms;
        query = Object.assign(query, { 'rooms': this.rooms });
      };
      if(this.mq !== ''){
        if(this.mq < 0 || this.mq > 701){
          this.errors.push('Valore per i metri quadri non valido');
          this.boolError= true; 
        }
        params.mq = this.mq;
        query = Object.assign(query, { 'mq': this.mq });
      };
      if(this.beds !== ''){
        if(this.beds < 0 || this.beds > 500){
          this.errors.push('Valore per i posti letto non valido');
          this.boolError= true; 
        }
        params.beds = this.beds;
        query = Object.assign(query, { 'beds': this.beds });
      };
      if(this.checkboxServices !== ''){
        params.services = this.checkboxServices;
        query = Object.assign(query, { 'services': this.checkboxServices });
      };
      this.$router.push({query: query});
      if(this.boolError){
        return this.message = 'Campi di ricerca non validi'
      }

      const urladdress = `http://127.0.0.1:8000/api/all-filtered-apartments`
      axios.get(urladdress, { params })
      .then(resp => {
        this.success = resp.data.success
        if (this.success) {
          this.message = '';
          if (resp.data.results) {
            this.apartments = resp.data.results;
          }
          else if (resp.data.message) {
            this.message = resp.data.message;
            this.apartments = '';
          }
        } else {
          this.errors = resp.data.errors;
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.bbox = '';
      })
    },
    // FUNZIONE PER LA RICERCA DEI SUGGERIMENTI
    getSuggetions() {
      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        body: null // non serve un corpo per una richiesta GET
      };

      fetch("https://api.tomtom.com/search/2/search/" + this.address + ".json?key=" + 'NvRVuGxMpACPuu2WUR93HOEvbVfg2g9A' + "&typeahead=true&limit=10&countrySet=IT", options)
        .then(response => {
          // controllare se la risposta è valida
          if (response.ok) {
            // convertire la risposta in JSON
            return response.json();
          } else {
            // lanciare un errore se la risposta non è valida
            throw new Error("Errore nella richiesta: " + response.status);
          }
        })
        .then(data => {
          // Se l'oggetto JSON contiene dei risultati, popola la lista dei suggerimenti
          if (data.results.length > 0) {
            this.suggestions = data.results;
            console.log(this.suggestions)
            return data
          }
          // Altrimenti, svuota la lista dei suggerimenti e nascondi i dettagli dell'indirizzo
          else {
            this.suggestions = "";
          }
        })
        .then((data) => {
          const inputAddress = this.address.toLowerCase(); // Converto l'indirizzo di input in minuscolo
          const results = data.results;

          // Filtra i risultati in base a una corrispondenza parziale
          const filteredResults = results.filter((result) => {
            const resultAddress = result.address.freeformAddress.toLowerCase(); // Converto l'indirizzo del risultato in minuscolo
            return resultAddress.includes(inputAddress); // Verifica se l'indirizzo del risultato include l'indirizzo di input
          });

          if (filteredResults.length > 0) {
            this.suggestions = filteredResults;
            // Restituisci il risultato più simile tra quelli filtrati
            const mostSimilarResult = filteredResults[0];
            this.getPosition(mostSimilarResult);
          }
          // Altrimenti, svuota la lista dei suggerimenti e nascondi i dettagli dell'indirizzo
          else {
            this.suggestions = "";
          }
        })
        .catch(error => {
          // gestire gli errori
          console.log("Errore: " + error.message);
        })
    },
    getPosition(data) {
      console.log('sono qui')
      this.suggestionLat = data.position.lat;
      this.suggestionLon = data.position.lon;
    },
    getService(serviceId, index){
      console.log(serviceId)
      let label = document.getElementById(index);
      console.log(label)
      if(label.classList.contains('checkbox-bg')){
        label.classList.remove('checkbox-bg')
        let indexOfService = this.checkboxServices.indexOf(serviceId)
        this.checkboxServices.splice(indexOfService, 1)
      } else {
        label.classList.add('checkbox-bg')
        this.checkboxServices.push(serviceId)
      }
      console.log(this.checkboxServices);
    },
  }
}
</script>

<template lang="">
  <div class="container-fluid navbar-container">
      <div class="row  w-100">
          <div class="d-flex col-6 justify-content-center">
            
            <div class="col-12   py-3 d-flex  justify-content-center">
                <router-link :to="{name: 'home'}"  class=" d-flex align-items-center fw-bold " style="text-decoration:none; color:#3a537e;">
                    <div class="col-auto">
                        <i class="fa-regular fa-circle-left me-2" style="color: #3a537e;"></i> 
                    </div>
                    <div class="col">
                        <span>In Evidenza</span>  
                    </div>
                </router-link>
            </div>
        </div>
      </div>
  </div>
  <div class="container-fluid  py-3">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="col-12 text-center mb-5">
              <h2 class="text-center mb-3"><span class="brand">Personalizza</span> la tua Ricerca</h2>
              <p>
                Trova l'opzione perfetta per te! Utilizza i <span class="brand">Filtri di Ricerca</span> qui sotto per adattare la tua ricerca alle tue esigenze. <span class="brand">Scegli</span> tra una vasta gamma di opzioni e trova ciò che stai cercando in modo rapido e semplice.
              </p>
          </div>
          <div class="col-12 alert alert-danger" v-if="this.boolError">
            <ul>
              <li class="text-danger list-unstyled" v-for="error in this.errors">
                {{error}}
              </li>
            </ul>
          </div>
          <div class="col-12 text-center d-flex flex-column flex-lg-row">
            <div class=" col-12 col-lg-8 pt-4">
              
                <!-- INPUT INDIRIZZO -->
                <div class="col-10 offset-1 col-md-6 col-lg-4 offset-lg-4 offset-md-3 text-center">
                  <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                      <div class="input-group">
                          <input type="search" list="suggestions" placeholder="indirizzo..." name="address" id="address" @input="getSuggetions()" v-model="address" aria-describedby="button-addon1" class="form-control border-0 bg-light">
                          <datalist id="suggestions">
                              <option v-for="suggestion in suggestions" :value="suggestion.address.freeformAddress">{{suggestion.address.freeformAddress}}</option>
                          </datalist>
                          
                      </div>
                  </div>
                
              
                  <!-- <label class="control-label fw-bold mb-2  " for="address"><span class="brand">Indirizzo</span></label>
                  <input type="text" list="suggestions" id="address" name="address" class="form-control" @input="getSuggetions()" v-model="address"> 
                  <datalist id="suggestions">
                    <option v-for="suggestion in suggestions" :value="suggestion.address.freeformAddress">{{suggestion.address.freeformAddress}}</option>
                  </datalist>                                  -->
              </div>
              <div class="col-10 offset-1 col-md-6 col-lg-4 offset-lg-4 offset-md-3 text-center">
                <!-- INPUT RAGGIO DI RICERCA -->
                <label class="control-label fw-bold mb-2  " for="distance"><span class="brand">Raggio</span> di ricerca: {{distance}} Km</label>
                <input type="range" id="distance" name="distance" min="1" max="25" class="form-range" v-model="distance">
              </div>
            </div>
            <div class="col-12 col-lg-4">

              <div class="my-3 d-flex ">
                <div class="col-6">
                  <div>
                    <!-- INPUT MQ -->
                    <label class="control-label fw-bold mb-2  " for="mq"><span class="brand">mq</span> minimi </label>
                    <div class="d-flex justify-content-center">
                        <input type="number" id="mq" name="mq" min="1" class="form-control border-0 bg-light" style="width:4.25rem" v-model="mq"><span class="align-self-center fw-bold ms-2"> &#x33A1;</span>
                    </div>
                  </div>
                  <div>                  
                    <!-- INPUT STANZE -->
                    <label class="control-label fw-bold mb-2  " for="rooms"><span class="brand">stanze</span> minime </label>
                    <div class="d-flex justify-content-center">
                        <input type="number" id="rooms" name="rooms" min="1" class="form-control border-0 bg-light" style="width:4.25rem" v-model="rooms"><i class="fa-solid fa-building ms-2 align-self-center" style="color: #4f5153;"></i>
                    </div>
                  </div>
                </div>
                <div class="col-6">

                  <div>
                    <!-- INPUT BAGNI -->
                    <label class="control-label fw-bold mb-2  " for="wc"><span class="brand">bagni</span> minimi </label>
                    <div class="d-flex justify-content-center">
                        <input type="number" id="wc" name="wc" min="1" class="form-control border-0 bg-light" style="width:4.25rem" v-model="wc"><i class="fa-solid fa-toilet-paper ms-2 align-self-center" style="color: #4f5153;"></i>
                    </div>
                  </div>
                  <div>
                    <!-- INPUT LETTI -->
                    <label class="control-label fw-bold mb-2  " for="beds"><span class="brand">letti</span> minimi </label>
                    <div class="d-flex justify-content-center">
                        <input type="number" id="beds" name="beds" min="1" class="form-control border-0 bg-light" style="width:4.25rem" v-model="beds"><i class="fa-solid fa-bed ms-2 align-self-center" style="color: #4f5153;"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
          <!-- INPUT SERVIZI -->
          <div class="col-12  d-flex flex-wrap my-5 justify-content-between">
              <div class="d-flex flex-column col-4 col-lg-1 mb-3 mb-lg-0" v-for="(service, index) in services" :key="index">
                <label class="form-check-label pb-2 position-relative d-flex change-cursor justify-content-center align-items-center align-self-center"  style="width:50px; height:50px;" :id="index" :for="service.id" @click="getService(service.id, index)">
                    <input class=" m-1" type="checkbox" name="services[]" style=" border:none; background-color:transparent; appearance:none; width:35px; height:35px;" :value='service.id'>
                    <img :src="service.icons" style="width:50px; height:50px; border: 2px solid transparent;" alt="" class="position-absolute clickable-service" :data-checkbox-id="service.id">
                </label>
                <span class="text-center">{{service.name}}</span>
              </div>
            </div>
      
          <!-- <input type="number" v-model="n_wc_min"> -->
        </div>
        <div class="col-12 text-center">
          <a href="#list">
            <button class="blue-btn btn me-4" @click="getApartments()">
              Avvia ricerca
            </button>
          </a>
          <button class="btn beige-btn" @click="resetInput()">
            Svuota ricerca
          </button>
          <div v-if="this.message" class="col-12 text-center my-5 p-5 bg-beige">
            <h5 class="home-text fw-bold">{{this.message}}</h5>
          </div>
        </div>
    </div>
  </div>
  
  <div v-if="!this.message" class="container-fluid bg-beige py-5 mt-5 ">
    <div class="container" id="list">
      <div class="row cards-row ">
        <div class="col-12 col-md-6 col-xl-4 my-4 card-container"  v-for="apartment in apartments" :key="apartment.id">
          <router-link class="text-decoration-none card-container" :to=" { name: 'single-apartment', params: { slug: apartment.slug }}">
              <Card :apartment="apartment" :getDistance="getDistance" :address="this.address"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
   
</template>

<style lang="scss">
.card-container {
    
    cursor: pointer;
}
.checkbox-bg {
  background-color: #C0C9E1;
  border-radius: 0.5rem;
}
</style>