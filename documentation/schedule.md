MVP Demo Requirements (December 5th)
What You Need to Show:

✅ Login (Google OAuth2)
✅ IoT device connectivity (Photon2 with 2 rotary encoders)
✅ Database operations (save/retrieve encoder data)
✅ 4 widgets:

Switch (toggle LED on/off)
RPM Gauge (show rotation speed of one encoder)
Digital Readout (numeric display of position/value)
2D Graph (Etch-a-Sketch drawing from 2 encoders)



Etch-a-Sketch Concept:

Encoder 1 (X-axis) → horizontal movement
Encoder 2 (Y-axis) → vertical movement
Draw line on 2D canvas in real-time
Clear button (switch widget)


Simplified Architecture for Demo
Photon2 (2 encoders + LED)
↓ MQTT publish
Mosquitto Broker
↓ subscribe
Backend (Java/Node.js)
↓ save to database + WebSocket
PostgreSQL ← store data
↓
React Dashboard (4 widgets + real-time updates)

Week-by-Week Plan (Now → Dec 5)
Week 1 (Oct 9-15): Infrastructure Setup
Days 1-2: Docker Environment

Create project structure
Set up docker-compose.yml:

Mosquitto (basic config, no TLS for demo)
PostgreSQL (no TimescaleDB needed for demo)


Test Mosquitto locally
Create simple password file for one user

Days 3-4: Database

Create minimal schema:

sql-- Just what you need for demo
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
Days 5-7: Particle Photon2 Code

Set up 2 rotary encoders
Set up LED
Connect to WiFi
Connect to local Mosquitto
Publish encoder positions every 100ms:

cpp// Topic: demo/user1/encoders
// Payload: {"x": 150, "y": 200, "rpm": 45}

// Topic: demo/user1/led/state
// Payload: "ON" or "OFF"

Subscribe to LED control:

cpp// Topic: demo/user1/led/command
// Payload: "ON" or "OFF"

Week 2 (Oct 16-22): Backend Development
Days 1-3: Basic Backend (Java/Spring Boot recommended)

Initialize Spring Boot project
Add dependencies:

Spring Web
Spring Security (OAuth2)
PostgreSQL driver
Eclipse Paho MQTT client
WebSocket support


Configure database connection
Implement Google OAuth2 login (you already know this!)
Create one user on login (hardcoded MQTT creds for demo)

Days 4-5: MQTT Integration

MQTT subscriber service:

java@Service
public class MqttService {
// Subscribe to demo/user1/#
// Parse messages
// Save to database
// Broadcast via WebSocket
}

Save encoder data to database
Update device_status table

Days 6-7: WebSocket Server

Set up WebSocket endpoint
Broadcast real-time encoder data
Broadcast LED state changes
Test with simple WebSocket client


Week 3 (Oct 23-29): Frontend Development
Days 1-2: React Setup & Login

Create React app with TypeScript
Add Tailwind CSS + Flowbite
Implement Google OAuth2 login flow
Store JWT token
Create basic layout with header

Days 3-4: Widget Components

Switch Widget (LED control):

typescript// Simple toggle button
// onClick → publish MQTT command via backend API
// Shows current state

RPM Gauge Widget:

typescript// Circular gauge (0-100 RPM)
// Use Recharts or create with SVG
// Updates in real-time from WebSocket

Digital Readout Widget:

typescript// Large number display
// Shows current X or Y position
// Updates in real-time
Days 5-7: 2D Graph Widget (Etch-a-Sketch)

Canvas-based drawing component
Subscribe to WebSocket for X,Y coordinates
Draw line from previous position to new position
Clear button (uses switch widget)
Color/thickness options (optional)


Week 4 (Oct 30 - Nov 5): Integration & Testing
Days 1-3: End-to-End Integration

Connect all pieces
Test full flow:

Login with Google
Photon2 publishes encoder data
Backend receives and stores
Dashboard updates in real-time
Toggle LED from dashboard
Draw on Etch-a-Sketch


Fix bugs

Days 4-5: Demo Dashboard Layout

Create single dashboard view with 4 widgets:

┌─────────────────────────────────────┐
│           Dashboard Header          │
├──────────────┬──────────────────────┤
│   Switch     │    RPM Gauge         │
│   (LED)      │    (Encoder 1)       │
├──────────────┼──────────────────────┤
│  Digital     │                      │
│  Readout     │   2D Graph           │
│  (Position)  │   (Etch-a-Sketch)    │
│              │                      │
└──────────────┴──────────────────────┘
Days 6-7: Polish & Practice

Style with Tailwind
Add loading states
Error handling
Practice demo presentation


Week 5 (Nov 6-12): Deployment & Buffer
Days 1-3: Deploy to Cloud

Deploy to cloud server (DigitalOcean, AWS, etc.)
No SSL/TLS needed for demo (can use HTTP)
Update Photon2 with cloud broker address
Test remote connection

Days 4-7: Buffer Time

Fix any deployment issues
Improve UI polish
Add demo data/fallback
Create backup plan if WiFi fails
Practice demo multiple times


Week 6-7 (Nov 13-26): Polish & Contingency

Final testing
Create demo script
Record backup video (in case live demo fails)
Prepare talking points
Test in presentation environment


Minimum Viable Demo Flow (5 minutes)
1. Introduction (30 sec)

"IoT platform for educational bootcamp"
"Demonstrates device connectivity, real-time data, and interactive control"

2. Login Demo (30 sec)

Open browser
Click "Sign in with Google"
Show authenticated dashboard

3. Device Connectivity (1 min)

Show Photon2 with encoders and LED
Explain: "2 rotary encoders send position data via MQTT"
Show connection status indicator (green dot)

4. Widget Demonstrations (2.5 min)
   Switch Widget:

Toggle LED on dashboard
Show LED on Photon2 light up
"Bidirectional communication - dashboard controls device"

RPM Gauge:

Rotate encoder 1 quickly
Show gauge needle move
"Real-time visualization of rotation speed"

Digital Readout:

Show numeric position updating
"Current X position: 127"

2D Graph (Etch-a-Sketch):

Turn both encoders to draw
Show line appearing in real-time
Draw simple shape (square, circle)
Click clear button (uses switch widget)
"Two encoders control X and Y axes, just like Etch-a-Sketch"

5. Database Demo (30 sec)

Open database viewer or API endpoint
Show stored encoder positions with timestamps
"All data persisted in PostgreSQL"

6. Architecture Explanation (30 sec)

Show diagram (the one we made earlier)
Briefly explain: Device → MQTT → Backend → Database + WebSocket → Dashboard


Simplified Technology Stack for Demo
Backend: Java/Spring Boot (leverage your OAuth2 knowledge)
Frontend: React + TypeScript + Tailwind
Database: PostgreSQL (no TimescaleDB needed)
MQTT: Mosquitto (basic auth, no TLS)
Deployment: Single DigitalOcean droplet or AWS EC2
Real-time: WebSocket (Spring WebSocket + SockJS)

Critical Path Items (Must Complete)
Week 1:

✅ Mosquitto running
✅ Photon2 publishing encoder data
✅ PostgreSQL schema created

Week 2:

✅ OAuth2 login working
✅ Backend receiving MQTT messages
✅ Data saving to database

Week 3:

✅ Dashboard shows all 4 widgets
✅ WebSocket connection working
✅ Real-time updates visible

Week 4:

✅ Full end-to-end flow works
✅ Etch-a-Sketch drawing works
✅ LED control works

Week 5:

✅ Deployed and accessible via URL
✅ Demo practiced and polished


Risk Mitigation
If Photon2 fails during demo:

Have simulator publishing data from laptop
Or have backup video

If WiFi fails:

Deploy to local network with hotspot
Or run entirely on laptop (localhost)

If cloud deployment fails:

Run from laptop with ngrok
Or localhost demo

If WebSocket fails:

Fall back to polling (refresh every second)


Code Starter: Photon2 (C++)
cpp#include "Particle.h"

// Rotary Encoder pins
#define ENCODER1_A D2
#define ENCODER1_B D3
#define ENCODER2_A D4
#define ENCODER2_B D5
#define LED_PIN D7

// MQTT
MQTT client("your-server-ip", 1883, callback);

int x_position = 0;
int y_position = 0;
volatile int encoder1_count = 0;
volatile int encoder2_count = 0;
bool led_state = false;

void callback(char* topic, byte* payload, unsigned int length) {
char msg[length + 1];
memcpy(msg, payload, length);
msg[length] = '\0';

    if (strcmp(topic, "demo/user1/led/command") == 0) {
        if (strcmp(msg, "ON") == 0) {
            digitalWrite(LED_PIN, HIGH);
            led_state = true;
        } else {
            digitalWrite(LED_PIN, LOW);
            led_state = false;
        }
        // Publish state back
        client.publish("demo/user1/led/state", led_state ? "ON" : "OFF", true);
    }
}

void encoder1_ISR() {
if (digitalRead(ENCODER1_B)) encoder1_count++;
else encoder1_count--;
}

void encoder2_ISR() {
if (digitalRead(ENCODER2_B)) encoder2_count++;
else encoder2_count--;
}

void setup() {
pinMode(ENCODER1_A, INPUT_PULLUP);
pinMode(ENCODER1_B, INPUT_PULLUP);
pinMode(ENCODER2_A, INPUT_PULLUP);
pinMode(ENCODER2_B, INPUT_PULLUP);
pinMode(LED_PIN, OUTPUT);

    attachInterrupt(ENCODER1_A, encoder1_ISR, RISING);
    attachInterrupt(ENCODER2_A, encoder2_ISR, RISING);
    
    waitFor(WiFi.ready, 30000);
    
    client.connect("photon2-demo", "user1", "password");
    if (client.isConnected()) {
        client.subscribe("demo/user1/led/command");
    }
}

void loop() {
if (client.isConnected()) {
// Map encoder counts to 0-300 range for drawing canvas
x_position = map(encoder1_count, -500, 500, 0, 300);
y_position = map(encoder2_count, -500, 500, 0, 300);

        // Calculate RPM (simplified)
        static int last_count = 0;
        int rpm = abs(encoder1_count - last_count) * 6; // rough estimate
        last_count = encoder1_count;
        
        // Publish data
        String payload = String::format("{\"x\":%d,\"y\":%d,\"rpm\":%d}", 
                                       x_position, y_position, rpm);
        client.publish("demo/user1/encoders", payload);
        
        client.loop();
    } else {
        client.connect("photon2-demo", "user1", "password");
    }
    
    delay(100); // 10 Hz update rate
}

Success Criteria for Demo
✅ User logs in with Google OAuth2
✅ Dashboard loads showing 4 widgets
✅ Photon2 is connected (green status indicator)
✅ Turning encoders updates RPM gauge and digital readout in real-time
✅ Drawing on 2D graph works (Etch-a-Sketch effect)
✅ Toggling switch on dashboard turns LED on/off on Photon2
✅ Can show data in database (via pgAdmin or API endpoint)
✅ Demo runs smoothly in under 5 minutes

This is aggressive but achievable if you focus ONLY on these features. No project management, no feed management, no advanced dashboards—just prove the core concept works.
