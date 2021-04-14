var startDatePicker = new tui.DatePicker('#startWrap', {
    date: new Date(document.getElementById('start').value),
    input: {
        element: '#start',
        format: 'yyyy-MM-dd hh:mm'
    },
    timePicker: {
      inputType: 'spinbox'
    }
});

var endDatePicker = new tui.DatePicker('#endWrap', {
    date: new Date(document.getElementById('end').value),
    input: {
        element: '#end',
        format: 'yyyy-MM-dd hh:mm'
    },
    timePicker: {
      inputType: 'spinbox'
    }
});

var eventList = JSON.parse($("#events").val());

var titleList = document.getElementById('titleList');
var titleMap  = {}
eventList.forEach(function(event) {
  if (event["Title"] !== "" && titleMap[event["Title"]] == null) {
    var opt = document.createElement('option');
    opt.value     = event["Title"];
    opt.innerHTML = event["Title"];
    titleList.appendChild(opt);
    titleMap[event["Title"]] = true;
  }
});

var categoryList = document.getElementById('categoryList');
var categoryMap  = {}
eventList.forEach(function(event) {
  if (event["Category"] !== "" && categoryMap[event["Category"]] == null) {
    var opt = document.createElement('option');
    opt.value     = event["Category"];
    opt.innerHTML = event["Category"];
    categoryList.appendChild(opt);
    categoryMap[event["Category"]] = true;
  }
});

var hostList = document.getElementById('hostList');
var hostMap  = {}
eventList.forEach(function(event) {
  if (event["Host"] !== "" && hostMap[event["Host"]] == null) {
    var opt = document.createElement('option');
    opt.value     = event["Host"];
    opt.innerHTML = event["Host"];
    hostList.appendChild(opt);
    hostMap[event["Host"]] = true;
  }
});

var logoList = document.getElementById('logoList');
var logoMap  = {}
eventList.forEach(function(event) {
  if (event["Logo"] !== "" && logoMap[event["Logo"]] == null) {
    var opt = document.createElement('option');
    opt.value     = event["Logo"];
    opt.innerHTML = event["Logo"];
    logoList.appendChild(opt);
    logoMap[event["Logo"]] = true;
  }
});

var zoneList = document.getElementById('zone');
var zoneDefault = zoneList.options[0];
if (zoneDefault.innerHTML === "") {
  var opt = document.createElement('option');
  opt.value     = moment.tz.guess();
  opt.innerHTML = moment.tz.guess();
  zoneList.appendChild(opt);
}
moment.tz.names().forEach(function(tzname) {
  var opt = document.createElement('option');
  opt.value     = tzname;
  opt.innerHTML = tzname;
  zoneList.appendChild(opt);
});

var locationList = document.getElementById('locationList');
var locationMap  = {}
eventList.forEach(function(event) {
  if (event["Location"] !== "" && locationMap[event["Location"]] == null) {
    var opt = document.createElement('option');
    opt.value     = event["Location"];
    opt.innerHTML = event["Location"];
    locationList.appendChild(opt);
    locationMap[event["Location"]] = true;
  }
});

if ($('#logoURL')[0].value === "") {
  $('#logoImage').css({'display': 'none'});
}

function updateLogo() {
  $('#logoImage').css({'display': 'block'});
  $('#logoImage').attr({'src': $('#logoURL')[0].value});
}

function uploadLogo() {
  window.open('/calendar/upload','_blank');
}
