import server from "../index";

export class HealthService {
  async get() {
    return {
      status: server.status,
      tz: server.timezome,
      uptime: `${server.uptime}s`,
      activeConnections: await server.countConnections(),
    };
  }
}