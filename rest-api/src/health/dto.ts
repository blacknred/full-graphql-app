export class HealthResponseDto {
  status!: "OK" | "NOT OK";
  tz!: string;
  uptime!: string;
  activeConnections!: number;
}
