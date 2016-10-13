import React from 'react';
import { connect } from 'react-redux';
// import CameraRollPicker from 'react-native-camera-roll-picker';
// var CameraRollPicker = require('react-native-camera-roll-picker');
import Dropzone from 'react-dropzone';
import { Button, Icon, ImagePicker } from 'antd-mobile';
import  * as action from './actions';
import TutorialElementType from '../common/enums/TutorialElementType';
class AddElementBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isExpand: false
    }
  }
  setExpand(isExpand) {
    this.setState({ isExpand });
  }
  onImageBtnClick(image) {
    console.log('hello')
    this.props.dispatch(action.addImageElement(this.props.id, TutorialElementType.IMAGE, image.preview));
  }
  onTextBtnClick() {
    this.props.dispatch(action.addTextElement(this.props.id, TutorialElementType.TEXT));
  }
  render() {
    return <div className="add-element-btn">
      <span className={!this.state.isExpand && 'hide'} onClick={e =>this.setExpand(false)}>
        <Dropzone className="add-image-btn" style={{}} multiple={false}
          accept="image/jpg,image/jpeg,image/png" maxSize={10*1024*1024}
          onDrop={files => this.onImageBtnClick(files[0])}
        >
          <Icon type="picture" /> 图片
        </Dropzone>
        <span className="add-text-btn" onClick={e => this.onTextBtnClick(e)} ><Icon type="file-text"/> 文本</span>
      </span>
      <span className={this.state.isExpand ? 'hide' : ''} onClick={e => this.setExpand(true)}>
        <Icon type="plus-circle-o" />
      </span>
    </div>
  }
}

export default connect()(AddElementBtn);
