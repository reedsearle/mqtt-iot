-- Enable extensions
CREATE EXTENSION IF NOT EXISTS timescaledb;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (OAuth2 data)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    mqtt_username VARCHAR(255) UNIQUE NOT NULL,
    mqtt_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feeds (topic definitions)
CREATE TABLE feeds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    topic VARCHAR(500) NOT NULL,
    data_type VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Widget types (reusable widget definitions)
CREATE TABLE widgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project widget (widget instances in projects)
CREATE TABLE project_widget (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    widget_id UUID REFERENCES widgets(id),
    feed_id UUID REFERENCES feeds(id) ON DELETE CASCADE,
    configuration JSONB,
    position_x INTEGER,
    position_y INTEGER,
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time-series sensor data (TimescaleDB hypertable)
CREATE TABLE sensor_data (
    time TIMESTAMPTZ NOT NULL,
    feed_id UUID REFERENCES feeds(id),
    topic VARCHAR(500),
    value TEXT,
    value_numeric DOUBLE PRECISION,
    metadata JSONB
);

-- Convert to hypertable
SELECT create_hypertable('sensor_data', 'time');

-- Create indexes
CREATE INDEX idx_sensor_data_feed_id ON sensor_data(feed_id, time DESC);
CREATE INDEX idx_sensor_data_topic ON sensor_data(topic, time DESC);

-- Retention policy (optional - keep data for 90 days)
SELECT add_retention_policy('sensor_data', INTERVAL '90 days');

-- Compression policy (optional - compress data older than 7 days)
ALTER TABLE sensor_data SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'feed_id'
);
SELECT add_compression_policy('sensor_data', INTERVAL '7 days');

