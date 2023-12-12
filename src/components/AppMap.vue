<script>
import { ref, onMounted } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
 

export default {
  setup() {
    const mapRef = ref(null);

    onMounted(() => {
      const map = tt.map({
        key: 'pruT4ZbhTCbcbd4UFMsaSXOtid8tG2po',
        container: mapRef.value,
        center: [15.7711 ,41.82598],
        zoom: 5,
        // style: 'tomtom://vector/1/basic-main',
      });

      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());
      
      
      axios.get(`http://127.0.0.1:8000/api/coordinate-apartments`)
      
      .then((response)=>{
          const locations = response.data.results;
          console.log(locations)
          locations.forEach((location)=>{
            const lat = parseFloat(location.lat);
            const lon = parseFloat(location.lon)
            const marker = new tt.Marker({ width: 50, height: 50 }).setLngLat(location).addTo(map);
          })

      })
      
      //STILE MARKER
    //   const popupOffset = 50;


    //   marker.getElement().innerHTML = `
    //     <div style="width: 50px; height: 50px; background-color: #fe8376a1; border-radius: 60px 60px 0px 60px; position: relative; transform: rotate(45deg);">
    //       <div class="marker" style="height: 40px; width: 40px; border-radius: 50px 50px 0px 50px; position: absolute; transform: rotate(315deg); background-image: url('../src/assets/img/b-logo.png'); background-size: contain; top: 7%; left: 8%;"></div>
    //     </div>
    //   `;

    //   const popup = new tt.Popup({ offset: popupOffset });
    //   reverseGeocoding(marker, popup);
    //   map.scrollZoom.disable();
    //   marker.setPopup(popup).togglePopup();
    });
 
    //GEOCODING LO TENIAMO CASOMAI SERVE
    // function reverseGeocoding(marker, popup) {
    //   tt.services
    //     .reverseGeocode({
    //       key: 'InserisciQuiLaTuaChiaveAPI',
    //       position: marker.getLngLat(),
    //     })
    //     .then(function (result) {
    //       popup.setHTML(result.addresses[0].address.freeformAddress);
    //     });
    // }

    return {
      mapRef,
    };
  },
};
</script>
<template>
    <body>
        <div style="width: 100%; height: 400px; margin: 0; padding: 0;">
            <div id="map" ref="mapRef" style="width: 100%; height: 400px;">
            </div>
        </div>
    </body>
</template>

<style>
/* Aggiungi eventuali stili CSS personalizzati qui */
</style>