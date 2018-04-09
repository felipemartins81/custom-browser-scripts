var portal = '/job/Portal/';
var deployUrl = portal + 'job/Deploy/job/';
var frontV1 = portal + 'job/Portal-Frontend/';
var frontV2 = portal + 'job/MKTP-Front/';
var frontV3 = portal + 'job/mktp-front-ng/';
var releaseV1 = frontV1 +'job/release/';
var releaseV2 = frontV2 +'job/release/';
var releaseV3 = frontV3 +'job/release/';

// less opacity for non favorites
switch (window.location.pathname) {
  case portal:
  case frontV1:
  case frontV2:
  case frontV3:
    jQuery('.icon-fav-inactive').parents('tr').css('opacity','0.2');
    return;
}

// check deploy urls
if (window.location.search.includes('tag')) {
  var pos = window.location.search.indexOf('tag');
  var tag = window.location.search.substring(pos + 4);
  jQuery('[value=tag]').next('input').val(tag);
  console.warn(window.location.search.substring(pos + 4));
}

// check build urls
switch (window.location.pathname) {
  case releaseV1:
    deployUrl += 'Homologa%C3%A7%C3%A3o/job/Frontend/build?delay=0sec';
    break;
  case releaseV2:
    deployUrl += 'Homologa%C3%A7%C3%A3o/job/Mktp-Front/build?delay=0sec';
    break;
  case releaseV3:
    deployUrl += 'Homologa%C3%A7%C3%A3o/job/mktp-front-ng/build?delay=0sec';
    break;
  default:
    return;
}


// wait 10s
setTimeout(function() { 
  // loop each 2s
  var interval = setInterval(function() { 
    console.log('custom script: checking build status...');
    
    // check build succes class
    // if ( jQuery('.time-remaining')[0] !== undefined  ) { return }
    if ( !jQuery('.job .stage-cell-3').first().hasClass('SUCCESS') && jQuery('.time-remaining')[0] !== undefined  ) { return }
    
    console.log('custom script: yep, build finished!..');
    
    // get last build name
    var lastBuild = jQuery('.icon-blue').first().parents('.build-icon').next().text();
    deployUrl += '&tag=' + lastBuild; 
    console.table({ 'lastBuild': lastBuild });
    
    // append link
    jQuery('#pipeline-box h2').append('<a href="'+ deployUrl +'" style="margin: 0 0 0 200px;"> <img src="/static/d38f3056/images/32x32/yellow.png"> Fazer Deploy em Hml &raquo; <i id="lastBuild"></i> </a>');
    
    jQuery('#lastBuild').append( lastBuild );
    
    // clear interval
    setTimeout(function(){
      if ( jQuery('#lastBuild').text() !== "" ) {
        console.log('custom script: done, stoping loop...');
        clearInterval( interval );
      }
    }, 500);
    
  }, 2000);
}, 10000);
