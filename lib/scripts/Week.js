'use strict';

var React = require('react');
var Day = require('./Day');
var propTypes = require('./propTypes');

var Week = React.createClass({
  displayName: 'Week',

  mixins: [propTypes.Mixin('Week')],

  render: function render() {
    var _props = this.props;
    var week = _props.week;
    var onDayClick = _props.onDayClick;

    return React.createElement(
      'div',
      { className: 'week' },
      week.map(function (date, idx) {
        return React.createElement(Day, {
          key: 'd' + idx,
          date: date,
          onDayClick: onDayClick.bind(null, date)
        });
      })
    );
  }

});

module.exports = Week;