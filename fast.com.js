
// set your connection speed here
const myConnectionMbs = 50;

const head = document.getElementsByTagName('head')[0];
const script1 = document.createElement('script');
script1.src = 'https://cdn.jsdelivr.net/npm/chart.js@2.9.3';
head.appendChild(script1);

const body = document.getElementsByTagName('body')[0];
const container = document.getElementsByClassName('speed-controls-container')[0];
const canvas = document.createElement('canvas');
canvas.id = 'chart';
container.appendChild(canvas);

let chart = null;
const ctx = document.getElementById('chart').getContext('2d');
const dataAmount = 100;

function setChart(list) {
  const chartObj = {
    type: 'bar',
    data: {
       labels: list.map(e => e.time && e.time.substring(5,16).replace("T"," ")).slice((list.length - dataAmount), list.length),
       datasets: [   
          {
             type: 'line',
             backgroundColor: 'rgba(0, 0, 0, 0.1)',
             borderColor: 'rgba(0, 0, 0, 0.2)',
             data: list.map(e => myConnectionMbs).slice((list.length - dataAmount), list.length)
          },
          {
             type: 'bar',
             backgroundColor: list.map(e => getBarColor(e)).slice((list.length - dataAmount), list.length),
             borderColor: 'rgba(0, 0, 0, 1)',
             data: list.map(e => getSpeedValue(e)).slice((list.length - dataAmount), list.length)
          }
       ]
    },
    options: {
      legend: {
        display: false
      }
    }
  };
  if (chart) {
    chart.config = chartObj;
    chart.update();
  }
  else {
    chart = new Chart(ctx, chartObj);
  }
}

function getBarColor(bar) {
   if (myConnectionMbs <= getSpeedValue(bar)) {
      return 'rgba(0, 150, 0, 0.7)'; // green
   }
   else if ((1 / (myConnectionMbs / getSpeedValue(bar)) * 100) > 80) {
      return 'rgba(240, 173, 78, 0.8)'; // yellow
   }
   return 'rgba(255, 0, 0, 0.5)'; // red
}

function getSpeedValue(data) {
  const units = data.units || data.speed.split(' ')[1];
  const speedNumber = data.speed.replace(/[^\d.]+/g, '');
  return units && units == 'Kbps' ? ('0.'+ speedNumber) : speedNumber;
}

function init() {
  var min = 1000 * 60;
  var speed = '';
  var units = '';
  var d = new Date();
  var lsName = 'mySpeed';
  var ls = localStorage[lsName] ? JSON.parse(localStorage[lsName]) : { "history":[{"speed":"", "time":""}] };
  setChart(ls.history);
  
  setTimeout(function() {
    console.log('setting title');
    speed = document.getElementById('speed-value').innerText || '';
    units = document.getElementById('speed-units').innerText || '';
    document.querySelector('title').innerText = speed +' '+ units;
  }, min * 1);
  
  setTimeout(function() {
    console.log('setting localStorage');
    ls.history.push({"speed": speed, "units": units, "time": d });
    localStorage.setItem(lsName, JSON.stringify(ls));
    setChart(JSON.parse(localStorage[lsName]).history);
  }, min * 1);
      
  setTimeout(function() {
    window.location.reload();
  }, min * 30);
}

setTimeout(function() {
  init();
}, 500);
