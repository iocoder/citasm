'use strict';

/* eslint-disable */
/* eslint-env jquery */
/* global moment, tui, chance */
/* global findCalendar, CalendarList, ScheduleList, generateSchedule */

var cal;

var colors = [
  {fgColor: '#000000', bgColor: '#bbdc00'},
  {fgColor: '#ffffff', bgColor: '#03bd9e'},
  {fgColor: '#000000', bgColor: '#ff5583'},
  {fgColor: '#ffffff', bgColor: '#00a9ff'},
  {fgColor: '#ffffff', bgColor: '#9e5fff'},
  {fgColor: '#000000', bgColor: '#9d9d9d'},
  {fgColor: '#ffffff', bgColor: '#ffbb3b'}
];

var eventList    = [];
var calendarList = [];
var scheduleList = [];

function generateEvents() {
  eventList = JSON.parse($("#events").val());
}

function generateCalendars() {
  var calendarMap = {};
  var currentId = 0;
  eventList.forEach(function(event) {
    if (event['ID'] !== '0' && event['Status'] === 'Active') {
      if (calendarMap[event["Category"]] == null) {
        var color = colors[currentId % 7].fgColor;
        var bgColor = colors[currentId % 7].bgColor;
        var calendarId = String(++currentId);
        var calendar = {
          id: calendarId,
          name: event["Category"],
          color: color,
          bgColor: bgColor,
          borderColor: '#8080e0'
        };
      } else {
        calendar = calendarMap[event["Category"]];
      }
      calendarList.push(calendar);
      calendarMap[event["Category"]] = calendar;
      event["Calendar"] = calendar;
    }
  });
}

function generateSchedules() {
  eventList.forEach(function(event) {
    if (event['ID'] !== '0' && event['Status'] === 'Active') {
      var schedule = {
        id: event["ID"],
        calendarId: event["Calendar"].id,
        category: 'time',
        title: event["Title"],
        body: event["Description"],
        start: moment.tz(event["Start"], event["Zone"]).format(),
        end: moment.tz(event["End"], event["Zone"]).format(),
        dueDateClass: '',
        location: "Some location",
        state: "Free"
      };
      scheduleList.push(schedule);
    }
  });
}

function onClickSchedule(event) {
  window.location.href = "/calendar/view?id=" + event.schedule.id;
}

function onClickCreateEvent(event) {
  window.location.href = "/calendar/new";
}

function onClickDownloadCSV(event) {
  window.location.href = "/csv/events.csv";
}

function onClickMovePrev(e) {
  cal.prev();
  updateCalendarLabels();
}

function onClickMoveNext(e) {
  cal.next();
  updateCalendarLabels();
}

function onClickTypeDaily(e) {
  cal.changeView('day', true);
  updateCalendarLabels();
}

function onClickTypeWeekly(e) {
  cal.changeView('week', true);
  updateCalendarLabels();
}

function onClickTypeMonthly(e) {
  cal.changeView('month', true);
  updateCalendarLabels();
}

function onWinResize() {
  cal.render();
  updateCalendarOffsets();
  updateCalendarLabels();
}

function updateCalendarOffsets() {
  var navBar = $('.navbar');

  var calendarTitle = $('#calendarTitle');
  var calendarMenu = $('#calendarMenu');
  var calendarNavigator = $('#calendarNavigator');

  var titleText;
  if (window.innerWidth < 450) {
    titleText = "CA Calendar";
  } else {
    titleText = "Citizen Assembly Calendar";
  }
  $('#calendarTitle').children('span')[0].innerHTML = titleText;

  if (window.innerWidth < 600) {
    calendarTitle.css('padding-top', '1rem');
    calendarTitle.css('padding-bottom', '0rem');
  } else {
    calendarTitle.css('padding-top', '3rem');
    calendarTitle.css('padding-bottom', '2rem');
  }

  var navHeight = navBar.outerHeight();
  var titleHeight = calendarTitle.outerHeight();
  var menuHeight = calendarMenu.outerHeight();

  calendarTitle.css('top', navHeight);
  calendarMenu.css('top', navHeight + titleHeight);
  calendarNavigator.css('top', navHeight + titleHeight + menuHeight);
}

function updateCalendarLabels() {
  var prevLabel  = document.getElementById('prevLabel');
  var nextLabel  = document.getElementById('nextLabel');
  var monthLabel = document.getElementById('monthLabel');

  var curDay     = cal.getDate().getTime();
  var rangeStart = cal.getDateRangeStart().getTime();
  var rangeEnd   = cal.getDateRangeEnd().getTime();

  var curDayText     = moment(curDay).format("MMMM, YYYY");
  var rangeStartText = moment(rangeStart).format("MMMM, YYYY");
  var rangeEndText   = moment(rangeEnd).format("MMMM, YYYY");

  var prevWord = window.innerWidth < 400 ? '' : 'Prev ';
  var nextWord = window.innerWidth < 400 ? '' : 'Next ';

  if (cal.getViewName() === 'day') {
    prevLabel.innerHTML  = prevWord + 'Day';
    nextLabel.innerHTML  = nextWord + 'Day';
    monthLabel.innerHTML = curDayText;
  } else if (cal.getViewName() === 'week') {
    prevLabel.innerHTML  = prevWord + 'Week';
    nextLabel.innerHTML  = nextWord + 'Week';
    if (rangeStartText === rangeEndText) {
      monthLabel.innerHTML = rangeStartText;
    } else {
      monthLabel.innerHTML = rangeStartText + " - " + rangeEndText;
    }
  } else if (cal.getViewName() === 'month') {
    prevLabel.innerHTML  = prevWord + 'Month';
    nextLabel.innerHTML  = nextWord + 'Month';
    monthLabel.innerHTML = curDayText;
  }

}

function filterSchedules(schedule) {
  var scheduleTime = schedule.start.getTime();
  var calendarTime = cal.getDate().getTime();

  var scheduleMonth = moment(scheduleTime).format("MMMM");
  var calendarMonth = moment(calendarTime).format("MMMM");

  return scheduleMonth === calendarMonth;
}

function calendarInit() {
  var defaultView;

  generateEvents();
  generateCalendars();
  generateSchedules();

  if (window.innerWidth < 700) {
    defaultView = 'day';
  } else {
    defaultView = 'week';
  }

  cal = new tui.Calendar('#calendar', {
      defaultView: defaultView,
      useCreationPopup: false,
      useDetailPopup: false,
      calendars: calendarList,
      taskView: [],
      scheduleView: ['time'],
      isReadOnly: true,
      month: {scheduleFilter: filterSchedules},
  });

  cal.createSchedules(scheduleList);

  cal.on('clickSchedule', onClickSchedule);

  $('#createEvent').on('click', onClickCreateEvent);
  $('#downloadCSV').on('click', onClickDownloadCSV);

  $('#calendarTypeDaily').on('click', onClickTypeDaily);
  $('#calendarTypeWeekly').on('click', onClickTypeWeekly);
  $('#calendarTypeMonthly').on('click', onClickTypeMonthly);

  $('#movePrev').on('click', onClickMovePrev);
  $('#moveNext').on('click', onClickMoveNext);

  window.addEventListener('resize', tui.util.throttle(onWinResize,50));
  window.cal = cal;

  updateCalendarOffsets();
  updateCalendarLabels();
}

calendarInit();
