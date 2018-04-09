var portal = '/job/Portal/';
var frontV1 = portal + 'job/Portal-Frontend/';
var frontV2 = portal + 'job/MKTP-Front/';
var frontV3 = portal + 'job/mktp-front-ng/';
var releaseV1 = frontV1 +'job/release/';
var releaseV2 = frontV2 +'job/release/';
var releaseV3 = frontV3 +'job/release/';
var masterV1  = frontV1 +'job/master/';
var masterV2  = frontV2 +'job/master/';
var masterV3  = frontV3 +'job/master/';
var deploys   = portal + 'job/Deploy/';
var deployUrl      = deploys + 'job/';
var deployHmlList  = deployUrl + 'Homologa%C3%A7%C3%A3o/';
var deployProdList = deployUrl + 'Prod/';
var iconYellowBall = '<img src="/static/d38f3056/images/32x32/yellow.png">';

function setGridFavoritesOpacity() { 
  switch (window.location.pathname) {
    case portal:
    case frontV1:
    case frontV2:
    case frontV3:
    case deploys:
    case deployHmlList:
    case deployProdList:
      jQuery('.icon-fav-inactive').parents('tr').css('opacity','0.2');
      return;
  }
}

function makeLinkToDeploy() { 
  jQuery('#linkToDeploy').remove();
    
  if (jQuery('.progress-bar')[0] !== undefined) { return }
  
  var deployUrl = deploys + 'job/';
  var lastBuild = '';
  var server = '';
  var environment = '';
  
  switch (window.location.pathname) {
    case releaseV1:
      server = 'Homologa%C3%A7%C3%A3o';
      environment = 'Frontend';
      break;
    case releaseV2:
      server = 'Homologa%C3%A7%C3%A3o';
      environment = 'Mktp-Front';
      break;
    case releaseV3:
      server = 'Homologa%C3%A7%C3%A3o';
      environment = 'mktp-front-ng';
      break;
    case masterV1:
      server = 'Prod';
      environment = 'Frontend';
      break;
    case masterV2:
      server = 'Prod';
      environment = 'Mktp-Front';
      break;
    case masterV3:
      server = 'Prod';
      environment = 'mktp-front-ng';
      break;
  }
  
  lastBuild = jQuery('.icon-blue').first().parents('.build-icon').next().text();
  deployUrl += server +'/job/'+ environment +'/build?delay=0sec';
  
  if (server === 'Homologa%C3%A7%C3%A3o') {
    deployUrl += '&tag=' + lastBuild; 
  }
  
  jQuery('#pipeline-box h2').append('<a id="linkToDeploy" href="'+ deployUrl +'" style="margin: 0 0 0 200px;"> '+ iconYellowBall +' Fazer Deploy em '+ (server === 'Prod' ? 'Prod' : 'Homol') +' &raquo; '+ lastBuild +' </a>');
}

function getUrlQueryParam() {
  if (window.location.search.includes('tag')) {
    var pos = window.location.search.indexOf('tag');
    var tag = window.location.search.substring(pos + 4);
    jQuery('[value=tag]').next('input').val(tag);
  }
}

// init...

setGridFavoritesOpacity();
getUrlQueryParam();

setInterval(function() {
  makeLinkToDeploy();
}, 2000);
