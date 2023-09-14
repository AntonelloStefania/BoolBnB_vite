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
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <a class="navbar-brand text-primary" href="#">BNB</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                    <div>
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
            </div>
        </nav>
    </div>
</template>

<style lang="">
    
</style>