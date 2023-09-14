<script>
import axios from 'axios';
import { store } from '../store.js';
import Card from '../components/Card.vue'

export default {
    name: 'HomePage',
    components: {
        Card
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
    <div class="container">
        <div class="row">
            <div class="row">
                <h1>HOMEPAGE</h1>
            </div>
        </div>
        <div class="row">
            <div class="row">
                <div class="col-12 col-md-4" v-for="apartment in apartments" :key="apartment.id">
                    <Card :apartment="apartment" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="">
    
</style>