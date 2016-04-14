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
  render: function () {
    var connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div className={"asset " + this.props.status}>
        {this.props.id}
      </div>
    );
  }
});

export default DragSource('asset', assetSource, collect)(Asset);
