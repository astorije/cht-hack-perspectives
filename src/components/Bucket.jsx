import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import FontAwesome from 'react-fontawesome';
import {Set} from 'immutable';

import Asset from './Asset';

const bucketTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver(),
  };
}

var Bucket = React.createClass({
  getInitialState: function () {
    return { edit: false };
  },

  getAssets: function () {
    return this.props.assets || new Set([]);
  },

  toggleEdit: function () {
    if( this.state.edit ){
      this.setState({ edit: false });
    } else {
      this.setState({ edit: true });
    };
  },

  handleChange: function (e) {
    this.props.nameBucket(e.target.parentElement.querySelector('input').value);
    this.toggleEdit();
  },

  render: function () {
    const connectDropTarget = this.props.connectDropTarget;
    const isOver = this.props.isOver;
    const canDrop = this.props.canDrop;

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

    var shadowAsset;
    if (canDrop && this.props.onDrop) {
      shadowAsset = <div className={"asset shadow " + (isOver ? 'isOver' : '')}>
        <i className="fa fa-plus"></i>
      </div>;
    }

    var deleteButton;
    if (this.props.deleteBucket) {
      deleteButton = <i className="fa fa-trash-o clickable delete" onClick={(i) => this.props.deleteBucket(i)}></i>;
    }

    return connectDropTarget(
      <div className="bucket">
        <div>
          <div className="inlineDiv">

            <div className="innerDiv">
              {text}
            </div>
            <div className="innerDiv">
              {deleteButton}
            </div>
            <div style={{clear: "both"}}></div>
          </div>
        </div>
        <div className="bucketAssets">
          {this.getAssets().map(asset =>
            <Asset key={asset.id} id={asset.id} status={asset.status} />
          )}
          {shadowAsset}
        </div>
      </div>
    );
  }
});

export default DropTarget('asset', bucketTarget, collect)(Bucket);
