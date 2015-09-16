'use strict';

const React = require('react');
const cx = require('classnames');
const propTypes = require('./propTypes');


var Day = React.createClass({

  mixins: [
    propTypes.Mixin('Day')
  ],

  render() {
    var {day, isEdgeDays, isWeekend, isActive, isToday} = this.props.date,
        dayClasses = cx({
          'day': true,
          'flex-el': true,
          'edge': isEdgeDays,
          'weekend': isWeekend,
          'active': isActive,
          'today': isToday
        });
    return (
      <div className={dayClasses} onClick={this.props.onDayClick} >
        {day}
      </div>
    );
  }

});

module.exports = Day;
