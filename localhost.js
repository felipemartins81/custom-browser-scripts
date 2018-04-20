function setFavicon() {
   setTimeout(function() {
      var favicon = 'https://d30y9cdsu7xlg0.cloudfront.net/png/13694-200.png';
      if ( document.querySelector('[rel="icon"]') ) {
         document.querySelector('[rel="icon"]').href = favicon;
      }
      else {
         document.querySelector('[type="image/x-icon"]').href = favicon;
      }
   }, 1000);
 }
 
 
function init() {
   setFavicon();
}
 
init();