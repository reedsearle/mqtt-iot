export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: 'online' | 'offline';
  feedCount: number;
  dashboardCount: number;
}
