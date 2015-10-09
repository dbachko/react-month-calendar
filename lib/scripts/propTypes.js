'use strict';

var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var warning = require('react/lib/warning');

var validateDateProp = function validateDateProp(prop) {
  return prop !== undefined || moment.isMoment(prop) || prop instanceof Date || prop instanceof String;
};

var validateDateArrayProp = function validateDateArrayProp(prop) {
  return prop.every(function (element, index, array) {
    return validateDateProp(element);
  });
};

var dateType = function dateType(props, propName, componentName) {
  var prop = props[propName];
  warning(validateDateProp(prop), 'Invalid date \'' + prop + '\' sent to \'' + componentName + '\'. Check the render method of \'' + componentName + '\'.');
};

var dateArrayType = function dateArrayType(props, propName, componentName) {
  var prop = props[propName];
  warning(validateDateArrayProp(prop), 'Invalid date array \'' + prop + '\' sent to \'' + componentName + '\'. Check the render method of \'' + componentName + '\'.');
};

module.exports = {
  types: {}
};

module.exports.types.Month = {
  firstDayOfWeek: React.PropTypes.number
};

module.exports.types.Week = {
  week: dateArrayType,
  onDayClick: React.PropTypes.func
};

module.exports.types.Day = {
  date: dateType,
  onDayClick: React.PropTypes.func
};

module.exports.types.CalendarHeader = {
  headerDateFormat: React.PropTypes.string,
  onPrevMonthClick: React.PropTypes.func,
  onCurMonthClick: React.PropTypes.func,
  onNextMonthClick: React.PropTypes.func
};

var eventList = ['onClick', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'];

['Day', 'Week', 'Month', 'CalendarHeader'].forEach(function (item) {
  eventList.forEach(function (event) {
    module.exports.types[item][event] = React.PropTypes.func;
  });
});

module.exports.Mixin = function () {
  for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  var propTypes = {};

  types.forEach(function (type) {
    _.assign(propTypes, module.exports.types[type]);
  });

  return {
    propTypes: propTypes
  };
};