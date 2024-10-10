import { WebSocketServer } from "ws";

import { randomUUID } from "crypto";
const wss = new WebSocketServer({ port: 8090 });

wss.on("connection", function connection(ws) {
  console.log("New WebSocket connection");

  let audioBuffer = [];
  const delaySeconds = 5;
  const sampleRate = 8000; // Todo: get this from the client

  ws.on("message", function incoming(message, isBinary) {
    if (isBinary) {
      // // // Store incoming audio
      // audioBuffer.push(message);
      // // console.log(`Received audio: ${message.length} bytes`);
      // // If we have enough audio stored, start sending it back
      // if (audioBuffer.length > 100) {
      //   console.log("sending");
      //   const delayedAudio = audioBuffer.shift();
      //   ws.send(delayedAudio, (e) => {
      //     console.log("sent", e);
      //   });
      // } else {
      //   console.log("audioBuffer.length", audioBuffer.length);
      // }
      // if random 0.1
      if (Math.random() < 0.01) {
        console.log("Sending audio");
        ws.send(
          JSON.stringify({
            request: "set",
            id: randomUUID(),
            params: {
              results: [
                {
                  text: "Hello World Test",
                },
              ],
            },
          })
        );
      }
    } else {
      console.log(`Received message: ${message}`);
      const jsonMessage = JSON.parse(message.toString("utf-8"));
      console.log("jsonMessage", jsonMessage);

      if (jsonMessage.request === "setup") {
        const res = {
          response: "setup",
          id: jsonMessage.id,
          codecs: jsonMessage.codecs,
        };
        console.log("Sending response:", res);
        ws.send(JSON.stringify(res));
      }
    }
  });

  ws.on("close", function close() {
    console.log("WebSocket connection closed");
  });
});

console.log("WebSocket server running on port 8090");
