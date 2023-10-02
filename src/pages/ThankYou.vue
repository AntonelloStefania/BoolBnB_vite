<script>
export default {
    name: 'ThankYou'
}
</script>

<template lang="">
    <div class="container-fluid navbar-container">
    <div class="row justify-content-between w-100">
        <div class="d-flex col-6 justify-content-center">
            <div class="col-6  py-3 d-flex  justify-content-center">
                <router-link :to="{ name: 'home' }" class=" d-flex align-items-center fw-bold" style="text-decoration: none; color: #3a537e;">
                    <div class="col-auto">
                        <i class="fa-regular fa-circle-left me-2" style="color: #3a537e;"></i>
                    </div>
                    <div class="col">
                        <span>In Evidenza</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
    <div class="container-fluid bg-beige">
       
        <div class="container">
            <div class="row  mb-3 p-2">
                <div class="col-12 my-5">
                    <h1 class="text-center">Grazie per averci contattato tramite <span class="brand">BoolBnB</span></h1>
                </div>
                <div class="col-12 text-center">
                    <p>
                        Siamo felici di averti tra i nostri utenti su BoolBnB e di averti visto interessato a uno dei nostri appartamenti. Abbiamo ricevuto il tuo messaggio e ti ringraziamo per aver contattato l'host tramite la nostra piattaforma.
                    </p>
                    <p>
                        L'host è stato informato della tua richiesta e delle tue domande e si prenderà cura di rispondere nel più breve tempo possibile. Nel frattempo, se hai ulteriori domande o necessiti di assistenza, non esitare a contattarci direttamente tramite il nostro servizio clienti.
                    </p>
                </div>
            </div>
        </div>
   
    </div>
    <div class="container my-5">
        <div class="row">
            <div class="col-12 text-center">
                <p>
                     Speriamo che tu possa trovare l'alloggio perfetto per le tue esigenze e che il tuo soggiorno su <span class="brand">BoolBnB</span> sia piacevole e soddisfacente.
                 </p>
            </div>
            <div class="col-12 text-end my-5">
                Cordiali saluti, <br>

                Il Team di <span class="brand">BoolBnB</span>
            </div>
        </div>
        
    </div>
</template>

<style lang="">
    
</style>