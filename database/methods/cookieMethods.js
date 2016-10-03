function setCookie(req, res) {
  console.log('cookie', req.body);
  res.cookie('token', req.body.token, { maxAge: 600000 });
  res.cookie('database', req.body.dev.database.length > 0, { maxAge: 600000 });
  res.redirect(`/dashboard/${req.body.dev.userName}`);
}

function setDatabaseCookieTrue(req, res) {
  res.cookie('database', true, { maxAge: 600000 });
  res.json(req.body.result);
}

module.exports = { setCookie, setDatabaseCookieTrue };
