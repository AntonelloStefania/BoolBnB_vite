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
        <!-- <div class="card">
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
          </div> -->

   
      <!-- Card-->
      <div class="card shadow-sm border-0 rounded ">
        <div class="card-body card-h p-0"><img :src="`${store.baseUrl}/storage/${apartment.cover}`" alt="" class="w-100 card-img-top">
          <div class="p-4">
            <h4 class="mb-2 title">{{apartment.title}}</h4>
            <div class="col-12 d-flex justify-content-between align-items-center text-container">
              <div class="col-6">
                <span><img :src="apartment.type.icons" alt="" class="apartment-icons me-3">{{apartment.type.name}}</span>
              </div>
              <div class="col-6 text-end">
                <span>Prezzo per notte: </span><span class="fw-bold">{{apartment.price}}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>

     
   
</template>

<style lang="scss">
  .card-h{
    height: 570px;
    .title{
      height: 58px;
    }

    img{
      height: 400px;
      object-fit: cover;
    }
    .text-container{
      height: 2rem;
    }
    .apartment-icons{
     width: 2rem;
     height: 2rem;
    }
  }
</style>