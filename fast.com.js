
// set your connection speed here
const myConnectionMbs = 35;

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
             backgroundColor: list.map(e => e.speed.split(' ')[0] >= myConnectionMbs ? 'rgba(0, 150, 0, 0.7)' : 'rgba(255, 0, 0, 0.5)'),
             borderColor: 'rgba(0, 0, 0, 1)',
             data: list.map(e => e.speed.split(' ')[0]).slice((list.length - dataAmount), list.length)
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
    ls.history.push({"speed": speed +' '+ units, "time": d });
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
