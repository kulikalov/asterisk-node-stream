import net from "net";

const server = net.createServer((socket) => {
  console.log("New TCP connection");

  /**
   * Asterisk AudioSocket endpoint
   * The singular design goal of AudioSocket is to present the simplest possible audio streaming protocol, initially based on the constraints of Asterisk audio. Each packet contains a three-byte header and a variable payload. The header is composed of a one-byte type and a two-byte length indicator.
   The minimum message length is three bytes: type and payload-length. Hangup indication, for instance, is 0x00 0x00 0x00.

  Types:

  - 0x00 - "end" - Terminate the connection (socket closure is also sufficient)
  - 0x01 - "uuid" - Payload will contain the UUID (16-byte binary representation) for the audio stream
  - 0x10 - "audio" - Payload is signed linear, 16-bit, 8kHz, mono PCM (little-endian)
  - 0xff - "err" - An error has occurred; payload is the (optional) application-specific error code. Asterisk-generated error codes are listed below.
   */

  socket.on("data", (data) => {
    const type = data.readUInt8(0);
    switch (type) {
      case 0x00:
        console.log("Received hangup indication");
        break;
      case 0x01:
        console.log("Received UUID");
        const uuid = data.slice(3, 19).toString("hex");
        console.log("UUID", uuid);
        break;
      case 0x10:
        console.log("Received audio");
        socket.write(data);
        break;
      case 0xff:
        console.log("Received error");
        const error = data.readUInt8(1);
        console.log("Error code", error);
        break;
      default:
        console.log("Unknown type", type);
    }
  });
  socket.on("end", () => {
    console.log("TCP connection closed");
  });
});

server.on("error", (err) => {
  throw err;
});

server.listen(8091, () => {
  console.log("TCP server running on port 8091");
});
