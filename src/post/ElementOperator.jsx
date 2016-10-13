import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'antd-mobile';
import  * as action from './actions';
import TutorialElementType from '../common/enums/TutorialElementType';

const alert = Modal.alert;

class ElementOperator extends React.Component {

  onUpClick() {
    this.props.dispatch(action.upElement(this.props.id));
  }
  onDownClick() {
    this.props.dispatch(action.downElement(this.props.id));
  }
  onEditStartClick() {
    this.props.dispatch(action.editStartElement(this.props.id));
  }
  onEditDoneClick() {
    console.log('done')
    this.props.dispatch(action.editDoneElement(this.props.id));
  }
  onRemoveClick() {
    alert('删除', '确定删除么？', [
      { text: '取消'},
      { text: '确定', onPress: () => {
        this.props.dispatch(action.removeElement(this.props.id));
      }},
    ]);

  }
  render() {
    return <div className="element-operator">
      {
        this.props.isEditing
        ? <span onClick={() => this.onEditDoneClick()}><Icon type="check-circle-o" /></span>
        : <span>
            <span onClick={() => this.onUpClick()}><Icon type="circle-o-up" /></span>
            <span onClick={() => this.onDownClick()}><Icon type="circle-o-down" /></span>
            {
              this.props.type === TutorialElementType.TEXT.value &&
              <span onClick={() => this.onEditStartClick()}><Icon type="edit" /></span>
            }
            <span onClick={() => this.onRemoveClick()}><Icon type="delete" /></span>
        </span>
      }
    </div>
  }
}

export default connect()(ElementOperator);
