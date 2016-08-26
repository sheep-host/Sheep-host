// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // XHR for Chrome/Firefox/Opera/Safari.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     // XDomainRequest for IE.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   } else {
//     // CORS not supported.
//     xhr = null;
//   }
//   return xhr;
// }

// function Sheep() {
//   this.user = {}
// }
//
// Sheep.prototype.dontSleep = function(object) {
//   this.user = object;
// }
//
// Sheep.prototype.post = function(data) {
//   ajax('POST', this.user.url + this.user.dbId, data);
// }
//
// Sheep.prototype.get = function(query) {
//   ajax('GET', this.user.url + this.user.dbId);
// }
//
// Sheep.prototype.put = function(query, data) {
//   // put request goes here
// }
//
// Sheep.prototype.delete = function(query) {
//   // delete request goes here
// }

var sheep = {
  user: {},
  dontSleep: function(obj) {
    user = obj;
  },
  post: function(data) {
    console.log('uri: ', user.url + user.dbId);
    console.log('data sent via POST: ', data);
    $.ajax({
      method: 'POST',
      url: user.url + user.dbId,
      data: data
    }).then(() => console.log('success'));

    // var ajax = new XMLHttpRequest();
    // ajax.open('POST', user.url + user.dbId, true);
    // ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // ajax.send(data);
    // ajax.onreadystatechange = function() {
    //   var done = 4;
    //   var ok = 200;
    //   if (ajax.readyState === done) {
    //     if (ajax.status === ok) return ajax.responseText;
    //     else console.log('Error: ', ajax.status);
    //   }
    // }

    // ajax('POST', user.url + user.dbId, data);
  },
  get: function(cb) {
    $.get(user.url + user.dbId).then(cb);
  },
  put: function(query, data) {
    // put request goes here
  },
  delete: function(query) {
    // delete request goes here
  }
}
