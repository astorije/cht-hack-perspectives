import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Bucket from './Bucket';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

const App = React.createClass({
  render: function () {
    return <div>
      <Bucket name='Unallocated Assets' assets={this.props.unallocatedAssets.get('assets')} />
      {this.props.buckets.map((bucket, i) =>
        <div key={i}>
          <Bucket index={i} name={bucket.get('name')} assets={bucket.get('assets')} nameBucket={(n) => this.props.nameBucket(i, n)} onDrop={(item) => this.props.drag(item, i)} />
        </div>
      )}
      <div className="shadowBucket">
        <Bucket name='New group' onDrop={(item) => this.props.drag(item)} />
      </div>

      Categorize by:
      <select onChange={(e) => this.props.categorize(e.target.value)}>
        <option>Select a category</option>
        <option value="region">Region</option>
        <option value="status">Status</option>
      </select>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    unallocatedAssets: state.get('unallocatedAssets'),
    buckets: state.get('buckets')
  }
}

export default connect(
  mapStateToProps,
  actionCreators
)(DragDropContext(HTML5Backend)(App));
