import './post.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import { Button } from 'antd';
import createStore from '../common/redux/create-store';
import  * as action from '../common/redux/action-creators';

const store = createStore();

class Post extends React.Component {
  onClick() {
    this.props.dispatch(action.post());
  }
  render() {
    return <div>
      {this.props.loading && 'loading'}
      <ul>
        {this.props.tutorials.map(tutorial => <li key={tutorial.id}>{tutorial.id} - {tutorial.title}</li>)}
      </ul>
      <Button onClick={() => this.onClick()}>Post</Button>
    </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    tutorials: state._tutorial.tutorials,
    loading: state._tutorial.loading,
  };
};

const ConnectedHome = connect(mapStateToProps)(Post);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedHome />
  </Provider>,
  document.getElementById('root')
);
