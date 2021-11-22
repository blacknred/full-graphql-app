import { Query, Resolver } from "type-graphql";
import { HealthResponseDto } from "./dto";
import { HealthService } from "./service";

@Resolver()
export class HealthController {
  private heathService = new HealthService();

  @Query(() => HealthResponseDto)
  async getHealth() {
    return this.heathService.check();
  }
}
