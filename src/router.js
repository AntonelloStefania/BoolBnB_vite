import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import ApartmentList from './pages/ApartmentList.vue';
import SingleApartment from './pages/SingleApartment.vue';
import ContactUs from './pages/ContactUs.vue';
// import ThankYou from './pages/ThankYou.vue';
import NotFound from './pages/NotFound.vue';
import Map from './components/Map.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/blog',
            name: 'apartments',
            component: ApartmentList
        },
        {
            path: '/blog/:slug',
            name: 'single-apartment',
            component: SingleApartment
        },
        {
            path: '/contact-us',
            name: 'contact-us',
            component: ContactUs
        },
        {
            path: '/coordinate-apartments',
            name: 'coordinate-apartments',
            component: Map,
        },
        // {
        //     path: '/thank-you',
        //     name: 'thank-you',
        //     component: ThankYou
        // },
        {
            path: '/pagina-non-trovata',
            name: 'not-found',
            component: NotFound
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/pagina-non-trovata'
        }
    ]
});

export { router }