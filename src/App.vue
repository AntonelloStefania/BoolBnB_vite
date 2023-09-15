<script>
import Header from './components/Header.vue';
import Map from './components/Map.vue';
export default {
  components: {
    Header,
    Map
  }
}
</script>

<template>
  <Header />
  <router-view></router-view>
</template>

<style lang="scss">
@use './styles/generals.scss' as *;
</style>
