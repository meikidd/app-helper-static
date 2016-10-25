import './post.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import { createForm } from 'rc-form';
import { Button, InputItem, List, Picker, Modal, WhiteSpace } from 'antd-mobile';
import store from '../common/redux/create-store';
import Enums from '../common/enums';
import Ajax from '../common/ajax/ajax';
import Env from '../common/env/env';
import  * as action from './actions';

import AddElementBtn from './AddElementBtn';
import TextElement from './TextElement';
import ImageElement from './ImageElement';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.getAppList();
    this.state = {
      isFirstView: true,
      isShowAppList: false,
      appList: [],
      title: '',
      creator: 'meiqingguang',
      app: '',
      device: '',
      os: ''
    };
  }
  onSaveClick() {
    const {creator, app, device, os, title} = this.state
    const data = Object.assign({}, store.getState()._tutorial, {creator, app, device, os, title});
    Ajax.post('/api/tutorials', {data}).then(res => {
      console.log(res);
    });
  }
  onTitleChange(value) {
    this.setState({ title: value });
    // this.props.dispatch(action.titleChange(value));
  }
  onAppChange(value) {
    this.setState({
      app: value,
      isShowAppList: true
    });
  }
  onAppBlur() {
    setTimeout(() => {
      this.setState({ isShowAppList: false });
    }, 50);
  }
  onAppItemClick(app) {
    this.setState({
      app: app.name,
      isShowAppList: false
    });
  }
  onDeviceChange(values) {
    this.setState({ device: values[0] });
  }
  onOsChange(values) {
    this.setState({ os: values[0] });
  }
  getAppList() {
    Ajax.get('/api/apps').then(res => {
      this.setState({ appList: res.data})
    });
  }
  nextView() {
    this.setState({isFirstView: false})
  }
  render() {
    const { getFieldProps } = this.props.form;

    const {title, app, device, os} = this.state;
    let nextViewBtnDisabled = true;
    if(title && app && device && os) {
      nextViewBtnDisabled = false;
    }

    const deviceData = Enums.Device.enumValues.map(device => {
      return { value: device.value, label: device.description };
    });
    const osData = Enums.OS.enumValues.map(os => {
      return { value: os.value, label: os.description };
    });
    return <div>

      <div className={`first-view ${this.state.isFirstView ? 'show' : 'hide'}`}>
        <h3>新建教程</h3>
        <List>
          <InputItem placeholder="标题"
            value={this.state.title}
            onChange={e => this.onTitleChange(e)}
          />
        </List>
        <WhiteSpace size="xl"/>
        <List>
          <InputItem placeholder="App名称"
            value={this.state.app}
            onChange={e => this.onAppChange(e)}
            onBlur={e => this.onAppBlur(e)}
          />
          <div className={`app-list ${this.state.isShowAppList ? 'show' : 'hide'}`}>
            <List>
              {
                this.state.appList
                  .filter(app => app.name.includes(this.state.app))
                  .map(app =>
                    <List.Item key={app.id} onClick={e => this.onAppItemClick(app)}>
                      {app.name}
                    </List.Item>
                  )
              }
            </List>
          </div>
        </List>
        <WhiteSpace size="xl"/>
        <List>
          <Picker data={deviceData} cols={1}
            {...getFieldProps('device', {
              onChange: (values) => {
                this.onDeviceChange(values);
              }
            })}
          >
            <List.Item arrow="horizontal">适用的设备</List.Item>
          </Picker>
          <Picker data={osData} cols={1}
            {...getFieldProps('os', {
              onChange: (values) => {
                this.onOsChange(values);
              }
            })}
          >
            <List.Item arrow="horizontal">适用的系统</List.Item>
          </Picker>
        </List>
        <div className="action-btn">
          <Button onClick={e => this.nextView(e)} disabled={nextViewBtnDisabled}>下一步 ></Button>
        </div>
      </div>

      <div className={`second-view ${this.state.isFirstView ? 'hide' : 'show'}`}>
        <div>
          <InputItem className="post-title" value={this.state.title} placeholder="标题" maxLength={15}
            onChange={e => this.onTitleChange(e)}
          />
        </div>
        {this.props.elements.map((element) => {
          return <div key={element.id}>
            <AddElementBtn id={element.id} />
            {
              element.type === Enums.ElementType.TEXT.value
              ? <TextElement {...element} />
              : <ImageElement {...element} />
            }
          </div>;
        })}
        <div className="action-btn">
          <Button onClick={e => this.onSaveClick(e)}>保存</Button>
        </div>
      </div>
    </div>
  }
}
Post = createForm()(Post);

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
