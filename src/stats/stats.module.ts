import { Module } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { StatsController } from "./stats.controller";
import { StatsModel } from "./stats.model";

@Module({
    controllers: [StatsController],
    providers: [StatsService, StatsModel],
})
export class StatsModule {}
