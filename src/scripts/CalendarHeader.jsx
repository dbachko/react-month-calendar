'use strict';

const React = require('react');
const cx = require('classnames');
const propTypes = require('./propTypes');


var CalendarHeader = React.createClass({

  mixins: [
    propTypes.Mixin('CalendarHeader')
  ],

  render () {
    var {date, headerDateFormat, isCurMonth} = this.props,
        curMonthClasses = cx({
          'icon-a': isCurMonth,
          'icon-p': !isCurMonth
        });
    return (
      <div className='cal-header'>
        <div className='cal-header-title'>
          <b>{date.format(headerDateFormat)}</b>
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
