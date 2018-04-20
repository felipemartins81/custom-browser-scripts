function setFavicon() {
   setTimeout(function() {
      var favicon = 'https://cdn3.iconfinder.com/data/icons/science-v2/32/beaker-512.png';
      document.querySelector('[rel=icon]').href = favicon;
   }, 1000);
 }
 
 
function init() {
   setFavicon();
}
 
init();
 
setTimeout(function() {
   setFavicon();
}, 1000);