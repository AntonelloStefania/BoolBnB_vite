<script>
import axios from 'axios';

export default {
  name: 'Apartment',
  data() {
    return {
      baseUrl: 'http://localhost:8000',
      apartments: []
    }
  },
  created() {
    this.getApartments();
  },
  methods: {
    getApartments() {
      axios.get(`${this.baseUrl}/api/apartments`).then((response) => {
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
  <div>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center">BNB</h1>
            </div>
        </div>
    </div>
    <div class="container">
     
      <div class="row">
        <div class="col-12 col-md-4" v-for="apartment in apartments" :key="apartment.id">
          <div class="card">
            <div class="card-header my-3">
              {{ apartment.title }}
            </div>
            <div class="card-body">
              <div class="col-12">
                <span> <strong>Indirizzo:</strong></span> {{ apartment.address }}
              </div>
              <div class="col-12">
                <span> <strong>Price</strong></span> {{ apartment.price }}
              </div>
              <div class="col-12">
                <span> <strong>N-rooms</strong></span> {{ apartment.n_rooms }}
              </div>
              <div class="col-12">
                <span> <strong>N-wc</strong></span> {{ apartment.n_wc }}
              </div>
              <div class="col-12">
                <span> <strong>Mq</strong></span> {{ apartment.mq }}
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="">
  
</style>