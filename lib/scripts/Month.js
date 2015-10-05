'use strict';

var React = require('react');
var moment = require('moment');
var CalendarHeader = require('./CalendarHeader');
var MonthMixin = require('./MonthMixin');
var propTypes = require('./propTypes');
var Week = require('./Week');

var Month = React.createClass({
  displayName: 'Month',

  mixins: [MonthMixin, propTypes.Mixin('Month')],

  getDefaultProps: function getDefaultProps() {
    return {
      firstDayOfWeek: 0,
      headerDateFormat: 'MMMM YYYY'
    };
  },

  getInitialState: function getInitialState() {
    var date = moment();
    return {
      date: date,
      active: date
    };
  },

  componentWillMount: function componentWillMount() {
    this.momentSetLocale();
  },

  handleDayClick: function handleDayClick(_ref) {
    var date = _ref.date;

    if (this.props.onDayClick) {
      this.props.onDayClick(date);
    }
    this.setState({
      date: date,
      active: date
    });
  },

  handleNavClick: function handleNavClick(state) {
    var date = this.state.date.clone();
    switch (state) {
      case 'prev':
        date.subtract(1, 'months');
        break;
      case 'next':
        date.add(1, 'months');
        break;
      default:
        date = moment();
    }
    this.setState({
      date: date
    });
  },

  createWeeksHeader: function createWeeksHeader() {
    var weekdays = moment.weekdaysMin();
    weekdays = weekdays.map(function (el, idx) {
      return React.createElement(
        'span',
        {
          key: idx,
          className: 'flex-el'
        },
        el
      );
    });
    return weekdays;
  },

  render: function render() {
    var _this = this;

    return React.createElement(
      'div',
      { className: 'cal' },
      React.createElement(CalendarHeader, {
        className: 'cal-header',
        headerDateFormat: this.props.headerDateFormat,
        date: this.state.date,
        isCurMonth: this.isCurMonth(),
        onPrevMonthClick: this.handleNavClick.bind(null, 'prev'),
        onCurMonthClick: this.handleNavClick.bind(null, 'cur'),
        onNextMonthClick: this.handleNavClick.bind(null, 'next') }),
      React.createElement(
        'div',
        {
          className: 'month',
          key: 'm' + this.getCurrentMonth()
        },
        React.createElement(
          'header',
          { className: 'weekdays' },
          this.createWeeksHeader()
        ),
        this.getWeeks().map(function (week, idx) {
          return React.createElement(Week, {
            key: 'w' + idx,
            week: week,
            onDayClick: _this.handleDayClick
          });
        })
      )
    );
  }

});

module.exports = Month;