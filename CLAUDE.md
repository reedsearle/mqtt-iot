# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **IoT Bootcamp Platform** that combines an open-source MQTT broker (Eclipse Mosquitto) with a custom web frontend and database. The platform is designed as an educational alternative to Adafruit.io for teaching IoT development with Particle Photon2 devices programmed in C++.

**Current Status**: Planning and design phase. The repository contains architectural documentation, personas, wireframes, and planning documents. No implementation code exists yet.

**Target Users**:
- 15-20 students in an IoT bootcamp
- Instructors teaching IoT concepts
- All users program Particle Photon2 devices in C++

## Project Goals

1. Create a dedicated MQTT broker for the IoT bootcamp without the limitations of free Adafruit.io (10 feeds, 5 dashboards, 30 writes/sec, 30 days data)
2. Design an improved dashboard creation flow
3. Use gentle reminders for high-frequency transmissions instead of shutting down feeds

## Architecture (Planned)

### Technology Stack

**Frontend** (Not yet implemented):
- React + TypeScript
- Tailwind CSS + Flowbite
- WebSocket for real-time updates
- Google OAuth2/OpenID authentication

**Backend** (Not yet implemented):
- TBD: Java/Spring Boot, Node.js/Express, or Python/FastAPI
- MQTT client library (Eclipse Paho or MQTT.js)
- WebSocket server for real-time dashboard updates
- REST API for dashboard management

**Infrastructure** (Not yet implemented):
- Docker containers for deployment
- Eclipse Mosquitto MQTT broker
  - Port 8883 (MQTT over TLS)
  - Port 9001 (WebSocket)
  - Username/Password authentication + TLS
  - ACL (Access Control Lists)
  - Target capacity: ~100 msg/sec typical, 1000 msg/sec max (throttled)
- PostgreSQL + TimescaleDB
  - Regular tables: users, mqtt_credentials, projects, feeds, dashboards, widgets
  - Hypertables (time-series): sensor_data with automatic partitioning, retention policies, compression

**IoT Devices**:
- Particle Photon2 (programmed in C++)
- Built-in Particle MQTT library
- 2 rotary encoders + LED for MVP demo

### MQTT Topic Structure

```
bootcamp/{username}/{device}/{sensor}

Examples:
bootcamp/alice/photon2/temperature
bootcamp/alice/photon2/humidity
bootcamp/alice/photon2/led/command
```

### Data Flow

1. Photon2 publishes sensor data to MQTT topic
2. Mosquitto broker routes messages to subscribers
3. Backend receives messages via MQTT subscription
4. Backend saves data to TimescaleDB
5. Backend pushes real-time updates to dashboard via WebSocket
6. Dashboard updates visualizations in real-time

## MVP Demo Requirements (December 5th)

The first milestone requires demonstrating:

1. **Authentication**: Google OAuth2 login
2. **Device Connectivity**: Photon2 with 2 rotary encoders publishing data
3. **Database Operations**: Save and retrieve encoder data
4. **4 Dashboard Widgets**:
   - Switch widget (toggle LED on/off)
   - RPM Gauge (show encoder rotation speed)
   - Digital Readout (numeric display)
   - 2D Graph (Etch-a-Sketch drawing from 2 encoders)

See `documentation/schedule.md` for the complete week-by-week implementation plan.

## Key Documentation

- `documentation/visionAndGoals.md` - Project vision and goals
- `documentation/schedule.md` - Detailed 8-week implementation schedule with MVP requirements
- `documentation/mqtt-discussion.md` - In-depth MQTT concepts and broker comparison
- `block-diagram-react.html` - Complete architecture diagram (React component)
- `documentation/block-diagram.html` - Infrastructure diagram
- `student-good-user.html` - Student persona
- `instructor.html` - Instructor persona
- `documentation/UML.drawio` - UML diagrams
- `documentation/wireframes.html` - UI wireframes

## Database Schema (Planned)

### Regular PostgreSQL Tables
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255),
  email VARCHAR(255),
  name VARCHAR(255)
);

CREATE TABLE etch_sketch_data (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  x_position INTEGER,
  y_position INTEGER,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE device_status (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  led_state BOOLEAN,
  encoder1_rpm FLOAT,
  current_value INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### TimescaleDB Hypertables
- `sensor_data` - Time-series sensor readings with automatic partitioning

## Design Constraints

- **Rate Limiting**: 30 messages/second per user (gentle reminders, not hard blocks)
- **Scaling**: Single broker must handle ~20 concurrent users
- **Data Retention**: Configurable (improvement over Adafruit.io's 30-day limit)
- **Authentication**: Web users use Google OAuth2; devices use username/password + TLS
- **Security**: TLS encryption for all MQTT traffic, ACL rules per user

## Development Workflow (When Implementation Begins)

Since no code exists yet, when development starts:

1. Set up Docker environment first (Mosquitto + PostgreSQL)
2. Create database schema
3. Implement Photon2 firmware (C++)
4. Build backend with OAuth2 and MQTT integration
5. Create React frontend with WebSocket support
6. Integration testing across all layers

## Notes for Future Development

- The project owner has experience with Java/Spring Boot and OAuth2
- Focus on simplicity and educational use cases
- Borrowed design inspiration from Adafruit.io
- User personas emphasize beginner-friendly design for students with minimal programming background
