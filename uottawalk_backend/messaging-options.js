module.exports = {
  host: "wss://mr-connection-paq7xfy3fw5.messaging.solace.cloud:8443",
  username: "solace-cloud-client",
  password: "vhqs1guap9ijohpl53lv1he75d",
  clientId: "myUniqueClientId",
  keepalive: 10,
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 10000,
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
  rejectUnauthorized: false,
};
