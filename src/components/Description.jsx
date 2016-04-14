import React from 'react';

export default React.createClass({
  render: function () {
    var content;
    if (this.props.asset) {
      content = <div>
        <strong>Instance ID:</strong> {this.props.asset.id}<br/>
        <strong>State:</strong> {this.props.asset.state}<br/>
        <strong>Active:</strong> {this.props.asset.status}<br/>
        <strong>Instance Type:</strong> {this.props.asset.type}<br/>
        <strong>Zone Name:</strong> {this.props.asset.zone}<br/>
        <strong>Function:</strong> {this.props.asset.function}<br/>
        <strong>Owner:</strong> {this.props.asset.owner}<br/>
      </div>;
    }
    return <div className={"description " + (this.props.asset ? '' : 'isHidden')}>
      <i className="fa fa-times fa-2x clickable" onClick={this.props.unselectAsset}></i>
      {content}
    </div>;
  }
});
