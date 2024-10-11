# asterisk-node-stream

A quick experiment establishing two way connection between Asterisk and Node.js.
The goal is to make the NodeJS server send the same audio stream back.

## Setup
Run container:
```
docker run -v $(pwd)/config:/etc/asterisk --network host asterisk
```
Why `--network host`: afaik it's because in order to establish RTP connection, the client and asterisk are using STUN technique to do some voodo magic on port forwarding, so you never know what port is going to be used.

Optionally login to the container to view the logs and experiment with Asterisk CLI:
```
docker exec -it <container_id> /bin/bash
asterisk -rvvv
```

Restart asterisk to apply config changes (run in Asterisk CLI):
```
core restart now
```

Run Node.js server:
```
cd test
npm install
npm run dev
```