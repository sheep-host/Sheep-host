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
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'authorization',
        authorization: user.authKey
      }
    }).then(() => console.log('success'));
  },

  get: function(cb) {
    axios.get(user.url + user.id + '/' + dbName + '/' + colName).then(cb);
  },

  put: function(query, data) {
    // put request goes here
  },

  delete: function(query) {
    // delete request goes here
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
