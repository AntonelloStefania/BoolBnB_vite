
<template lang="">
<footer id="footer-large">
		
	<div class="footer-container">
		
		<div class="footer-informazioni">
		 <div>
            <h2>BoolBnB</h2>
        </div>
			
		  <p class="margin-bot-15px descrizione">I valori fondamentali di BoolBnB includono l'eccellenza nell'ospitalità, la soddisfazione del cliente e la trasparenza. BoolBnB si impegna a offrire servizi di alta qualità e alloggi ben curati per garantire un'esperienza memorabile ai suoi ospiti. La compagnia promuove la fiducia attraverso recensioni autentiche e una comunicazione aperta. Inoltre, BoolBnB abbraccia la diversità e promuove la connessione tra culture, offrendo alloggi unici in tutto il mondo per un'esperienza autentica e stimolante. 
			</p>
			
		
		</div>	
		
		<div class="footer-menu">
		<div class="menu-footer descrizione"><ul id="menu-menu-footer" class="menu">
    	<li><a href="#">Homepage</a></li>
		<li><a href="#">Appartamenti</a></li>
		<li><a href="#">Vetrina</a></li>
		<li><a href="#">Sponsorizzazioni</a></li>
		<li><a href="#">Profilo</a></li>
		</ul></div> <!-- Footer Menu -->
		</div>
		
		<div class="footer-contatti">
			
		<div class="descrizione color-secondary">Contatti</div>
		<p class="descrizione">Tel: +39 0584 000000<br/>
		Email: <a href="#">info@info.com</a><br/>
		Indirizzo: via Roma 111, Pietrasanta (LU), Italia.<br/>
        </p>
			
		<div class="social-cont">        
		<ul class="social-list">

		<li class="trans-color"><a target="_blank" href="#"><img src="https://www.chefstudio.it/img/facebook-icon.png"  title="facebook" alt="Facebook icon"><br></a></li>
		<li class="trans-color"><a target="_blank" href="#"><img src="https://www.chefstudio.it/img/instagram-icon.png" title="Instagram" alt="Instagram icon"><br></a></li>
		<li class="trans-color"><a target="_blank" href="#"><img src="https://www.chefstudio.it/img/pinterest-icon.png" title="pinterest" alt="Instagram icon"><br></a></li>

		</ul>
    	<div class="floatstop"></div>
		</div><!--/fine social cont-->
			
		</div>
		


		<div class="floatstop"></div>
		
		<div class="avvertenze-legali">
		<p>
		Informazioni legali | I testi, le informazioni e gli altri dati pubblicati in questo sito nonché i link ad altri siti presenti sul web hanno esclusivamente scopo informativo e non assumono alcun carattere di ufficialità. Non assume alcuna responsabilità per eventuali errori od omissioni di qualsiasi tipo e per qualunque tipo di danno diretto, indiretto o accidentale derivante dalla lettura o dall'impiego delle informazioni pubblicate, o di qualsiasi forma di contenuto presente nel sito o per l'accesso o l'uso del materiale contenuto in altri siti.
		</p>
		</div>			
		
			
	
</div> <!--/fine footer container -->
	
</footer>
</template>

<style lang="scss">
/* FOOTER */
@charset "utf-8";

/* -------------reset----------------*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}

input:focus, button:focus {outline:0;}

img {
    vertical-align: middle;
}

a{
	text-decoration:none;
}

p{
	margin-bottom:12px;
}

ul li{ 
	list-style:none;
}

html,body{
	color:#666 /*color-text*/;
	height:100%;
	width:100%;
}

h1{
	font-size: 1.5em;
	text-align:left;
	font-weight: bold;
	color:#718dd8/* primary color*/;
}

/* -----------------contenitore e contenuto ------------------ */

.descrizione{
    font-size: 0.9rem;
}

.contenitore .contenuto{
	max-width:1200px;
	margin:auto;
	padding: 70px 10px;
	padding-bottom: 70px;
}

/* -----------------footer html-----------------*/
#footer-large{
    margin-top: 20px;
}

#footer-large a{
	color:white; /* seconday color*/
}

#footer-large a:hover{
	color:#ebb098; /* light seconday color*/	
}

#footer-large .credits {
	max-width:300px;
	margin:auto;
}

#footer-large .credits a img {
  -o-transition: opacity .2 ease-in;
  -ms-transition: opacity .2s ease-in;
  -moz-transition: opacity .2s ease-in;
  -webkit-transition: opacity .2s ease-in;
  transition: opacity .2s ease
}

#footer-large .credits a img:hover {
	opacity:0.6;
}

#footer-large .social-cont .social-list {
	list-style-type: none;
	margin: 0 auto;
	padding: 10px 0;
}

#footer-large .social-cont .social-list > li {
	margin: 8px 8px 8px 0;
	display: inline-block;
	vertical-align: top;
	height: 32px;
	width: 32px;
	border-radius: 6em;
	background-color:#ebb098; /* secondary-color*/
}

#footer-large .social-cont .social-list li img {
	width: 32px
}

#footer-large .social-cont .social-list > li:hover {
background:#718dd8; /* light seconday color*/		
}

/* -----------------footer-large------------------ */
#footer-large{
	width: 100%;
	border-top: 1px solid #718dd8;
	padding-top: 20px;
	background-color: #718dd8;/* primary color*/
	color: #fff;
}

#footer-large p{
	line-height: normal;
}

#footer-large .footer-informazioni{
	padding: 0 0 15px 0;
	border-bottom: 1px solid #718dd8;
	border-left: 10px solid #718dd8;
    border-right: 10px solid #718dd8;/* primary color*/
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
	border-top: 1px solid #718dd8;
}

#footer-large .footer-menu{
	padding: 15px 0;
	border-bottom: 1px solid #ebb098;
		border-left: 10px solid #718dd8;/* primary color*/
    border-right: 10px solid #718dd8;/* primary color*/
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
	line-height: 1.5em;
	
}

#footer-large .footer-contatti{
	padding: 15px 0;
	border-left: 10px solid #718dd8;/* primary color*/
    border-right: 10px solid #718dd8;/* primary color*/
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}

.avvertenze-legali p {
    font-size: 12px;
    line-height: 18px;
    margin: 10px 10px 0 10px;
    text-align: justify;
    border-top: 1px solid #e49c96; /* light seconday color*/;
    padding: 26px 0;
	border-bottom: 1px solid #e49c96;
	display: inline-block;
}

.credits {
	text-align: center;
    padding-top: 24px;
    padding-bottom: 50px;
    font-size: 14px;
}
	
@media screen and (min-width: 672px){

#footer-large .footer-informazioni{
	padding: 0 0 15px 0;
	border-bottom: none;
	border-left: 10px solid #718dd8;
    border-right: 10px solid #718dd8;/* primary color*/
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}
	
#footer-large{
	display:inline-block;	
}
	
#footer-large .footer-menu{
	width: 50%;
	float: left;
	border-bottom: none;
	border-top: 1px solid #718dd8;
}

#footer-large .footer-contatti{
	width: 50%;
	float: left;
	border-bottom: none;
	border-top: 1px solid #718dd8;
}
	
}

@media screen and (min-width: 1280px){
	
#footer-large{
	display:inline-block;
}
	
#footer-large .footer-container{
		max-width: 1300px;
		margin: auto;
}

#footer-large .footer-informazioni{
	width: 50%;
	float: left;
	border-bottom: none;
}

#footer-large .footer-menu{
	width: 25%;
	float: left;
}

#footer-large .footer-contatti{
	width: 25%;
	float: left;
}
	
}

</style>