import React from 'react';
import { DragSource } from 'react-dnd';

const assetSource = {
  beginDrag(props) {
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  }
}

var Asset = React.createClass({
  handleClick: function (e) {
    this.props.selectAsset({
      id: this.props.id,
      status: this.props.status || "N/A",
      state: this.props.state || "N/A",
      type: this.props.type || "N/A",
      zone: this.props.zone || "N/A",
      function: this.props.function || "N/A",
      owner: this.props.owner || "N/A",
    });
  },
  render: function () {
    var connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div className="tooltipped tooltipped-s border p-2 mb-2 mr-2 left" aria-label={this.props.id}>
        <div className={"asset " + this.props.status} onClick={this.handleClick}>

        </div>
      </div>
    );
  }
});

export default DragSource('asset', assetSource, collect)(Asset);
