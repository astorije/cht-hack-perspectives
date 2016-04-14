import React from 'react';
import List from 'immutable';

import Asset from './Asset';

export default React.createClass({
  getAssets: function() {
    return this.props.assets || [];
  },
  render: function() {
    return <div className="bucket">
        <h3>{this.props.name}</h3>
      {this.getAssets().map(asset =>
        <Asset key={asset.get('id')} id={asset.get('id')} />
      )}
    </div>;
  }
});
