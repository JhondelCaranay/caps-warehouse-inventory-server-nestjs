import { PrismaService } from "./../prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StatsModel {
    constructor(private prisma: PrismaService) {}

    async getChartStats() {}
}
