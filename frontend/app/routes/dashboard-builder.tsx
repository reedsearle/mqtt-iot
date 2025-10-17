import { Button } from 'flowbite-react';
import type { Route } from './+types/dashboard-builder';
import { Navbar } from '../components/Navbar';
import { PageContainer } from '../components/PageContainer';
import { WidgetContainer } from '../components/widgets/WidgetContainer';
import { ChartPlaceholder } from '../components/widgets/ChartPlaceholder';
import { RpmGauge } from '../components/widgets/RpmGauge';
import { SwitchWidget } from '../components/widgets/SwitchWidget';
import { DigitalReadout } from '../components/widgets/DigitalReadout';
import { mockDashboards } from '../data/mockDashboards';
import { mockProjects } from '../data/mockProjects';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard Builder - IoT Bootcamp Platform' },
    { name: 'description', content: 'Build and view your IoT dashboard' },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const dashboard = mockDashboards.find((d) => d.id === params.id);
  const project = mockProjects.find((p) => p.id === dashboard?.projectId);

  return {
    dashboard: dashboard || mockDashboards[0],
    project: project || mockProjects[0],
  };
}

export default function DashboardBuilder({ loaderData }: Route.ComponentProps) {
  const { dashboard, project } = loaderData;

  return (
    <div>
      <Navbar />
      <PageContainer>
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {dashboard.name} - {project.name}
          </h1>
          <div className="flex gap-2">
            <Button color="light">Edit Mode</Button>
            <Button>+ Add Widget</Button>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Temperature Chart Widget */}
          <WidgetContainer title="Temperature (Last 24h)">
            <ChartPlaceholder />
            <div className="text-center text-3xl font-bold mt-4">72.5°F</div>
          </WidgetContainer>

          {/* Humidity Gauge Widget */}
          <WidgetContainer title="Humidity">
            <RpmGauge value={45} max={100} unit="%" />
          </WidgetContainer>

          {/* LED Control Widget */}
          <WidgetContainer title="LED Control">
            <SwitchWidget value="ON" />
          </WidgetContainer>

          {/* Air Quality Widget */}
          <WidgetContainer title="Air Quality">
            <DigitalReadout value="Good" lastUpdate="2 min ago" />
          </WidgetContainer>
        </div>

        {/* Widget Placeholder */}
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-12 text-center text-gray-400 hover:bg-gray-50 cursor-pointer transition">
          + Click to add new widget
        </div>
      </PageContainer>
    </div>
  );
}
