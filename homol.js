function setFavicon() {
   setTimeout(function() {
      var favicon = 'https://cdn3.iconfinder.com/data/icons/science-v2/32/beaker-512.png';
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