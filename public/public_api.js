var sheep = {
  user: {},
  dontSleep: function(obj) {
    user = obj;
  },

  post: function(dbName, colName, data) {
    const url = user.url + user.id + '/' + dbName + '/' + colName;
    const httpReq = new XMLHttpRequest();
    httpReq.open('POST', url, true);
    httpReq.setRequestHeader('Content-Type', 'application/json');
    httpReq.setRequestHeader('Authorization', user.authKey);
    httpReq.onreadystatechange = function() {
      if (httpReq.readyState === XMLHttpRequest.DONE) {
        if (httpReq.status === 200) console.log('POST success!');
        else console.log('Mucha problema!!');
      }
    }
    httpReq.send(JSON.stringify(data));
  },

  get: function(dbName, colName, cb) {
    const url = user.url + user.id + '/' + dbName + '/' + colName;
    const httpReq = new XMLHttpRequest();
    httpReq.open('GET', url, true);
    httpReq.setRequestHeader('Authorization', user.authKey);
    httpReq.onreadystatechange = function() {
      if (httpReq.readyState === XMLHttpRequest.DONE) {
        if (httpReq.status === 200) cb(null, httpReq.responseText);
        else cb('Mucha problemas!!', null);
      }
    }
    httpReq.send();
  },

  put: function(dbName, colName, query, data) {
    let key = Object.keys(query)[0];
    let value = query[key];
    axios({
      method: 'POST',
      url: user.url + user.id + '/' + dbName + '/' + colName + '/?' + key + '=' + value,
      data: data,
      headers: {
        authorization: user.authKey
      }
    }).then(() => console.log('success'));
  },

  delete: function(dbName, colName, query) {
    let key = Object.keys(query)[0];
    let value = query[key];
    axios({
      method: 'DELETE',
      url: user.url + user.id + '/' + dbName + '/' + colName + '/?' + key + '=' + value,
      data: data,
      headers: {
        authorization: user.authKey
      }
    }).then(() => console.log('success'));
  }
}
