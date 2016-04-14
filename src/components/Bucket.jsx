import React from 'react';
import {Set} from 'immutable';

import Asset from './Asset';

var FontAwesome = require('react-fontawesome');

export default React.createClass({
  getInitialState: function () {
    return { edit: false };
  },
  getAssets: function() {
    return this.props.assets || new Set([]);
  },
  toggleEdit(){
    if( this.state.edit ){
      this.setState({ edit: false });
    } else {
      this.setState({ edit: true });
    };
  },
  handleChange(e) {
    this.props.nameBucket(e.target.parentElement.querySelector('input').value);
    this.toggleEdit();
  },
  render: function() {
    var text;
    if (!this.state.edit) {
      if (this.props.nameBucket) {
        text =
        <div>
          <h3>
            {this.props.name}
            <FontAwesome
              name='pencil-square-o'
              onClick={this.toggleEdit}
              style={{margin: 5 + 'px'}} />
          </h3>
        </div>
        ;
      } else {
        text =
        <div>
          <h3>
            {this.props.name}
          </h3>
        </div>;
      }
    } else {
      text = <div>
        <input
          type="text"
          defaultValue={this.props.name}
        />
        <FontAwesome
          name='remove'
          onClick={this.toggleEdit}
          style={{margin: 5 + 'px'}}
        />
        <FontAwesome
          name='check-square-o'
          onClick={this.handleChange}
          style={{margin: 5 + 'px'}}
        />
      </div>;
    }
    return <div className="bucket">
      {text}
      {this.getAssets().map(asset =>
        <Asset key={asset.id} id={asset.id} status={asset.status} />
      )}
    </div>;
  }
});
