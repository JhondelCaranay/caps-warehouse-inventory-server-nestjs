import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class StatsService {
    constructor(private prisma: PrismaService) {}

    async getChartStats() {
        const TOTAL_MONTHS = 6;

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const transactionsStats: {
            month: string;
            transactions: number;
        }[] = await this.prisma.$queryRaw(
            Prisma.sql`SELECT MONTHNAME(createdAt) as month, SUM(1) as transactions
        FROM transactions
        WHERE createdAt >= NOW() - INTERVAL ${TOTAL_MONTHS} MONTH
        GROUP BY month;`,
        );

        const ItemsStats: {
            month: string;
            items: number;
        }[] = await this.prisma.$queryRaw(
            Prisma.sql`SELECT MONTHNAME(createdAt) as month, SUM(1) as items
        FROM items
        WHERE createdAt >= NOW() - INTERVAL  ${TOTAL_MONTHS} MONTH
        GROUP BY month;`,
        );

        // console.log(
        //     "🚀 ~ file: transaction.service.ts:92 ~ TransactionService ~ getStats ~ transactionsStats",
        //     transactionsStats,
        // );
        // console.log("🚀 ~ file: transaction.service.ts:137 ~ TransactionService ~ getStats ~ ItemsStats", ItemsStats);

        const combinedData = [];

        for (let i = 0; i < TOTAL_MONTHS; i++) {
            // const month = transactionsStats[i].month;
            // const transactions = Number(transactionsStats[i].transactions);

            let getMonth = new Date().getMonth() - i;
            // let getMonth = 1 - i;

            if (getMonth < 0) {
                // when getMonth is negative, add 12 to get the correct month
                getMonth = 12 + getMonth;
            }
            const month = months[getMonth];
            // const month = months[new Date().getMonth() - i];
            const items = Number(ItemsStats.find((row) => row.month === month)?.items || 0);
            const transactions = Number(transactionsStats.find((row) => row.month === month)?.transactions || 0);

            combinedData.push({
                month,
                transactions,
                items,
            });
        }
        // for (let i = 0; i < TOTAL_MONTHS; i++) {
        //     const month = transactionsStats[i].month;
        //     const transactions = Number(transactionsStats[i].transactions);
        //     const items = Number(ItemsStats.find((row) => row.month === month)?.items || 0);

        //     combinedData.push({
        //         month,
        //         transactions,
        //         items,
        //     });
        // }

        return combinedData;
    }

    async getAllTotals() {
        const totalTransactions = await this.prisma.transaction.count();
        const totalItems = await this.prisma.item.count();
        const totalProjects = await this.prisma.project.count();
        const totalUsers = await this.prisma.user.count();

        return {
            totalTransactions,
            totalItems,
            totalProjects,
            totalUsers,
        };
    }

    async findTransactionTotals() {
        let totalTransactionToday = await this.prisma.transaction.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                },
            },
        });
        let totalTransactionThisWeek = await this.prisma.transaction.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7),
                },
            },
        });
        let totalTransactionThisMonth = await this.prisma.transaction.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                },
            },
        });

        let totalTransactionThisExactYesterday = await this.prisma.transaction.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1), // yesterday
                    lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), // today
                },
            },
        });

        const percentageChange = Math.round(
            ((totalTransactionToday - totalTransactionThisExactYesterday) / totalTransactionThisExactYesterday) * 100,
        );
        console.log(`Percentage change: ${totalTransactionToday}%`);
        console.log(`Percentage change: ${totalTransactionThisExactYesterday}%`);
        console.log(`Percentage change: ${percentageChange}%`);
        return {
            totalTransactionToday,
            totalTransactionThisWeek,
            totalTransactionThisMonth,
            percentageChange,
        };
    }
}
