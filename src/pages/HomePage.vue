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
            apartments: []
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
        }
    }
}

</script>

<template lang="">
    <div class="container-fluid jumbotron-container d-none d-md-block">
        <div class="row">
            <div class="col-12 p-0">
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