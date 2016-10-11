import React from 'react';
import { connect } from 'react-redux';
import { TextareaItem } from 'antd-mobile';
import  * as action from './actions';
import ElementOperator from './ElementOperator';

class TextElement extends React.Component {
  onTextChange(value) {
    this.props.dispatch(action.textChange(this.props.id, value));
  }
  render() {
    // const { getFieldProps } = this.props.form;
    return <div>
      <ElementOperator {...this.props} />
      {
        this.props.isEditing
        ? <TextareaItem
            defaultValue={this.props.text}
            onChange={value => {this.onTextChange(value)}}
            autoHeight
          />
        : <span>{this.props.id} - {this.props.text}</span>
      }
    </div>
  }
}

export default connect()(TextElement);
