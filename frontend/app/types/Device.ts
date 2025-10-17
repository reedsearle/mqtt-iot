export interface Device {
  id: string;
  deviceId: string;
  status: 'online' | 'offline';
  lastSeen: string;
  messagesToday: number;
}

export interface MqttCredentials {
  broker: string;
  port: number;
  username: string;
  password: string;
}
