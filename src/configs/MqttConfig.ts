export class MqttConfig {
  public brokerUrl: string;
  public options: {
    username: string;
    password: string;
    clientId: string;
  };

  constructor() {
    this.brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://mqtt-broker';
    this.options = {
      username: process.env.MQTT_USERNAME || '',
      password: process.env.MQTT_PASSWORD || '',
      clientId: process.env.MQTT_CLIENT_ID || 'mqtt-client-id',
    };
  }
}
