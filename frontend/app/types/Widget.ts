export type WidgetType = 'chart' | 'gauge' | 'switch' | 'readout' | 'canvas';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  feedId?: string;
  currentValue?: string | number;
  config?: {
    min?: number;
    max?: number;
    unit?: string;
    chartType?: 'line' | 'bar';
  };
}

export interface Dashboard {
  id: string;
  name: string;
  projectId: string;
  widgets: Widget[];
  createdAt: string;
}
