import type { Project } from '../types/Project';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Home Monitor',
    description: 'Monitor temperature, humidity, and air quality in my apartment. Control LED indicators.',
    createdAt: 'Oct 1, 2025',
    status: 'online',
    feedCount: 5,
    dashboardCount: 2,
  },
  {
    id: '2',
    name: 'Weather Station',
    description: 'Outdoor weather monitoring with temperature, humidity, and pressure sensors.',
    createdAt: 'Sep 15, 2025',
    status: 'online',
    feedCount: 4,
    dashboardCount: 1,
  },
  {
    id: '3',
    name: 'Smart Garden',
    description: 'Monitor soil moisture and automatically water plants.',
    createdAt: 'Aug 20, 2025',
    status: 'offline',
    feedCount: 3,
    dashboardCount: 1,
  },
];
