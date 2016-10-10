import './post.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import { InputItem } from 'antd-mobile';
import store from '../common/redux/create-store';
import  * as action from '../common/redux/action-creators';

import AddElementBtn from './AddElementBtn';
import TutorialElementType from '../common/enums/TutorialElementType';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      <div><InputItem placeholder="title"/></div>
      {this.props.elements.map((element) => {
        return <div key={element.id}>
          <AddElementBtn id={element.id} />
          <div>{TutorialElementType.get(element.type).name}</div>
        </div>;
      })}
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
