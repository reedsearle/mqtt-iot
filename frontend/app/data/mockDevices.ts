import type { Device, MqttCredentials } from '../types/Device';

export const mockDevices: Device[] = [
  {
    id: '1',
    deviceId: 'photon2-alice-001',
    status: 'online',
    lastSeen: 'Just now',
    messagesToday: 1247,
  },
  {
    id: '2',
    deviceId: 'photon2-alice-002',
    status: 'offline',
    lastSeen: '2 hours ago',
    messagesToday: 523,
  },
];

export const mockMqttCredentials: MqttCredentials = {
  broker: 'mqtt.yourbootcamp.com',
  port: 8883,
  username: 'alice@school.edu',
  password: 'x7Kp9mNq2vL4wR8t',
};
