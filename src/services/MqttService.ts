import mqtt, { MqttClient } from 'mqtt';

export class MqttService {
  private client: MqttClient;

  constructor(brokerUrl: string) {
    this.client = mqtt.connect(brokerUrl);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });
  }

  subscribe(topic: string): void {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to topic ${topic}:`, err);
      } else {
        console.log(`Subscribed to topic ${topic}`);
      }
    });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error(`Failed to publish message to topic ${topic}:`, err);
      } else {
        console.log(`Message published to topic ${topic}`);
      }
    });
  }

  listen() {
    this.client.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    });
  }

  getClient(): MqttClient {
    return this.client;
  }
}
