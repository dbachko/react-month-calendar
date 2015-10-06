'use strict';

var App = React.createClass({

  handleDayClick (date) {
    console.log(date.format());
  },

  render: function() {
    return (
      <div className="app-wrapper">
        <Month
          firstDayOfWeek={0}
          onDayClick={this.handleDayClick}
          headerDateFormat={{m: 'MMMM', y: 'YYYY'}}/>
      </div>
    );
  }

});

React.render(<App />, document.getElementById('content'));
