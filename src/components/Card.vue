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
        <div class="card shadow-sm border-0 rounded ">
          <div class="card-body card-h p-0"><img :src="`${store.baseUrl}/storage/${apartment.cover}`" alt="" class="w-100 card-img-top">
            <div class="p-4">
              <h5 class="mb-2 title">{{apartment.title}}</h5>
              <div class="col-12 d-md-flex justify-content-between align-items-center text-container">
                <div class="col-12 col-md-6">
                  <span><img :src="apartment.type.icons" alt="" class="apartment-icons me-3"><span class="d-inline d-md-none d-lg-inline">{{apartment.type.name}}</span></span>
                </div>
                <div class="col-12 col-md-6 text-end">
                  <span class="d-inline d-md-none d-lg-inline">Prezzo: </span><span class="fw-bold">{{apartment.price}}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>

<style lang="scss">
.card-h {
  height: 570px;

  .title {
    height: 58px;
    overflow: hidden;
  }

  img {
    height: 400px;
    object-fit: cover;
  }

  .text-container {
    height: 2rem;
  }

  .apartment-icons {
    width: 2rem;
    height: 2rem;
  }
}
</style>