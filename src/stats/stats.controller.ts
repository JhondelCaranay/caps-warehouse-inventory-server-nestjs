import { Controller, Get } from "@nestjs/common";
import { StatsService } from "./stats.service";

import { Public } from "src/common/decorators";

@Controller("stats")
export class StatsController {
    constructor(private readonly statsService: StatsService) {}

    @Public()
    @Get("chart")
    findAll() {
        return this.statsService.getChartStats();
    }

    @Public()
    @Get("totals")
    findTotals() {
        return this.statsService.getAllTotals();
    }

    @Public()
    @Get("transaction/totals")
    findTransactionTotals() {
        return this.statsService.findTransactionTotals();
    }
}
