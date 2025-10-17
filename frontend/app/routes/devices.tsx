import { Button, Alert } from 'flowbite-react';
import type { Route } from './+types/devices';
import { Navbar } from '../components/Navbar';
import { PageContainer } from '../components/PageContainer';
import { Card, CardHeader } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from '../components/Table';
import { mockDevices, mockMqttCredentials } from '../data/mockDevices';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Device Setup - IoT Bootcamp Platform' },
    { name: 'description', content: 'Setup your IoT devices and MQTT credentials' },
  ];
}

export function loader() {
  return {
    devices: mockDevices,
    credentials: mockMqttCredentials,
  };
}

export default function Devices({ loaderData }: Route.ComponentProps) {
  const { devices, credentials } = loaderData;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <Navbar />
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Device Setup</h1>

        {/* Warning Alert */}
        <Alert color="warning" className="mb-6">
          <div>
            <span className="font-bold">⚠️ Important: Save These Credentials</span>
            <p className="mt-2">
              You'll need these credentials to configure your Particle Photon2. Keep them secure!
            </p>
          </div>
        </Alert>

        {/* MQTT Credentials */}
        <Card className="mb-6">
          <CardHeader>Your MQTT Credentials</CardHeader>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="font-bold w-48">MQTT Broker:</span>
              <div className="flex items-center gap-2 flex-1">
                <code className="bg-gray-100 px-3 py-1 rounded">{credentials.broker}</code>
                <Button size="xs" onClick={() => copyToClipboard(credentials.broker)}>
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="font-bold w-48">Port:</span>
              <div className="flex items-center gap-2 flex-1">
                <code className="bg-gray-100 px-3 py-1 rounded">{credentials.port}</code>
                <Button size="xs" onClick={() => copyToClipboard(credentials.port.toString())}>
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="font-bold w-48">Username:</span>
              <div className="flex items-center gap-2 flex-1">
                <code className="bg-gray-100 px-3 py-1 rounded">{credentials.username}</code>
                <Button size="xs" onClick={() => copyToClipboard(credentials.username)}>
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="font-bold w-48">Password:</span>
              <div className="flex items-center gap-2 flex-1">
                <code className="bg-gray-100 px-3 py-1 rounded">{credentials.password}</code>
                <Button size="xs" onClick={() => copyToClipboard(credentials.password)}>
                  Copy
                </Button>
                <Button size="xs" color="light">
                  Show/Hide
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button color="light">Regenerate Password</Button>
            <Button color="light">Download as .txt</Button>
          </div>
        </Card>

        {/* Connected Devices */}
        <Card className="mb-6">
          <CardHeader>Connected Devices</CardHeader>
          <Table>
            <TableHead>
              <tr>
                <TableHeadCell>Device ID</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Last Seen</TableHeadCell>
                <TableHeadCell>Messages Today</TableHeadCell>
              </tr>
            </TableHead>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">{device.deviceId}</TableCell>
                  <TableCell>
                    <StatusBadge status={device.status} />
                  </TableCell>
                  <TableCell>{device.lastSeen}</TableCell>
                  <TableCell>{device.messagesToday.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Setup Instructions */}
        <Card>
          <CardHeader>Setup Instructions for Particle Photon2</CardHeader>
          <ol className="list-decimal list-inside space-y-3 mb-4">
            <li>Open Particle Workbench or Web IDE</li>
            <li>Create a new project or open existing code</li>
            <li>Copy your MQTT credentials from above</li>
            <li>
              Add the following code to your setup():
              <pre className="bg-gray-100 p-3 mt-2 rounded border border-gray-300 overflow-x-auto">
{`MQTT client("mqtt.yourbootcamp.com", 8883, callback);
client.connect("photon2-alice", "alice@school.edu", "password");`}
              </pre>
            </li>
            <li>Flash the code to your Photon2</li>
            <li>Check the "Connected Devices" section to verify connection</li>
          </ol>
          <div className="flex gap-2">
            <Button>Download Sample Code</Button>
            <Button color="light">View Full Documentation</Button>
          </div>
        </Card>
      </PageContainer>
    </div>
  );
}
