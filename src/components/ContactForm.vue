<script>
import axios from 'axios';
import { store } from '../store.js';
import AppLoader from '../components/AppLoader.vue';
import ThankYou from '../pages/ThankYou.vue';

export default {
    name: "ContactForm",
    components: {
        AppLoader,
        ThankYou
    },
    data() {
        return {
            store,
            name: '',
            email: '',
            content: '',
            success: false,
            errors: {},
            loading: false
        }
    },
    methods: {
        sendForm() {
            this.loading = true;

            const data = {
                name: this.name,
                email: this.email,
                content: this.content
            }

            //PULISCO L'ARRAY DEGLI ERRORI
            this.errors = {};

            axios.post(`${this.store.baseUrl}/api/contacts`, data).then((response) => {
                this.success = response.data.success;
                console.log(response.data)
                if (!this.success) {
                    this.errors = response.data.errors;
                }
                else {
                    //PULISCO I DATI IN INPUT
                    this.name = '';
                    this.email = '';
                    this.content = '';


                    this.$router.push({ name: 'thank-you' })
                }

                this.loading = false
            });
        },
    }
}
</script>
<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 card p-5 my-3">
                    <form @submit.prevent="sendForm()" class="row">
                        <div class="col-12 col-md-6 my-3">
                            <label class="control-label" for="name">Nome e Cognome</label>
                            <input type="text" name="name" id="name" v-model="name" placeholder="Nome e Cognome"
                                class="form-control" :class="errors.name ? 'is-invalid' : ''">
                            <p v-for="(error, index) in errors.name" :key="index" class="text-danger">
                                {{ error }}
                            </p>
                        </div>
                        <div class="col-12 col-md-6 my-3">
                            <label class="control-label" for="email">Email</label>
                            <input type="text" name="email" id="email" v-model="email" placeholder="email@example.com"
                                class="form-control" :class="errors.email ? 'is-invalid' : ''">
                            <p v-for="(error, index) in errors.email" :key="index" class="text-danger">
                                {{ error }}
                            </p>
                        </div>
                        <div class="col-12 col-md-6 my-3">
                            <label class="control-label" for="name">Contenuto</label>
                            <textarea name="content" id="content" v-model="content" placeholder="Contenuto"
                                class="form-control" :class="errors.content ? 'is-invalid' : ''"></textarea>
                            <p v-for="(error, index) in errors.content" :key="index" class="text-danger">
                                {{ error }}
                            </p>
                        </div>
                        <div class="col-12  my-3">
                            <button class="btn btn-sm btn-success" type="submit" :disabled="loading"> {{ this.loading ?
                                "Invio email in corso" : "Invia" }} </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@use '../styles/generals.scss' as *;
</style>