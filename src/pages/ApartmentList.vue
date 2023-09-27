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
        params.wc = this.wc;
        query = Object.assign(query, { 'wc': this.wc });
      };
      if(this.rooms !== ''){
        params.rooms = this.rooms;
        query = Object.assign(query, { 'rooms': this.rooms });
      };
      if(this.mq !== ''){
        params.mq = this.mq;
        query = Object.assign(query, { 'mq': this.mq });
      };
      if(this.beds !== ''){
        params.beds = this.beds;
        query = Object.assign(query, { 'beds': this.beds });
      };
      if(this.checkboxServices !== ''){
        params.services = this.checkboxServices;
        query = Object.assign(query, { 'services': this.checkboxServices });
      };
      this.$router.push({query: query});

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


    // {
    //   // this.apartments = this.apartments.filter(apartment => apartment.n_wc > this.n_wc_min);
    //   this.apartments = this.apartments.filter(apartment => apartment.lon > this.bbox[0]);
    //   this.apartments = this.apartments.filter(apartment => apartment.lon < this.bbox[2]);
    //   this.apartments = this.apartments.filter(apartment => apartment.lat > this.bbox[1]);
    //   this.apartments = this.apartments.filter(apartment => apartment.lat < this.bbox[3]);
    //   this.address = '';
    // },
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
          <div class="col-4 col-lg-2 py-3 d-flex justify-content-end">
              <router-link :to="{name: 'home'}"  class="fw-bold" style="text-decoration:none; color:#3a537e;"><i class="fa-regular fa-circle-left" style="color: #3a537e;"></i> Annunci in Evidenza  </router-link>
          </div>
      </div>
  </div>
  <div class="container-fluid card-container py-3">
    <div class="container">
      <div class="row">
            <div class="col-12">
                <h1 class="text-center text-primary mb-3">BnB - APARTMENTS</h1>
            </div>
            <div class="col-12 text-center">
              <div class="d-flex justify-content-around">
                <div>
                  <!-- INPUT INDIRIZZO -->
                  <label class="control-label fw-bold mb-2  " for="address"><span class="brand">Indirizzo</span></label>
                  <input type="text" list="suggestions" id="address" name="address" class="form-control" @input="getSuggetions()" v-model="address"> 
                  <datalist id="suggestions">
                    <option v-for="suggestion in suggestions" :value="suggestion.address.freeformAddress">{{suggestion.address.freeformAddress}}</option>
                  </datalist>                                 
                </div>
                <div>
                  <!-- INPUT RAGGIO DI RICERCA -->
                  <label class="control-label fw-bold mb-2  " for="distance"><span class="brand">Raggio</span> di ricerca: {{distance}} Km</label>
                  <input type="range" id="distance" name="distance" min="1" max="25" class="form-range" v-model="distance">
                </div>
              </div>
              <div class="my-3 d-flex justify-content-between">
                <div>
                  <!-- INPUT MQ -->
                  <label class="control-label fw-bold mb-2  " for="mq">Numero di <span class="brand">mq</span> minimi </label>
                  <div class="d-flex justify-content-center">
                      <input type="number" id="mq" name="mq" min="1" class="form-control" style="width:4.25rem" v-model="mq"><span class="align-self-center fw-bold ms-2"> &#x33A1;</span>
                  </div>
                </div>
                <div>                  
                  <!-- INPUT STANZE -->
                  <label class="control-label fw-bold mb-2  " for="rooms">Numero di <span class="brand">stanze</span> minime </label>
                  <div class="d-flex justify-content-center">
                      <input type="number" id="rooms" name="rooms" min="1" class="form-control" style="width:4.25rem" v-model="rooms"><i class="fa-solid fa-building ms-2 align-self-center" style="color: #4f5153;"></i>
                  </div>
                </div>
                <div>
                  <!-- INPUT BAGNI -->
                  <label class="control-label fw-bold mb-2  " for="wc">Numero di <span class="brand">bagni</span> minimi </label>
                  <div class="d-flex justify-content-center">
                      <input type="number" id="wc" name="wc" min="1" class="form-control" style="width:4.25rem" v-model="wc"><i class="fa-solid fa-toilet-paper ms-2 align-self-center" style="color: #4f5153;"></i>
                  </div>
                </div>
                <div>
                  <!-- INPUT LETTI -->
                  <label class="control-label fw-bold mb-2  " for="beds">Numero di <span class="brand">posti letto</span> minimi </label>
                  <div class="d-flex justify-content-center">
                      <input type="number" id="beds" name="beds" min="1" class="form-control" style="width:4.25rem" v-model="beds"><i class="fa-solid fa-bed ms-2 align-self-center" style="color: #4f5153;"></i>
                  </div>
                </div>
              </div>
              <!-- INPUT SERVIZI -->
                <div class="col-12 d-flex my-5 justify-content-between">
                  <div class="d-flex flex-column" v-for="(service, index) in services" :key="index">
                    <label class="form-check-label pb-2 position-relative d-flex change-cursor justify-content-center align-items-center align-self-center"  style="width:50px; height:50px;" :id="index" :for="service.id" @click="getService(service.id, index)">
                        <input class=" m-1" type="checkbox" name="services[]" style=" border:none; background-color:transparent; appearance:none; width:35px; height:35px;" :value='service.id'>
                        <img :src="service.icons" style="width:50px; height:50px; border: 2px solid transparent;" alt="" class="position-absolute clickable-service" :data-checkbox-id="service.id">
                    </label>
                    <span class="text-center">{{service.name}}</span>
                  </div>
                </div>
              </div>
              <!-- <input type="number" v-model="n_wc_min"> -->
              <button class="blue-btn btn" @click="getApartments()">
                Avvia ricerca
              </button>
              <h1>{{this.message}}</h1>
            </div>
        </div>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-start my-5">
        
      </div>
      <div class="row cards-row">
        <div class="col-12 col-md-4" v-for="apartment in apartments" :key="apartment.id">
            <div>
              {{apartment.lon}} {{apartment.lat}} {{apartment.address}}
            </div>
            <Card :apartment="apartment" />
        </div>
      </div>
    </div>
    
</template>

<style lang="scss">
.card-container {
    background-color: #f7ecd1;
    margin: 0;
}
.checkbox-bg {
  background-color: #C0C9E1;
  border-radius: 0.5rem;
}
</style>