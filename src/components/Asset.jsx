import React from 'react';

export default React.createClass({
  render: function() {
    return <div className="asset">
      {this.props.id}
    </div>;
  }
});
