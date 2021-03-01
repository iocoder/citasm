'use strict';

/* eslint-disable */
/* eslint-env jquery */
/* global moment, tui, chance */
/* global findCalendar, CalendarList, ScheduleList, generateSchedule */

var cal;

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
  cal = new tui.Calendar('#calendar', {
      defaultView: 'week',
      useCreationPopup: false,
      useDetailPopup: false,
      calendars: CalendarList,
      taskView: [],
      scheduleView: ['time'],
      isReadOnly: true
  });

  generateCalendars();
  generateSchedule(cal.getViewName(),
                   cal.getDateRangeStart(),
                   cal.getDateRangeEnd());

  cal.createSchedules(ScheduleList);

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
