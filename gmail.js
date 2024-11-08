function setTabs() {
   const tabList = document.querySelector('table tr[role="tablist"]');
   const td = document.createElement('td');
   const div = document.createElement('div');
   const tabText = document.createTextNode('new tab');
   div.appendChild(tabText);
   td.appendChild(div);
   tabList.appendChild(td);
}

function setStyles() {
   const tabs = document.querySelectorAll('table tr[role="tablist"] td');
   tabs.forEach(e => e.style.width = 'auto');
   const tabsInner = document.querySelectorAll('table tr[role="tablist"] td > div');
   tabsInner.forEach(e => e.style.width = 'auto');
}
 
 
function init() {
   setTabs();
   setStyles();
}
 
setTimeout(function() {
   init();
}, 1000);