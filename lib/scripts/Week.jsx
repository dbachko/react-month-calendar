'use strict';

const React = require('react');
const Day = require('./Day');
const propTypes = require('./propTypes');


var Week = React.createClass({

  mixins: [
    propTypes.Mixin('Week')
  ],

  render() {
    var {week, onDayClick} = this.props;
    return (
      <div className='week'>
        {
          week.map((date, idx) => {
            return React.createElement(Day, {
              key: `d${idx}`,
              date,
              onDayClick: onDayClick.bind(null, date)
            })
          })
        }
      </div>
    );
  }

});

module.exports = Week;
