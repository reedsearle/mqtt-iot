import type { Dashboard, Widget } from '../types/Widget';

export const mockWidgets: Widget[] = [
  {
    id: '1',
    type: 'chart',
    title: 'Temperature (Last 24h)',
    feedId: '1',
    currentValue: '72.5°F',
    config: {
      chartType: 'line',
      unit: '°F',
    },
  },
  {
    id: '2',
    type: 'gauge',
    title: 'Humidity',
    feedId: '2',
    currentValue: 45,
    config: {
      min: 0,
      max: 100,
      unit: '%',
    },
  },
  {
    id: '3',
    type: 'switch',
    title: 'LED Control',
    feedId: '4',
    currentValue: 'ON',
  },
  {
    id: '4',
    type: 'readout',
    title: 'Air Quality',
    feedId: '3',
    currentValue: 'Good',
  },
];

export const mockDashboards: Dashboard[] = [
  {
    id: '1',
    name: 'Main Dashboard',
    projectId: '1',
    widgets: mockWidgets,
    createdAt: 'Oct 1, 2025',
  },
  {
    id: '2',
    name: 'Mobile View',
    projectId: '1',
    widgets: [],
    createdAt: 'Oct 5, 2025',
  },
];
