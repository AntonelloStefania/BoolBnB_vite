<script>


import axios from 'axios';
import { store } from '../store.js';
// import ContactForm from '../components/ContactForm.vue';

export default {
    name: 'SingleApartment',
    components: {
        // ContactForm
    }, props: {
    apartment: Object
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
            apartment_id: '',
            messageForm: '',
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

        sendForm() {
            this.loading = true;
            const data = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                message: this.message,
                apartment_id: this.apartment_id,
            }
            console.log(data)
            const urlMessage = `http://127.0.0.1:8000/api/messages`
            axios.post(urlMessage, data)
                .then(resp => {
                    console.log(resp)
                    this.success = resp.data.success
                    if (this.success) {
                        this.name = ""
                        this.surname = ""
                        this.email = ""
                        this.message = ""
                        this.errors = ""
                        this.messageForm = "Form inviato sul cesso"
                        this.$router.push({ name: 'thank-you' })
                    } else {
                        this.errors = resp.data.errors;
                    }

                    this.errors = {}
                    console.log(data)
                    const urlMessage = `http://127.0.0.1:8000/api/messages`
                    axios.post(urlMessage, data)
                        .then(resp => {
                            console.log(resp)
                            this.success = resp.data.success
                            if (this.success) {
                                this.name = ""
                                this.surname = ""
                                this.email = ""
                                this.message = ""
                                this.errors = ""
                                this.messageForm = "Form inviato sul cesso"
                                this.$router.push({ name: 'thank-you' })
                            } else {
                                this.errors = resp.data.errors;
                            }

                            this.loading = false

                        })
                });

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
     
        <div class="container-fluid">
            <div class="row ">
                <div class="col-8 offset-2 text-center mb-5">
                    <h2 class="my-3"><span class="brand">Dettagli</span> dell'Annuncio</h2>
                    <p class="text-center">Scopri tutti i dettagli di questa straordinaria opportunità. Prenditi il tempo per esaminare attentamente ogni aspetto e assicurarti che questo sia il luogo perfetto per il tuo prossimo soggiorno. Se vuoi rendere la tua esperienza ancora più completa, dai un'occhiata alle foto aggiuntive caricate dagli host. Ricorda che ogni annuncio è unico, quindi non esitare a chiedere all'host qualsiasi domanda tu possa avere. Siamo qui per aiutarti a trovare l'alloggio ideale su <span class="brand">BoolBnB</span>. Buona esplorazione!</p>
                </div>
                <div class="container-fluid bg-beige py-3 ">
                    <div class="container">
                        <div class="col-12 text-center mt-2 mb-4">
                            <h2>
                                {{apartment.title}}
                            </h2>
                        </div>
                        <div class="col-12 d-flex flex-column flex-md-row ">
                            <div class="col-12  col-md-4 d-flex align-items-center order-2 order-md-1 mx-md-3 mb-3">
                                <img :src="`${store.baseUrl}/storage/${apartment.cover}`" class="cover">
                            </div>
                            <div class="col-12 m-0 col-md-8  text-center order-2 order-md-2  justify-content-center mb-3 " >
                                <div class="container gal-container ">
                                    <div class="gal-item d-flex flex-wrap justify-content-center">
                                        <div class="box col-12 col-md-5 m-2  img-container  " v-for="photo in apartment.photos" :key="photo.id">
                                            <img :src="`${store.baseUrl}/storage/${photo.url}`" class="col-6" style="border-radius:1.25rem" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- {{-- FINE SEZIONE IMMAGINI --}} -->
        <div class="container my-5">
            <div class="row">
                <div class="col-12 col-md-6 flex-column d-flex align-items-center d-md-block  col-lg-3 my-4 my-lg-0 text-lg-start">
                    <h5 class="mb-3 d-flex ">Il Tuo <span class="brand">Alloggio</span></h5>
                        <ul class="list-unstyled ">
                            <li class=" ">
                                 <img :src="apartment.type.icons"  class="me-2 type-icon" alt="">  
                                <span class="fw-bold brand">{{apartment.type.name}}</span>   
                            </li>
                            <li class="" >
                                <span class="" ><span class="brand">Grandezza</span> alloggio: </span><span class="fw-bold " >{{apartment.mq}} <span class="fs-5">&#x33A1;</span> </span>
                            </li>
                            <li class="">
                                <span class="">Numero di <span class="brand">Stanze:</span> </span> <span class="mx-2 fw-bold ">{{apartment.n_rooms}}<img src="../assets/icons8-posto-letto-occupato-24.png" class="ms-1" alt=""></span>
                            </li>
                            <li class="">
                                <span class="">Numero di <span class="brand">Bagni:</span> </span> <span class="ms-2 fw-bold ">{{apartment.n_wc}}<img src="../assets/icons8-carta-igienica-24.png" class="ms-1" alt=""></span>
                            </li>
                        </ul>
                    
                </div>
                <div class="col-12 col-md-6 flex-column d-flex align-items-center d-md-block  col-lg-3 my-4 my-lg-0 text-lg-start">
                    <h5 class="mb-3">I <span class="brand">Servizi</span> che Offri</h5>
                    <ul class="list-unstyled apartment-list " v-for="service in apartment.services" :key="service.id" >
                        <li class="">
                           <img :src="service.icons" alt="" class="type-icon me-2"> 
                            <span class="">{{service.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-12  col-lg-6 text-center my-4 my-lg-0 text-md-start">
                    <h5 class="mb-3">Il <span class="brand">Pernottamento</span> che Offri</h5>
                   
                        <ul class="list-unstyled apartment-list ">
                            <li class="">
                               <span><span class="brand">Prezzo</span> per Notte: </span><span class="ms-2 fw-bold">{{apartment.price}}&euro;</span>
                            </li>
                            <li class="">
                               <span><span class="brand">Indirizzo</span>: </span><span class="ms-2 ">{{apartment.address}} <img src="../assets/icons8-codice-regione-25.png" class="ms-1" alt=""></span>
                            </li>
                            <li class="">
                                <span><span class="brand">Descrizione</span>: </span><span class="ms-2">{{apartment.description}}  </span>
                            
                             </li>
                        </ul>
                   
                </div>
            </div>
        </div>
    <div>

    <div class="container my-5">
        <div class="col-12 text-center mb-5">
            <h2 class="">Contatta l'Host su <span class="brand">BoolBnB</span></h2>
            <p>Hai domande sull'annuncio o hai bisogno di informazioni aggiuntive dall'host? Utilizza il modulo di contatto qui sotto per metterti in contatto direttamente con l'host. Fai la tua prenotazione in modo sicuro e senza stress su <span class="brand">BoolBnB!</span></p>
        </div>
        <div class="row">
            <div class="col-12 col-md-8 offset-md-2  pe-lg-0 card d-flex flex-row justify-content-between">
                <div class="col-12 col-lg-6 ">
                    <form @submit.prevent="sendForm()">
                    <div class="">
                        <div class="name">
                            <label for="" class="form-label">Nome*</label>
                            <input type="text" name="name" id="name" class="form-control custom-form px-2" placeholder=""
                                aria-describedby="helpId" required v-model="name">
    
                            <div class="alert alert-danger" role="alert" v-for="error in errors.name">
                                {{ error }}
                            </div> 
                        </div>
                        <div class="surname">
                            <label for="" class="form-label">Cognome*</label>
                            <input type="text" name="surname" id="surname" class="form-control custom-form px-2" placeholder=""
                                aria-describedby="helpId" required v-model="surname">
    
                            <div class="alert alert-danger" role="alert" v-for="error in errors.surname">
                                {{ error }}
                            </div>
                        </div>
                    </div>
                    <div class="email">
                        <label for="" class="form-label">Email*</label>
                        <input type="email" name="email" id="email" class="form-control custom-form px-2" placeholder=""
                            aria-describedby="helpId" required v-model="email">
    
                         <div class="alert alert-danger" role="alert" v-for="error in errors.email">
                            {{ error }}
                        </div> 
                    </div>
                    <div class="message">
                        <label for="" class="form-label">Messaggio*</label>
                        <textarea rows="3" cols="50" name="message" id="message" class="form-control custom-form p-2" placeholder=""
                            aria-describedby="helpId" required v-model="message"></textarea>
                        <div class="alert alert-danger" role="alert" v-for="error in errors.message">
                            {{ error }}
                        </div>
                    </div>
                    <div class="text-center my-3">
    
                        <div  v-if="loading" class="disabled">
                            <button class="btn blue-btn" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        </div>
                        <button v-else class="btn blue-btn" type="submit">Invia</button>
                    </div>
                    </form>
                </div>
                <div class="col-5 card-image d-none   d-lg-block">
                    <img src="../assets/apartments/contact-2.jpg"  class=" img-fluid h-100 contact-img" alt="">
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="scss">
@use '../styles/generals.scss' as *;

@keyframes spinner-border {
    to {
        transform: rotate(360deg) #{"/* rtl:ignore */"};
    }
}


.cover{
    border-radius:2rem; 
    border:2px solid rgb(64, 64, 66);
     width:100% ;
     height:500px
}

.type-icon{
    width: 2rem;
}

.box img{
	height: 100%;
	width: 100%;
	object-fit:cover;
	-o-object-fit:cover;
}

.gal-container{
    height: 600px;
    overflow:auto;
    scrollbar-width: none; /* Nasconde la scrollbar standard in Firefox */
    -webkit-scrollbar-width: none; 
}

.gal-container::-webkit-scrollbar {
    display: none; /* Nasconde la scrollbar in Webkit */
}
.apartment-list li{
    min-height: 2.5rem
}

.custom-form{
    border-top:0 !important;
    border-left:0 !important;
    border-right:0 !important;
}

.contact-img{
    border-radius:0.3rem
}


</style>