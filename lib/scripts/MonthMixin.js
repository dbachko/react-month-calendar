'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var React = require('react');
var moment = require('moment');
var _ = require('lodash');

var WEEKENDS = [0, 6]; // [Su, Sa]

var MonthMixin = {

  momentSetLocale: function momentSetLocale() {
    var localeStr = 'en',
        dow = this.props.firstDayOfWeek % 7,
        weekdaysMin = moment.weekdaysMin();

    weekdaysMin.unshift.apply(weekdaysMin, _toConsumableArray(weekdaysMin.splice(dow)));

    moment.locale(localeStr, {
      weekdaysMin: weekdaysMin,
      week: { dow: dow }
    });
  },

  isCurMonth: function isCurMonth() {
    return this.state.date.isSame(moment({ hour: 0 }), 'month');
  },

  isToday: function isToday(date) {
    return date.isSame(moment({ hour: 0 }), 'day');
  },

  isWeekend: function isWeekend(date) {
    return !! ~WEEKENDS.indexOf(date.day());
  },

  // Checks if the date is user selected
  isActive: function isActive(date) {
    return this.state.active.isSame(date, 'day');
  },

  // Generates array of weeks for given month
  getWeeks: function getWeeks() {
    return _.chunk(this.getDays(), 7);
  },

  getCurrentMonth: function getCurrentMonth() {
    return this.state.date.month();
  },

  // Generates array of days for given month
  getDays: function getDays() {
    var _this = this;

    var dateInit = this.state.date,
        dateTmp = dateInit.clone().startOf('month').startOf('week'),
        days = [];

    _.range(0, 42).forEach(function (n) {
      days.push({
        isEdgeDays: !dateTmp.isSame(dateInit, 'month'),
        date: dateTmp.clone(),
        day: dateTmp.format('D'),
        isToday: _this.isToday(dateTmp),
        isActive: _this.isActive(dateTmp),
        isWeekend: _this.isWeekend(dateTmp)
      });
      dateTmp.add(1, 'day');
    });

    return days;
  }

};

module.exports = MonthMixin;