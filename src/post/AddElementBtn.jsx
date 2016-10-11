import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import  * as action from './actions';
import TutorialElementType from '../common/enums/TutorialElementType';

class AddElementBtn extends React.Component {
  onImageBtnClick() {
    this.props.dispatch(action.addElement(this.props.id, TutorialElementType.IMAGE));
  }
  onTextBtnClick() {
    this.props.dispatch(action.addElement(this.props.id, TutorialElementType.TEXT));
  }
  render() {
    return <div>
      <Button inline size="small" onClick={() => this.onImageBtnClick()}>image</Button>
      <Button inline size="small" onClick={() => this.onTextBtnClick()}>text</Button>
    </div>
  }
}

export default connect()(AddElementBtn);
