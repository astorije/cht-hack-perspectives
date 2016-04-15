import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
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
    var actionButtons = [];
    if (!this.state.edit) {
      text = this.props.name;

      if (this.props.nameBucket) {
        actionButtons.push(<i key="editButton" className="fa fa-pencil fa-fw clickable" onClick={this.toggleEdit} />);
      }
    } else {
      text = <input
        type="text"
        defaultValue={this.props.name}
      />;

      actionButtons.push(
        <i key="cancelButton" className="fa fa-remove fa-fw clickable" onClick={this.toggleEdit} />
      );
      actionButtons.push(
        <i key="saveButton" className="fa fa-check fa-fw clickable" onClick={this.handleChange} />
      );
    }

    var shadowAsset;
    if (canDrop && this.props.onDrop) {
      shadowAsset = <div className={"asset shadow " + (isOver ? 'isOver' : '')}>
        <i className="fa fa-plus"></i>
      </div>;
    }

    if (this.props.deleteBucket) {
      actionButtons.push(
        <i key="deleteButton" className="fa fa-trash-o fa-fw clickable" onClick={this.props.deleteBucket}></i>
      );
    }

    return connectDropTarget(
      <div className="bucket">
        <div>
          <div className="inlineDiv">
            <div className="innerDiv">
              <h3>
                {text}
                &nbsp;
                {actionButtons}
              </h3>
            </div>
            <div style={{clear: "both"}}></div>
          </div>
        </div>
        <div className="bucketAssets">
          {this.getAssets().map(asset =>
            <Asset
              key={asset.id}
              id={asset.id}
              status={asset.status}
              state={asset.state}
              type={asset.type}
              zone={asset.zone}
              function={asset.function}
              owner={asset.owner}
              selectAsset={this.props.selectAsset}
              />
          )}
          {shadowAsset}
        </div>
      </div>
    );
  }
});

export default DropTarget('asset', bucketTarget, collect)(Bucket);
