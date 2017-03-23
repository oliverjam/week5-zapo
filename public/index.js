/* eslint-disable */
function updateDOM(dataArr) {
document.getElementById('app').innerHTML='';
  dataArr.forEach(function(obit) {
    var link = createEl('a', 'obit', null, obit.url);
    var title = createEl('h2', 'obit__title', obit.title);
    var summary = createEl('p', 'obit__summary', obit.summary);
    link.appendChild(title);
    link.appendChild(summary);
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
            console.log(data);
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


  document.getElementById('submit').addEventListener('click', function(){
    var month = document.getElementById('month').value;
    var day = document.getElementById('day').value;
    var date = '2017-'+month+'-'+day;
    var url = 'https://frozen-caverns-62155.herokuapp.com/api?q='+ date;
    fetch('GET', url, updateDOM);
  })
