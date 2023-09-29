<script>
import { store } from '../store.js'

export default {
  name: 'Card',
  props:{
    apartment: Object,
    getDistance: Function, 
    address: String,
  },
  data() {
    return {
      store
    }
  },
  mounted() {
    console.log(this.apartment);
  },
}
</script>

<template lang="">
        <div class="card shadow-sm border-0 rounded ">
          <div class="card-body card-h p-0">
            <div class="card-image-container-relative">
              <img :src="`${store.baseUrl}/storage/${apartment.cover}`" alt="" class="w-100 card-img-top">
              <!-- <span class="sponsor-label-absolute" v-if=" apartment.lastSponsorId > 1"> In Evidenza</span> -->
              <div v-for="sponsor in apartment.sponsors">
                <span class="sponsor-label-absolute" v-if=" new Date(sponsor.pivot.end) > new Date()"> In Evidenza</span>
              </div>
            </div>
            <div class="top-text-wrapper py-3">
              <div class="px-4">
                <h5 class="mb-2 title">{{apartment.title}}</h5>
                <p v-if='address != ""'>
                  <span class="brand">Distanza</span>: {{getDistance(apartment.lat, apartment.lon)}} Km
                </p>
                <div class="col-12 d-flex  align-items-center">
                  <div class="col-6 text-center">
                    <div><img :src="apartment.type.icons" alt="" class="apartment-icons me-3"></div>
                    <div class="d-inline d-none d-lg-inline">{{apartment.type.name}}</div>
                  </div>
                  <div class="col-6 text-center ">
                    <i class="fa-solid fa-moon d-inline  me-2" style="color: #5272a7;"></i><span class="fw-bold"> {{apartment.price}}€</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-text-wrapper p-4">
             
              <div class="col-12 d-flex  mb-2 ">
                <div class="col-6 ps-4">
                  <ul class="list-unstyled  my-0">
                    <li class="mb-2 fs-m"><span class="brand">&#x33A1;</span> : {{apartment.mq}}</li>
                    <li class="fs"><span class="brand">Stanze</span>: {{apartment.n_rooms}}<i class="fa-solid fa-building ms-2 align-self-center" style="color: #4f5153;"></i></li>
                  </ul>
                </div>
                <div class="col-6 text-center">
                  <ul class="list-unstyled  my-0">
                    <li class="mb-2 fs"><span class="brand">Letti</span>: {{apartment.n_beds}}<i class="fa-solid fa-bed ms-2 align-self-center" style="color: #4f5153;"></i></li>
                    <li class="fs"><span class="brand">Bagni</span>: {{apartment.n_wc}}<i class="fa-solid fa-toilet-paper ms-2" style="color: #4f5153;"></i></li>
                    <!-- <li>{{apartment.sponsors[0].name}}</li> -->
                  </ul>
                </div>
              </div>
              <h6 class="mt-3">Servizi <span class="brand">Extra</span>:</h6>
              <div class="col-12 d-flex flex-wrap ">
                <div class="col-auto text-center my-2" style="width:3rem" v-for="service in apartment.services">
                 
                    <img class="type-icon" :src="service.icons"  alt="">
                  

                </div>

              </div>
            </div>
            
          </div>
        </div>
</template>

<style lang="scss">
.card-h {
 
height: 780px;
  .title {
    height: 58px;
    overflow: hidden;
  }

  .card-img-top {
    height: 400px;
    object-fit: cover;
  }


  .top-text-wrapper {
    background: rgb(255, 255, 255);
    background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(113, 140, 216, 0.288) 100%);
  }

  .apartment-icons {
    width: 2rem;
    height: 2rem;
  }
}

.card:hover {
  scale: 1.02 !important;
}


.service-container {
  border: 1px solid gray;
  border-radius: 0.755rem;
}

.fs-m {
  font-size: 17px;
}
.type-icon {
    width: 2rem;
    object-fit: cover;
}


.card-image-container-relative{
  position:relative;
}

.sponsor-label-absolute{
  position:absolute;
  right:20px;
  bottom:-10px;
  background-color: pink;
  padding:5px 10px;
  border-radius:0.755rem;
  font-weight: bold;
  color: rgb(36, 36, 90);
}
</style>