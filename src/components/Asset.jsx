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
      <div className="tooltipped tooltipped-s border p-2 mb-2 mr-2 left" aria-label={this.props.id}>
        <div className={"asset " + this.props.status}>
          {this.props.id}
        </div>
      </div>
    );
  }
});

export default DragSource('asset', assetSource, collect)(Asset);
