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

zoneList = document.getElementById('zone');
zoneDefault = zoneList.options[0];

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
