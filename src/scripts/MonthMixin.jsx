'use strict';

const React = require('react');
const moment = require('moment');
const _ = require('lodash');

const WEEKENDS = [0, 6]; // [Su, Sa]


var MonthMixin = {

  momentSetLocale () {
    var localeStr = 'en',
        dow = this.props.firstDayOfWeek % 7,
        weekdaysMin = moment.weekdaysMin();

    weekdaysMin.unshift(...weekdaysMin.splice(dow));

    moment.locale(localeStr, {
      weekdaysMin,
      week: { dow }
    });
  },

  isCurMonth () {
    return this.state.date.isSame(moment({hour: 0}), 'month');
  },

  isToday (date) {
    return date.isSame(moment({hour: 0}), 'day');
  },

  isWeekend (date) {
    return !!~WEEKENDS.indexOf(date.day());
  },

  // Checks if the date is user selected
  isActive (date) {
    return this.state.active.isSame(date, 'day');
  },

  // Generates array of weeks for given month
  getWeeks () {    
    return _.chunk(this.getDays(), 7);
  },

  getCurrentMonth () {
    return this.state.date.month();
  },

  // Generates array of days for given month
  getDays () {
    var dateInit = this.state.date,
        dateTmp = dateInit.clone().startOf('month').startOf('week'),
        days = [];

    _.range(0, 42).forEach(n => {
      days.push({
        isEdgeDays: !dateTmp.isSame(dateInit, 'month'),
        date: dateTmp.clone(),
        day: dateTmp.format('D'),
        isToday: this.isToday(dateTmp),
        isActive: this.isActive(dateTmp),
        isWeekend: this.isWeekend(dateTmp)
      });
      dateTmp.add(1, 'day');
    });

    return days;
  }

};

module.exports = MonthMixin;
