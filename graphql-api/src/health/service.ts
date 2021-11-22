import server from "../index";

export class HealthService {
  async check() {
    return {
      status: server.status,
      tz: server.timezome,
      uptime: `${server.uptime}s`,
      activeConnections: await server.countConnections(),
    };
  }
}