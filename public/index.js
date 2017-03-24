/* eslint-disable */
function updateDOM(dataArr) {
document.getElementById('app').innerHTML='';
  dataArr.forEach(function(obit) {
    var link = createEl('a', 'obit', null, obit.url);
    var title = createEl('h2', 'obit__title', obit.title);
    var summary = createEl('p', 'obit__summary', obit.summary);
    var date = createEl('p', 'obit__date', obit.date);
    link.appendChild(title);
    link.appendChild(summary);
    link.appendChild(date);
    // container.appendChild(link);
    var app = document.getElementById('app');
    app.appendChild(link);
  })
}

function createEl(element, className, text, url) {
  var el = document.createElement(element);
  el.className = className || '';
  el.textContent = text || '';
  if (url) el.href = url;
  return el;
}

function fetch(method, url, responseCallback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var data = JSON.parse(request.responseText);
            responseCallback(data);
        }
    }
    request.onerror = function() {
        responseCallback('Sorry, connection error');
    }
    request.open(method, url, true);
    request.send();
}

fetch('GET', 'https://frozen-caverns-62155.herokuapp.com/api', updateDOM);

  document.getElementById('submit').addEventListener('click', function() {
       event.preventDefault();
    console.log('hello');
    var url = inputApiCall(makeInputUrl);
    fetch('GET', url, updateDOM);
  });

  function inputApiCall(cb){
   var dateInitial = document.getElementById('date').value.split('-').slice(1,3).join('-');
   var today = new Date();
   var yyyy = today.getFullYear();
   var date = yyyy+'-'+dateInitial;
   var today = new Date().toISOString().slice(0, 10);
   console.log(date);
   if(date > today) {
     date = (yyyy-1)+'-'+dateInitial;
     return cb(date);
   }
   else {
     return cb(date);
   }
}

function makeInputUrl(date, cb) {
  var url = 'https://frozen-caverns-62155.herokuapp.com/api?q='+ date;
  return url;
}
