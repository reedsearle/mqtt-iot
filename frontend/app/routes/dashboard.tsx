import { Button } from 'flowbite-react';
import { Link } from 'react-router';
import type { Route } from './+types/dashboard';
import { Navbar } from '../components/Navbar';
import { PageContainer } from '../components/PageContainer';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from '../components/Table';
import { mockProjects } from '../data/mockProjects';
import { mockFeeds } from '../data/mockFeeds';
import { mockDevices } from '../data/mockDevices';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard - IoT Bootcamp Platform' },
    { name: 'description', content: 'IoT Bootcamp Dashboard' },
  ];
}

export function loader() {
  const activeProjects = mockProjects.filter((p) => p.status === 'online').length;
  const totalFeeds = mockFeeds.length;
  const connectedDevices = mockDevices.filter((d) => d.status === 'online').length;

  return {
    stats: {
      activeProjects,
      totalFeeds,
      connectedDevices,
    },
    recentProjects: mockProjects,
  };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { stats, recentProjects } = loaderData;

  return (
    <div>
      <Navbar />
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Welcome, Alice!</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <div className="text-4xl font-bold mb-2">{stats.activeProjects}</div>
            <div className="text-gray-600">Active Projects</div>
          </Card>
          <Card className="text-center">
            <div className="text-4xl font-bold mb-2">{stats.totalFeeds}</div>
            <div className="text-gray-600">Feeds</div>
          </Card>
          <Card className="text-center">
            <div className="text-4xl font-bold mb-2">{stats.connectedDevices}</div>
            <div className="text-gray-600">Connected Devices</div>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
          <Table>
            <TableHead>
              <tr>
                <TableHeadCell>Project Name</TableHeadCell>
                <TableHeadCell>Feeds</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </tr>
            </TableHead>
            <TableBody>
              {recentProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.feedCount}</TableCell>
                  <TableCell>
                    <StatusBadge status={project.status} />
                  </TableCell>
                  <TableCell>
                    <Link to={`/projects/${project.id}`}>
                      <Button size="xs">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button>+ New Project</Button>
          </div>
        </Card>
      </PageContainer>
    </div>
  );
}
