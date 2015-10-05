'use strict';

var React = require('react');
var cx = require('classnames');
var propTypes = require('./propTypes');

var Day = React.createClass({
  displayName: 'Day',

  mixins: [propTypes.Mixin('Day')],

  render: function render() {
    var _props$date = this.props.date;
    var day = _props$date.day;
    var isEdgeDays = _props$date.isEdgeDays;
    var isWeekend = _props$date.isWeekend;
    var isActive = _props$date.isActive;
    var isToday = _props$date.isToday;
    var dayClasses = cx({
      'day': true,
      'flex-el': true,
      'edge': isEdgeDays,
      'weekend': isWeekend,
      'active': isActive,
      'today': isToday
    });
    return React.createElement(
      'div',
      { className: dayClasses, onClick: this.props.onDayClick },
      day
    );
  }

});

module.exports = Day;