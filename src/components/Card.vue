<script>
import { store } from '../store.js'

export default {
  name: 'Card',
  props: {
    apartment: Object
  },
  data() {
    return {
      store
    }
  }
}
</script>

<template lang="">
        <div class="card">
              <div class="card-header text-center">
                {{ apartment.title }}
              </div>
              <div class="card-body">
                <div class="col-12">
                  <span> <strong>Indirizzo:</strong></span> {{ apartment.address }}
                </div>
                <div class="col-12">
                  <span> <strong>Price:</strong></span> {{ apartment.price }}
                </div>
                <div class="col-12">
                  <span> <strong>N-rooms:</strong></span> {{ apartment.n_rooms }}
                </div>
                <div class="col-12">
                  <span> <strong>N-wc:</strong></span> {{ apartment.n_wc }}
                </div>
                <div class="col-12">
                  <span> <strong>Mq:</strong></span> {{ apartment.mq }}
                </div>
                <div class="card-footer my-3">
                  <router-link class="btn btn-outline-primary w-100" :to="{ name: 'single-apartment', params: { slug: apartment.slug } }">Vedi
                    l'appartamento</router-link>
                </div>
            </div>
          </div>
</template>

<style lang="">
    
</style>