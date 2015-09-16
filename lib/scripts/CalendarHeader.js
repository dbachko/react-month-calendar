'use strict';

var React = require('react');
var cx = require('classnames');
var propTypes = require('./propTypes');

var CalendarHeader = React.createClass({
  displayName: 'CalendarHeader',

  mixins: [propTypes.Mixin('CalendarHeader')],

  render: function render() {
    var date = this.props.date;
    var curMonthClasses = cx({
      'icon-a': this.props.isCurMonth,
      'icon-p': !this.props.isCurMonth
    });
    return React.createElement(
      'div',
      { className: 'cal-header' },
      React.createElement(
        'div',
        { className: 'cal-header-title' },
        React.createElement(
          'b',
          null,
          date.format('MMMM YYYY')
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