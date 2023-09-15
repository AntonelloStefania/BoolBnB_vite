<script>
 import tt from '@tomtom-international/web-sdk-maps';
 import axios from 'axios';
 import { store } from '../store.js';
 
export default {
    data() {
        return {
            store,
            map: null,
            // markers: [], 
        }
    },mounted() {
    this.map = tt.map({
     key: 'pruT4ZbhTCbcbd4UFMsaSXOtid8tG2po',
     container: 'map'
    });

    this.map.setCenter([15.7711,41.82598]); // Sostituisci con le coordinate desiderate
    this.map.setZoom(5); //zoom
    
    
    axios.get(`${this.store.baseUrl}/api/coordinate-apartments`)
      
    .then((response) => {
    const coordinate = response.data;
    console.log(coordinate)
     coordinate.forEach((coords) => {
       const lat = parseFloat(coords.lat);
       const lon = parseFloat(coords.lon);   
       
    console.log(coordinate)
       if (!isNaN(lat) && !isNaN(lon)) {
         new tt.Marker().setLngLat([lon, lat]).addTo(this.map); //<---------------------NON FUNZIONA
         console.log(setLngLat([lon,lat]))
       }
     });
  })


}

    
    
}
</script>

<template lang="">
    <div style="width: 100%; height: 400px; margin: 0; padding: 0;">
        <div id="map" style="width: 100%; height: 400px;"></div>
    </div>
</template>

<style lang="scss">
    
</style>