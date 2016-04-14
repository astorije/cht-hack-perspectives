import React from 'react';
import {Set} from 'immutable';

import Asset from './Asset';

export default React.createClass({
  getAssets: function() {
    return this.props.assets || new Set([]);
  },
  render: function() {
    return <div className="bucket">
        <h3>{this.props.name}</h3>
      {this.getAssets().map(asset =>
        <Asset key={asset.id} id={asset.id} status={asset.status} />
      )}
    </div>;
  }
});
