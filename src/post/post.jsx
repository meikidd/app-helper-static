import './post.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import { Button, InputItem } from 'antd-mobile';
import store from '../common/redux/create-store';
import  * as action from './actions';
import Ajax from '../common/ajax/ajax';

import AddElementBtn from './AddElementBtn';
import TextElement from './TextElement';
import ImageElement from './ImageElement';
import TutorialElementType from '../common/enums/TutorialElementType';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  onSaveClick() {
    console.log(store.getState());
    Ajax.post('/api/tutorials', {
      body: store.getState()._tutorial
    }).then(data => {
      console.log(data);
    });
  }
  onTitleChange(value) {
    this.props.dispatch(action.titleChange(value));
  }
  render() {
    return <div>
      <div>
        <InputItem className="post-title" placeholder="请输入标题" maxLength={15}
          onChange={e => this.onTitleChange(e)}
        />
      </div>
      {this.props.elements.map((element) => {
        return <div key={element.id}>
          <AddElementBtn id={element.id} />
          {
            element.type === TutorialElementType.TEXT.value
            ? <TextElement {...element} />
            : <ImageElement {...element} />
          }
        </div>;
      })}
      <div><Button onClick={value => this.onSaveClick(value)}>保存</Button></div>
    </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    elements: state._tutorial.elements,
  };
};

const ConnectedHome = connect(mapStateToProps)(Post);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedHome />
  </Provider>,
  document.getElementById('root')
);
