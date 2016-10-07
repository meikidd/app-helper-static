import './index.less';

import env from '../common/env/env';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

document.querySelector('#console').innerHTML = JSON.stringify(env, null, 4);

class Home extends React.Component {
  render() {
    return <Button>hello</Button>
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
