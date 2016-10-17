/*
  异步请求，使用fetch API.

  IE下使用polyfill
*/
import 'whatwg-fetch';
import jqueryParam from 'jquery-param';

export default class Ajax {

  /*
    注意：参数通过options.params传递，例如Ajax.get(url, {params: {id:9527}})
  */
  static get(url, options = {}) {
    if (!url) url = '/';
    if (!options) options = {};
    options.method = 'GET';

    if (typeof options.params === 'object') {
      if (url.indexOf('?') < 0) {
        url += `?${jqueryParam(options.params)}`;
      } else {
        url += `&${jqueryParam(options.params)}`;
      }
      delete options.params;
    }

    return Ajax.request(url, options);
  }

  /*
    注意：参数通过options.body传递，例如Ajax.post(url, {body: {id:9527}})
  */
  static post(url, options = {}) {
    if (!url) url = '/';
    if (!options) options = {};
    options.method = 'POST';

    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body);
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
