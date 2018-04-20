var portal = '/job/Portal/';
var jobV1 = 'job/Portal-Frontend/';
var jobV2 = 'job/MKTP-Front/';
var jobV3 = 'job/mktp-front-ng/';
var jobRelease = 'job/release/';
var jobMaster = 'job/master/';
var frontV1 = portal + jobV1;
var frontV2 = portal + jobV2;
var frontV3 = portal + jobV3;
var releaseV1 = frontV1 + jobRelease;
var releaseV2 = frontV2 + jobRelease;
var releaseV3 = frontV3 + jobRelease;
var masterV1  = frontV1 + jobMaster;
var masterV2  = frontV2 + jobMaster;
var masterV3  = frontV3 + jobMaster;
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
  setInterval(function() {
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
  }, 2000);
}

function getUrlQueryParam() {
  if (window.location.search.includes('tag')) {
    var pos = window.location.search.indexOf('tag');
    var tag = window.location.search.substring(pos + 4);
    jQuery('[value=tag]').next('input').val(tag);
  }
}

function showJobsVersions() {
  var style = 'background: #eee; padding: 6px; margin: 0 10px 0 0;';
  jQuery('[href="'+ jobV1 +'"]').parent().prepend('<span style="'+ style +'">v<b>1</b></span>');
  jQuery('[href="'+ jobV2 +'"]').parent().prepend('<span style="'+ style +'">v<b>2</b></span>');
  jQuery('[href="'+ jobV3 +'"]').parent().prepend('<span style="'+ style +'">v<b>3</b></span>');
}

function init() {
  setGridFavoritesOpacity();
  getUrlQueryParam();
  showJobsVersions();
  makeLinkToDeploy();
}

init();
