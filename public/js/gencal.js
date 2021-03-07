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
    if (event['Status'] === 'Active') {
      if (calendarMap[event["Calendar"]] == null) {
        var color = colors[currentId % 7].fgColor;
        var bgColor = colors[currentId % 7].bgColor;
        var calendarId = String(++currentId);
        var calendar = {
          id: calendarId,
          name: event["Calendar"],
          color: color,
          bgColor: bgColor,
          borderColor: '#8080e0'
        };
      } else {
        calendar = calendarMap[event["Calendar"]];
      }
      calendarList.push(calendar);
      calendarMap[event["Calendar"]] = calendar;
      event['Calendar'] = calendar;
    }
  });
}

function generateSchedules() {
  eventList.forEach(function(event) {
    if (event['Status'] === 'Active') {
      var schedule = {
        id: event["ID"],
        calendarId: event["Calendar"].id,
        category: 'time',
        title: event["Title"],
        body: event["Description"],
        start: new Date(event["Start"]),
        end: new Date(event["End"]),
        dueDateClass: '',
        location: "Some location",
        state: "Free"
      };
      scheduleList.push(schedule);
    }
  });
}

function onClickMovePrev(e) {
  cal.prev();
  updateRangeText();
}

function onClickMoveToday(e) {
  cal.today();
  updateRangeText();
}

function onClickMoveNext(e) {
  cal.next();
  updateRangeText();
}

function onClickTypeDaily(e) {
  cal.changeView('day', true);
  updateCalendarType();
  updateRangeText();
}

function onClickTypeWeekly(e) {
  cal.changeView('week', true);
  updateCalendarType();
  updateRangeText();
}

function onClickTypeMonthly(e) {
  cal.changeView('month', true);
  updateCalendarType();
  updateRangeText();
}

function onWinResize() {
  cal.render();
}

function updateCalendarType() {
  if (cal.getViewName() === 'day') {
    document.getElementById('moveToday').innerHTML = 'Today';
  } else if (cal.getViewName() === 'week') {
    document.getElementById('moveToday').innerHTML = 'This Week';
  } else if (cal.getViewName() === 'month') {
    document.getElementById('moveToday').innerHTML = 'This Month';
  }
}

function updateRangeText() {
    var renderRange = document.getElementById('renderRange');
    var options = cal.getOptions();
    var viewName = cal.getViewName();
    var currentDate = moment([cal.getDate().getFullYear(),
                              cal.getDate().getMonth(),
                              cal.getDate().getDate()]);

    var html = [];
    if (viewName === 'day') {
        html.push(currentDate.format('DD/MM/YYYY'));
    } else if (viewName === 'month' &&
        (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
        html.push(currentDate.format('MM/YYYY'));
    } else {
        html.push(moment(cal.getDateRangeStart().getTime()).format('DD/MM/YYYY'));
        html.push(' to ');
        html.push(moment(cal.getDateRangeEnd().getTime()).format('DD/MM/YYYY'));
    }
    renderRange.innerHTML = html.join('');
}

function calendarInit() {
  generateEvents();
  generateCalendars();
  generateSchedules();
  console.log(calendarList);
  console.log(scheduleList);

  cal = new tui.Calendar('#calendar', {
      defaultView: 'week',
      useCreationPopup: false,
      useDetailPopup: false,
      calendars: calendarList,
      taskView: [],
      scheduleView: ['time'],
      isReadOnly: true
  });

  cal.createSchedules(scheduleList);

  $('#movePrev').on('click', onClickMovePrev);
  $('#moveToday').on('click', onClickMoveToday);
  $('#moveNext').on('click', onClickMoveNext);

  $('#calendarTypeDaily').on('click', onClickTypeDaily);
  $('#calendarTypeWeekly').on('click', onClickTypeWeekly);
  $('#calendarTypeMonthly').on('click', onClickTypeMonthly);

  window.addEventListener('resize', tui.util.throttle(onWinResize,50));
  window.cal = cal;

  updateCalendarType();
  updateRangeText();
}

calendarInit();
