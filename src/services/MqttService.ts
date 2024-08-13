import mqtt, { MqttClient } from 'mqtt';
import MqttConfig from '../config/MqttConfig';

class MqttService {
  private client: MqttClient;

  constructor() {
    this.client = mqtt.connect(MqttConfig.brokerUrl);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
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

  getClient(): MqttClient {
    return this.client;
  }
}

export default MqttService;
