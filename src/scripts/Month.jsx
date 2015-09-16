'use strict';

const React = require('react');
const moment = require('moment');
const CalendarHeader = require('./CalendarHeader');
const MonthMixin = require('./MonthMixin');
const propTypes = require('./propTypes');
const Week = require('./Week');

var Month = React.createClass({
  mixins: [
    MonthMixin,
    propTypes.Mixin('Month')
  ],

  getDefaultProps () {
    return {
      firstDayOfWeek: 0
    };
  },

  getInitialState () {
    let date = moment();
    return {
      date,
      active: date
    };
  },

  componentWillMount () {
    this.momentSetLocale();
  },

  handleDayClick ({date}) {
    if(this.props.onDayClick) {
      this.props.onDayClick(date);
    }
    this.setState({
      date,
      active: date
    });
  },

  handleNavClick (state) {
    let date = this.state.date.clone();
    switch(state) {
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
      date
    });
  },

  createWeeksHeader () {
    var weekdays = moment.weekdaysMin();
    weekdays = weekdays.map((el, idx) => {
      return (
        <span
          key={idx}
          className='flex-el'
        >
          {el}
        </span>
      );
    });
    return weekdays;
  },

  render () {
    return (
      <div className='cal'>
        <CalendarHeader
          className='cal-header'
          date={this.state.date}
          isCurMonth={this.isCurMonth()}
          onPrevMonthClick={this.handleNavClick.bind(null, 'prev')}
          onCurMonthClick={this.handleNavClick.bind(null, 'cur')}
          onNextMonthClick={this.handleNavClick.bind(null, 'next')}
        />
        <div
          className='month'
          key={`m${this.getCurrentMonth()}`}
        >
          <header className='weekdays'>
            {this.createWeeksHeader()}
          </header>
          {
            this.getWeeks().map((week, idx) => {
              return React.createElement(Week, {
                key: `w${idx}`,
                week,
                onDayClick: this.handleDayClick
              })
            })
          }
        </div>
      </div>
    );
  }

});


module.exports = Month;
