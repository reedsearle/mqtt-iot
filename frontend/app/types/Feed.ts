export interface Feed {
  id: string;
  name: string;
  mqttTopic: string;
  projectId: string;
  projectName: string;
  currentValue: string;
  lastUpdate: string;
  status: 'online' | 'offline';
  dataType: 'number' | 'text' | 'boolean';
  unit?: string;
  dataRetentionDays: number;
}
