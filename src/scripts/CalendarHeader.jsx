'use strict';

const React = require('react');
const cx = require('classnames');
const propTypes = require('./propTypes');


var CalendarHeader = React.createClass({

  mixins: [
    propTypes.Mixin('CalendarHeader')
  ],

  render () {
    var {date, headerDateFormat: {m, y}, isCurMonth} = this.props,
        curMonthClasses = cx({
          'icon-a': isCurMonth,
          'icon-p': !isCurMonth
        });
    return (
      <div className='cal-header'>
        <div className='cal-header__title'>
          <b className='cal-header__title-month'>{date.format(m)}</b>
          <span className='cal-header__title-year'>{date.format(y)}</span>
        </div>
        <div className='cal-header-nav'>
          <span
            onClick={this.props.onPrevMonthClick}
            className='icon-l'
          >Prev</span>
          <span
            onClick={this.props.onCurMonthClick}
            className={curMonthClasses}
          >Now</span>
          <span
            onClick={this.props.onNextMonthClick}
            className='icon-r'
          >Next</span>
        </div>
      </div>
    );
  }

});

module.exports = CalendarHeader;
