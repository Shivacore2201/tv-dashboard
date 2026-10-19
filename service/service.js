// Runs inside TizenBrew's background service, which has the TV's app-launch permission.
// The dashboard page asks it, over a tiny local web server, to list and open apps.
// Plain ES5: TizenBrew's service runs on an old Node.js.
var http = require('http');
var url = require('url');

function send(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(body));
}

function launch(ids, res) {
  var id = ids.shift();
  if (!id) return send(res, 404, { ok: false });
  try {
    tizen.application.launch(id, function () { send(res, 200, { ok: true, id: id }); }, function () { launch(ids, res); });
  } catch (e) { launch(ids, res); }
}

var server = http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  if (q.pathname === '/ping') return send(res, 200, { ok: true });
  if (q.pathname === '/launch') return launch(String(q.query.ids || '').split(',').filter(Boolean), res);
  if (q.pathname === '/apps') {
    try {
      return tizen.application.getAppsInfo(function (list) {
        send(res, 200, list.filter(function (a) { return a.show !== false && a.name; })
          .map(function (a) { return { id: a.id, name: a.name }; }));
      }, function (e) { send(res, 500, { error: String(e && e.message) }); });
    } catch (e) { return send(res, 500, { error: String(e && e.message) }); }
  }
  send(res, 404, { error: 'not found' });
});
// A second start just fails to bind; the first server keeps working.
server.on('error', function () {});
server.listen(8095, '127.0.0.1');
