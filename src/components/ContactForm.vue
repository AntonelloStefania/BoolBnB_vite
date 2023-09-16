<script>
import axios from 'axios';
import { store } from '../store';
import AppLoader from './AppLoader.vue';

export default {
    name: 'ContactForm',
    components: {
        AppLoader
    },
    data() {
        return {
            store,
            loading: false,
            name: '',
            email: '',
            content: '',
            success: false,
            errors: {}
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

            this.errors = {};

            axios.post(`${this.store.baseUrl}/api/contacts`, data).then((response) => {
                this.success = response.data.success;

                if (!this.success) {
                    this.errors = response.data.errors;
                }
                else {
                    this.name = '';
                    this.email = '';
                    this.content = '';

                    this.$router.push({ name: 'thank-you' });
                }

                this.loading = false
            });
        }
    }
}
</script>

<template lang="">
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>CONTATTACI</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <form @submit.prevent="sendForm()" class="row">
                        <div class="col-12 col-md-4">
                            <label class="control-label">Nome e Cognome</label>
                            <input type="text" name="name" id="name" v-model="name" placeholder="Inserisci Nome e Cognome" class="form-control" :class="errors.name ? 'is-invalid' : '' ">
                            <p v-for="(error, index) in errors.name" :key="index" class="text-danger">
                                {{ error }}
                            </p>
                        </div>
                        <div class="col-12 col-md-4">
                            <label class="control-label">Email</label>
                            <input type="mail" name="email" id="email" v-model="email" placeholder="Inserisci la tua email" class="form-control" :class="errors.email ? 'is-invalid' : '' ">
                            <p v-for="(error, index) in errors.email" :key="index" class="text-danger">
                                {{ error }}
                            </p>
                        </div>
                        <div class="col-12 col-md-4">
                            <label class="control-label">Content</label>
                            <textarea class="form-control" name="content" id="content" v-model="content" placeholder="Inserisci il tuo messaggio" :class="errors.content ? 'is-invalid' : '' "></textarea>
                            <p v-for="(error, index) in errors.content" :key="index" class="text-danger">
                                {{ error }}
                            </p>
                        </div>
                        <div class="col-12 mt-3">
                            <button class="btn btn-sm btn-success" type="submit" :disabled="loading">{{ loading ? 'Invio email in corso' : 'Invia' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="">
    
</style>