import React from 'react';
import { connect } from 'react-redux';
import  * as action from './actions';
import ElementOperator from './ElementOperator';

class ImageElement extends React.Component {
  render() {
    return <div>
      <ElementOperator {...this.props} />
      <img className="image-element" src={this.props.url} />
    </div>
  }
}

export default connect()(ImageElement);
