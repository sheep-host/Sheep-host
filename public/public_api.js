var sheep = {
  user: {},
  dontSleep: function(obj) {
    user = obj;
  },

  post: function(dbName, colName, data) {
    axios({
      method: 'POST',
      url: user.url + user.id + '/' + dbName + '/' + colName,
      data: data,
      headers: {
        authorization: user.authKey
      }
    }).then(() => console.log('success'));
  },

  get: function(dbName, colName, cb) {
    axios({
      method: 'GET',
      url: user.url + user.id + '/' + dbName + '/' + colName,
      headers: {
        authorization: user.authKey
      }
    }).then(cb);
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

// *********** script to be pasted on client html ************
// <script src="https://npmcdn.com/axios/dist/axios.min.js"></script>
// <script src="https://sheep.host/public_api"></script>
// <script>
//     // Initialize Sheep.host
//     var config = {
//         id: '',
//         authorization: '',
//         url: "https://sheep.host/api/"
//     }
//     sheep.dontSleep(config);
// </script>
