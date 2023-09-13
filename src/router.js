import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import ApartmentList from './pages/ApartmentList.vue';
import TypeList from './pages/TypeList.vue';
import SingleApartment from './pages/SingleApartment.vue';

import ContactUs from './pages/ContactUs.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/apartments',
            name: 'apartments',
            component: ApartmentList
        },
        {
            path: '/single-apartment/:slug',
            name: 'single-apartment',
            component: SingleApartment
        },
        {
            path: '/types',
            name: 'types',
            component: TypeList
        },
        {
            path: '/contact-us',
            name: 'contact-us',
            component: ContactUs
        }
    ]
});

export { router }