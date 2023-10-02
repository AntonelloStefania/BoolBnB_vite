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
              
            ]
        }
    }
}
</script>

<template lang="">
    <nav class="navbar navbar-expand-md pt-4 bg-white mb-5">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center" href="{{ url('/') }}">
                    <div class="logo">
                       <img src="../assets/logo_provvisorio.png" alt="">
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
                        <li  class="mt-2 d-inline d-md-none">
                            <a href="http://127.0.0.1:8000" class="home-text " style="text-decoration:none" >Zona Host</a>
                        </li>
                        <li class="mt-3  d-inline d-md-none">
                             <a href="http://127.0.0.1:8000/login" class="home-text"  style="text-decoration:none">Login</a>
                        </li>
                    </ul>
                </div>
                <div class="d-md-flex d-none ">
                        <div class="me-4 ">
                            <a href="http://127.0.0.1:8000" class="pink-btn" >Zona Host</a>
                        </div>
                        <div class=" ">
                           <span>oppure effettua il</span> <a href="http://127.0.0.1:8000/login" class="login-btn">Login</a>
                        </div>
                    </div>
            </div>
        </nav>
</template>

<style lang="scss">
.logo {
    img {
        width: 8rem;
    }
}

.host-btn {
    background-color: #718dd8;
    text-decoration: none;
    color: white;
    border-radius: 5rem;
    padding: 0.5rem;
    font-weight: bold;
}

.host-btn:hover {
    background-color: #5375d1;
}

.login-btn {
    text-decoration: none;
    color: rgb(110, 109, 109);
    font-weight: bold;
}

.login-btn:hover {
    color: rgb(29, 28, 28)
}
</style>