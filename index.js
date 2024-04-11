const wws = require("express-ws");
const exp = require("express");
const jDB = require("simple-json-db");
const cryptojs = require("crypto-js");

const app = exp();
const wss = wws(app);

let clients = {};
let sclients = {};

let sdb;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.ws("/", (ws, req) => { 
  let i = false;
  ws.on("message", (data) => {
    sdb = new jDB("./spaces.json");
    if (!isJSON(data)) return;
    data = JSON.parse(data);
    console.log(data);

    if (data.type == "connect") {
      const { id, space, password, params } = data;
      console.log(data);

      if (sdb.has(space)) {
        if (decrypt(sdb.get(space).password) !== password) {
          ws.send(JSON.stringify({
            type: "error",
            error: "invalid_password"
          }));

          return;
        }
        
        clients[id] = {
          id, space, password, params, _ws: ws
        }

        if (!sclients.hasOwnProperty(space)) {
          sclients[space] = [];
        }
        
        sclients[space].push({
          id, space, password, params, _ws: ws
        });

        i = true;
        ws.send(JSON.stringify({
          type: "connect_success"
        }));
      } else {
        ws.send(JSON.stringify({
          type: "error",
          error: "invalid_space"
        }));

        return;
      }
    } else if (data.type == "message") {
      // checks if person is introduced.
      if (cInt(ws, data, i)) return;

      broadcast(JSON.stringify({
        type: "message",
        channel: data?.channel || "global",
        data: data.data
      }), clients[data.id].space);
    }
  });
});

app.listen(8080, () => {
  console.log("PS-01 is up and running!");
});

function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

function broadcast(data, space = null) {
  if (space == null) {
    clients.forEach(client => {
      client._ws.send(data);
    });
  } else {
    console.log(sclients[space]);
    console.log(sclients)
    sclients[space].forEach(client => {
      client._ws.send(data);
    });
  }
}

function encrypt(data) {
  const enc = cryptojs.AES.encrypt(data, process.env.ENCRYPTION_KEY);

  return enc.toString();
}

function decrypt(aes) {
  const enc = cryptojs.AES.decrypt(aes, process.env.ENCRYPTION_KEY);

  return enc.toString(cryptojs.enc.Utf8);
}

function cInt(ws, data, i) {
  if (i == false && data.type !== "connect") {
    ws.send(JSON.stringify({
      type: "error",
      error: "not_introduced"
    }));

    return true;
  }
}
