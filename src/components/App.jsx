import React from 'react';
import Bucket from './Bucket';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

const App = React.createClass({
  render: function () {
    return <div>
      <Bucket name='Unallocated Assets' assets={this.props.unallocatedAssets.get('assets')} />
      {this.props.buckets.map((bucket, i) =>
        <div key={i} onClick={() => this.props.drag(i)}>
          <Bucket name={bucket.get('name')} assets={bucket.get('assets')} />
        </div>
      )}
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
)(App);
