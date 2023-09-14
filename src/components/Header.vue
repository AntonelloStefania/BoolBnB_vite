<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            menuItems: [
                {
                    label: 'Home',
                    routeName: 'home'
                },
                {
                    label: 'Apartments',
                    routeName: 'apartments'
                },
                {
                    label: 'Contact Us',
                    routeName: 'contact-us'
                },
            ]
        }
    }
}
</script>

<template lang="">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm mb-5">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center" href="{{ url('/') }}">
                    <div class="logo_laravel">
                       
                    </div>
                   
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav">
                        <li class="nav-item" v-for="(item,index) in menuItems" :key="index">
                            <router-link class="nav-link" :to="{ name: item.routeName}" >{{ item.label}}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="d-flex">
                        <div class="me-2">
                            <a href="http://127.0.0.1:8000" >Diventa Host</a>
                        </div>
                        <div>
                            <a href="http://127.0.0.1:8000/admin/apartments" class="">Login</a>
                        </div>
                    </div>
            </div>
        </nav>
</template>

<style lang="">
    
</style>