<script>

import axios from 'axios';
import { store } from '../store.js';
// import ContactForm from '../components/ContactForm.vue';

export default {
    name: 'SingleApartment',
    components: {
        // ContactForm
    },
    data() {
        return {
            store,
            apartment: null,
            name: '',
            surname: '',
            email: '',
            message: '',
            store,
            errors: {},
            apartment_id:'',
            messageForm:'',
            loading: false,
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
                    this.apartment_id = this.apartment.id
                }
                else {

                }
            })
        },

        sendForm(){
            this.loading=true;
         const data = {
             name:this.name,
             surname:this.surname,
             email:this.email,
             message:this.message,
             apartment_id:this.apartment_id,
         }
         console.log(data)
         const urlMessage= `http://127.0.0.1:8000/api/messages`
         axios.post(urlMessage,data)
         .then(resp=>{
             console.log(resp)
             this.success = resp.data.success
             if(this.success){
                 this.name =""
                 this.surname = ""
                 this.email = ""
                 this.message =""
                 this.errors = ""
                 this.messageForm = "Form inviato sul cesso"
                 this.$router.push({ name: 'thank-you' })
             }else{
                 this.errors = resp.data.errors;
             }

             this.loading = false
            
         })


//SECONDA PROVA FUNZIONAAAAAAAAAAA
// const urlMessage = `http://127.0.0.1:8000/api/messages`;

// // Crea un oggetto FormData per i dati del modulo
//  const formData = new FormData();
//  formData.append('name', document.getElementById('name').value);
//  formData.append('surname', document.getElementById('surname').value);
//  formData.append('email', document.getElementById('email').value);
//  formData.append('message', document.getElementById('message').value);
//  formData.append('apartment_id', this.apartment_id)

//  // Crea una richiesta XMLHttpRequest
//  const xhr = new XMLHttpRequest();
//  xhr.open('POST', urlMessage, true);

//  // Imposta il gestore dell'evento per la risposta
//  xhr.onload = function () {
//      if (xhr.status === 200) {
//          // Risposta dal server
//          const response = JSON.parse(xhr.responseText);
//          console.log(response);

//          this.success = response.success;

//          if (this.success === true) {
// //             // Form inviato con successo, reimposta i campi e gestisci la conferma
           
//             document.getElementById('name').value = '';
//             document.getElementById('surname').value = '';
//             document.getElementById('email').value = '';
//             document.getElementById('message').value = '';

          
//          } else {
//              // Gestisci gli errori
//              this.errors = response.errors;
//          }
//      } else {
//          console.error('Errore nella richiesta:', xhr.status);
//      }
//  };

// // // Invia la richiesta con i dati del modulo
//  xhr.send(formData);
    

//TERZA PROVA

// Crea un oggetto FormData con i dati del form
// let data = new FormData();
// data.append("name", this.name);
// data.append("surname",this.surname);
// data.append("apartment_id", this.apartment_id)
// data.append("email", this.email);
// data.append("message", this.message);

// // Crea le opzioni della richiesta
// let options = {
//   method: "POST",
//   body: data,
// };
// console.log(options)
// // Invia la richiesta con la Fetch API
// fetch("http://127.0.0.1:8000/api/messages", options)
//   .then((response) => response.json())
//   .then((data) => {
//     // Gestisci la risposta del server
//     this.success = data.success;
//     if (!this.success) {
//       this.errors = data.errors;
//     } else {
//       this.name = "";
//       this.email = "";
//       this.message = "";
//       this.surname="";
      
//     }

//     this.loading = false;
//   });


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
                        <router-link class="btn btn-sm btn-success" :to="{name: 'home'}">Tutti gli appartamenti</router-link>
                    </div>
                </div>
                <div class="container mt-5">
                    <div class="row">
                        <div class="col-12">
                            <!-- <ContactForm /> -->



                            
                    <form @submit.prevent="sendForm()">
                            <div class="col_2">
                                <div class="name">
                                    <label for="" class="form-label">Nome*</label>
                                    <input type="text" name="name" id="name" class="form-control" placeholder=""
                                        aria-describedby="helpId" required v-model="name">
<!-- 
                                    <div class="alert alert-danger" role="alert" v-for="error in errors.name">
                                        {{ error }}
                                    </div> -->
                                </div>
                                <div class="surname">
                                    <label for="" class="form-label">Cognome*</label>
                                    <input type="text" name="surname" id="surname" class="form-control" placeholder=""
                                        aria-describedby="helpId" required v-model="surname">
<!-- 
                                    <div class="alert alert-danger" role="alert" v-for="error in errors.surname">
                                        {{ error }}
                                    </div> -->
                                </div>
                            </div>
                            <div class="email">
                                <label for="" class="form-label">Email*</label>
                                <input type="email" name="email" id="email" class="form-control" placeholder=""
                                    aria-describedby="helpId" required v-model="email">
<!-- 
                                <div class="alert alert-danger" role="alert" v-for="error in errors.email">
                                    {{ error }}
                                </div> -->
                            </div>
                            <div class="message">
                                <label for="" class="form-label">Messaggio*</label>
                                <textarea rows="3" cols="50" name="message" id="message" class="form-control" placeholder=""
                                    aria-describedby="helpId" required v-model="message">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </textarea>
<!-- 
                                <div class="alert alert-danger" role="alert" v-for="error in errors.message">
                                    {{ error }}
                                </div> -->
                            </div>
                            <div class="col-12 text-center my-5">

                                <div  v-if="loading" class="disabled">
                                    <button class="btn btn-primary" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                </div>
                                <button v-else class="btn btn-primary" type="submit">Invia</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/generals.scss' as *;

@keyframes spinner-border {
  to { transform: rotate(360deg) #{"/* rtl:ignore */"}; }
}
</style>