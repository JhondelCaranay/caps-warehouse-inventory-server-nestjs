import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getHello(): string {
        return "Welcome!. This is SPEDI Warehouse Inventory API...";
    }
}
