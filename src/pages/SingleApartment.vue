<script>

import axios from 'axios';
import { store } from '../store.js';


export default {
    name: 'SingleApartment',
    data() {
        return {
            store,
            apartment: null
        }
    },
    created() {
        this.getSingleApartment();
    },
    methods: {
        getSingleApartment() {
            axios.get(`${this.store.baseUrl}/api/apartments/${this.$route.params.slug}`).then((response) => {
                if (response.data.success) {
                    this.apartment = response.data.apartment;
                }
                else {
                    this.$router.push({ name: 'not-found' });
                }
            })
        }
    }
}
</script>

<template lang="">
    <div>
        <div class="container">
            <div class="row my-3">
                <div class="card" style="width: 25rem;">
                    <img :src="`${store.baseUrl}/storage/${apartment.cover}`" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-uppercase">{{ apartment.title }}</h5>
                        <p class="card-text">{{ apartment.description}}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Indirizzo:</strong>  {{ apartment.address }}</li>
                    
                        <li class="list-group-item"> <strong>Prezzo:</strong> {{ apartment.price }}</li>
                        <li class="list-group-item"><strong>N_rooms</strong>{{ apartment.n_rooms }}</li> 
                        <li class="list-group-item"><strong>N_wc</strong>{{ apartment.n_wc }}</li> 
                        <li class="list-group-item"><strong>Mq:</strong>{{ apartment.mq }}</li> 
                    </ul>
                    <div class="card-body">
                        <router-link class="btn btn-sm btn-success" :to="{name: 'apartments'}">Tutti gli appartamenti</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/generals.scss' as *;
</style>