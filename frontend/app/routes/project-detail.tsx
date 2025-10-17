import { Button } from 'flowbite-react';
import { Link } from 'react-router';
import type { Route } from './+types/project-detail';
import { Navbar } from '../components/Navbar';
import { PageContainer } from '../components/PageContainer';
import { Card, CardHeader } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from '../components/Table';
import { mockProjects } from '../data/mockProjects';
import { mockFeeds } from '../data/mockFeeds';
import { mockDashboards } from '../data/mockDashboards';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Project Detail - IoT Bootcamp Platform' },
    { name: 'description', content: 'Project details and management' },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const project = mockProjects.find((p) => p.id === params.id);
  const projectFeeds = mockFeeds.filter((f) => f.projectId === params.id);
  const projectDashboards = mockDashboards.filter((d) => d.projectId === params.id);

  return {
    project: project || mockProjects[0], // Fallback to first project
    feeds: projectFeeds,
    dashboards: projectDashboards,
  };
}

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const { project, feeds, dashboards } = loaderData;

  return (
    <div>
      <Navbar />
      <PageContainer>
        {/* Project Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-gray-600">Created: {project.createdAt}</p>
          </div>
          <div className="flex gap-2">
            <Button color="light">Edit Project</Button>
            <Button color="failure">Delete</Button>
          </div>
        </div>

        {/* Project Description */}
        <Card className="mb-6">
          <CardHeader>Project Description</CardHeader>
          <p>{project.description}</p>
        </Card>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feeds */}
          <Card>
            <CardHeader>Feeds ({feeds.length})</CardHeader>
            <Table>
              <TableHead>
                <tr>
                  <TableHeadCell>Feed Name</TableHeadCell>
                  <TableHeadCell>Current Value</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                </tr>
              </TableHead>
              <TableBody>
                {feeds.map((feed) => (
                  <TableRow key={feed.id}>
                    <TableCell className="font-medium">{feed.name}</TableCell>
                    <TableCell>{feed.currentValue}</TableCell>
                    <TableCell>
                      <StatusBadge status={feed.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button>+ Add Feed</Button>
            </div>
          </Card>

          {/* Dashboards */}
          <Card>
            <CardHeader>Dashboards ({dashboards.length})</CardHeader>
            {dashboards.map((dashboard) => (
              <Link key={dashboard.id} to={`/dashboards/${dashboard.id}`}>
                <div className="h-32 bg-gray-200 border-2 border-gray-400 mb-4 flex items-center justify-center hover:bg-gray-300 transition">
                  <div className="text-center">
                    <div className="text-gray-500 text-sm">[Dashboard Preview Thumbnail]</div>
                    <div className="font-medium mt-2">{dashboard.name}</div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="mt-4">
              <Button>+ New Dashboard</Button>
            </div>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}
