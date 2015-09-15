'use strict';

var App = React.createClass({

  render: function() {
    return (
      <div className="app-wrapper">
        <Month firstDayOfWeek={1} />
      </div>
    );
  }

});

React.render(<App />, document.getElementById('content'));
