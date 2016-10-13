import React from 'react';
import { connect } from 'react-redux';
// import CameraRollPicker from 'react-native-camera-roll-picker';
// var CameraRollPicker = require('react-native-camera-roll-picker');
import Dropzone from 'react-dropzone';
import { Button, ImagePicker } from 'antd-mobile';
import  * as action from './actions';
import TutorialElementType from '../common/enums/TutorialElementType';
class AddElementBtn extends React.Component {
  onImageBtnClick(image) {
          console.log(image);
    this.props.dispatch(action.addImageElement(this.props.id, TutorialElementType.IMAGE, image.preview));
  }
  onTextBtnClick() {
    this.props.dispatch(action.addTextElement(this.props.id, TutorialElementType.TEXT));
  }
  render() {
    return <div>
      <Dropzone onDrop={files => this.onImageBtnClick(files[0])} style={{}}
        multiple={false} accept="image/jpg,image/jpeg,image/png" maxSize={10*1024*1024}>
        image
      </Dropzone>
      <Button inline size="small" onClick={() => this.onTextBtnClick()}>text</Button>
    </div>
  }
}

export default connect()(AddElementBtn);
