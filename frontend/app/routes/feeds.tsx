import { Button, TextInput, Label, Select } from 'flowbite-react';
import type { Route } from './+types/feeds';
import { Navbar } from '../components/Navbar';
import { PageContainer } from '../components/PageContainer';
import { Card, CardHeader } from '../components/Card';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from '../components/Table';
import { mockFeeds } from '../data/mockFeeds';
import { mockProjects } from '../data/mockProjects';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Feed Management - IoT Bootcamp Platform' },
    { name: 'description', content: 'Manage your IoT data feeds' },
  ];
}

export function loader() {
  return {
    feeds: mockFeeds,
    projects: mockProjects,
  };
}

export default function Feeds({ loaderData }: Route.ComponentProps) {
  const { feeds, projects } = loaderData;

  return (
    <div>
      <Navbar />
      <PageContainer>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Feeds</h1>
          <Button>+ Create New Feed</Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <TextInput placeholder="Search feeds..." />
        </Card>

        {/* Feeds Table */}
        <div className="mb-6">
          <Table>
            <TableHead>
              <tr>
                <TableHeadCell>Feed Name</TableHeadCell>
                <TableHeadCell>MQTT Topic</TableHeadCell>
                <TableHeadCell>Project</TableHeadCell>
                <TableHeadCell>Current Value</TableHeadCell>
                <TableHeadCell>Last Update</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </tr>
            </TableHead>
            <TableBody>
              {feeds.map((feed) => (
                <TableRow key={feed.id}>
                  <TableCell className="font-medium">{feed.name}</TableCell>
                  <TableCell className="font-mono text-sm">{feed.mqttTopic}</TableCell>
                  <TableCell>{feed.projectName}</TableCell>
                  <TableCell>{feed.currentValue}</TableCell>
                  <TableCell>{feed.lastUpdate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="xs" color="light">View</Button>
                      <Button size="xs" color="light">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Create/Edit Feed Form */}
        <Card>
          <CardHeader>Create/Edit Feed Form</CardHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="feedName">Feed Name:</Label>
              <TextInput
                id="feedName"
                placeholder="e.g., Living Room Temperature"
              />
            </div>

            <div>
              <Label htmlFor="mqttTopic">MQTT Topic:</Label>
              <TextInput
                id="mqttTopic"
                placeholder="bootcamp/alice/photon2/temperature"
              />
            </div>

            <div>
              <Label htmlFor="project">Project:</Label>
              <Select id="project">
                <option>Select a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="dataType">Data Type:</Label>
              <Select id="dataType">
                <option>Number</option>
                <option>Text</option>
                <option>Boolean</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="unit">Unit (optional):</Label>
              <TextInput
                id="unit"
                placeholder="e.g., °F, %, ppm"
              />
            </div>

            <div>
              <Label htmlFor="retention">Data Retention (days):</Label>
              <TextInput
                id="retention"
                type="number"
                placeholder="90"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button>Save Feed</Button>
              <Button color="light">Cancel</Button>
            </div>
          </div>
        </Card>
      </PageContainer>
    </div>
  );
}
