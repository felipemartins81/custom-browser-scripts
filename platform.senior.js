const today = new Date();
const todayBr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
let repeat = setInterval(() => {}, 100);
  
function setUiMessages(domIndex) {
  const msg = document.querySelectorAll('.ui-messages')[domIndex];
  if (!msg) {
    console.info('👀 ~ custom script platform.senior: Nok');
    return;
  }
  clearInterval(repeat);
  console.info('👀 ~ custom script platform.senior: Ok');
  const msgSummary = msg.querySelector('.ui-messages-summary');
  const msgDetail = msg.querySelector('.ui-messages-detail');
  msg.style.width = '49%';
  msg.style.float = 'left';
  msgDetail.textContent = domIndex ? 'SAIDA' : 'ENTRADA';
  msgSummary.style.fontSize = '1.5em';
  msgSummary.textContent = msgSummary.textContent
    .replace('Marcação realizada com sucesso: ', '')
    .replace(todayBr, '')
    .replace(' às ', '');
}

function setMeobileStyles(params) {
  const s = document.createElement('style');
  s.textContent = 'p.ng-star-inserted ~ div div { width: 100% }';
  document.head.append(s);
}
  
function init() {
  console.info('👀 ~ custom script platform.senior: init');
  clearInterval(repeat);
  repeat = setInterval(function() {
    setUiMessages(0);
    setUiMessages(1);
  }, 10000);
}

// init();

setTimeout(() => {
  setMeobileStyles();
  const btn = document.querySelector('.resize-clocking-event-button');
  if (!btn) {
    return;
  }
  btn.addEventListener('click', e => init());
}, 2000);
