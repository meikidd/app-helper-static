import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd-mobile';
import  * as action from './actions';

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
    return <div>
      {
        this.props.isEditing
        ? <Button inline size="small" onClick={() => this.onEditDoneClick()}>完成</Button>
        : <span>
            <Button inline size="small" onClick={() => this.onUpClick()}>↑</Button>
            <Button inline size="small" onClick={() => this.onDownClick()}>↓</Button>
            <Button inline size="small" onClick={() => this.onEditStartClick()}>编辑</Button>
            <Button inline size="small" onClick={() => this.onRemoveClick()}>删除</Button>
        </span>
      }
    </div>
  }
}

export default connect()(ElementOperator);
