'use strict';

var App = React.createClass({

  handleDayClick (date) {
    console.log(date.format());
  },

  render: function() {
    return (
      <div className="app-wrapper">
        <Month
          firstDayOfWeek={1}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }

});

React.render(<App />, document.getElementById('content'));
