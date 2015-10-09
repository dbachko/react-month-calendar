'use strict';

var React = require('react');
var cx = require('classnames');
var propTypes = require('./propTypes');

var CalendarHeader = React.createClass({
  displayName: 'CalendarHeader',

  mixins: [propTypes.Mixin('CalendarHeader')],

  render: function render() {
    var _props = this.props;
    var date = _props.date;
    var _props$headerDateFormat = _props.headerDateFormat;
    var m = _props$headerDateFormat.m;
    var y = _props$headerDateFormat.y;
    var isCurMonth = _props.isCurMonth;
    var curMonthClasses = cx({
      'icon-a': isCurMonth,
      'icon-p': !isCurMonth
    });
    return React.createElement(
      'div',
      { className: 'cal-header' },
      React.createElement(
        'div',
        { className: 'cal-header__title' },
        React.createElement(
          'b',
          { className: 'cal-header__title-month' },
          date.format(m)
        ),
        React.createElement(
          'span',
          { className: 'cal-header__title-year' },
          date.format(y)
        )
      ),
      React.createElement(
        'div',
        { className: 'cal-header-nav' },
        React.createElement(
          'span',
          {
            onClick: this.props.onPrevMonthClick,
            className: 'icon-l'
          },
          'Prev'
        ),
        React.createElement(
          'span',
          {
            onClick: this.props.onCurMonthClick,
            className: curMonthClasses
          },
          'Now'
        ),
        React.createElement(
          'span',
          {
            onClick: this.props.onNextMonthClick,
            className: 'icon-r'
          },
          'Next'
        )
      )
    );
  }

});

module.exports = CalendarHeader;