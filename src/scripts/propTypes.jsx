'use strict';

const React = require('react');
const _ = require('lodash');
const moment = require('moment');
const warning = require('react/lib/warning');


var validateDateProp = (prop) => {
  return (prop !== undefined
    || moment.isMoment(prop)
    || prop instanceof Date
    || prop instanceof String
  );
};

var validateDateArrayProp = (prop) => {
  return prop.every((element, index, array) => {
    return validateDateProp(element);
  });
};

var dateType = (props, propName, componentName) => {
  var prop = props[propName];
  warning(
    validateDateProp(prop),
    `Invalid date '${prop}' sent to '${componentName}'. Check the render method of '${componentName}'.`
  );
};

var dateArrayType = (props, propName, componentName) => {
  var prop = props[propName];
  warning(
    validateDateArrayProp(prop),
    `Invalid date array '${prop}' sent to '${componentName}'. Check the render method of '${componentName}'.`
  );
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

var eventList = [
  'onClick', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter',
  'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop',
  'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut',
  'onMouseOver', 'onMouseUp', 'onTouchCancel', 'onTouchEnd', 'onTouchMove',
  'onTouchStart'
];

['Day', 'Week', 'Month', 'CalendarHeader'].forEach(function (item) {
  eventList.forEach(function (event) {
    module.exports.types[item][event] = React.PropTypes.func;
  });
});

module.exports.Mixin = (...types) => {
  var propTypes = {};

  types.forEach((type) => {
    _.assign(propTypes, module.exports.types[type])
  });

  return {
    propTypes
  };
};
