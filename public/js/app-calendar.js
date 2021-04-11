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
    if (event['Status'] === 'Active') {
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

function onClickMovePrev(e) {
  cal.prev();
}

function onClickMoveToday(e) {
  cal.today();
}

function onClickMoveNext(e) {
  cal.next();
}

function onClickTypeDaily(e) {
  cal.changeView('day', true);
  updateCalendarType();
}

function onClickTypeWeekly(e) {
  cal.changeView('week', true);
  updateCalendarType();
}

function onClickTypeMonthly(e) {
  cal.changeView('month', true);
  updateCalendarType();
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

function calendarInit() {
  generateEvents();
  generateCalendars();
  generateSchedules();

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

  cal.on('clickSchedule', function(event) {
    window.location.href = "/calendar/view?id=" + event.schedule.id;
  });

  $('#movePrev').on('click', onClickMovePrev);
  $('#moveToday').on('click', onClickMoveToday);
  $('#moveNext').on('click', onClickMoveNext);

  $('#calendarTypeDaily').on('click', onClickTypeDaily);
  $('#calendarTypeWeekly').on('click', onClickTypeWeekly);
  $('#calendarTypeMonthly').on('click', onClickTypeMonthly);

  window.addEventListener('resize', tui.util.throttle(onWinResize,50));
  window.cal = cal;

  updateCalendarType();
}

calendarInit();
