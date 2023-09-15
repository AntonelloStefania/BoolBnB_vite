<script>
 import tt from '@tomtom-international/web-sdk-maps';
export default {
    data() {
        return {
            map: null, 
        }
    },mounted() {
        this.map = tt.map({
     key: '3gixrb8T1tvg0AxLRGVxYkwtVlKmQGvj',
     container: 'map'
    });

    this.map.setCenter([45.55002 , 8.93635]); // Sostituisci con le coordinate desiderate
        //this.map.setZoom(zoomLevel);
    },
    
}
</script>

<template lang="">
    <div style="width: 100%; height: 400px; margin: 0; padding: 0;">
        <div id="map" style="width: 100%; height: 400px;"></div>
    </div>
</template>

<style lang="scss">
    
</style>