# EOL.
The PushSocket project has been entirely stopped in favor of our new service, QuickSub. PushSocket was developed in a rush and was made when I first began to explore topics like this, and now that I have experience with working with products in the field, i'll be able to successfully make something better that benefits everyone.Thanks for using PushSocket. When made public, QuickSub will be at [RE:world's Github](https://github.com/REWORLD-CO).
# PushServer
PushServer is the backend WebSocket server used for [PushSocket.js](https://pushsocket.github.io/). This repo contains all code for it, including a regularly updated spaces.json database, making sure your server can just be plugged 'n played.
### Connecting to a custom PushServer
```js
// as CommonJS Module
const ps = require("pushsocket.js");
// as ES Module
import * as ps from "pushsocket.js";

const socket = new ps.PushSocket(
  {
    space_id: "global",
  },
  null, // null, no params to the space.
  handleConnect // will be called when the socket is connected.
);

socket.ws = new WebSocket("ws(s)://<server URL here>/");

// realtime logic
```
----
# Deploy it!
[![Deploy to Digital Ocean](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/NullClock/pushserver/tree/main)
[![Run on Google Cloud](https://binbashbanana.github.io/deploy-buttons/buttons/official/googlecloud.svg)](https://deploy.cloud.run/?git_repo=https://github.com/NullClock/pushserver)
[![Deploy to Koyeb](https://binbashbanana.github.io/deploy-buttons/buttons/official/koyeb.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/NullClock/pushserver&branch=main&name=PushServer)
[![Deploy to IBM Cloud](https://binbashbanana.github.io/deploy-buttons/buttons/official/ibmcloud.svg)](https://cloud.ibm.com/devops/setup/deploy?repository=https://github.com/NullClock/pushserver)
[![Deploy to Amplify Console](https://binbashbanana.github.io/deploy-buttons/buttons/official/amplifyconsole.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/NullClock/pushserver)
[![Deploy to Render](https://binbashbanana.github.io/deploy-buttons/buttons/official/render.svg)](https://render.com/deploy?repo=https://github.com/NullClock/pushserver)
[![Deploy to Cyclic](https://binbashbanana.github.io/deploy-buttons/buttons/official/cyclic.svg)](https://app.cyclic.sh/api/app/deploy/NullClock/pushserver)
