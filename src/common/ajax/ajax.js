/*
  异步请求，使用fetch API.

  IE下使用polyfill
*/
import 'whatwg-fetch';
import jqueryParam from 'jquery-param';

export default class Ajax {

  /*
    注意：参数通过options.data传递，例如Ajax.get(url, {data: {id:9527}})
  */
  static get(url, options = {}) {
    if (!url) url = '/';
    if (!options) options = {};
    options.method = 'GET';

    if (typeof options.data === 'object') {
      if (url.indexOf('?') < 0) {
        url += `?${jqueryParam(options.data)}`;
      } else {
        url += `&${jqueryParam(options.data)}`;
      }
      delete options.data;
    }

    return Ajax.request(url, options);
  }

  /*
    注意：参数通过options.data传递，例如Ajax.post(url, {data: {id:9527}})
  */
  static post(url, options = {}) {
    if (!url) url = '/';
    if (!options) options = {};
    options.method = 'POST';

    if (typeof options.data === 'object') {
      options.body = JSON.stringify(options.data);
      delete options.data;
    }
    return Ajax.request(url, options);
  }

  static request(url, options) {
    if (!url) url = '/';
    if (!options) options = {};

    options = Object.assign({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 要这样设置才能带上cookie
    }, options);

    return fetch(url, options).then(res => {
      return res.json();
    }).then(json => {
      return json;
    });
  }

}
