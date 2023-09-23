<script>
import axios from 'axios';
import { store } from '../store.js';
import Card from '../components/Card.vue';
import AppMap from '../components/AppMap.vue';

export default {
    name: 'HomePage',
    components: {
        Card,
        AppMap,
    },
    data() {
        return {
            store,
            apartments: [],
            address: '',
            suggestions: [],
            suggestionLon: '',
            suggestionLat: '',
            bbox: [],
            distance: 20,
            message: '',
        }
    },
    mounted() {
        this.getApartments();
    },
    methods: {
        getApartments() {
            axios.get(`${this.store.baseUrl}/api/apartments`).then((response) => {
                if (response.data.success) {
                this.apartments = response.data.results;
                this.message= '';
                if (this.address != '') {
                    this.filteredApartments();
                }
                }
                else {
                //
                }
            })
        },
        filteredApartments() {

            const params = {
            min_lat: this.bbox[1],
            max_lat: this.bbox[3],
            min_lon: this.bbox[0],
            max_lon: this.bbox[2],
            }
            const urladdress = `http://127.0.0.1:8000/api/filtered-apartments`
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
            });
        },
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
            });
        },
        getPosition(data) {
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
        }
    }
}

</script>

<template lang="">
    <div class="container-fluid navbar-container">
        <div class="container">
            <div class="row justify-content-end">
                <div class="col-3 ">

                    <a href="" >Ricerca Avanzata</a>
                </div>
            </div>
        </div>

    </div>
    <div class="container-fluid jumbotron-container d-none d-md-block">
        <div class="row">
            <div class="col-12 p-0" disabled>
                <div id="carouselExampleDark" class="carousel  slide " data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1" disabled></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2" disabled></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3" disabled></button>
                    </div>
                    <div class="carousel-inner carousel-custom " >
                        <div class="carousel-item active " data-bs-interval="10000">
                            <img src="../assets/apartments/travel.webp" class="d-block  carousel-img" alt="...">
                            <div class="carousel-caption d-none d-md-block custom-description">
                                <h3>BoolBnB: Scopri il Tuo Soggiorno Perfetto</h3>
                                <p>
                                    Pianifica la tua prossima fuga con BoolBnB, la destinazione ideale per trovare alloggi straordinari in tutto il mondo. Scegli tra una vasta gamma di opzioni, dalle accoglienti case vacanze alle lussuose dimore, e prenota il tuo rifugio perfetto in pochi clic. Con BoolBnB, il tuo soggiorno da sogno è a portata di mano. Scopri comfort e avventure ovunque tu vada con BoolBnB
                                </p>
                            </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="10000">
                            <img src="../assets/apartments/hoste.webp" class="d-block  carousel-img" alt="...">
                            <div class="carousel-caption d-none d-md-block custom-description " >
                                <h3>BoolBnB: Conosci il Tuo Host, Vivi un'Esperienza Autentica</h3>
                                <p>Incontra il tuo host grazie a BoolBnB e vivi un'esperienza unica. Conoscere chi affitta l'alloggio rende ogni soggiorno speciale. I nostri host sono pronti a darti il benvenuto e condividere consigli locali per farti scoprire i segreti del luogo. Scegli BoolBnB e vivi non solo in una casa, ma nel cuore di una comunità. Scopri storie, tradizioni e amicizie autentiche grazie al nostro network globale di host eccezionali.</p>
                            </div>
                        </div>
                        <div class="carousel-item"  data-bs-interval="10000">
                            <img src="../assets/apartments/camper.webp" class="d-block  carousel-img " style="object-position:bottom;" alt="...">
                            <div class="carousel-caption d-none d-md-block custom-description">
                                <h3>Soggiorni Straordinari con BoolBnB: Scopri Camper e Case Galleggianti Unici</h3>
                                <p >Hai mai sognato di dormire su un'acqua serena o di svegliarti circondato dalla natura in un camper? Con BoolBnB, i tuoi sogni possono diventare realtà. Oltre agli alloggi tradizionali, offriamo una vasta gamma di esperienze uniche, tra cui soggiorni in case galleggianti e camper. Scopri una nuova dimensione del viaggio con BoolBnB e prenota il tuo prossimo soggiorno indimenticabile.</p>
                            </div>
                        </div>
                        <div class="">
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev" >
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next" >
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
              <label for="address">Cerca un indirizzo</label>
              <input list="suggestions" type="text" name="address" id="address" @input="getSuggetions()" v-model="address">
              <datalist id="suggestions">
                <option v-for="suggestion in suggestions" :value="suggestion.address.freeformAddress">{{suggestion.address.freeformAddress}}</option>
              </datalist>
              <!-- <input type="number" v-model="n_wc_min"> -->
              <button @click="getApartments()">
                avvia ricerca
              </button>
              <h1>{{this.message}}</h1>
            </div>
        </div>
    </div>
   <div class="container-fluid card-container">
       <div class="container">
           <div class="row">
               <div class="col-12 col-md-6 col-lg-4 my-5" v-for="apartment in apartments" :key="apartment.id">
                <router-link class="text-decoration-none" :to=" { name: 'single-apartment', params: { slug: apartment.slug }}">
                    <Card :apartment="apartment" />
                </router-link>
               </div>
           </div>
       </div>
   </div>
   <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <AppMap/>
        </div>

      </div>

    </div>
</template>

<style lang="scss">
.jumbotron-container {


    .carousel-custom {


        .carousel-item {
            .custom-description {
                color: whitesmoke;
                background-color: rgba(22, 22, 22, 0.555);
                border-radius: 1rem;

                p {
                    font-size: 18px;
                    padding: 0 0.75rem;
                }
            }

            .carousel-img {

                object-fit: cover;
                width: 100%;
                height: 600px;
                object-position: bottom;




            }

        }
    }
}

.card-container {
    background-color: #f7ecd1;
    margin: 5rem 0;
}
</style>