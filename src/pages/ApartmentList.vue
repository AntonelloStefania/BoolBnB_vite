<script>
import axios from 'axios';
import { store } from '../store.js';
import Card from '../components/Card.vue'

export default {
  name: 'ApartmentList',
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
            <div class="col-12">
                <h1 class="text-center text-primary mb-5">BnB - APARTMENTS</h1>
            </div>
        </div>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-start my-5">
        <div >

          <a href="http://127.0.0.1:8000" class="btn btn-primary">LARAVEL</a>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4" v-for="apartment in apartments" :key="apartment.id">
            <Card :apartment="apartment" />
        </div>
      </div>
    </div>
</template>

<style lang="">
  
</style>