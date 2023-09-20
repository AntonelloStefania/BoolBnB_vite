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
      address: '',
      n_wc_min: '',
      suggestions: [],
      suggestionLon: '',
      suggestionLat: '',
      bbox: [],
      distance: 20,
    }
  },
  created() {
    this.getApartments();
  },
  methods: {
    getApartments() {
      axios.get(`${this.store.baseUrl}/api/apartments`).then((response) => {
        if (response.data.success) {
          this.apartments = response.data.results;
        }
        else {
          //
        }
      })
    },
    filteredApartments(){
      console.log('fin qui va')
      // this.getApartments()
      // this.apartments = this.apartments.filter(apartment => apartment.n_wc > this.n_wc_min);
      if(this.address != ''){
        console.log('anche fin qui')
        this.apartments = this.apartments.filter(apartment => apartment.lon > this.bbox[0]);
        this.apartments = this.apartments.filter(apartment => apartment.lon < this.bbox[2]);
        this.apartments = this.apartments.filter(apartment => apartment.lat > this.bbox[1]);
        this.apartments = this.apartments.filter(apartment => apartment.lat < this.bbox[3]);
      } else {
        this.getApartments()
      }
    },
    getSuggetions(){
      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        body: null // non serve un corpo per una richiesta GET
      };

      fetch("https://api.tomtom.com/search/2/search/" + this.address + ".json?key=" + 'NvRVuGxMpACPuu2WUR93HOEvbVfg2g9A' + "&typeahead=true&limit=10", options)
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
        if(this.address === data.results[0].address.freeformAddress){
          this.getPosition(data.results[0])
        }
      })
      .catch(error => {
        // gestire gli errori
        console.log("Errore: " + error.message);
      });
    },
    getPosition(data){
      console.log('sono qui')
      this.suggestionLat = data.position.lat;
      this.suggestionLon = data.position.lon;
      // Calcola il bounding box intorno al punto inserito
      this.bbox = [
        this.suggestionLon - (this.distance / 111.32), // Longitudine minima
        this.suggestionLat - (this.distance / 111.32),  // Latitudine minima
        this.suggestionLon + (this.distance / (111.32 * Math.cos(this.suggestionLat * (Math.PI / 180)))), // Longitudine massima
        this.suggestionLat + (this.distance / 111.32), // Latitudine massima
      ];
      console.log(this.bbox)
      console.log(this.bbox[0])
    }
  }
}
</script>

<template lang="">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center text-primary mb-5">BnB - APARTMENTS</h1>
            </div>
            <div class="col-12">
              <label for="address">Cerca un indirizzo</label>
              <input list="suggestions" type="text" name="address" id="address" @input="getSuggetions()" v-model="address">
              <datalist id="suggestions">
                <option v-for="suggestion in suggestions" :value="suggestion.address.freeformAddress">{{suggestion.address.freeformAddress}}</option>
              </datalist>
              <input type="number" v-model="n_wc_min">
              <button @click="filteredApartments()">
                avvia ricerca
              </button>
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
 
</style>