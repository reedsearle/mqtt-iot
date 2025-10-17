import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
  route("/login", "routes/login.tsx"),
  index("routes/dashboard.tsx"),
  route("/projects/:id", "routes/project-detail.tsx"),
  route("/dashboards/:id", "routes/dashboard-builder.tsx"),
  route("/feeds", "routes/feeds.tsx"),
  route("/devices", "routes/devices.tsx"),
] satisfies RouteConfig;
