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
        <AppLoading v-if="this.store.loading" />
        <div class="container" v-else>
            <div class="row my-3">
                <div class="col-12 text-center mb-4">
                    <h1> {{ apartment.title }}</h1>
                </div>
                <div class="col-12">
                    <strong>Indirizzo:</strong>{{ apartment.address }}
                </div>
                <div class="col-12 my-3">
                    <strong>Prezzo:</strong>{{ apartment.price }}
                </div>
                <div class="col-12 my-3">
                    <strong>N_rooms</strong>{{ apartment.n_rooms }}
                </div>
                <div class="col-12 my-3">
                    <strong>N_wc</strong>
                    <div class="container">
                        <span>{{ apartment.n_wc }}</span>
                    </div>
                </div>
                <div class="col-12 my-3">
                    <strong>Mq:</strong>
                    <div class="container">
                        <span>{{ apartment.mq }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/generals.scss' as *;
</style>