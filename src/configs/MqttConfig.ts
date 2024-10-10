export class MqttConfig {
  public static brokerUrl: string =
    process.env.MQTT_BROKER_URL || 'mqtt://mqtt-broker';
  public static options: {
    username: string;
    password: string;
    clientId: string;
  } = {
    username: process.env.MQTT_USERNAME || '',
    password: process.env.MQTT_PASSWORD || '',
    clientId: process.env.MQTT_CLIENT_ID || 'mqtt-client-id',
  };

  public static getBrokerUrl(): string {
    return this.brokerUrl;
  }

  public static getOptions(): {
    username: string;
    password: string;
    clientId: string;
  } {
    return this.options;
  }
}
